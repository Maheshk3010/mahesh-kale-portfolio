import { motion } from "motion/react";
import { BarChart3, Database, FileCheck2, LineChart } from "lucide-react";
import { CountUp } from "./CountUp";
import { inView, revealUp, stagger } from "@/lib/motion";

const evidence = [
  { label: "Data", value: 50, suffix: "K+", detail: "retail records", icon: Database },
  {
    label: "Customer analytics",
    value: 7,
    suffix: "K+",
    detail: "customer records",
    icon: LineChart,
  },
  { label: "SQL analysis", value: 30, suffix: "+", detail: "business queries", icon: FileCheck2 },
  { label: "Experience", value: 3, suffix: "", detail: "internships", icon: BarChart3 },
];

const modes = ["Analyze", "Validate", "Report", "Visualize"];

export function AnalyticsSnapshot() {
  return (
    <section
      id="proof"
      aria-labelledby="proof-title"
      className="snapshot-section relative border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-14">
        <div className="mb-7 flex items-end justify-between gap-6 border-b border-border pb-4">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[.2em] text-primary">
              02 / Analytics snapshot
            </p>
            <h2
              id="proof-title"
              className="mt-2 font-display text-2xl font-bold uppercase sm:text-3xl"
            >
              Evidence at a glance
            </h2>
          </div>
          <span className="hidden font-mono text-[9px] uppercase tracking-[.14em] text-success sm:block">
            Documented portfolio scale
          </span>
        </div>

        <motion.div
          variants={stagger(0.05, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="snapshot-grid grid border-x border-t border-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {evidence.map(({ label, value, suffix, detail, icon: Icon }, index) => (
            <motion.article
              key={label}
              variants={revealUp}
              className="snapshot-cell relative border-b border-border p-5 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[.16em] text-muted-foreground">
                  0{index + 1} / {label}
                </span>
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <div className="mt-8 font-display text-5xl font-bold leading-none text-foreground sm:text-6xl">
                <CountUp value={value} suffix={suffix} />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[.14em] text-primary">
                {detail}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 border-x border-b border-border sm:grid-cols-4">
          {modes.map((mode, index) => (
            <div
              key={mode}
              className="snapshot-mode flex items-center gap-3 border-r border-border px-4 py-3 last:border-r-0"
            >
              <span className="h-1.5 w-1.5 bg-primary" />
              <span className="font-mono text-[8px] font-bold uppercase tracking-[.16em]">
                {mode}
              </span>
              <span className="ml-auto font-mono text-[8px] text-muted-foreground">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
