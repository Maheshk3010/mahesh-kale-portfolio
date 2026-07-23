// Analytics events + interfaces. Provider-agnostic: works with the local
// ChatEngine today and with any future OpenAI/RAG backend that emits the
// same ChatEngineResponse shape.

import type { Intent } from "../types";

export type AnalyticsActionType =
  | "resume_view"
  | "resume_download"
  | "github_open"
  | "github_view_projects"
  | "linkedin_open"
  | "email_click"
  | "phone_click"
  | "copy_email"
  | "copy_phone"
  | "quick_question"
  | "voice_input"
  | "navigate_section";

export type AnalyticsEvent =
  | { type: "question_asked"; question: string; at: number }
  | { type: "topic_viewed"; intent: Intent; verified: boolean; at: number }
  | { type: "skill_viewed"; name: string; at: number }
  | { type: "project_viewed"; title: string; at: number }
  | { type: "role_requested"; title: string; at: number }
  | { type: "certification_viewed"; name: string; at: number }
  | { type: "action_performed"; action: AnalyticsActionType; label?: string; at: number };

export interface AnalyticsCounts {
  questions: number;
  topics: Partial<Record<Intent, number>>;
  skills: Record<string, number>;
  projects: Record<string, number>;
  roles: Record<string, number>;
  certifications: Record<string, number>;
  actions: Partial<Record<AnalyticsActionType, number>>;
  questionsAskedLog: string[];
}

export interface AnalyticsSnapshot {
  counts: AnalyticsCounts;
  startedAt: number;
  updatedAt: number;
}

export type AnalyticsListener = (snapshot: AnalyticsSnapshot) => void;
