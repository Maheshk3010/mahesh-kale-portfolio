import type { Intent, IntentMatch } from "./types";

// Keyword map: each intent lists trigger tokens. Weighted by specificity.
const INTENT_KEYWORDS: Record<Exclude<Intent, "unknown">, string[]> = {
  profile: ["who", "about", "profile", "bio", "summary", "introduce", "yourself", "mahesh"],
  skills: ["skill", "skills", "stack", "tech", "technology", "technologies", "tools", "know", "expert"],
  projects: ["project", "projects", "portfolio", "work", "built", "build", "made", "python project"],
  experience: ["experience", "work history", "job", "jobs", "role", "roles", "career", "worked"],
  education: ["education", "study", "studied", "degree", "college", "university", "school"],
  certifications: ["certification", "certifications", "certificate", "certified", "credential", "credentials", "course"],
  resume: ["resume", "cv", "download resume", "curriculum"],
  contact: ["contact", "email", "phone", "reach", "hire", "get in touch", "message"],
  github: ["github", "repo", "repository", "code"],
  linkedin: ["linkedin", "profile link", "connect"],
  general: ["hire", "why hire", "why should", "relocate", "relocation", "notice", "available", "availability", "hello", "hi", "hey"],
};

const HIRE_PHRASES = ["why should i hire", "why hire", "hire mahesh", "should i hire"];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function detectIntent(question: string): IntentMatch {
  const q = normalize(question);
  if (!q) return { intent: "unknown", confidence: 0, keywords: [] };

  // FAQ-style short-circuits
  if (HIRE_PHRASES.some((p) => q.includes(p))) {
    return { intent: "general", confidence: 0.95, keywords: ["hire"] };
  }

  let best: IntentMatch = { intent: "unknown", confidence: 0, keywords: [] };

  (Object.keys(INTENT_KEYWORDS) as Array<Exclude<Intent, "unknown">>).forEach((intent) => {
    const keywords = INTENT_KEYWORDS[intent];
    const matched = keywords.filter((kw) => q.includes(kw));
    if (matched.length === 0) return;
    // Score: matches / total, with a small boost per matched keyword length
    const score =
      matched.length / keywords.length +
      matched.reduce((acc, kw) => acc + kw.length / 100, 0);
    const confidence = Math.min(1, score);
    if (confidence > best.confidence) {
      best = { intent, confidence, keywords: matched };
    }
  });

  return best;
}
