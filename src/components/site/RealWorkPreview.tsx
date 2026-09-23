import { motion } from "motion/react";
import { ArrowRight, Database, Gauge, GitBranch, LineChart } from "lucide-react";
import { Section } from "./Section";
import { projects } from "@/mahi/portfolio";
import { inView, revealScale, revealUp, stagger } from "@/lib/motion";

const signals = [
  { label: "Source", value: "Operational data", icon: Database },
  { label: "Process", value: "Validate + reconcile", icon: GitBranch },
  { label: "Measure", value: "KPI logic", icon: Gauge },
  { label: "Output", value: "Decision-ready report", icon: LineChart },
];

export function RealWorkPreview() {
  const primary = projects.slice(0, 4);
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
        <div className="relative grid gap-px bg-border lg:grid-cols-2">
          {primary.map((project) => (
            <article key={project.title} className="bg-background p-5 sm:p-6">
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-primary">
                System / {project.number}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold uppercase">{project.title}</h3>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {project.workflow.slice(0, 5).map((step, index) => (
                  <span
                    key={step}
                    className="flex items-center gap-2 font-mono text-[8px] font-bold uppercase text-muted-foreground"
                  >
                    {step}
                    {index < Math.min(project.workflow.length, 5) - 1 && (
                      <ArrowRight className="h-3 w-3 text-primary" />
                    )}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
