import { motion } from "motion/react";
import { Section } from "./Section";
import { inView, revealLeft, stagger } from "@/lib/motion";

const sequence = ["Data", "SQL", "Analysis", "KPI", "BI", "Reporting"];

const stack = [
  ["Analyze", "SQL · Python · Pandas"],
  ["Report", "Power BI · Advanced Excel · DAX · Power Query"],
  ["Validate", "Data Cleaning · Data Validation · Reconciliation"],
  ["Visualize", "Power BI · Excel · KPI Dashboards"],
  ["Automate", "Python · Power Query · Reporting Workflows"],
  ["Tools", "Git · GitHub · Jupyter · VS Code"],
  ["Supporting", "Scikit-learn · Machine Learning"],
];

export function Skills() {
  return (
    <Section
      id="stack"
      eyebrow="Section 05 / Toolchain"
      title="Analytics stack"
      description="Tools organized by the work they perform—not by logo or popularity."
    >
      <motion.div
        variants={stagger(0.04, 0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="stack-sequence mb-10 grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-6"
        aria-label="Data to reporting capability sequence"
      >
        {sequence.map((item, index) => (
          <motion.div key={item} variants={revealLeft} className="relative bg-background px-4 py-5">
            <span className="font-mono text-[8px] text-primary">0{index + 1}</span>
            <p className="mt-2 font-display text-sm font-bold uppercase">{item}</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={inView} className="border-t border-border">
        {stack.map(([verb, tools], i) => (
          <motion.div
            key={verb}
            variants={revealLeft}
            tabIndex={0}
            className="stack-row group grid border-b border-border py-6 focus-visible:outline-none sm:grid-cols-[80px_220px_1fr] sm:items-center"
          >
            <span className="font-mono text-[10px] text-primary">0{i + 1}</span>
            <h3 className="mt-2 font-display text-2xl font-bold uppercase group-hover:text-primary sm:mt-0">
              {verb}
            </h3>
            <p className="mt-3 font-mono text-xs uppercase leading-6 tracking-[0.1em] text-muted-foreground sm:mt-0">
              {tools}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
