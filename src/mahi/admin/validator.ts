// KnowledgeValidator — inspects each knowledge category for structural issues.
// Pure functions, no dependency on ChatEngine or React.

import type { KnowledgeBase } from "../types";
import type {
  CategoryReport,
  KnowledgeCategory,
  ValidationIssue,
  ValidationSeverity,
} from "./types";

const URL_PATTERN = /^https?:\/\/[^\s]+$/i;

const TARGET_ROLES = new Set(
  ["data analyst", "mis executive"].map((s) =>
    s.toLowerCase(),
  ),
);

const KNOWN_SKILL_CATEGORIES = new Set([
  "language",
  "languages",
  "framework",
  "frameworks",
  "library",
  "libraries",
  "database",
  "databases",
  "tool",
  "tools",
  "concept",
  "concepts",
  "technical",
  "analytics",
  "visualization",
  "cloud",
  "version control",
]);

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isValidUrl(v: unknown): boolean {
  return typeof v === "string" && URL_PATTERN.test(v.trim());
}

function pickWorst(issues: ValidationIssue[]): ValidationSeverity {
  if (issues.some((i) => i.severity === "error")) return "error";
  if (issues.some((i) => i.severity === "warn")) return "warn";
  return "ok";
}

function scoreFor(recordCount: number, issues: ValidationIssue[]): number {
  if (recordCount === 0 && issues.some((i) => i.severity === "error")) return 0;
  const warnings = issues.filter((i) => i.severity === "warn").length;
  const errors = issues.filter((i) => i.severity === "error").length;
  const denom = Math.max(recordCount, 1);
  const penalty = (warnings * 8 + errors * 25) / denom;
  return Math.max(0, Math.min(100, Math.round(100 - penalty)));
}

function seenDuplicate<T>(items: T[], key: (item: T) => string): number[] {
  const seen = new Map<string, number>();
  const dupes: number[] = [];
  items.forEach((item, i) => {
    const k = key(item).toLowerCase().trim();
    if (!k) return;
    if (seen.has(k)) dupes.push(i);
    else seen.set(k, i);
  });
  return dupes;
}

/* -------------------------- Per-category validators ------------------------- */

function validateProfile(kb: KnowledgeBase): { count: number; issues: ValidationIssue[] } {
  const p = kb.profile;
  const issues: ValidationIssue[] = [];
  const required: Array<keyof typeof p> = [
    "fullName",
    "headline",
    "currentStatus",
    "careerObjective",
    "location",
    "availability",
    "professionalSummary",
  ];
  for (const f of required) {
    if (!isNonEmptyString(p[f] as unknown)) {
      issues.push({ severity: "warn", field: String(f), message: `Missing "${String(f)}"` });
    }
  }
  if (p.targetRoles?.length) {
    p.targetRoles.forEach((role, i) => {
      if (!TARGET_ROLES.has(role.toLowerCase().trim())) {
        issues.push({
          severity: "warn",
          field: `targetRoles[${i}]`,
          message: `Off-target role "${role}"`,
        });
      }
    });
  }
  return { count: 1, issues };
}

function validateSkills(kb: KnowledgeBase) {
  const items = kb.skills.skills;
  const issues: ValidationIssue[] = [];
  items.forEach((s, i) => {
    if (!isNonEmptyString(s.name)) {
      issues.push({ severity: "error", recordIndex: i, field: "name", message: "Missing skill name" });
    }
    if (!isNonEmptyString(s.category)) {
      issues.push({
        severity: "warn",
        recordIndex: i,
        recordLabel: s.name,
        field: "category",
        message: "Missing category",
      });
    } else if (!KNOWN_SKILL_CATEGORIES.has(s.category.toLowerCase().trim())) {
      issues.push({
        severity: "warn",
        recordIndex: i,
        recordLabel: s.name,
        field: "category",
        message: `Unknown category "${s.category}"`,
      });
    }
  });
  for (const dup of seenDuplicate(items, (s) => s.name)) {
    issues.push({
      severity: "warn",
      recordIndex: dup,
      recordLabel: items[dup].name,
      message: "Duplicate skill entry",
    });
  }
  return { count: items.length, issues };
}

