import { motion } from "motion/react";
import { Section } from "./Section";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Lumen RAG",
    tag: "AI Platform",
    year: "2025",
    blurb:
      "Retrieval-augmented answer engine with grounded citations, streaming responses and evaluation harness. Serves 40k+ queries/day.",
    stack: ["Python", "LangGraph", "pgvector", "Next.js"],
    color: "from-cyan-400/25 to-blue-500/10",
  },
  {
    name: "Northwind Analytics",
    tag: "Data Product",
    year: "2024",
    blurb:
      "Real-time analytics dashboard with dbt models, semantic layer and streaming ETL. Cut reporting latency from hours to seconds.",
    stack: ["dbt", "Snowflake", "Kafka", "React"],
    color: "from-emerald-400/25 to-cyan-400/10",
  },
  {
    name: "Kairo Copilot",
    tag: "Developer Tools",
    year: "2024",
    blurb:
      "IDE assistant that plans, edits and tests multi-file changes. Custom tool-use loop with typed function calling.",
    stack: ["TypeScript", "OpenAI", "AST", "Bun"],
    color: "from-indigo-400/25 to-fuchsia-500/10",
  },
  {
    name: "Sable Ops",
    tag: "Infrastructure",
    year: "2023",
    blurb:
      "Self-serve platform for internal services — Terraform modules, golden paths and drift-aware CI. 30+ services onboarded.",
    stack: ["Go", "Terraform", "Kubernetes", "GitHub Actions"],
    color: "from-amber-300/25 to-rose-400/10",
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Products, platforms and quiet infrastructure."
      description="A handful of things I've designed and shipped. Each one has real users, real metrics and real edge cases."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.a
            key={p.name}
            href="#contact"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="glass group relative overflow-hidden rounded-3xl p-7 transition-transform hover:-translate-y-1"
          >
            <div
              className={`pointer-events-none absolute -inset-1 -z-10 opacity-40 blur-3xl transition-opacity group-hover:opacity-80 bg-gradient-to-br ${p.color}`}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {p.tag}
              </span>
              <span>{p.year}</span>
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {p.name}
              </h3>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {p.blurb}
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
