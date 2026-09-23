import { motion } from "motion/react";
import { inView, revealUp } from "@/lib/motion";

export function SectionTransition({ label }: { label: string }) {
  return (
    <motion.div
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      aria-hidden="true"
      className="section-transfer mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-3 font-mono text-[8px] font-bold uppercase tracking-[.14em] text-muted-foreground sm:px-8"
    >
      <span className="h-1.5 w-1.5 bg-success" />
      <span>{label}</span>
      <span className="h-px w-full bg-border" />
    </motion.div>
  );
}