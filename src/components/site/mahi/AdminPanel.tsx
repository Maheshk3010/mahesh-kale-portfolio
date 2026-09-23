import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileJson,
  Loader2,
  RefreshCw,
  Search,
  Shield,
  Upload,
  X,
} from "lucide-react";
import {
  disableAdmin,
  KnowledgeCenter,
  type CategoryReport,
  type ImportValidationResult,
  type KnowledgeCategory,
  type KnowledgeHealthReport,
  type SearchHit,
  type ValidationSeverity,
} from "@/mahi/admin";

type Tab = "overview" | "categories" | "search" | "data" | "io";

const CATEGORY_LABELS: Record<KnowledgeCategory, string> = {
  profile: "Profile",
  skills: "Skills",
  projects: "Projects",
  experience: "Experience",
  education: "Education",
  certifications: "Certifications",
  contact: "Contact",
  social: "Social",
  resume: "Resume",
  roles: "Roles",
  faq: "FAQ",
  interview: "Interview",
};

function StatusDot({ status }: { status: ValidationSeverity }) {
  const cls =
    status === "error" ? "bg-red-400" : status === "warn" ? "bg-amber-400" : "bg-emerald-400";
  return <span className={`inline-block h-2 w-2 rounded-full ${cls}`} />;
}

function StatusIcon({ status }: { status: ValidationSeverity }) {
  if (status === "ok") return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />;
  return <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />;
}

function HealthBar({ score }: { score: number }) {
  const color = score >= 90 ? "bg-emerald-400" : score >= 70 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`h-full ${color}`}
      />
    </div>
  );
}

