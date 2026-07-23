import { motion } from "motion/react";
import { Section } from "./Section";

const roles = [
  {
    company: "Independent",
    role: "AI Engineer & Consultant",
    period: "2024 — Present",
    bullets: [
      "Designed RAG and agent systems for fintech and SaaS clients, from proof of concept to production.",
      "Built evaluation harnesses that cut hallucinations by 38% and shipped weekly model iterations.",
    ],
  },
  {
    company: "Nova Labs",
    role: "Senior Software Engineer",
    period: "2022 — 2024",
    bullets: [
      "Led backend for the analytics platform used by 40k+ users, owning APIs, streaming and SLOs.",
      "Introduced type-safe RPC and observability that reduced production incidents by 60%.",
    ],
  },
  {
    company: "Loop Systems",
    role: "Software Engineer",
    period: "2020 — 2022",
    bullets: [
      "Shipped the first version of an internal ML platform for data scientists across 6 teams.",
      "Owned the design system and shared component library — adopted across 4 web products.",
    ],
  },
];

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Roles, teams, and the work."
    >
      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-0 bottom-0 hidden w-px bg-gradient-to-b from-primary/60 via-white/10 to-transparent md:block" />
        <ol className="space-y-4">
          {roles.map((r, i) => (
            <motion.li
              key={r.company + r.period}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass relative rounded-3xl p-6 md:ml-10 md:p-7"
            >
              <span className="absolute -left-[46px] top-8 hidden h-3 w-3 rounded-full bg-primary shadow-[0_0_18px_var(--primary)] md:block" />
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {r.company}
                  </div>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
                    {r.role}
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                  {r.period}
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {r.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
