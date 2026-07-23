import { knowledgeBase } from "./knowledgeBase";
import {
  UNVERIFIED_FALLBACK,
  type ChatEngineResponse,
  type Certification,
  type ExperienceItem,
  type FaqItem,
  type Intent,
  type InterviewNote,
  type RoleRecommendation,
  type SearchResult,
  type Skill,
  type SocialLink,
} from "./types";

const FOLLOWUPS: Record<Intent, string[]> = {
  profile: ["What skills does Mahesh have?", "Show projects", "View Resume"],
  skills: ["Show projects", "View Resume", "Contact Mahesh"],
  projects: ["Open GitHub", "Show Python skills", "Download Resume"],
  experience: ["Show projects", "View Resume", "Contact Mahesh"],
  education: ["Show certifications", "What skills does Mahesh have?", "View Resume"],
  certifications: ["Show projects", "What skills does Mahesh have?", "View Resume"],
  resume: ["Contact Mahesh", "View LinkedIn", "Show projects"],
  contact: ["View LinkedIn", "Download Resume", "Open GitHub"],
  github: ["Show projects", "What skills does Mahesh have?", "Download Resume"],
  linkedin: ["Contact Mahesh", "Download Resume", "Show projects"],
  roles: ["What skills does Mahesh have?", "Show projects", "View Resume"],
  interview: ["Show projects", "What skills does Mahesh have?", "Contact Mahesh"],
  general: ["What skills does Mahesh have?", "Show projects", "Contact Mahesh"],
  unknown: ["Who is Mahesh?", "What skills does Mahesh have?", "Show projects"],
};

const formatters: Record<Intent, (r: SearchResult) => string> = {
  profile: () => {
    const p = knowledgeBase.profile;
    return `**${p.fullName}** — ${p.headline}\n📍 ${p.location}\n\n${p.professionalSummary}\n\n**Current status:** ${p.currentStatus}\n**Availability:** ${p.availability}`;
  },

  skills: (r) => {
    const list = (r.matchedItems as Skill[]) ?? knowledgeBase.skills.skills;
    if (!list.length) return UNVERIFIED_FALLBACK;
    const byCategory = list.reduce<Record<string, Skill[]>>((acc, s) => {
      (acc[s.category] ||= []).push(s);
      return acc;
    }, {});
    return `Here are Mahesh's verified skills:\n\n${Object.entries(byCategory)
      .map(
        ([cat, items]) =>
          `**${cat}**\n${items.map((i) => `• **${i.name}** — ${i.description}`).join("\n")}`,
      )
      .join("\n\n")}`;
  },

  projects: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const items = r.matchedItems as SearchResult["matchedItems"];
    return `Verified projects:\n\n${JSON.stringify(items, null, 2)}`;
  },

  experience: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const items = r.matchedItems as ExperienceItem[];
    return items
      .map(
        (e) =>
          `**${e.role}** · ${e.company}\n_${e.duration}_\n${e.responsibilities.map((h) => `• ${h}`).join("\n")}`,
      )
      .join("\n\n");
  },

  education: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const items = r.matchedItems as SearchResult["matchedItems"];
    return JSON.stringify(items, null, 2);
  },

  certifications: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const items = r.matchedItems as Certification[];
    return items.map((c) => `• **${c.name}** — ${c.organization} (${c.year})`).join("\n");
  },

  resume: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const res = knowledgeBase.resume;
    return `📄 [${res.filename}](${res.url})\n\n${res.summary}\nLast updated: ${res.updated}`;
  },

  contact: (r) => {
    if (!r.verified) {
      const c = knowledgeBase.contact;
      return `${UNVERIFIED_FALLBACK}\n\n📍 ${c.location} · ${c.availability}\nPreferred channels: ${c.preferredChannels.join(", ")}`;
    }
    const c = knowledgeBase.contact;
    return [
      c.email && `📧 **Email:** ${c.email}`,
      c.phone && `📱 **Phone:** ${c.phone}`,
      c.linkedin && `🔗 **LinkedIn:** ${c.linkedin}`,
      c.github && `💻 **GitHub:** ${c.github}`,
      `📍 **Location:** ${c.location}`,
      `✅ ${c.availability}`,
    ]
      .filter(Boolean)
      .join("\n");
  },

  github: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const link = r.data as SocialLink;
    return `💻 **GitHub:** [${link.handle || link.url}](${link.url})`;
  },

  linkedin: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const link = r.data as SocialLink;
    return `🔗 **LinkedIn:** [${link.handle || link.url}](${link.url})`;
  },

  roles: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const items = r.matchedItems as RoleRecommendation[];
    return `Based on verified skills, Mahesh is a strong fit for:\n\n${items
      .map((r2) => `• **${r2.title}** — supported by: ${r2.supportedBy.join(", ")}`)
      .join("\n")}`;
  },

  interview: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const items = r.matchedItems as InterviewNote[];
    return items
      .map(
        (n) =>
          `**${n.projectTitle}**\n_Overview:_ ${n.overview}\n_Business problem:_ ${n.businessProblem}\n_Technical solution:_ ${n.technicalSolution}\n_Result:_ ${n.result}`,
      )
      .join("\n\n");
  },

  general: (r) => {
    const items = r.matchedItems as FaqItem[] | undefined;
    if (items && items[0]) return `**${items[0].q}**\n\n${items[0].a}`;
    return knowledgeBase.profile.professionalSummary;
  },

  unknown: () => UNVERIFIED_FALLBACK,
};

export function generateResponse(result: SearchResult): ChatEngineResponse {
  const format = formatters[result.intent] ?? formatters.unknown;
  const reply = format(result);
  return {
    reply,
    intent: result.intent,
    suggestions: FOLLOWUPS[result.intent],
    verified: result.verified,
  };
}
