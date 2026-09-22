import { motion } from "motion/react";
import { Section } from "./Section";
import { inView, revealLeft, stagger } from "@/lib/motion";

const stack = [
  {
    verb: "Analyze",
    tools: "SQL · Python · Pandas · NumPy",
    used: "Sales performance · Customer analytics",
  },
  {
    verb: "Report",
    tools: "Power BI · Advanced Excel · DAX · Power Query",
    used: "KPI reporting · Sales dashboard",
  },
  {
    verb: "Validate",
    tools: "Data Cleaning · Data Validation · Reconciliation",
    used: "Sysslan internship · Reporting inputs",
  },
  {
    verb: "Visualize",
    tools: "Power BI · Excel · KPI Dashboards",
    used: "Dashboard preparation · Business reporting",
  },
  {
    verb: "Automate",
    tools: "Python · Power Query · Reporting Workflows",
    used: "Data preparation · Repeatable reporting",
  },
];

export function Skills() {
  return (
    <Section
      id="stack"
      eyebrow="06 / Capability map"
      title="Capability stack"
      description="Tools connected to the analytical work and reporting contexts documented across this portfolio."
    >
      <motion.div
        variants={stagger()}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="border-t border-border"
      >
        {stack.map(({ verb, tools, used }, i) => (
          <motion.div
            key={verb}
            variants={revealLeft}
            tabIndex={0}
            className="stack-row group grid border-b border-border py-7 focus-visible:outline-none md:grid-cols-[64px_180px_1fr_1fr] md:items-center md:gap-6"
          >
            <span className="font-mono text-[10px] text-primary">0{i + 1}</span>
            <h3 className="mt-2 font-display text-2xl font-bold uppercase group-hover:text-primary sm:mt-0">
              {verb}
            </h3>
            <p className="mt-3 font-mono text-xs uppercase leading-6 tracking-[0.1em] text-muted-foreground sm:mt-0">
              {tools}
            </p>
            <p className="mt-3 border-l border-border pl-4 text-sm leading-6 text-muted-foreground md:mt-0">
              <span className="mb-1 block font-mono text-[8px] uppercase tracking-[.14em] text-primary">
                Documented use
              </span>
              {used}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-6 font-mono text-[9px] uppercase tracking-[.14em] text-muted-foreground">
        Supporting technical work / Scikit-learn · TensorFlow · Machine learning
      </p>
    </Section>
  );
}
