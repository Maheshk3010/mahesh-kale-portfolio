import { motion } from "motion/react";
import { ArrowRight, BarChart3, Database, Layers3, Network, ScanSearch } from "lucide-react";
import type { Project } from "@/mahi/types";
import { inView, revealUp, stagger } from "@/lib/motion";

const icons = [Database, ScanSearch, Layers3, Network, BarChart3];

export function ProjectWorkflow({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const isWarehouse = project.number === "02";
  const steps = project.workflow;

  if (isWarehouse) {
    const sources = ["Source 01", "Source 02", "Source 03", "Source 04"];
    return (
      <div className="workflow-visual relative overflow-hidden border border-border bg-panel">
        <div className="control-grid pointer-events-none absolute inset-0 opacity-45" />
        <div className="relative grid gap-5 p-5 sm:grid-cols-[.7fr_1.3fr] sm:p-7">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            {sources.map((source, index) => (
              <motion.div
                key={source}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inView}
                transition={{ delay: index * 0.06 }}
                className="workflow-source border border-border bg-background/90 px-3 py-3 font-mono text-[8px] font-bold uppercase text-foreground"
              >
                <span className="mr-2 text-primary">0{index + 1}</span>
                {source}
              </motion.div>
            ))}
          </div>
          <WorkflowRail steps={steps} compact={compact} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`workflow-visual workflow-${project.number} relative overflow-hidden border border-border bg-panel p-5 sm:p-7`}
    >
      <div className="control-grid pointer-events-none absolute inset-0 opacity-45" />
      <WorkflowRail steps={steps} compact={compact} />
    </div>
  );
}

function WorkflowRail({ steps, compact }: { steps: string[]; compact: boolean }) {
  return (
    <motion.ol
      variants={stagger(0.05, 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      className={`workflow-rail relative grid gap-px bg-border ${compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3"}`}
    >
      {steps.map((step, index) => {
        const Icon = icons[index % icons.length];
        return (
          <motion.li
            key={`${step}-${index}`}
            variants={revealUp}
            className={`workflow-step group relative bg-background/95 p-4 ${compact ? "min-h-24" : "min-h-28 sm:min-h-32"}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Icon className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
            <p className="mt-5 font-display text-sm font-bold uppercase leading-5 sm:text-base">
              {step}
            </p>
            {index < steps.length - 1 && (
              <ArrowRight
                className="absolute bottom-3 right-3 h-3.5 w-3.5 text-primary"
                aria-hidden="true"
              />
            )}
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
