// KnowledgeHealth — aggregates per-category reports into a single score.

import type { KnowledgeBase } from "../types";
import { KnowledgeValidator } from "./validator";
import type { CategoryReport, KnowledgeHealthReport } from "./types";

export const KnowledgeHealth = {
  compute(kb: KnowledgeBase): KnowledgeHealthReport {
    const perCategory: CategoryReport[] = KnowledgeValidator.validateAll(kb);
    const overallScore = Math.round(
      perCategory.reduce((sum, r) => sum + r.healthScore, 0) / Math.max(perCategory.length, 1),
    );
    let warnings = 0;
    let errors = 0;
    for (const r of perCategory) {
      for (const i of r.issues) {
        if (i.severity === "warn") warnings++;
        else if (i.severity === "error") errors++;
      }
    }
    return {
      perCategory,
      overallScore,
      totalIssues: warnings + errors,
      totalWarnings: warnings,
      totalErrors: errors,
      generatedAt: new Date().toISOString(),
    };
  },
};
