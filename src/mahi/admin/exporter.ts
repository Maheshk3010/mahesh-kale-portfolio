// KnowledgeExporter — serializes the verified knowledge base.
// Does NOT modify the schema.

import type { KnowledgeBase } from "../types";
import type { ExportPayload } from "./types";

export const KNOWLEDGE_EXPORT_VERSION = "1.0.0";

export const KnowledgeExporter = {
  toPayload(kb: KnowledgeBase): ExportPayload {
    return {
      version: KNOWLEDGE_EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      knowledge: kb,
    };
  },
  toJson(kb: KnowledgeBase, pretty = true): string {
    return JSON.stringify(this.toPayload(kb), null, pretty ? 2 : 0);
  },
  toBlob(kb: KnowledgeBase): Blob {
    return new Blob([this.toJson(kb)], { type: "application/json" });
  },
  download(kb: KnowledgeBase, filename = "mahi-knowledge.json"): void {
    if (typeof window === "undefined") return;
    const url = URL.createObjectURL(this.toBlob(kb));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },
};
