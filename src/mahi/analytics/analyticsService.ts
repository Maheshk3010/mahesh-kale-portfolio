// AnalyticsService — session-scoped, in-browser only.
//
// Design:
// - Independent of ChatEngine. Producers (widget, cards) call trackXxx().
// - Observers subscribe via subscribe() and receive immutable snapshots.
// - Persisted only in sessionStorage; auto-cleared when the tab closes.
// - No external requests, no cookies, no fingerprinting.

import { knowledgeBase } from "../knowledgeBase";
import type {
  AnalyticsActionType,
  AnalyticsCounts,
  AnalyticsEvent,
  AnalyticsListener,
  AnalyticsSnapshot,
} from "./types";
import type { ChatEngineResponse, Intent } from "../types";

const STORAGE_KEY = "mahi:analytics:v1";
const MAX_QUESTIONS_LOG = 50;

function emptyCounts(): AnalyticsCounts {
  return {
    questions: 0,
    topics: {},
    skills: {},
    projects: {},
    roles: {},
    certifications: {},
    actions: {},
    questionsAskedLog: [],
  };
}

function loadInitial(): AnalyticsSnapshot {
  const fallback: AnalyticsSnapshot = {
    counts: emptyCounts(),
    startedAt: Date.now(),
    updatedAt: Date.now(),
  };
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as AnalyticsSnapshot;
    if (!parsed?.counts) return fallback;
    return {
      startedAt: parsed.startedAt ?? Date.now(),
      updatedAt: parsed.updatedAt ?? Date.now(),
      counts: { ...emptyCounts(), ...parsed.counts },
    };
  } catch {
    return fallback;
  }
}

