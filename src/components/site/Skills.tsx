import { motion } from "motion/react";
import { Section } from "./Section";

const groups = [
  {
    title: "Programming",
    items: ["Python", "SQL"],
  },
  {
    title: "Libraries",
    items: ["Pandas", "NumPy", "Scikit-learn", "Flask"],
  },
  {
    title: "Data Visualization",
    items: ["Power BI", "Advanced Excel"],
  },
  {
    title: "Machine Learning",
    items: ["Scikit-learn", "Model Evaluation", "Supervised Learning"],
  },
  {
    title: "Databases",
    items: ["MySQL"],
  },
  {
    title: "Automation & APIs",
    items: ["REST API", "Python Scripting"],
  },
  {
    title: "Version Control",
    items: ["Git", "GitHub"],
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolbelt"
      title="Skills for Data Analyst, Data Scientist, Python Developer and MIS Analyst roles."
      description="Verified skills mapped to the four target roles — Python, SQL, Power BI and machine-learning fundamentals."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass rounded-2xl p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-tight">{g.title}</h3>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <span
                  key={it}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-foreground/90 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {it}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
