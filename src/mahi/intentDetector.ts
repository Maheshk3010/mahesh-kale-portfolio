import type { ChatMessage, Intent, IntentMatch } from "./types";

/**
 * Weighted keyword sets. Longer/more specific phrases score higher.
 * Order does not matter — matching is purely substring based after
 * normalisation, then we pick the intent with the best score.
 */
type Keyword = { phrase: string; weight?: number };

const INTENT_KEYWORDS: Record<Exclude<Intent, "unknown">, Keyword[]> = {
  profile: [
    { phrase: "tell me about mahesh", weight: 5 },
    { phrase: "introduce yourself", weight: 5 },
    { phrase: "introduce mahesh", weight: 5 },
    { phrase: "who is mahesh", weight: 5 },
    { phrase: "about mahesh", weight: 4 },
    { phrase: "about yourself", weight: 4 },
    { phrase: "profile", weight: 3 },
    { phrase: "bio", weight: 2 },
    { phrase: "summary", weight: 2 },
    { phrase: "background", weight: 2 },
  ],
  skills: [
    { phrase: "strongest skill", weight: 5 },
    { phrase: "strongest skills", weight: 5 },
    { phrase: "best skill", weight: 4 },
    { phrase: "core skill", weight: 4 },
    { phrase: "skills", weight: 3 },
    { phrase: "skill", weight: 2 },
    { phrase: "tech stack", weight: 4 },
    { phrase: "technologies", weight: 3 },
    { phrase: "technology", weight: 3 },
    { phrase: "tools", weight: 2 },
    { phrase: "know python", weight: 4 },
    { phrase: "know sql", weight: 4 },
    { phrase: "know power bi", weight: 4 },
    { phrase: "know machine learning", weight: 4 },
    { phrase: "know ml", weight: 3 },
    { phrase: "python", weight: 2 },
    { phrase: "sql", weight: 2 },
    { phrase: "power bi", weight: 3 },
    { phrase: "pandas", weight: 3 },
    { phrase: "numpy", weight: 3 },
    { phrase: "scikit", weight: 3 },
    { phrase: "flask", weight: 3 },
    { phrase: "machine learning", weight: 3 },
    { phrase: "excel", weight: 2 },
    { phrase: "mysql", weight: 2 },
    { phrase: "rest api", weight: 3 },
    { phrase: "git", weight: 2 },
  ],
  projects: [
    { phrase: "show projects", weight: 5 },
    { phrase: "show me projects", weight: 5 },
    { phrase: "python projects", weight: 5 },
    { phrase: "data analytics projects", weight: 5 },
    { phrase: "data analysis projects", weight: 5 },
    { phrase: "machine learning projects", weight: 5 },
    { phrase: "dashboard projects", weight: 5 },
    { phrase: "best project", weight: 5 },
    { phrase: "strongest project", weight: 5 },
    { phrase: "top project", weight: 4 },
    { phrase: "projects", weight: 3 },
    { phrase: "project", weight: 2 },
    { phrase: "portfolio work", weight: 3 },
    { phrase: "case study", weight: 3 },
    { phrase: "built", weight: 2 },
    { phrase: "recommendation", weight: 5 },
    { phrase: "sales performance intelligence", weight: 5 },
  ],
  experience: [
    { phrase: "internships", weight: 5 },
    { phrase: "internship", weight: 5 },
    { phrase: "work experience", weight: 5 },
    { phrase: "professional experience", weight: 5 },
    { phrase: "experience", weight: 3 },
    { phrase: "worked at", weight: 4 },
    { phrase: "companies", weight: 3 },
    { phrase: "excelr", weight: 5 },
    { phrase: "sysslan", weight: 5 },
    { phrase: "codveda", weight: 5 },
  ],
  education: [
    { phrase: "education", weight: 4 },
    { phrase: "degree", weight: 4 },
    { phrase: "university", weight: 3 },
    { phrase: "college", weight: 3 },
    { phrase: "graduation", weight: 3 },
    { phrase: "cgpa", weight: 4 },
    { phrase: "grade", weight: 2 },
    { phrase: "b.sc", weight: 4 },
    { phrase: "bsc", weight: 4 },
    { phrase: "sandip", weight: 5 },
    { phrase: "computer science", weight: 3 },
  ],
  certifications: [
    { phrase: "certifications", weight: 5 },
    { phrase: "certification", weight: 5 },
    { phrase: "certificates", weight: 4 },
    { phrase: "certificate", weight: 4 },
    { phrase: "certified", weight: 3 },
    { phrase: "credential", weight: 3 },
    { phrase: "oracle sql", weight: 4 },
    { phrase: "microsoft data", weight: 4 },
    { phrase: "ibm data science", weight: 4 },
    { phrase: "infosys", weight: 3 },
  ],
  resume: [
    { phrase: "download resume", weight: 5 },
    { phrase: "view resume", weight: 5 },
    { phrase: "resume", weight: 4 },
    { phrase: "cv", weight: 3 },
  ],
  contact: [
    { phrase: "contact mahesh", weight: 5 },
    { phrase: "how can i contact", weight: 5 },
    { phrase: "get in touch", weight: 5 },
    { phrase: "reach mahesh", weight: 4 },
    { phrase: "reach out", weight: 3 },
    { phrase: "email mahesh", weight: 5 },
    { phrase: "call mahesh", weight: 5 },
    { phrase: "contact", weight: 3 },
    { phrase: "email", weight: 3 },
    { phrase: "phone", weight: 3 },
    { phrase: "mobile", weight: 3 },
  ],
  github: [
    { phrase: "open github", weight: 5 },
    { phrase: "show github", weight: 5 },
    { phrase: "github", weight: 4 },
    { phrase: "repository", weight: 3 },
    { phrase: "repo", weight: 3 },
    { phrase: "source code", weight: 3 },
  ],
  linkedin: [
    { phrase: "open linkedin", weight: 5 },
    { phrase: "show linkedin", weight: 5 },
    { phrase: "linkedin", weight: 4 },
    { phrase: "connect on linkedin", weight: 5 },
  ],
  roles: [
    { phrase: "target roles", weight: 5 },
    { phrase: "what roles", weight: 5 },
    { phrase: "which roles", weight: 5 },
    { phrase: "roles is mahesh", weight: 5 },
    { phrase: "looking for", weight: 3 },
    { phrase: "best fit", weight: 4 },
    { phrase: "role fit", weight: 4 },
    { phrase: "position", weight: 3 },
    { phrase: "data analyst", weight: 3 },
    { phrase: "reporting analyst", weight: 3 },
    { phrase: "bi analyst", weight: 3 },
    { phrase: "mis analyst", weight: 3 },
  ],
  interview: [
    { phrase: "walk me through", weight: 5 },
    { phrase: "explain project", weight: 5 },
    { phrase: "explain the project", weight: 5 },
    { phrase: "interview", weight: 4 },
    { phrase: "case study", weight: 3 },
    { phrase: "approach", weight: 2 },
  ],
  general: [
    { phrase: "why should i hire", weight: 5 },
    { phrase: "why hire", weight: 4 },
    { phrase: "hire mahesh", weight: 4 },
    { phrase: "relocate", weight: 3 },
    { phrase: "relocation", weight: 3 },
    { phrase: "notice period", weight: 4 },
    { phrase: "availability", weight: 3 },
    { phrase: "available", weight: 2 },
    { phrase: "location", weight: 2 },
    { phrase: "based in", weight: 3 },
    { phrase: "where is mahesh", weight: 4 },
    { phrase: "hello", weight: 2 },
    { phrase: "hi", weight: 1 },
    { phrase: "hey", weight: 1 },
  ],
};

