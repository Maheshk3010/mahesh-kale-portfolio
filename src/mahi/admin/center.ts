// KnowledgeCenter — orchestrator that composes validator/health/search/export/import.
// Keeps a runtime overlay of imported knowledge so future backends (RAG, OpenAI,
// resume parser, GitHub/LinkedIn sync) can plug in without touching the schema.

import { knowledgeBase as staticKnowledge } from "../knowledgeBase";
import type { KnowledgeBase } from "../types";
import { KnowledgeValidator } from "./validator";
import { KnowledgeHealth } from "./health";
import { KnowledgeSearch } from "./search";
import { KnowledgeExporter } from "./exporter";
import { KnowledgeImporter } from "./importer";
import type {
  CategoryReport,
  ExportPayload,
  ImportValidationResult,
  KnowledgeCategory,
  KnowledgeHealthReport,
  SearchHit,
} from "./types";

type Listener = (kb: KnowledgeBase) => void;

class KnowledgeCenterImpl {
  private overlay: KnowledgeBase | null = null;
  private listeners = new Set<Listener>();

  get(): KnowledgeBase {
    return this.overlay ?? staticKnowledge;
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit() {
    const snap = this.get();
    for (const l of this.listeners) l(snap);
  }

  reset(): void {
    if (this.overlay) {
      this.overlay = null;
      this.emit();
    }
  }

  categories(): KnowledgeCategory[] {
    return KnowledgeValidator.categories();
  }

  validate(): CategoryReport[] {
    return KnowledgeValidator.validateAll(this.get());
  }

  health(): KnowledgeHealthReport {
    return KnowledgeHealth.compute(this.get());
  }

  search(query: string): SearchHit[] {
    return KnowledgeSearch.search(this.get(), query);
  }

  export(): ExportPayload {
    return KnowledgeExporter.toPayload(this.get());
  }

  exportJson(): string {
    return KnowledgeExporter.toJson(this.get());
  }

  downloadJson(filename?: string): void {
    KnowledgeExporter.download(this.get(), filename);
  }

  importJson(payload: string | unknown): ImportValidationResult {
    const result = KnowledgeImporter.parse(payload);
    if (result.valid && result.data) {
      this.overlay = result.data;
      this.emit();
    }
    return result;
  }

  categoryData(category: KnowledgeCategory): unknown {
    const kb = this.get();
    switch (category) {
      case "profile":
        return kb.profile;
      case "skills":
        return kb.skills.skills;
      case "projects":
        return kb.projects.projects;
      case "experience":
        return kb.experience.experience;
      case "education":
        return kb.education.education;
      case "certifications":
        return kb.certifications.certifications;
      case "contact":
        return kb.contact;
      case "social":
        return kb.social.links;
      case "resume":
        return kb.resume;
      case "roles":
        return kb.roles.roles;
      case "faq":
        return kb.faq.faqs;
      case "interview":
        return kb.interview.interviews;
    }
  }
}

export const KnowledgeCenter = new KnowledgeCenterImpl();
