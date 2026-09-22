import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { inView, motionEase, revealUp, stagger } from "@/lib/motion";

export type PipelineStep = {
  label: string;
  detail?: string;
  tools?: string;
};

export function PipelineFlow({
  steps,
  label,
  compact = false,
}: {
  steps: PipelineStep[];
  label: string;
  compact?: boolean;
}) {
  return (
    <motion.div
      variants={stagger(0.15, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      className="pipeline-flow relative"
      aria-label={label}
    >
      <motion.div
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 1.15, ease: motionEase } },
        }}
        className="pipeline-rail absolute left-0 right-0 top-0 h-px origin-left bg-primary"
        aria-hidden="true"
      />
      <div
        className="grid gap-px bg-border md:grid-cols-[repeat(var(--pipeline-columns),minmax(0,1fr))]"
        style={{ "--pipeline-columns": steps.length } as CSSProperties}
      >
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            variants={revealUp}
            className="pipeline-node group relative bg-background px-4 py-6"
          >
            <span className="pipeline-marker absolute -top-1.5 left-4 h-3 w-3 border border-primary bg-background transition-colors group-hover:bg-primary" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              {index < steps.length - 1 && (
                <ArrowRight
                  className="pipeline-arrow h-3 w-3 text-border-strong"
                  aria-hidden="true"
                />
              )}
            </div>
            <h3 className="mt-5 font-display text-lg font-bold uppercase">{step.label}</h3>
            {step.detail && (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.detail}</p>
            )}
            {step.tools && (
              <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
                {step.tools}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
