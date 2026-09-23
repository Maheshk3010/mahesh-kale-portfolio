import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Section } from "./Section";
import { methodology } from "@/mahi/portfolio";
import { inView, revealUp, stagger } from "@/lib/motion";

export function About() {
  return (
    <Section
      id="method"
      eyebrow="10 / Operating methodology"
      title="Analyst method"
      description="A disciplined path from raw source data to clear reporting and decision-ready insight."
      className="method-scene"
    >
      <motion.ol
        variants={stagger(0.08, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="analysis-sequence grid gap-px bg-border sm:grid-cols-3 lg:grid-cols-9"
      >
        {methodology.map((step, index) => (
          <motion.li key={step} variants={revealUp} className="relative min-h-36 bg-background p-4">
            <span className="font-mono text-[8px] text-primary">
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
  );
}