function validateProjects(kb: KnowledgeBase) {
  const items = kb.projects.projects;
  const issues: ValidationIssue[] = [];
  items.forEach((p, i) => {
    if (!isNonEmptyString(p.title)) {
      issues.push({ severity: "error", recordIndex: i, field: "title", message: "Missing project title" });
    }
    if (!isNonEmptyString(p.description)) {
      issues.push({
        severity: "warn",
        recordIndex: i,
        recordLabel: p.title,
        field: "description",
        message: "Missing description",
      });
    }
    if (!p.technologies?.length) {
      issues.push({
        severity: "warn",
        recordIndex: i,
        recordLabel: p.title,
        field: "technologies",
        message: "No technologies listed",
      });
    }
    if (p.github && !isValidUrl(p.github)) {
      issues.push({
        severity: "warn",
        recordIndex: i,
        recordLabel: p.title,
        field: "github",
        message: "Invalid GitHub URL",
      });
    }
    if (!p.github) {
      issues.push({
        severity: "warn",
        recordIndex: i,
        recordLabel: p.title,
        field: "github",
        message: "Missing GitHub link",
      });
    }
    if (p.demo && !isValidUrl(p.demo)) {
      issues.push({
        severity: "warn",
        recordIndex: i,
        recordLabel: p.title,
        field: "demo",
        message: "Invalid demo URL",
      });
    }
  });
  for (const dup of seenDuplicate(items, (p) => p.title)) {
    issues.push({
      severity: "warn",
      recordIndex: dup,
      recordLabel: items[dup].title,
      message: "Duplicate project title",
    });
  }
  return { count: items.length, issues };
}

function validateExperience(kb: KnowledgeBase) {
  const items = kb.experience.experience;
  const issues: ValidationIssue[] = [];
  items.forEach((e, i) => {
    if (!isNonEmptyString(e.company))
      issues.push({ severity: "error", recordIndex: i, field: "company", message: "Missing company" });
    if (!isNonEmptyString(e.role))
      issues.push({ severity: "warn", recordIndex: i, field: "role", message: "Missing role" });
    if (!isNonEmptyString(e.duration))
      issues.push({ severity: "warn", recordIndex: i, field: "duration", message: "Missing duration" });
  });
  return { count: items.length, issues };
}

function validateEducation(kb: KnowledgeBase) {
  const items = kb.education.education;
  const issues: ValidationIssue[] = [];
  items.forEach((e, i) => {
    if (!isNonEmptyString(e.degree))
      issues.push({ severity: "error", recordIndex: i, field: "degree", message: "Missing degree" });
    if (!isNonEmptyString(e.university))
      issues.push({
        severity: "warn",
        recordIndex: i,
        recordLabel: e.degree,
        field: "university",
        message: "Missing university",
      });
    if (!isNonEmptyString(e.graduationYear))
      issues.push({
        severity: "warn",
        recordIndex: i,
        recordLabel: e.degree,
        field: "graduationYear",
        message: "Missing graduation year",
      });
  });
  return { count: items.length, issues };
}

function validateCertifications(kb: KnowledgeBase) {
  const items = kb.certifications.certifications;
  const issues: ValidationIssue[] = [];
  items.forEach((c, i) => {
    if (!isNonEmptyString(c.name))
      issues.push({ severity: "error", recordIndex: i, field: "name", message: "Missing certification name" });
    if (!isNonEmptyString(c.organization))
      issues.push({
        severity: "warn",
        recordIndex: i,
        recordLabel: c.name,
        field: "organization",
        message: "Missing issuing organization",
      });
    if (c.verification && !isValidUrl(c.verification))
      issues.push({
        severity: "warn",
        recordIndex: i,
        recordLabel: c.name,
        field: "verification",
        message: "Invalid verification URL",
      });
  });
  for (const dup of seenDuplicate(items, (c) => `${c.name}|${c.organization}`)) {
    issues.push({
      severity: "warn",
      recordIndex: dup,
      recordLabel: items[dup].name,
      message: "Duplicate certification",
    });
  }
  return { count: items.length, issues };
}

function validateContact(kb: KnowledgeBase) {
  const c = kb.contact;
  const issues: ValidationIssue[] = [];
  if (!isNonEmptyString(c.email) && !isNonEmptyString(c.linkedin)) {
    issues.push({
      severity: "warn",
      message: "No verified email or LinkedIn — recruiters cannot contact",
    });
  }
  if (c.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) {
    issues.push({ severity: "warn", field: "email", message: "Email format looks invalid" });
  }
  if (c.linkedin && !isValidUrl(c.linkedin))
    issues.push({ severity: "warn", field: "linkedin", message: "Invalid LinkedIn URL" });
  if (c.github && !isValidUrl(c.github))
    issues.push({ severity: "warn", field: "github", message: "Invalid GitHub URL" });
  return { count: 1, issues };
}

