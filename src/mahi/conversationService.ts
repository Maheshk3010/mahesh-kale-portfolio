import { detectIntent } from "./intentDetector";
import { searchKnowledge } from "./knowledgeSearch";
import { generateResponse, FOLLOWUPS } from "./responseGenerator";
import type { ChatEngineResponse, ChatMessage, Intent } from "./types";

/**
 * ConversationService orchestrates the local recruiter-facing chat flow.
 *
 * Responsibilities:
 *   • Resolve intent using both the current question and prior turns.
 *   • Query the verified knowledge base through searchKnowledge.
 *   • Format a recruiter-friendly response via responseGenerator.
 *   • Refine follow-up suggestions using recent conversation context so the
 *     recruiter is never shown the same suggestion twice in a row.
 *
 * The service is deliberately decoupled from:
 *   • Chat UI (React / MahiAI component)
 *   • Knowledge JSON layout (accessed only via searchKnowledge)
 *   • Analytics, Navigation, Voice
 *
 * A future OpenAI / RAG backend can implement ChatEngine.ask directly and
 * reuse the same suggestion-refinement helper if desired.
 */

const MAX_RECENT_INTENTS = 4;

function recentIntents(history: ChatMessage[]): Intent[] {
  const intents: Intent[] = [];
  for (let i = history.length - 1; i >= 0 && intents.length < MAX_RECENT_INTENTS; i -= 1) {
    const m = history[i];
    if (m.role === "assistant" && m.intent) intents.push(m.intent);
  }
  return intents;
}

function refineSuggestions(
  intent: Intent,
  base: string[] | undefined,
  history: ChatMessage[],
): string[] {
  const seen = new Set(
    history
      .filter((m) => m.role === "user")
      .slice(-6)
      .map((m) => m.content.trim().toLowerCase()),
  );
  const recent = recentIntents(history);
  const pool = [...(base ?? FOLLOWUPS[intent] ?? FOLLOWUPS.unknown)];

  // Add a natural next step based on the recent trajectory.
  if (intent === "skills" && !recent.includes("projects")) {
    pool.unshift("Show projects that use these skills");
  } else if (intent === "projects" && !recent.includes("experience")) {
    pool.push("Which internship built this?");
  } else if (intent === "experience" && !recent.includes("projects")) {
    pool.push("Which projects came from these internships?");
  } else if (intent === "roles" && !recent.includes("skills")) {
    pool.push("Show skills that support these roles");
  }

  // Deduplicate + drop anything the recruiter already asked verbatim.
  const uniq = Array.from(new Set(pool)).filter((s) => !seen.has(s.toLowerCase()));
  return uniq.slice(0, 3);
}

export class ConversationService {
  async respond(
    question: string,
    history: ChatMessage[] = [],
  ): Promise<ChatEngineResponse> {
    const match = detectIntent(question, history);
    const result = searchKnowledge(match.intent, question);
    const response = generateResponse(result);
    return {
      ...response,
      suggestions: refineSuggestions(response.intent, response.suggestions, history),
    };
  }
}

export const conversationService = new ConversationService();
