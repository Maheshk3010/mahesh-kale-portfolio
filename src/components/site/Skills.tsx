import { motion } from "motion/react";
import { Section } from "./Section";

const groups = [
  {
    title: "Languages",
    items: ["TypeScript", "Python", "Go", "SQL", "Rust"],
  },
  {
    title: "AI / ML",
    items: ["PyTorch", "LangGraph", "OpenAI", "RAG", "Evals", "Fine-tuning"],
  },
  {
    title: "Backend",
    items: ["Node.js", "FastAPI", "Postgres", "Redis", "Kafka", "gRPC"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "TanStack", "Tailwind", "Motion"],
  },
  {
    title: "Data",
    items: ["dbt", "Snowflake", "Airflow", "Spark", "pgvector"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform"],
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolbelt"
      title="Skills sharpened in production."
      description="I pick tools for the problem, not the resume — but here's what I reach for most."
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
