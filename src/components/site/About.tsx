import { motion } from "motion/react";
import { Section } from "./Section";
import { CheckCircle2 } from "lucide-react";

const capabilities = [
  "Analyze high-volume datasets and isolate patterns that matter to the business.",
  "Clean, transform, and validate data with Python, Pandas, SQL, and Power Query.",
  "Build relational models, DAX measures, and executive-ready Power BI reports.",
  "Develop and evaluate classification, recommendation, and forecasting models.",
  "Automate repeatable reporting tasks and communicate findings to stakeholders.",
];

export function About() {
  return (
    <Section id="about" eyebrow="Executive profile" title="Analysis that moves from question to action.">
      <div className="grid gap-8 border-y border-border py-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Professional summary</p>
          <p className="mt-4 text-xl leading-8 text-foreground">Computer Science graduate with hands-on experience across data analysis, machine learning, business reporting, and Python workflows.</p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Experience includes data-focused internships with ExcelR Solutions, Sysslan IT Solutions, and Codveda Technologies.</p>
        </motion.div>
        <ul className="grid gap-3">
          {capabilities.map((capability, index) => (
            <motion.li key={capability} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-md border border-border bg-panel px-4 py-3.5 text-sm leading-6 text-foreground/90">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{capability}
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}