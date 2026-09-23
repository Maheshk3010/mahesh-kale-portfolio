import { motion } from "motion/react";
import { profile, coreTools, specializations } from "@/mahi/portfolio";
import { inView, revealUp, stagger } from "@/lib/motion";

export function ProfessionalSnapshot() {
  return (
    <section id="snapshot" aria-labelledby="snapshot-title" className="border-b border-border bg-surface">
      <motion.div variants={stagger(0.04, 0.06)} initial="hidden" whileInView="visible" viewport={inView} className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
        <motion.div variants={revealUp} className="grid gap-5 border-t border-border pt-5 lg:grid-cols-[180px_1fr]">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-primary">02 / System profile</p>
          <h2 id="snapshot-title" className="font-display text-4xl font-bold uppercase sm:text-5xl">Professional snapshot</h2>
        </motion.div>
        <div className="mt-10 grid border-x border-t border-border md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Identity", profile.fullName],
            ["Primary role", "Data Analyst"],
            ["Secondary role", "MIS Executive"],
            ["Location", profile.location],
          ].map(([label, value]) => (
            <motion.div key={label} variants={revealUp} className="border-b border-border p-5 xl:border-r">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary">{label}</p>
              <p className="mt-4 font-display text-xl font-bold uppercase">{value}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid border-x border-b border-border lg:grid-cols-[.65fr_1.35fr]">
          <motion.div variants={revealUp} className="border-b border-border p-5 lg:border-b-0 lg:border-r">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary">Core tools</p>
            <div className="mt-4 flex flex-wrap gap-2">{coreTools.map((tool) => <span key={tool} className="control-tag">{tool}</span>)}</div>
          </motion.div>
          <motion.div variants={revealUp} className="p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary">Specialization</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">{specializations.map((item) => <span key={item} className="font-mono text-[10px] font-bold uppercase text-foreground"><span className="mr-2 text-primary">+</span>{item}</span>)}</div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
