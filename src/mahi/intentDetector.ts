import type { Intent, IntentMatch } from "./types";

const INTENT_KEYWORDS: Record<Exclude<Intent, "unknown">, string[]> = {
  profile: ["who", "about", "profile", "bio", "summary", "introduce", "yourself", "mahesh"],
  skills: ["skill", "skills", "stack", "tech", "technology", "technologies", "tools", "know", "expert", "python", "sql", "flask", "power bi", "rest", "machine learning", "ml"],
  projects: ["project", "projects", "portfolio", "built", "build", "made"],
  experience: ["experience", "internship", "internships", "job", "jobs", "work history", "role history", "career", "worked", "company"],
  education: ["education", "study", "studied", "degree", "college", "university", "school", "cgpa", "grade"],
  certifications: ["certification", "certifications", "certificate", "certified", "credential", "credentials", "course"],
  resume: ["resume", "cv", "download resume", "curriculum"],
  contact: ["contact", "email", "phone", "reach", "get in touch", "message"],
  github: ["github", "repo", "repository", "source code"],
  linkedin: ["linkedin", "connect"],
  roles: ["role", "roles", "position", "positions", "job title", "suits", "fit", "hire for"],
  interview: ["interview", "walk me through", "explain project", "case study"],
  general: ["hire", "why hire", "why should", "relocate", "relocation", "notice", "available", "availability", "hello", "hi", "hey", "location", "based", "where"],
};

const HIRE_PHRASES = ["why should i hire", "why hire", "hire mahesh", "should i hire"];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function detectIntent(question: string): IntentMatch {
  const q = normalize(question);
  if (!q) return { intent: "unknown", confidence: 0, keywords: [] };

  if (HIRE_PHRASES.some((p) => q.includes(p))) {
    return { intent: "general", confidence: 0.95, keywords: ["hire"] };
  }

  let best: IntentMatch = { intent: "unknown", confidence: 0, keywords: [] };

  (Object.keys(INTENT_KEYWORDS) as Array<Exclude<Intent, "unknown">>).forEach((intent) => {
    const keywords = INTENT_KEYWORDS[intent];
    const matched = keywords.filter((kw) => q.includes(kw));
    if (matched.length === 0) return;
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
