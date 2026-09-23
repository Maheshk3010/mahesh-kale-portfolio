import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Check, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { coreTools } from "@/mahi/portfolio";
import { knowledgeBase } from "@/mahi/knowledgeBase";
import { heroEnter, motionEase, stagger } from "@/lib/motion";

const boot = ["Initializing analytics core", "Loading data engine", "Connecting reporting module", "Validating KPI system", "System ready"];
const modules = [
  ["Analytics core", "SQL · Python"], ["KPI engine", "15+ measures"], ["MIS reporting", "Daily · Weekly · Monthly"], ["Data validation", "Clean · Check · Reconcile"], ["Dashboard system", "Power BI · Excel"],
];

export function Hero() {
  const reduced = useReducedMotion();
  const github = knowledgeBase.social.links.find((item) => item.platform === "GitHub")?.url ?? "";
  const linkedin = knowledgeBase.social.links.find((item) => item.platform === "LinkedIn")?.url ?? "";
  return <section id="top" className="relative min-h-[92svh] overflow-hidden border-b border-border pt-16">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, ease: motionEase }} className="control-grid pointer-events-none absolute inset-0" />
    <div className="data-stream pointer-events-none absolute inset-0" aria-hidden="true" />
    <div className="mx-auto grid min-h-[calc(92svh-4rem)] max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:py-14">
      <div className="relative z-10 min-w-0">
        <motion.div variants={stagger(.02, reduced ? 0 : .35)} initial="hidden" animate="visible" className="mb-7 flex flex-wrap gap-x-5 gap-y-2" aria-label="System initialization status">{boot.map((line, index) => <motion.span key={line} variants={heroEnter(reduced ? 0 : index * .04)} className={`font-mono text-[8px] font-bold uppercase tracking-[.14em] ${index === boot.length - 1 ? "text-success" : "text-muted-foreground"}`}>{index === boot.length - 1 && <Check className="mr-1 inline h-3 w-3" />}{line}</motion.span>)}</motion.div>
        <motion.p variants={heroEnter(reduced ? 0 : .15)} initial="hidden" animate="visible" className="font-display text-xl font-bold uppercase sm:text-2xl">Mahesh Kale</motion.p>
        <motion.p variants={heroEnter(reduced ? 0 : .2)} initial="hidden" animate="visible" className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-primary">Data Analyst <span className="text-muted-foreground">/</span> MIS Executive</motion.p>
        <motion.h1 variants={heroEnter(reduced ? 0 : .26)} initial="hidden" animate="visible" className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,6.7vw,6.5rem)] font-bold uppercase leading-[.9]">Turning business data into <span className="text-primary">decision-ready</span> insight.</motion.h1>
        <motion.p variants={heroEnter(reduced ? 0 : .32)} initial="hidden" animate="visible" className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Turning business and operational data into validated insights, KPI reporting and decision-ready dashboards.</motion.p>
        <motion.div variants={stagger(.35,.05)} initial="hidden" animate="visible" className="mt-5 flex flex-wrap gap-x-5 gap-y-2" aria-label="Core analytics tools">{coreTools.map((tool) => <motion.span key={tool} variants={heroEnter(0)} className="font-mono text-[9px] font-bold uppercase tracking-[.14em]"><span className="mr-2 text-primary">●</span>{tool}</motion.span>)}</motion.div>
        <motion.div variants={heroEnter(reduced ? 0 : .43)} initial="hidden" animate="visible" className="mt-8 flex flex-wrap items-center gap-3"><Button asChild size="lg"><a href="#projects">View my work <ArrowDown /></a></Button><Button asChild variant="outline" size="lg"><a href={knowledgeBase.resume.url} download={knowledgeBase.resume.filename}><Download /> Download resume</a></Button>{github && <Button asChild variant="ghost" size="icon"><a href={github} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub"><Github /></a></Button>}{linkedin && <Button asChild variant="ghost" size="icon"><a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn"><Linkedin /></a></Button>}</motion.div>
      </div>
      <motion.div variants={heroEnter(reduced ? 0 : .28)} initial="hidden" animate="visible" className="workstation-panel relative min-w-0 overflow-hidden border-l border-t border-border bg-surface/75 p-5 sm:p-7"><div className="flex items-center justify-between border-b border-border pb-4 font-mono text-[9px] uppercase tracking-[.14em]"><span className="text-primary">Analytics operating system</span><span className="text-success">● Online</span></div><div className="mt-5 space-y-2">{modules.map(([title, detail], index) => <motion.div key={title} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduced ? 0 : .48 + index * .08, ease: motionEase }} className="group grid grid-cols-[38px_1fr_auto] items-center border border-border bg-panel p-4"><span className="font-mono text-[8px] text-primary">0{index + 1}</span><div><p className="font-display text-base font-bold uppercase">{title}</p><p className="mt-1 font-mono text-[8px] uppercase text-muted-foreground">{detail}</p></div><span className="h-2 w-2 bg-success" /></motion.div>)}</div><div className="mt-5 grid grid-cols-3 gap-px bg-border text-center font-mono text-[8px] uppercase"><div className="bg-background p-4"><span className="text-muted-foreground">Input</span><p className="mt-2 text-foreground">Raw data</p></div><div className="bg-background p-4"><span className="text-muted-foreground">Control</span><p className="mt-2 text-primary">Validated</p></div><div className="bg-background p-4"><span className="text-muted-foreground">Output</span><p className="mt-2 text-success">Report ready</p></div></div></motion.div>
    </div>
  </section>;
}
