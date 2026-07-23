import { knowledgeBase } from "./knowledgeBase";
import type { Intent, Project, SearchResult, FaqItem } from "./types";

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function scoreOverlap(haystack: string, needleTokens: string[]): number {
  const h = haystack.toLowerCase();
  return needleTokens.reduce((acc, t) => (h.includes(t) ? acc + 1 : acc), 0);
}

/** Route to the right slice of the knowledge base for an intent. */
export function searchKnowledge(intent: Intent, query: string): SearchResult {
  const qTokens = tokens(query);

  const routes: Partial<Record<Intent, () => SearchResult>> = {
    profile: () => ({ intent, data: knowledgeBase.profile }),
    skills: () => {
      const cats = knowledgeBase.skills.categories;
      const matched = cats
        .map((c) => ({
          category: c,
          score:
            scoreOverlap(c.name, qTokens) +
            c.items.reduce((s, i) => s + scoreOverlap(i, qTokens), 0),
        }))
        .filter((c) => c.score > 0);
      return {
        intent,
        data: knowledgeBase.skills,
        matchedItems: matched.length ? matched.map((m) => m.category) : cats,
      };
    },
    projects: () => {
      const all = knowledgeBase.projects.projects;
      const scored = all
        .map((p) => ({
          project: p,
          score:
            scoreOverlap(p.name, qTokens) +
            scoreOverlap(p.description, qTokens) +
            p.tags.reduce((s, t) => s + scoreOverlap(t, qTokens), 0),
        }))
        .sort((a, b) => b.score - a.score);
      const top = scored.filter((s) => s.score > 0).map((s) => s.project);
      return {
        intent,
        data: knowledgeBase.projects,
        matchedItems: top.length ? top : (all as Project[]),
      };
    },
    experience: () => ({
      intent,
      data: knowledgeBase.experience,
      matchedItems: knowledgeBase.experience.experience,
    }),
    education: () => ({
      intent,
      data: knowledgeBase.education,
      matchedItems: knowledgeBase.education.education,
    }),
    certifications: () => ({
      intent,
      data: knowledgeBase.certifications,
      matchedItems: knowledgeBase.certifications.certifications,
    }),
    resume: () => ({ intent, data: knowledgeBase.resume }),
    contact: () => ({ intent, data: knowledgeBase.contact }),
    github: () => ({
      intent,
      data: knowledgeBase.social.links.find((l) => l.platform === "GitHub"),
    }),
    linkedin: () => ({
      intent,
      data: knowledgeBase.social.links.find((l) => l.platform === "LinkedIn"),
    }),
    general: () => {
      // FAQ fuzzy lookup
      const scored = knowledgeBase.faq.faqs
        .map((f) => ({ faq: f, score: scoreOverlap(f.q, qTokens) }))
        .sort((a, b) => b.score - a.score);
      const top = scored[0]?.score ? (scored[0].faq as FaqItem) : null;
      return {
        intent,
        data: top ?? knowledgeBase.profile,
        matchedItems: top ? [top] : [],
      };
    },
  };

  const runner = routes[intent];
  if (!runner) return { intent: "unknown", data: null };
  return runner();
}