/** Follow-up references — used to resolve pronouns back to a previous intent. */
const FOLLOWUP_REFERENCES = [
  "which one",
  "which is",
  "which project",
  "which skill",
  "which role",
  "that one",
  "tell me more",
  "more about it",
  "more about that",
  "explain it",
  "explain that",
  "the strongest",
  "the best",
  "your strongest",
  "your best",
  "and this",
  "and that",
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s.+]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isFollowUp(q: string): boolean {
  if (q.split(/\s+/).length <= 3) return true; // very short = likely refers back
  return FOLLOWUP_REFERENCES.some((p) => q.includes(p));
}

function lastAssistantIntent(history: ChatMessage[]): Intent | null {
  for (let i = history.length - 1; i >= 0; i -= 1) {
    const m = history[i];
    if (m.role === "assistant" && m.intent) return m.intent;
  }
  return null;
}

export function detectIntent(question: string, history: ChatMessage[] = []): IntentMatch {
  const q = normalize(question);
  if (!q) return { intent: "unknown", confidence: 0, keywords: [] };

  let best: IntentMatch = { intent: "unknown", confidence: 0, keywords: [] };

  (Object.keys(INTENT_KEYWORDS) as Array<Exclude<Intent, "unknown">>).forEach((intent) => {
    let score = 0;
    const matched: string[] = [];
    for (const kw of INTENT_KEYWORDS[intent]) {
      if (q.includes(kw.phrase)) {
        score += kw.weight ?? 1;
        matched.push(kw.phrase);
      }
    }
    if (score > best.confidence) {
      best = { intent, confidence: score, keywords: matched };
    }
  });

  // Contextual follow-up: if the question is a bare pronoun-style follow-up
  // and we detected nothing (or something weak), inherit the previous intent.
  const prior = lastAssistantIntent(history);
  if (prior && isFollowUp(q) && best.confidence < 3) {
    return {
      intent: prior,
      confidence: Math.max(best.confidence, 2),
      keywords: [...best.keywords, "(context)"],
    };
  }

  return best;
}
