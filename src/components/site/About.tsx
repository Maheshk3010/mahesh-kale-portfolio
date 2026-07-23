import { motion } from "motion/react";
import { Section } from "./Section";
import { BarChart3, Database, Brain } from "lucide-react";

const pillars = [
  {
    icon: BarChart3,
    title: "Data-driven decisions",
    body: "SQL, Power BI and Advanced Excel to turn raw business data into dashboards, reports and clear next steps for stakeholders.",
  },
  {
    icon: Brain,
    title: "Python for data & ML",
    body: "Python with Pandas, NumPy and Scikit-learn for analysis, automation and entry-level machine-learning experiments.",
  },
  {
    icon: Database,
    title: "MIS & reporting focus",
    body: "Structured MySQL queries, repeatable reports and lightweight Flask/REST tooling to support MIS and operations teams.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Entry-level, data-focused,
          <br />
          <span className="text-muted-foreground">recruiter-ready.</span>
        </>
      }
      description="Mahesh Kale is an entry-level IT professional targeting Data Analyst, Data Scientist, Python Developer and MIS Analyst roles — with a verified toolkit across Python, SQL, Power BI and machine-learning fundamentals."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="glass group relative overflow-hidden rounded-3xl p-6 transition-transform hover:-translate-y-1"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-opacity group-hover:opacity-100 opacity-60" />
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary">
              <p.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {p.body}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
