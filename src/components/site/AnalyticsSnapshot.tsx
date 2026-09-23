import { motion } from "motion/react";
import { BarChart3, Database, Gauge, Users } from "lucide-react";
import { CountUp } from "./CountUp";
import { proofMetrics } from "@/mahi/portfolio";
import { inView, revealUp, stagger } from "@/lib/motion";

const icons = [Database, Users, Gauge, BarChart3];

export function AnalyticsSnapshot() {
  return (
    <section id="proof" aria-labelledby="proof-title" className="snapshot-section relative border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16">
        <div className="mb-7 flex items-end justify-between gap-6 border-b border-border pb-4">
          <div><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-primary">03 / Proof telemetry</p><h2 id="proof-title" className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">Documented scale</h2></div>
          <span className="hidden font-mono text-[9px] uppercase tracking-[.14em] text-success sm:block">Signal verified from resume</span>
        </div>
        <motion.div variants={stagger(0.05, 0.08)} initial="hidden" whileInView="visible" viewport={inView} className="snapshot-grid grid border-x border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {proofMetrics.map(({ label, value, suffix, detail }, index) => {
            const Icon = icons[index];
            return <motion.article key={label} variants={revealUp} className="snapshot-cell relative border-b border-border p-5 sm:p-6"><div className="flex items-center justify-between"><span className="font-mono text-[8px] uppercase tracking-[.14em] text-muted-foreground">0{index + 1} / {label}</span><Icon className="h-4 w-4 text-primary" aria-hidden="true" /></div><div className="mt-8 font-display text-5xl font-bold leading-none sm:text-6xl"><CountUp value={value} suffix={suffix} /></div><p className="mt-3 font-mono text-[10px] uppercase tracking-[.14em] text-primary">{detail}</p></motion.article>;
          })}
        </motion.div>
      </div>
    </section>
  );
}
