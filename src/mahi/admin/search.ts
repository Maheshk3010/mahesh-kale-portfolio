// KnowledgeSearch — full-text search across every knowledge file.

import type { KnowledgeBase } from "../types";
import type { KnowledgeCategory, SearchHit } from "./types";

type Indexable = {
  category: KnowledgeCategory;
  recordIndex: number;
  label: string;
  fields: Record<string, string>;
};

function stringify(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) return v.map(stringify).join(" ");
  if (typeof v === "object")
    return Object.values(v as object)
      .map(stringify)
      .join(" ");
  return "";
}

function buildIndex(kb: KnowledgeBase): Indexable[] {
  const idx: Indexable[] = [];

  idx.push({
    category: "profile",
    recordIndex: 0,
    label: kb.profile.fullName || "Profile",
    fields: Object.fromEntries(Object.entries(kb.profile).map(([k, v]) => [k, stringify(v)])),
  });

  kb.skills.skills.forEach((s, i) =>
    idx.push({
      category: "skills",
      recordIndex: i,
      label: s.name,
      fields: {
        name: s.name,
        category: s.category,
        description: s.description ?? "",
        projectsUsed: (s.projectsUsed ?? []).join(" "),
      },
    }),
  );

  kb.projects.projects.forEach((p, i) =>
    idx.push({
      category: "projects",
      recordIndex: i,
      label: p.title,
      fields: {
        title: p.title,
        description: p.description,
        technologies: (p.technologies ?? []).join(" "),
        features: (p.features ?? []).join(" "),
        outcome: p.outcome,
        problem: p.problem,
        solution: p.solution,
      },
    }),
  );

  kb.experience.experience.forEach((e, i) =>
    idx.push({
      category: "experience",
      recordIndex: i,
      label: `${e.role || ""} @ ${e.company || ""}`.trim(),
      fields: {
        company: e.company,
        role: e.role,
        duration: e.duration,
        responsibilities: (e.responsibilities ?? []).join(" "),
        technologies: (e.technologies ?? []).join(" "),
        achievements: (e.achievements ?? []).join(" "),
      },
    }),
  );

  kb.education.education.forEach((e, i) =>
    idx.push({
      category: "education",
      recordIndex: i,
      label: e.degree,
      fields: {
        degree: e.degree,
        university: e.university,
        graduationYear: e.graduationYear,
        grade: e.grade,
      },
    }),
  );

  kb.certifications.certifications.forEach((c, i) =>
    idx.push({
      category: "certifications",
      recordIndex: i,
      label: c.name,
      fields: {
        name: c.name,
        organization: c.organization,
        year: c.year,
      },
    }),
  );

  idx.push({
    category: "contact",
    recordIndex: 0,
    label: "Contact",
    fields: Object.fromEntries(Object.entries(kb.contact).map(([k, v]) => [k, stringify(v)])),
  });

  kb.social.links.forEach((l, i) =>
    idx.push({
      category: "social",
      recordIndex: i,
      label: l.platform,
      fields: { platform: l.platform, handle: l.handle, url: l.url },
    }),
  );

  idx.push({
    category: "resume",
    recordIndex: 0,
    label: kb.resume.filename || "Resume",
    fields: Object.fromEntries(Object.entries(kb.resume).map(([k, v]) => [k, stringify(v)])),
  });

  kb.roles.roles.forEach((r, i) =>
    idx.push({
      category: "roles",
      recordIndex: i,
      label: r.title,
      fields: { title: r.title, supportedBy: (r.supportedBy ?? []).join(" ") },
    }),
  );

  kb.faq.faqs.forEach((f, i) =>
    idx.push({
      category: "faq",
      recordIndex: i,
      label: f.q,
      fields: { question: f.q, answer: f.a },
    }),
  );

  kb.interview.interviews.forEach((n, i) =>
    idx.push({
      category: "interview",
      recordIndex: i,
      label: n.projectTitle,
      fields: {
        projectTitle: n.projectTitle,
        overview: n.overview,
        businessProblem: n.businessProblem,
        technicalSolution: n.technicalSolution,
        keyChallenges: (n.keyChallenges ?? []).join(" "),
        result: n.result,
      },
    }),
  );

  return idx;
}

function snippetOf(text: string, query: string, radius = 60): string {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const at = lower.indexOf(q);
  if (at < 0) return text.slice(0, radius * 2);
  const start = Math.max(0, at - radius);
  const end = Math.min(text.length, at + q.length + radius);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return `${prefix}${text.slice(start, end)}${suffix}`;
}

export const KnowledgeSearch = {
  search(kb: KnowledgeBase, query: string): SearchHit[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const index = buildIndex(kb);
    const hits: SearchHit[] = [];

    for (const rec of index) {
      let bestField = "";
      let bestFieldText = "";
      let score = 0;

      for (const [field, value] of Object.entries(rec.fields)) {
        const text = value.toLowerCase();
        if (!text) continue;
        if (text === q) score += 100;
        else if (text.startsWith(q)) score += 40;
        if (text.includes(q)) {
          score += 10;
          if (!bestField) {
            bestField = field;
            bestFieldText = value;
          }
        }
      }
      if (rec.label.toLowerCase().includes(q)) score += 25;

      if (score > 0) {
        hits.push({
          category: rec.category,
          recordIndex: rec.recordIndex,
          label: rec.label,
          matchedField: bestField || "label",
          snippet: snippetOf(bestFieldText || rec.label, q),
          score,
        });
      }
    }

    return hits.sort((a, b) => b.score - a.score).slice(0, 50);
  },
};
