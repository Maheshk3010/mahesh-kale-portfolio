import { motion } from "motion/react";
import { Section } from "./Section";

const stages = [
  {
    step: "01",
    title: "Collect",
    copy: "Bring structured source records into one analysis path.",
    tools: "Excel · SQL · CSV",
  },
  {
    step: "02",
    title: "Clean",
    copy: "Standardize fields, formats, missing values and duplicates.",
    tools: "Power Query · Pandas",
  },
  {
    step: "03",
    title: "Validate",
    copy: "Check completeness, consistency and reconciliation rules.",
    tools: "Excel · SQL",
  },
  {
    step: "04",
    title: "Analyze",
    copy: "Query patterns, segments, trends and performance drivers.",
    tools: "SQL · Python",
  },
  {
    step: "05",
    title: "Visualize",
    copy: "Translate measures into readable KPI and trend views.",
    tools: "Power BI · Excel",
  },
  {
    step: "06",
    title: "Report",
    copy: "Deliver repeatable reporting for business review.",
    tools: "MIS · Dashboards",
  },
];

export function WhyHire() {
  return (
    <Section
      id="workflow"
      eyebrow="Section 02 / Operating model"
      title="How I work with data"
      description="A controlled path from source records to a decision-ready report."
    >
      <div className="relative grid border-t border-border lg:grid-cols-6">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute left-0 right-0 top-0 h-px origin-left bg-primary"
        />
        {stages.map((stage, index) => (
          <motion.article
            key={stage.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="group relative border-b border-border px-4 py-7 lg:border-b-0 lg:border-r"
          >
            <div className="font-mono text-4xl font-bold text-border-strong transition-colors group-hover:text-primary">
              {stage.step}
            </div>
            <h3 className="mt-8 font-display text-lg font-bold uppercase">{stage.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{stage.copy}</p>
            <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
              {stage.tools}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
