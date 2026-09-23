import { motion } from "motion/react";
import { useState } from "react";
import { Activity, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./Section";
import { SectionTransition } from "./SectionTransition";
import { misModules } from "@/mahi/portfolio";
import { inView, revealUp, stagger } from "@/lib/motion";

const flow = [
  "Source data",
  "Clean",
  "Validate",
  "Reconcile",
  "KPI engine",
  "Report",
  "Management",
];

const dimensions: Record<string, string[]> = {
  "Daily MIS": ["Volume", "Completed", "Pending", "SLA", "TAT", "Exceptions"],
  "Weekly MIS": [
    "Weekly Volume",
    "Completion",
    "SLA Trend",
    "Productivity",
    "Exceptions",
    "Week-over-Week",
  ],
  "Monthly MIS": ["Target", "Actual", "Achievement", "Variance", "SLA", "Performance"],
  "KPI Engine": ["KPI Definition", "Calculation", "Threshold", "Trend", "Reporting View"],
  "Target vs Actual": ["Target", "Actual", "Variance", "Achievement %"],
  "SLA / TAT": ["SLA Met", "SLA Breached", "Average TAT", "Aging"],
  "Data Reconciliation": ["Source A", "Source B", "Matched", "Mismatched", "Exceptions"],
  "Exception Monitoring": ["Exception Type", "Source", "Priority", "Owner", "Resolution"],
};

export function Dashboard() {
  const [activeModule, setActiveModule] = useState(misModules[0]?.title ?? "Daily MIS");
  const activeDimensions = dimensions[activeModule] ?? [];
  return (
    <>
      <SectionTransition label="Transfer to operations" />
      <Section
        id="mis"
        eyebrow="06 / Live reporting command"
        title="Operations floor"
        description="A controlled reporting chain for recurring MIS, KPI visibility, reconciliation and management review."
        className="operations-scene"
      >
        <div className="operations-console overflow-hidden border-y border-border bg-surface">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-5 py-4 font-mono text-[8px] font-bold uppercase tracking-[.14em] sm:px-7">
            <span className="text-primary">OP_FLOOR / REPORTING CONTROL</span>
            <span className="flex shrink-0 items-center gap-2 text-success">
              <CheckCircle2 className="h-3.5 w-3.5" /> Sync active
            </span>
          </div>
          <div className="mis-console px-5 py-7 sm:px-7">
            <ol className="operations-pipeline" aria-label="MIS operations pipeline">
              {flow.map((label, index) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ delay: index * 0.06 }}
                  className={`operation-node ${index === 2 || index > 4 ? "is-ready" : "is-active"}`}
                >
                  <span className="operation-index">{String(index + 1).padStart(2, "0")}</span>
                  <span>{label}</span>
                  {index < flow.length - 1 && <span className="operation-signal" aria-hidden="true" />}
                </motion.li>
              ))}
            </ol>
          </div>
          <div className="grid lg:grid-cols-[.82fr_1.18fr]">
            <motion.div
              variants={stagger(0.04, 0.04)}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              className="grid grid-cols-2 border-t border-border sm:grid-cols-4 lg:grid-cols-2"
            >
              {misModules.map((module, index) => {
                const active = activeModule === module.title;
                return (
                  <motion.div key={module.title} variants={revealUp}>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setActiveModule(module.title)}
                      aria-pressed={active}
                      className={`mis-selector h-full min-h-24 w-full justify-start border-b border-r border-border px-4 py-4 text-left ${active ? "is-selected" : ""}`}
                    >
                      <span className="min-w-0">
                        <span className="block font-mono text-[8px] text-primary">
                          MODULE / {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-2 block whitespace-normal font-display text-sm font-bold uppercase text-foreground">
                          {module.title}
                        </span>
                      </span>
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>
            <div className="border-t border-border bg-background p-5 sm:p-7 lg:border-l">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-[8px] font-bold uppercase tracking-[.14em] text-success">
                    Active module
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold uppercase sm:text-3xl">
                    {activeModule}
                  </h3>
                </div>
                <Activity className="h-5 w-5 shrink-0 text-success" />
              </div>
              <div className="mt-7 grid grid-cols-2 gap-px bg-border sm:grid-cols-3">
                {activeDimensions.map((dimension, index) => (
                  <motion.div
                    key={`${activeModule}-${dimension}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.035 }}
                    className="min-h-20 bg-panel p-3"
                  >
                    <span className="font-mono text-[8px] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 font-mono text-[9px] font-bold uppercase text-foreground">
                      {dimension}
                    </p>
                  </motion.div>
                ))}
              </div>
              <p className="mt-5 flex items-center gap-2 font-mono text-[8px] uppercase text-attention">
                <AlertTriangle className="h-3.5 w-3.5" /> Exceptions remain visible for review
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
