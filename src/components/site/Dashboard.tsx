import { motion } from "motion/react";
import { Activity, ArrowRight, CheckCircle2 } from "lucide-react";
import { Section } from "./Section";
import { PipelineFlow } from "./PipelineFlow";
import { misModules } from "@/mahi/portfolio";
import { inView, revealUp, stagger } from "@/lib/motion";

const flow = ["Source data", "Clean", "Validate", "Reconcile", "KPI engine", "Reporting", "Management"];

export function Dashboard() {
  return <Section id="mis" eyebrow="06 / Reporting operations" title="MIS operations center" description="A controlled reporting chain for recurring MIS, KPI visibility, reconciliation and management review.">
    <div className="border border-border bg-surface">
      <div className="mis-console border-b border-border p-6 sm:p-8"><div className="mb-5 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.14em]"><span className="text-muted-foreground">Operational data flow</span><span className="flex items-center gap-2 text-success"><CheckCircle2 className="h-3.5 w-3.5" />Validated before reporting</span></div><PipelineFlow compact label="MIS operations pipeline" steps={flow.map((label) => ({ label }))} /></div>
      <motion.div variants={stagger(0.04, 0.06)} initial="hidden" whileInView="visible" viewport={inView} className="grid md:grid-cols-2 xl:grid-cols-4">{misModules.map((module, index) => <motion.article key={module.title} variants={revealUp} tabIndex={0} className="mis-module group min-h-48 border-b border-border p-5 focus-visible:outline-none xl:border-r"><div className="flex items-center justify-between"><span className="font-mono text-[8px] text-primary">MODULE / {String(index + 1).padStart(2, "0")}</span><Activity className="h-4 w-4 text-muted-foreground group-hover:text-primary group-focus-visible:text-primary" /></div><h3 className="mt-8 font-display text-xl font-bold uppercase">{module.title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground">{module.detail}</p><ArrowRight className="mt-5 h-4 w-4 text-primary transition-transform group-hover:translate-x-1" /></motion.article>)}</motion.div>
    </div>
  </Section>;
}