function validateSocial(kb: KnowledgeBase) {
  const items = kb.social.links;
  const issues: ValidationIssue[] = [];
  items.forEach((l, i) => {
    if (!isNonEmptyString(l.platform))
      issues.push({ severity: "warn", recordIndex: i, field: "platform", message: "Missing platform" });
    if (!isValidUrl(l.url))
      issues.push({
        severity: "warn",
        recordIndex: i,
        recordLabel: l.platform,
        field: "url",
        message: "Invalid or missing URL",
      });
  });
  for (const dup of seenDuplicate(items, (l) => l.platform)) {
    issues.push({
      severity: "warn",
      recordIndex: dup,
      recordLabel: items[dup].platform,
      message: "Duplicate social platform",
    });
  }
  return { count: items.length, issues };
}

function validateResume(kb: KnowledgeBase) {
  const r = kb.resume;
  const issues: ValidationIssue[] = [];
  if (!isNonEmptyString(r.url)) {
    issues.push({ severity: "warn", field: "url", message: "Missing resume URL" });
  } else if (!isValidUrl(r.url) && !r.url.startsWith("/")) {
    issues.push({ severity: "warn", field: "url", message: "Resume URL looks invalid" });
  }
  if (!isNonEmptyString(r.updated))
    issues.push({ severity: "warn", field: "updated", message: "Missing last updated date" });
  return { count: r.url ? 1 : 0, issues };
}

function validateRoles(kb: KnowledgeBase) {
  const items = kb.roles.roles;
  const issues: ValidationIssue[] = [];
  items.forEach((r, i) => {
    if (!isNonEmptyString(r.title)) {
      issues.push({ severity: "error", recordIndex: i, field: "title", message: "Missing role title" });
      return;
    }
    if (!TARGET_ROLES.has(r.title.toLowerCase().trim())) {
      issues.push({
        severity: "warn",
        recordIndex: i,
        recordLabel: r.title,
        message: `Off-target role "${r.title}" (allowed: Data Analyst, MIS Executive)`,
      });
    }
    if (!r.supportedBy?.length)
      issues.push({
        severity: "warn",
        recordIndex: i,
        recordLabel: r.title,
        field: "supportedBy",
        message: "No supporting evidence listed",
      });
  });
  return { count: items.length, issues };
}

function validateFaq(kb: KnowledgeBase) {
  const items = kb.faq.faqs;
  const issues: ValidationIssue[] = [];
  items.forEach((f, i) => {
    if (!isNonEmptyString(f.q))
      issues.push({ severity: "warn", recordIndex: i, field: "q", message: "Missing question" });
    if (!isNonEmptyString(f.a))
      issues.push({ severity: "warn", recordIndex: i, field: "a", message: "Missing answer" });
  });
  for (const dup of seenDuplicate(items, (f) => f.q)) {
    issues.push({
      severity: "warn",
      recordIndex: dup,
      recordLabel: items[dup].q,
      message: "Duplicate FAQ question",
    });
  }
  return { count: items.length, issues };
}

function validateInterview(kb: KnowledgeBase) {
  const items = kb.interview.interviews;
  const issues: ValidationIssue[] = [];
  items.forEach((n, i) => {
    if (!isNonEmptyString(n.projectTitle))
      issues.push({
        severity: "warn",
        recordIndex: i,
        field: "projectTitle",
        message: "Missing project title",
      });
  });
  return { count: items.length, issues };
}

/* --------------------------------- Public API ------------------------------- */

type Validator = (kb: KnowledgeBase) => { count: number; issues: ValidationIssue[] };

const VALIDATORS: Record<KnowledgeCategory, Validator> = {
  profile: validateProfile,
  skills: validateSkills,
  projects: validateProjects,
  experience: validateExperience,
  education: validateEducation,
  certifications: validateCertifications,
  contact: validateContact,
  social: validateSocial,
  resume: validateResume,
  roles: validateRoles,
  faq: validateFaq,
  interview: validateInterview,
};

export const KnowledgeValidator = {
  categories(): KnowledgeCategory[] {
    return Object.keys(VALIDATORS) as KnowledgeCategory[];
  },
  validateCategory(kb: KnowledgeBase, category: KnowledgeCategory): CategoryReport {
    const { count, issues } = VALIDATORS[category](kb);
    return {
      category,
      recordCount: count,
      issues,
      healthScore: scoreFor(count, issues),
      status: pickWorst(issues),
    };
  },
  validateAll(kb: KnowledgeBase): CategoryReport[] {
    return this.categories().map((c) => this.validateCategory(kb, c));
  },
};
