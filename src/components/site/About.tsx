import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Section } from "./Section";
import { SectionTransition } from "./SectionTransition";
import { methodology } from "@/mahi/portfolio";
import { inView, revealUp, stagger } from "@/lib/motion";

export function About() {
  return (
    <>
      <SectionTransition label="Analysis protocol" />
      <Section
        id="method"
        eyebrow="11 / Reasoning protocol"
        title="Analyst method"
        description="A disciplined path from a business question to decision-ready insight."
        className="method-scene"
      >
      <motion.ol
        variants={stagger(0.08, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="analysis-sequence method-chain grid gap-px bg-border sm:grid-cols-3 lg:grid-cols-9"
      >
        {methodology.map((step, index) => (
            <motion.li key={step} variants={revealUp} className="method-step relative min-h-32 bg-background p-4">
            <span className="font-mono text-[8px] text-success">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-7 font-display text-lg font-bold uppercase">{step}</p>
            {index < methodology.length - 1 && (
              <ArrowDown
                className="absolute bottom-3 right-3 h-4 w-4 -rotate-90 text-primary lg:rotate-0"
                aria-hidden="true"
              />
            )}
          </motion.li>
        ))}
        </motion.ol>
      </Section>
    </>
  );
}
