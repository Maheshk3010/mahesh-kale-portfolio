import { motion } from "motion/react";
import { Section } from "./Section";
import { ArrowRight, Check, DatabaseZap, Gauge, Presentation, Workflow } from "lucide-react";

const reasons = [
  { icon: DatabaseZap, title: "Clean, reliable data", points: ["Profile and validate raw datasets", "Resolve missing values and inconsistencies"] },
  { icon: Workflow, title: "Repeatable ETL", points: ["Transform source data into analysis-ready models", "Build structured Python and SQL workflows"] },
  { icon: Gauge, title: "Reporting automation", points: ["Replace repetitive reporting with reusable logic", "Create DAX measures and KPI-ready datasets"] },
  { icon: Presentation, title: "Stakeholder clarity", points: ["Translate analysis into concise business findings", "Design self-serve dashboards for faster decisions"] },
];

export function WhyHire() {
  return (
    <Section id="why-hire" eyebrow="Value at a glance" title="Built to execute. Trained to explain." description="A practical analytics approach from raw data to a decision-ready answer.">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, index) => (
          <motion.article key={reason.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.5, delay: index * 0.07 }} className="glass-panel rounded-lg p-5">
            <reason.icon className="h-5 w-5 text-primary" />
            <h3 className="mt-6 font-display text-lg font-bold">{reason.title}</h3>
            <ul className="mt-4 space-y-3">
              {reason.points.map((point) => <li key={point} className="flex gap-2 text-sm leading-6 text-muted-foreground"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" />{point}</li>)}
            </ul>
          </motion.article>
        ))}
      </div>
      <a href="#projects" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary">Review project evidence <ArrowRight className="h-4 w-4" /></a>
    </Section>
  );
}