import { motion } from "motion/react";
import { Section } from "./Section";
import { capabilityGroups } from "@/mahi/portfolio";
import { inView, revealLeft, stagger } from "@/lib/motion";

export function Skills() {
  return (
    <Section
      id="stack"
      eyebrow="08 / Capability network"
      title="Analytics core"
      description="Capabilities connected to the tools and reporting contexts used across the portfolio."
    >
      <motion.div
        variants={stagger(0.04, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="analytics-core relative border-y border-border"
      >
        {capabilityGroups.map(({ verb, tools, context }, index) => (
          <motion.article
            key={verb}
            variants={revealLeft}
            tabIndex={0}
            className="stack-row group grid border-b border-border py-7 focus-visible:outline-none md:grid-cols-[64px_180px_1fr_1fr] md:items-center md:gap-6"
          >
            <span className="font-mono text-[10px] text-primary">0{index + 1}</span>
            <h3 className="mt-2 font-display text-2xl font-bold uppercase group-hover:text-primary group-focus-visible:text-primary md:mt-0">
              {verb}
            </h3>
            <p className="mt-3 font-mono text-xs uppercase leading-6 text-muted-foreground md:mt-0">
              {tools.join(" · ")}
            </p>
            <p className="mt-3 border-l border-border pl-4 text-sm leading-6 text-muted-foreground md:mt-0">
              <span className="mb-1 block font-mono text-[8px] uppercase tracking-[.14em] text-primary">
                Applied to
              </span>
              {context}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
