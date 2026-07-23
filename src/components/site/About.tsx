import { motion } from "motion/react";
import { Section } from "./Section";
import { Brain, Rocket, Shield } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "AI first",
    body: "LLM pipelines, RAG systems, evaluations and fine-tuning — grounded in real product outcomes, not demos.",
  },
  {
    icon: Rocket,
    title: "Shipping mindset",
    body: "Weekly releases, tight feedback loops, and measurable impact. Design, backend, infra — end to end.",
  },
  {
    icon: Shield,
    title: "Production quality",
    body: "Type-safe systems, observability, tests that matter, and interfaces that hold up under real usage.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Engineer, designer,
          <br />
          <span className="text-muted-foreground">and quiet perfectionist.</span>
        </>
      }
      description="I build AI-powered products end to end — from research and data pipelines to typed backends and interfaces that recruiters, users and teammates actually love."
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