export class AnalyticsService {
  private snapshot: AnalyticsSnapshot;
  private listeners = new Set<AnalyticsListener>();
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.snapshot = loadInitial();
  }

  /* ------------------------------ Subscription ------------------------------ */

  subscribe(fn: AnalyticsListener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  getSnapshot = (): AnalyticsSnapshot => this.snapshot;
  getServerSnapshot = (): AnalyticsSnapshot => this.snapshot;

  private commit(next: Partial<AnalyticsCounts>) {
    this.snapshot = {
      startedAt: this.snapshot.startedAt,
      updatedAt: Date.now(),
      counts: { ...this.snapshot.counts, ...next },
    };
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.snapshot));
    } catch {
      /* ignore quota / privacy modes */
    }
    for (const l of this.listeners) l(this.snapshot);
  }

  private inc<K extends string>(bag: Record<K, number>, key: K, by = 1): Record<K, number> {
    return { ...bag, [key]: (bag[key] ?? 0) + by };
  }

  /* --------------------------------- Tracking -------------------------------- */

  trackQuestion(question: string): void {
    const trimmed = question.trim();
    if (!trimmed) return;
    const log = [trimmed, ...this.snapshot.counts.questionsAskedLog].slice(0, MAX_QUESTIONS_LOG);
    this.events.push({ type: "question_asked", question: trimmed, at: Date.now() });
    this.commit({
      questions: this.snapshot.counts.questions + 1,
      questionsAskedLog: log,
    });
    // Skill mining from question text keeps analytics decoupled from the engine.
    this.mineSkillsFromText(trimmed);
  }

  trackResponse(question: string, response: ChatEngineResponse): void {
    this.events.push({
      type: "topic_viewed",
      intent: response.intent,
      verified: response.verified,
      at: Date.now(),
    });
    const nextTopics: AnalyticsCounts["topics"] = {
      ...this.snapshot.counts.topics,
      [response.intent]: (this.snapshot.counts.topics[response.intent] ?? 0) + 1,
    };
    this.commit({ topics: nextTopics });

    // Auto-derive per-intent aggregates without touching the engine.
    switch (response.intent) {
      case "projects":
        this.mineProjectsFromText(question);
        break;
      case "roles":
        for (const role of knowledgeBase.roles.roles) this.trackRoleView(role.title);
        break;
      case "certifications":
        for (const c of knowledgeBase.certifications.certifications)
          this.trackCertificationView(c.name);
        break;
    }
  }

  trackSkillView(name: string): void {
    if (!name) return;
    this.events.push({ type: "skill_viewed", name, at: Date.now() });
    this.commit({ skills: this.inc(this.snapshot.counts.skills, name) });
  }

  trackProjectView(title: string): void {
    if (!title) return;
    this.events.push({ type: "project_viewed", title, at: Date.now() });
    this.commit({ projects: this.inc(this.snapshot.counts.projects, title) });
  }

  trackRoleView(title: string): void {
    if (!title) return;
    this.events.push({ type: "role_requested", title, at: Date.now() });
    this.commit({ roles: this.inc(this.snapshot.counts.roles, title) });
  }

  trackCertificationView(name: string): void {
    if (!name) return;
    this.events.push({ type: "certification_viewed", name, at: Date.now() });
    this.commit({ certifications: this.inc(this.snapshot.counts.certifications, name) });
  }

  trackAction(action: AnalyticsActionType, label?: string): void {
    this.events.push({ type: "action_performed", action, label, at: Date.now() });
    this.commit({ actions: this.inc(this.snapshot.counts.actions, action) });
  }

  reset(): void {
    this.snapshot = {
      counts: emptyCounts(),
      startedAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.events = [];
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
    for (const l of this.listeners) l(this.snapshot);
  }

  /* ----------------------------- Derived helpers ----------------------------- */

  topEntries<T extends Record<string, number>>(
    bag: T,
    limit = 5,
  ): Array<{ key: string; value: number }> {
    return Object.entries(bag)
      .filter(([, v]) => v > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([key, value]) => ({ key, value }));
  }

  buildSessionSummary(): string {
    const c = this.snapshot.counts;
    if (c.questions === 0) {
      return "The recruiter hasn't asked anything yet in this session.";
    }
    const parts: string[] = [];
    const topSkills = this.topEntries(c.skills, 3).map((e) => e.key);
    const topProjects = this.topEntries(c.projects, 3).map((e) => e.key);
    const topRoles = this.topEntries(c.roles, 2).map((e) => e.key);

    if (topSkills.length) parts.push(`explored ${joinList(topSkills)} skills`);
    if (topProjects.length) parts.push(`viewed ${joinList(topProjects)} project${topProjects.length > 1 ? "s" : ""}`);
    if (topRoles.length) parts.push(`considered ${joinList(topRoles)} role${topRoles.length > 1 ? "s" : ""}`);
    if (c.actions.github_open) parts.push("opened GitHub");
    if (c.actions.linkedin_open) parts.push("opened LinkedIn");
    if (c.actions.resume_download) parts.push("downloaded the resume");
    else if (c.actions.resume_view) parts.push("viewed the resume");
    if (c.actions.email_click || c.actions.copy_email) parts.push("captured the email");
    if (c.actions.phone_click || c.actions.copy_phone) parts.push("captured the phone number");

    if (parts.length === 0) {
      const topics = this.topEntries(this.snapshot.counts.topics as Record<string, number>, 3).map(
        (t) => humanIntent(t.key as Intent),
      );
      if (topics.length) parts.push(`browsed ${joinList(topics)}`);
    }

    if (parts.length === 0) {
      return `The recruiter asked ${c.questions} question${c.questions > 1 ? "s" : ""} this session.`;
    }
    return `The recruiter ${joinList(parts)}.`;
  }

  /* ------------------------------ Text miners ------------------------------ */

  private mineSkillsFromText(text: string): void {
    const lower = text.toLowerCase();
    for (const skill of knowledgeBase.skills.skills) {
      if (skill.confidence !== "verified") continue;
      const needle = skill.name.toLowerCase();
      if (needle.length < 2) continue;
      const re = new RegExp(`(^|[^a-z0-9])${escapeRegex(needle)}([^a-z0-9]|$)`, "i");
      if (re.test(lower)) this.trackSkillView(skill.name);
    }
  }

  private mineProjectsFromText(text: string): void {
    const lower = text.toLowerCase();
    const matched = knowledgeBase.projects.projects.filter((p) =>
      lower.includes(p.title.toLowerCase()),
    );
    if (matched.length) {
      for (const p of matched) this.trackProjectView(p.title);
    } else {
      for (const p of knowledgeBase.projects.projects) this.trackProjectView(p.title);
    }
  }
}

/* --------------------------------- helpers -------------------------------- */

function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function joinList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function humanIntent(intent: Intent): string {
  const map: Partial<Record<Intent, string>> = {
    profile: "profile",
    skills: "skills",
    projects: "projects",
    experience: "experience",
    education: "education",
    certifications: "certifications",
    resume: "resume",
    contact: "contact details",
    github: "GitHub",
    linkedin: "LinkedIn",
    roles: "role fit",
    interview: "interview notes",
    general: "overview",
    unknown: "other topics",
  };
  return map[intent] ?? intent;
}

export const analyticsService = new AnalyticsService();
