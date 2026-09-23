import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "./Section";
import { SectionTransition } from "./SectionTransition";
import { capabilityGroups, supportingCapabilities } from "@/mahi/portfolio";
import { inView, revealUp, stagger } from "@/lib/motion";

export function Skills() {
  const [activeSkill, setActiveSkill] = useState(capabilityGroups[0]?.verb ?? "SQL");
  const active =
    capabilityGroups.find((group) => group.verb === activeSkill) ?? capabilityGroups[0];
  if (!active) return null;
  return (
    <>
      <SectionTransition label="Capability map initialized" />
      <Section
        id="stack"
        eyebrow="08 / Applied capability network"
        title="Analyst toolkit"
        description="Core analytical tools connected to working methods and portfolio applications."
        className="toolkit-scene"
      >
        <div className="toolkit-network grid overflow-hidden border-y border-border lg:grid-cols-[.78fr_1.22fr]">
          <motion.div
            variants={stagger(0.04, 0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="relative grid grid-cols-2 gap-px bg-border p-px"
          >
            <div className="analytics-core-node pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center border border-primary bg-background text-center font-mono text-[9px] font-bold uppercase text-primary sm:grid">
              Analytics
              <br />
              Core
            </div>
            {capabilityGroups.map(({ verb }, index) => (
              <motion.div key={verb} variants={revealUp}>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setActiveSkill(verb)}
                  aria-pressed={activeSkill === verb}
                  className={`toolkit-node h-32 w-full justify-start bg-background p-4 text-left sm:h-44 ${activeSkill === verb ? "is-selected" : ""}`}
                >
                  <span>
                    <span className="block font-mono text-[8px] text-muted-foreground">
                      CORE / 0{index + 1}
                    </span>
                    <span className="mt-3 block whitespace-normal font-display text-lg font-bold uppercase text-foreground">
                      {verb}
                    </span>
                  </span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            key={active.verb}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-surface p-5 sm:p-8 lg:border-l"
          >
            <p className="font-mono text-[8px] font-bold uppercase tracking-[.14em] text-success">
              Active capability
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold uppercase">{active.verb}</h3>
            <div className="mt-7 grid grid-cols-2 gap-px bg-border">
              {active.tools.map((tool) => (
                <div
                  key={tool}
                  className="min-h-16 bg-background p-3 font-mono text-[9px] font-bold uppercase"
                >
                  {tool}
                </div>
              ))}
            </div>
            <div className="mt-8 border-l-2 border-success pl-5">
              <p className="font-mono text-[8px] uppercase tracking-[.14em] text-primary">
                Applied to
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{active.context}</p>
            </div>
          </motion.div>
        </div>
        <div className="mt-8 grid gap-4 border-y border-border py-5 sm:grid-cols-[180px_1fr] sm:items-start">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-success">
            Supporting capabilities
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {supportingCapabilities.map((capability) => (
              <span
                key={capability}
                className="font-mono text-[9px] font-bold uppercase text-foreground"
              >
                <span className="mr-2 text-primary">+</span>
                {capability}
              </span>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
