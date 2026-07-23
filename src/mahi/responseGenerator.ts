import { knowledgeBase } from "./knowledgeBase";
import type {
  ChatEngineResponse,
  Certification,
  ExperienceItem,
  FaqItem,
  Intent,
  Project,
  SearchResult,
  SkillCategory,
  SocialLink,
} from "./types";

const FOLLOWUPS: Record<Intent, string[]> = {
  profile: ["Show skills", "See projects", "Download resume"],
  skills: ["Show Python projects", "See experience", "Download resume"],
  projects: ["What skills does Mahesh have?", "Show certifications", "Open GitHub"],
  experience: ["Show projects", "Download resume", "Contact Mahesh"],
  education: ["Show certifications", "See skills", "Download resume"],
  certifications: ["See projects", "Show skills", "Download resume"],
  resume: ["Contact Mahesh", "Open LinkedIn", "Show projects"],
  contact: ["Open LinkedIn", "Open GitHub", "Download resume"],
  github: ["Open LinkedIn", "Show projects", "Download resume"],
  linkedin: ["Open GitHub", "Contact Mahesh", "Download resume"],
  general: ["Show skills", "See projects", "Why should I hire Mahesh?"],
  unknown: ["Show skills", "See projects", "Download resume"],
};

const formatters: Record<Intent, (r: SearchResult) => string> = {
  profile: () => {
    const p = knowledgeBase.profile;
    return `**${p.name}** — ${p.title}\n📍 ${p.location} · ${p.level}\n\n${p.summary}\n\n**Highlights**\n${p.highlights.map((h) => `• ${h}`).join("\n")}`;
  },
  skills: (r) => {
    const cats = (r.matchedItems as SkillCategory[]) ?? knowledgeBase.skills.categories;
    return `Here's Mahesh's toolbelt:\n\n${cats
      .map((c) => `**${c.name}**\n${c.items.map((i) => `• ${i}`).join("\n")}`)
      .join("\n\n")}`;
  },
  projects: (r) => {
    const list = (r.matchedItems as Project[]) ?? knowledgeBase.projects.projects;
    const top = list.slice(0, 4);
    return `Here are some of Mahesh's projects:\n\n${top
      .map(
        (p) =>
          `**${p.name}** — _${p.tags.join(", ")}_\n${p.description}\n${p.highlights.map((h) => `• ${h}`).join("\n")}`,
      )
      .join("\n\n")}`;
  },
  experience: () => {
    const list = knowledgeBase.experience.experience as ExperienceItem[];
    return `**Experience**\n\n${list
      .map(
        (e) =>
          `**${e.role}** · ${e.company}\n_${e.start} – ${e.end} · ${e.location}_\n${e.highlights.map((h) => `• ${h}`).join("\n")}`,
      )
      .join("\n\n")}`;
  },
  education: () => {
    const list = knowledgeBase.education.education;
    return `**Education**\n\n${list
      .map((e) => `**${e.degree}, ${e.field}**\n${e.institution} · ${e.location}\n_${e.start} – ${e.end}_`)
      .join("\n\n")}`;
  },
  certifications: () => {
    const list = knowledgeBase.certifications.certifications as Certification[];
    return `**Certifications**\n\n${list.map((c) => `• **${c.name}** — ${c.issuer} (${c.year})`).join("\n")}`;
  },
  resume: () => {
    const r = knowledgeBase.resume;
    return `📄 You can download Mahesh's resume here: [${r.filename}](${r.url})\n\n_${r.summary}_\nLast updated: ${r.updated}`;
  },
  contact: () => {
    const c = knowledgeBase.contact;
    const lines = [
      `📧 **Email:** ${c.email}`,
      c.phone ? `📱 **Phone:** ${c.phone}` : "",
      `📍 **Location:** ${c.location}`,
      `✅ ${c.availability}`,
      `Preferred channels: ${c.preferredChannels.join(", ")}`,
    ].filter(Boolean);
    return lines.join("\n");
  },
  github: (r) => {
    const link = r.data as SocialLink | undefined;
    if (!link) return "GitHub link isn't configured yet.";
    return `💻 **GitHub:** [${link.handle}](${link.url})`;
  },
  linkedin: (r) => {
    const link = r.data as SocialLink | undefined;
    if (!link) return "LinkedIn link isn't configured yet.";
    return `🔗 **LinkedIn:** [${link.handle}](${link.url})`;
  },
  general: (r) => {
    const items = r.matchedItems as FaqItem[] | undefined;
    if (items && items[0]) return `**${items[0].q}**\n\n${items[0].a}`;
    const p = knowledgeBase.profile;
    return `${p.summary}\n\nAsk me about skills, projects, experience or how to contact Mahesh.`;
  },
  unknown: () =>
    "I'm not sure I caught that. I can help with Mahesh's **skills, projects, experience, education, certifications, resume, contact, GitHub or LinkedIn**. Try one of the quick questions below.",
};

export function generateResponse(result: SearchResult): ChatEngineResponse {
  const format = formatters[result.intent] ?? formatters.unknown;
  const reply = format(result);
  return {
    reply,
    intent: result.intent,
    suggestions: FOLLOWUPS[result.intent],
  };
}
