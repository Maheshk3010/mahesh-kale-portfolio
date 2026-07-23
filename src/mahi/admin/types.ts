// Knowledge Center types. Independent from ChatEngine.
// Designed so future data sources (resume parser, GitHub sync, LinkedIn sync,
// OpenAI, RAG) can produce/consume the same shapes without schema changes.

import type { KnowledgeBase } from "../types";

export type KnowledgeCategory =
  | "profile"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "certifications"
  | "contact"
  | "social"
  | "resume"
  | "roles"
  | "faq"
  | "interview";

export type ValidationSeverity = "ok" | "warn" | "error";

export interface ValidationIssue {
  severity: ValidationSeverity;
  field?: string;
  message: string;
  recordIndex?: number;
  recordLabel?: string;
}

export interface CategoryReport {
  category: KnowledgeCategory;
  recordCount: number;
  lastModified?: string;
  issues: ValidationIssue[];
  healthScore: number; // 0..100
  status: ValidationSeverity;
}

export interface KnowledgeHealthReport {
  perCategory: CategoryReport[];
  overallScore: number; // 0..100
  totalIssues: number;
  totalWarnings: number;
  totalErrors: number;
  generatedAt: string;
}

export interface SearchHit {
  category: KnowledgeCategory;
  recordIndex: number;
  label: string;
  snippet: string;
  matchedField: string;
  score: number;
}

export interface ImportValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
  data?: KnowledgeBase;
}

export interface ExportPayload {
  version: string;
  exportedAt: string;
  knowledge: KnowledgeBase;
}
