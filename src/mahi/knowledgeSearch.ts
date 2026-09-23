import { knowledgeBase } from "./knowledgeBase";
import type { Intent, SearchResult, FaqItem, Skill } from "./types";

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

function has<T>(list: T[] | undefined | null): list is T[] {
  return Array.isArray(list) && list.length > 0;
}

/** Route to the right slice of the knowledge base for an intent. */
export function searchKnowledge(intent: Intent, query: string): SearchResult {
  const qTokens = tokens(query);
  const kb = knowledgeBase;

  const routes: Partial<Record<Intent, () => SearchResult>> = {
    profile: () => ({ intent, data: kb.profile, verified: true }),

    skills: () => {
      const all = kb.skills.skills;
      const matched = all
        .map((s) => ({
          skill: s,
          score:
            scoreOverlap(s.name, qTokens) +
            scoreOverlap(s.category, qTokens) +
            scoreOverlap(s.description, qTokens),
        }))
        .filter((m) => m.score > 0)
        .sort((a, b) => b.score - a.score);
      return {
        intent,
        data: kb.skills,
        matchedItems: matched.length ? matched.map((m) => m.skill) : (all as Skill[]),
        verified: has(all),
      };
    },

    projects: () => ({
      intent,
      data: kb.projects,
      matchedItems: kb.projects.projects,
      verified: has(kb.projects.projects),
    }),

    experience: () => ({
      intent,
      data: kb.experience,
      matchedItems: kb.experience.experience,
      verified: has(kb.experience.experience),
    }),

    education: () => ({
      intent,
      data: kb.education,
      matchedItems: kb.education.education,
      verified: has(kb.education.education),
    }),

    certifications: () => ({
      intent,
      data: kb.certifications,
      matchedItems: kb.certifications.certifications,
      verified: has(kb.certifications.certifications),
    }),

    resume: () => ({
      intent,
      data: kb.resume,
      verified: Boolean(kb.resume.url),
    }),

    contact: () => ({
      intent,
      data: kb.contact,
      verified: Boolean(
        kb.contact.email || kb.contact.phone || kb.contact.linkedin || kb.contact.github,
      ),
    }),

    github: () => {
      const link = kb.social.links.find((l) => l.platform === "GitHub");
      return { intent, data: link, verified: Boolean(link?.url) };
    },

    linkedin: () => {
      const link = kb.social.links.find((l) => l.platform === "LinkedIn");
      return { intent, data: link, verified: Boolean(link?.url) };
    },

    roles: () => ({
      intent,
      data: kb.roles,
      matchedItems: kb.roles.roles,
      verified: has(kb.roles.roles),
    }),

    interview: () => ({
      intent,
      data: kb.interview,
      matchedItems: kb.interview.interviews,
      verified: has(kb.interview.interviews),
    }),

    general: () => {
      const scored = kb.faq.faqs
        .map((f) => ({ faq: f, score: scoreOverlap(f.q, qTokens) }))
        .sort((a, b) => b.score - a.score);
      const top = scored[0]?.score ? (scored[0].faq as FaqItem) : null;
      return {
        intent,
        data: top ?? kb.profile,
        matchedItems: top ? [top] : [],
        verified: true,
      };
    },
  };

  const runner = routes[intent];
  if (!runner) return { intent: "unknown", data: null, verified: false };
  return runner();
}
