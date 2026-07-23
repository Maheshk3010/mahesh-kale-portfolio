import { detectIntent } from "./intentDetector";
import { searchKnowledge } from "./knowledgeSearch";
import { generateResponse } from "./responseGenerator";
import type { ChatEngine, ChatEngineResponse, ChatMessage } from "./types";

/**
 * LocalChatEngine — deterministic, offline engine backed by the JSON
 * knowledge base. Conforms to the ChatEngine interface so it can be swapped
 * for an OpenAI/gateway-backed engine later without touching the UI.
 */
export class LocalChatEngine implements ChatEngine {
  async ask(question: string, _history: ChatMessage[] = []): Promise<ChatEngineResponse> {
    void _history; // reserved for future context-aware engines
    const match = detectIntent(question);
    const result = searchKnowledge(match.intent, question);
    return generateResponse(result);
  }
}

export const mahiEngine: ChatEngine = new LocalChatEngine();

export type { ChatEngine, ChatEngineResponse, ChatMessage } from "./types";
