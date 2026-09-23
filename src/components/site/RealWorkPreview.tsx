import { motion } from "motion/react";
import { Database, Gauge, GitBranch, LineChart } from "lucide-react";
import { Section } from "./Section";
import { inView, revealScale, revealUp, stagger } from "@/lib/motion";

const signals = [
  { label: "Source", value: "Operational data", icon: Database },
  { label: "Process", value: "Validate + reconcile", icon: GitBranch },
  { label: "Measure", value: "KPI logic", icon: Gauge },
  { label: "Output", value: "Decision-ready report", icon: LineChart },
];

export function RealWorkPreview() {
  return (
    <Section
      id="work-preview"
      eyebrow="04 / Analytical workspace"
      title="Real work preview"
      description="A recruiter-level view of the reporting systems, data flows and repositories behind the portfolio."
    >
      <motion.div
        variants={revealScale}
        className="work-preview relative overflow-hidden border border-border bg-surface"
      >
        <div className="control-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 font-mono text-[9px] uppercase tracking-[0.14em]">
          <span className="text-primary">Analytics workspace</span>
          <span className="text-success">Report ready</span>
        </div>
        <motion.div
          variants={stagger(0.08, 0.08)}
          className="relative grid md:grid-cols-2 xl:grid-cols-4"
        >
          {signals.map(({ label, value, icon: Icon }, index) => (
            <motion.div
              key={label}
              variants={revealUp}
              className="border-b border-border p-5 xl:border-r"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase text-muted-foreground">
                  0{index + 1} / {label}
                </span>
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <p className="mt-7 font-display text-lg font-bold uppercase">{value}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="relative grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Repository proof", "Seven project repositories linked directly to source work."],
            ["Scale proof", "50K+ sales records, 7K+ customer records and 15+ KPIs."],
            ["Process proof", "Cleaning, validation, reconciliation and reporting workflows."],
            ["Role proof", "Analytics, MIS, KPI reporting and dashboard development."],
          ].map(([label, value], index) => (
            <div key={label} className="bg-background p-5">
              <p className="font-mono text-[8px] uppercase tracking-[.14em] text-primary">
                Evidence / {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