export function AdminPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [health, setHealth] = useState<KnowledgeHealthReport>(() => KnowledgeCenter.health());
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory>("profile");
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [importText, setImportText] = useState("");
  const [importResult, setImportResult] = useState<ImportValidationResult | null>(null);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return KnowledgeCenter.subscribe(() => setHealth(KnowledgeCenter.health()));
  }, []);

  useEffect(() => {
    setHits(query.trim() ? KnowledgeCenter.search(query) : []);
  }, [query]);

  const selectedReport = useMemo<CategoryReport | undefined>(
    () => health.perCategory.find((r) => r.category === selectedCategory),
    [health, selectedCategory],
  );
  const selectedData = useMemo(
    () => KnowledgeCenter.categoryData(selectedCategory),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCategory, health],
  );

  const handleFile = async (file: File) => {
    const text = await file.text();
    setImportText(text);
    setImportResult(KnowledgeCenter.importJson(text));
  };

  const runImport = () => {
    setImporting(true);
    try {
      setImportResult(KnowledgeCenter.importJson(importText));
    } finally {
      setImporting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="MAHI.AI Knowledge Center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.22 }}
        className="relative flex h-[min(88vh,780px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1c]/95 shadow-[0_30px_80px_-20px_rgba(6,182,212,0.35)]"
      >
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-3.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
            <Shield className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-foreground">MAHI.AI Knowledge Center</h2>
            <p className="text-[11px] text-muted-foreground">
              Verified data maintenance · Admin mode · Local-only
            </p>
          </div>
          <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-foreground/80 sm:inline-flex">
            <StatusDot status={health.overallScore >= 90 ? "ok" : "warn"} />
            Health: <span className="font-semibold">{health.overallScore}%</span>
          </div>
          <button
            type="button"
            onClick={() => {
              disableAdmin();
              onClose();
            }}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-foreground/80 transition-colors hover:border-red-400/40 hover:text-red-300"
            title="Disable admin mode on this device"
          >
            Lock
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-muted-foreground hover:bg-white/10 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Tabs */}
        <nav className="flex shrink-0 items-center gap-1 border-b border-white/10 bg-white/[0.02] px-3 py-2 text-[12px]">
          {(
            [
              ["overview", "Overview"],
              ["categories", "Categories"],
              ["search", "Search"],
              ["data", "Data"],
              ["io", "Import / Export"],
            ] as Array<[Tab, string]>
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
                tab === id
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
          <div className="ml-auto">
            <button
              type="button"
              onClick={() => setHealth(KnowledgeCenter.health())}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-foreground/80 hover:border-primary/40 hover:text-primary"
            >
              <RefreshCw className="h-3 w-3" /> Re-check
            </button>
          </div>
        </nav>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {tab === "overview" && (
            <OverviewTab
              health={health}
              onOpenCategory={(c) => {
                setSelectedCategory(c);
                setTab("categories");
              }}
            />
          )}
          {tab === "categories" && (
            <CategoriesTab
              health={health}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              report={selectedReport}
            />
          )}
          {tab === "search" && (
            <SearchTab
              query={query}
              onQueryChange={setQuery}
              hits={hits}
              onOpenCategory={(c) => {
                setSelectedCategory(c);
                setTab("categories");
              }}
            />
          )}
          {tab === "data" && (
            <DataTab
              category={selectedCategory}
              onSelect={setSelectedCategory}
              data={selectedData}
            />
          )}
          {tab === "io" && (
            <IoTab
              importText={importText}
              setImportText={setImportText}
              importResult={importResult}
              runImport={runImport}
              importing={importing}
              fileRef={fileRef}
              handleFile={handleFile}
              onReset={() => {
                KnowledgeCenter.reset();
                setImportResult(null);
                setImportText("");
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------- Overview -------------------------------- */

function OverviewTab({
  health,
  onOpenCategory,
}: {
  health: KnowledgeHealthReport;
  onOpenCategory: (c: KnowledgeCategory) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Overall Health" value={`${health.overallScore}%`} accent />
        <StatCard label="Warnings" value={String(health.totalWarnings)} />
        <StatCard label="Errors" value={String(health.totalErrors)} />
      </div>

      <section className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <h3 className="mb-3 text-[13px] font-semibold text-foreground">Knowledge Health</h3>
        <div className="space-y-2.5">
          {health.perCategory.map((r) => (
            <button
              key={r.category}
              type="button"
              onClick={() => onOpenCategory(r.category)}
              className="group flex w-full items-center gap-3 rounded-lg border border-transparent px-2 py-1.5 text-left transition-colors hover:border-white/10 hover:bg-white/[0.03]"
            >
              <StatusIcon status={r.status} />
              <span className="w-32 shrink-0 text-[12px] font-medium text-foreground/90 group-hover:text-primary">
                {CATEGORY_LABELS[r.category]}
              </span>
              <span className="w-16 shrink-0 text-[11px] tabular-nums text-muted-foreground">
                {r.recordCount} rec
              </span>
              <div className="flex-1">
                <HealthBar score={r.healthScore} />
              </div>
              <span className="w-10 shrink-0 text-right text-[11px] tabular-nums text-foreground/80">
                {r.healthScore}%
              </span>
            </button>
          ))}
        </div>
      </section>

      <p className="text-[11px] text-muted-foreground">
        Report generated {new Date(health.generatedAt).toLocaleString()}.
      </p>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        accent ? "border-primary/30 bg-primary/10" : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p
        className={`mt-1 text-2xl font-semibold tabular-nums ${
          accent ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* ------------------------------- Categories ------------------------------- */

function CategoriesTab({
  health,
  selected,
  onSelect,
  report,
}: {
  health: KnowledgeHealthReport;
  selected: KnowledgeCategory;
  onSelect: (c: KnowledgeCategory) => void;
  report?: CategoryReport;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
      <aside className="space-y-1">
        {health.perCategory.map((r) => (
          <button
            key={r.category}
            type="button"
            onClick={() => onSelect(r.category)}
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] transition-colors ${
              selected === r.category
                ? "bg-primary/15 text-primary"
                : "text-foreground/85 hover:bg-white/5"
            }`}
          >
            <StatusDot status={r.status} />
            <span className="flex-1 truncate">{CATEGORY_LABELS[r.category]}</span>
            <span className="text-[10px] tabular-nums text-muted-foreground">{r.recordCount}</span>
          </button>
        ))}
      </aside>

      <section className="min-w-0 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        {report ? (
          <>
            <div className="mb-4 flex items-center gap-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {CATEGORY_LABELS[report.category]}
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  {report.recordCount} record{report.recordCount === 1 ? "" : "s"} ·{" "}
                  {report.issues.length} issue{report.issues.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground">Health</span>
                <span className="text-sm font-semibold tabular-nums text-foreground">
                  {report.healthScore}%
                </span>
              </div>
            </div>

            {report.issues.length === 0 ? (
              <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2.5 text-[12px] text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                All records valid. No issues detected.
              </div>
            ) : (
              <ul className="space-y-1.5">
                {report.issues.map((issue, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-[12px]"
                  >
                    <StatusIcon status={issue.severity} />
                    <div className="min-w-0 flex-1">
                      <p className="text-foreground/90">{issue.message}</p>
                      <p className="mt-0.5 text-[10.5px] text-muted-foreground">
                        {issue.recordLabel
                          ? `${issue.recordLabel}${issue.field ? ` · ${issue.field}` : ""}`
                          : issue.field
                            ? issue.field
                            : "category-level"}
                        {typeof issue.recordIndex === "number" ? ` · #${issue.recordIndex}` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="text-[12px] text-muted-foreground">Select a category.</p>
        )}
      </section>
    </div>
  );
}

/* --------------------------------- Search --------------------------------- */

function SearchTab({
  query,
  onQueryChange,
  hits,
  onOpenCategory,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  hits: SearchHit[];
  onOpenCategory: (c: KnowledgeCategory) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search Python, SQL, Power BI, Flask, Recommendation…"
          maxLength={120}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
        />
      </div>

      {!query.trim() ? (
        <div className="flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
          Try:
          {["Python", "SQL", "Power BI", "Flask", "Recommendation System"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onQueryChange(s)}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-foreground/85 hover:border-primary/40 hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      ) : hits.length === 0 ? (
        <p className="text-[12px] text-muted-foreground">
          No matches in the verified knowledge base.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {hits.map((h, i) => (
            <li
              key={`${h.category}-${h.recordIndex}-${i}`}
              className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2"
            >
              <div className="flex items-center gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => onOpenCategory(h.category)}
                  className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-primary hover:bg-primary/20"
                >
                  {CATEGORY_LABELS[h.category]}
                </button>
                <span className="truncate text-foreground/90">{h.label}</span>
                <span className="ml-auto text-muted-foreground">{h.matchedField}</span>
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-foreground/80">{h.snippet}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------------------------------- Data ---------------------------------- */

function DataTab({
  category,
  onSelect,
  data,
}: {
  category: KnowledgeCategory;
  onSelect: (c: KnowledgeCategory) => void;
  data: unknown;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(CATEGORY_LABELS) as KnowledgeCategory[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onSelect(c)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
              category === c
                ? "bg-primary/20 text-primary"
                : "border border-white/10 bg-white/[0.04] text-foreground/80 hover:border-primary/40"
            }`}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      <pre className="max-h-[520px] overflow-auto rounded-xl border border-white/10 bg-black/40 p-4 text-[11.5px] leading-relaxed text-foreground/85">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
}

/* --------------------------------- Import --------------------------------- */

function IoTab({
  importText,
  setImportText,
  importResult,
  runImport,
  importing,
  fileRef,
  handleFile,
  onReset,
}: {
  importText: string;
  setImportText: (v: string) => void;
  importResult: ImportValidationResult | null;
  runImport: () => void;
  importing: boolean;
  fileRef: React.MutableRefObject<HTMLInputElement | null>;
  handleFile: (f: File) => Promise<void>;
  onReset: () => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <h3 className="mb-1 flex items-center gap-2 text-[13px] font-semibold text-foreground">
          <Download className="h-4 w-4 text-primary" /> Export
        </h3>
        <p className="mb-3 text-[11.5px] text-muted-foreground">
          Download the complete verified knowledge base as formatted JSON.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => KnowledgeCenter.downloadJson()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/15 px-2.5 py-1.5 text-[11px] font-medium text-primary hover:bg-primary/25"
          >
            <FileJson className="h-3 w-3" /> Download JSON
          </button>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(KnowledgeCenter.exportJson());
              } catch {
                /* ignore */
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-foreground/85 hover:border-primary/40 hover:text-primary"
          >
            Copy to Clipboard
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <h3 className="mb-1 flex items-center gap-2 text-[13px] font-semibold text-foreground">
          <Upload className="h-4 w-4 text-primary" /> Import
        </h3>
        <p className="mb-3 text-[11.5px] text-muted-foreground">
          Validated in-browser. Invalid structures are rejected. Import applies to the current
          session only.
        </p>
        <div className="mb-2 flex flex-wrap gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-foreground/85 hover:border-primary/40 hover:text-primary"
          >
            Choose file…
          </button>
          <button
            type="button"
            onClick={runImport}
            disabled={!importText.trim() || importing}
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/15 px-2.5 py-1.5 text-[11px] font-medium text-primary hover:bg-primary/25 disabled:opacity-50"
          >
            {importing ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Upload className="h-3 w-3" />
            )}
            Validate & Import
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-foreground/70 hover:border-red-400/40 hover:text-red-300"
          >
            Reset to bundled
          </button>
        </div>
        <textarea
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder="Paste JSON here…"
          spellCheck={false}
          className="h-40 w-full resize-none rounded-lg border border-white/10 bg-black/40 p-2.5 font-mono text-[11px] text-foreground/90 placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
        />

        <AnimatePresence>
          {importResult && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-3 rounded-lg border p-2.5 text-[11.5px] ${
                importResult.valid
                  ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-200"
                  : "border-red-500/30 bg-red-500/5 text-red-200"
              }`}
            >
              <p className="mb-1 font-semibold">
                {importResult.valid ? "Imported for this session" : "Import rejected"}
              </p>
              {importResult.issues.length === 0 ? (
                <p className="text-foreground/70">No issues.</p>
              ) : (
                <ul className="max-h-40 space-y-0.5 overflow-y-auto">
                  {importResult.issues.map((i, idx) => (
                    <li key={idx} className="text-[11px]">
                      <span className={i.severity === "error" ? "text-red-300" : "text-amber-300"}>
                        {i.severity === "error" ? "✗" : "⚠"}
                      </span>{" "}
                      <span className="text-foreground/80">{i.message}</span>
                      {i.field && <span className="text-muted-foreground"> · {i.field}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
