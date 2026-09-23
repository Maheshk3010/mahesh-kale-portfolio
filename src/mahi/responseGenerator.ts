import { knowledgeBase } from "./knowledgeBase";
import {
  UNVERIFIED_FALLBACK,
  type ChatEngineResponse,
  type Certification,
  type EducationItem,
  type ExperienceItem,
  type FaqItem,
  type Intent,
  type InterviewNote,
  type Project,
  type RoleRecommendation,
  type SearchResult,
  type Skill,
  type SocialLink,
} from "./types";

/**
 * Baseline follow-up suggestions per intent. The ConversationService may
 * refine these with session context before returning to the UI.
 */
export const FOLLOWUPS: Record<Intent, string[]> = {
  profile: ["What roles is Mahesh looking for?", "Show strongest skills", "Show projects"],
  skills: ["Show projects", "Show certifications", "Open GitHub"],
  projects: ["Related skills", "Internship experience", "Download Resume"],
  experience: ["View projects", "Contact Mahesh", "View certifications"],
  education: ["Show certifications", "Show projects", "View Resume"],
  certifications: ["Show projects", "Show skills", "View Resume"],
  resume: ["Contact Mahesh", "Open LinkedIn", "Show projects"],
  contact: ["Open LinkedIn", "Download Resume", "Open GitHub"],
  github: ["Show projects", "Show skills", "Download Resume"],
  linkedin: ["Contact Mahesh", "Download Resume", "Show projects"],
  roles: ["Show strongest skills", "Show projects", "Internship experience"],
  interview: ["Show projects", "Related skills", "Contact Mahesh"],
  general: ["Tell me about Mahesh", "Show projects", "What roles is Mahesh looking for?"],
  unknown: ["Tell me about Mahesh", "Show projects", "What roles is Mahesh looking for?"],
};

const bullet = (items: string[]) => items.map((i) => `• ${i}`).join("\n");

const formatters: Record<Intent, (r: SearchResult) => string> = {
  profile: () => {
    const p = knowledgeBase.profile;
    const roles = (p.targetRoles ?? []).join(" · ");
    return [
      `**${p.fullName}** — ${p.headline}`,
      `📍 ${p.location}`,
      "",
      p.professionalSummary,
      "",
      roles ? `**Target roles:** ${roles}` : "",
      `**Availability:** ${p.availability}`,
    ]
      .filter(Boolean)
      .join("\n");
  },

  skills: (r) => {
    const list = (r.matchedItems as Skill[]) ?? knowledgeBase.skills.skills;
    if (!list.length) return UNVERIFIED_FALLBACK;
    const byCategory = list.reduce<Record<string, Skill[]>>((acc, s) => {
      (acc[s.category] ||= []).push(s);
      return acc;
    }, {});
    return [
      "Here are Mahesh's **verified skills**:",
      "",
      ...Object.entries(byCategory).map(
        ([cat, items]) =>
          `**${cat}**\n${items.map((i) => `• **${i.name}** — ${i.description}`).join("\n")}`,
      ),
    ].join("\n\n");
  },

  projects: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const items = (r.matchedItems as Project[]) ?? [];
    if (!items.length) return UNVERIFIED_FALLBACK;
    return [
      "**Project portfolio**",
      "",
      ...items.map((p) =>
        [
          `**${p.title}**`,
          p.description,
          `**Tech:** ${p.technologies.join(", ")}`,
          p.outcome ? `**Outcome:** ${p.outcome}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      ),
    ].join("\n\n");
  },

  experience: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const items = r.matchedItems as ExperienceItem[];
    return items
      .map((e) =>
        [
          `**${e.role}** · ${e.company}`,
          `_${e.duration}_`,
          bullet(e.responsibilities),
          e.technologies?.length ? `**Tech:** ${e.technologies.join(", ")}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      )
      .join("\n\n");
  },

  education: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const items = r.matchedItems as EducationItem[];
    if (!items.length) return UNVERIFIED_FALLBACK;
    return items
      .map((e) =>
        [
          `**${e.degree}**`,
          e.university,
          [e.graduationYear, e.grade && `Grade: ${e.grade}`].filter(Boolean).join(" · "),
        ]
          .filter(Boolean)
          .join("\n"),
      )
      .join("\n\n");
  },

  certifications: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const items = r.matchedItems as Certification[];
    return [
      "**Verified certifications**",
      "",
      ...items.map((c) => `• **${c.name}** — ${c.organization}${c.year ? ` (${c.year})` : ""}`),
    ].join("\n");
  },

  resume: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const res = knowledgeBase.resume;
    return `📄 [${res.filename || "Resume"}](${res.url})\n\n${res.summary}${res.updated ? `\nLast updated: ${res.updated}` : ""}`;
  },

  contact: (r) => {
    const c = knowledgeBase.contact;
    if (!r.verified) {
      return `${UNVERIFIED_FALLBACK}\n\n📍 ${c.location} · ${c.availability}`;
    }
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
    return [
      "Mahesh is targeting these roles:",
      "",
      ...items.map((r2) => `• **${r2.title}** — supported by: ${r2.supportedBy.join(", ")}`),
    ].join("\n");
  },

  interview: (r) => {
    if (!r.verified) return UNVERIFIED_FALLBACK;
    const items = r.matchedItems as InterviewNote[];
    return items
      .map((n) =>
        [
          `**${n.projectTitle}**`,
          `_Overview:_ ${n.overview}`,
          `_Business problem:_ ${n.businessProblem}`,
          `_Technical solution:_ ${n.technicalSolution}`,
          `_Result:_ ${n.result}`,
        ].join("\n"),
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
