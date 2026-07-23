// KnowledgeImporter — validates JSON before accepting.
// Import here means "verified for use"; it does not persist to disk.
// A future backend can wire this into an actual writable store.

import type { KnowledgeBase } from "../types";
import { KnowledgeValidator } from "./validator";
import type { ImportValidationResult, ValidationIssue } from "./types";

const REQUIRED_CATEGORIES = [
  "profile",
  "skills",
  "projects",
  "experience",
  "education",
  "certifications",
  "contact",
  "social",
  "resume",
  "roles",
  "faq",
  "interview",
] as const;

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function hasArrayProperty(obj: Record<string, unknown>, key: string): boolean {
  const v = obj[key];
  return Array.isArray(v);
}

function extractKnowledge(raw: unknown): unknown {
  if (!isObject(raw)) return null;
  if (isObject(raw.knowledge)) return raw.knowledge; // ExportPayload shape
  return raw;
}

export const KnowledgeImporter = {
  parse(input: string | unknown): ImportValidationResult {
    const issues: ValidationIssue[] = [];
    let raw: unknown = input;
    if (typeof input === "string") {
      try {
        raw = JSON.parse(input);
      } catch (e) {
        return {
          valid: false,
          issues: [
            {
              severity: "error",
              message: `Invalid JSON: ${(e as Error).message}`,
            },
          ],
        };
      }
    }

    const kb = extractKnowledge(raw);
    if (!isObject(kb)) {
      return {
        valid: false,
        issues: [{ severity: "error", message: "Payload is not a JSON object." }],
      };
    }

    // Structural checks
    for (const key of REQUIRED_CATEGORIES) {
      if (!(key in kb)) {
        issues.push({ severity: "error", field: key, message: `Missing "${key}" section` });
      }
    }
    if (issues.some((i) => i.severity === "error")) {
      return { valid: false, issues };
    }

    // Array-shaped sections
    const arrayChecks: Array<[string, string]> = [
      ["skills", "skills"],
      ["projects", "projects"],
      ["experience", "experience"],
      ["education", "education"],
      ["certifications", "certifications"],
      ["roles", "roles"],
      ["faq", "faqs"],
      ["interview", "interviews"],
      ["social", "links"],
    ];
    for (const [section, arrKey] of arrayChecks) {
      const s = kb[section];
      if (!isObject(s) || !hasArrayProperty(s, arrKey)) {
        issues.push({
          severity: "error",
          field: `${section}.${arrKey}`,
          message: `"${section}" must contain array "${arrKey}"`,
        });
      }
    }
    if (issues.some((i) => i.severity === "error")) {
      return { valid: false, issues };
    }

    const candidate = kb as unknown as KnowledgeBase;
    const reports = KnowledgeValidator.validateAll(candidate);
    for (const r of reports) {
      for (const i of r.issues) {
        if (i.severity === "error") {
          issues.push({ ...i, field: `${r.category}.${i.field ?? ""}`.replace(/\.$/, "") });
        }
      }
    }
    if (issues.some((i) => i.severity === "error")) {
      return { valid: false, issues };
    }

    // Add warnings (non-blocking)
    for (const r of reports) {
      for (const i of r.issues) {
        if (i.severity === "warn") {
          issues.push({ ...i, field: `${r.category}.${i.field ?? ""}`.replace(/\.$/, "") });
        }
      }
    }

    return { valid: true, issues, data: candidate };
  },
};
