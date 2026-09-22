import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import social from "@/mahi/knowledge/social.json";

const pipeline = ["Raw data", "Validate", "Analyze", "Visualize", "Report"];
const metrics = [["50K+", "Retail records"], ["30+", "SQL queries"], ["7K+", "Customer records"], ["03", "Internships"]];
const queryRows = ["SELECT revenue, region", "FROM sales_records", "WHERE quality_flag = 'valid'", "GROUP BY region;"];

export function Hero() {
  const reduced = useReducedMotion();
  const github = social.links.find((item) => item.platform === "GitHub")?.url ?? "";
  const linkedin = social.links.find((item) => item.platform === "LinkedIn")?.url ?? "";
  const enter = (delay: number) => reduced ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <section id="top" className="relative min-h-[96svh] overflow-hidden border-b border-border pt-16">
      <div className="control-grid pointer-events-none absolute inset-0" />
      <div className="data-stream pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="mx-auto grid min-h-[calc(96svh-4rem)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,.95fr)] lg:py-16">
        <div className="relative z-10">
          <motion.div {...enter(0.05)} className="mb-8 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"><span className="h-px w-10 bg-primary" />System 01 / Profile loaded</motion.div>
          <motion.p {...enter(0.12)} className="font-display text-xl font-bold uppercase tracking-normal text-foreground sm:text-2xl">Mahesh Kale</motion.p>
          <motion.p {...enter(0.18)} className="mt-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary">Data Analyst <span className="text-muted-foreground">|</span> MIS Executive</motion.p>
          <motion.h1 {...enter(0.22)} className="mt-4 max-w-4xl font-display text-[clamp(3.25rem,8vw,7rem)] font-bold uppercase leading-[0.84] tracking-normal">
            Data<br/><span className="text-primary">Analyst</span>
          </motion.h1>
          <motion.p {...enter(0.32)} className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">MIS <span className="mx-2 text-primary">•</span> Reporting <span className="mx-2 text-primary">•</span> BI</motion.p>
          <motion.p {...enter(0.4)} className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">SQL, Power BI, Excel and Python for analysis, reporting, dashboards and business performance insights.</motion.p>

          <motion.div {...enter(0.5)} className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <Button asChild size="lg" className="h-12 uppercase"><a href="#projects">View my work <ArrowDown /></a></Button>
            <Button variant="outline" size="lg" disabled title="Resume file awaiting verification" className="h-12 uppercase"><Download /> Resume pending</Button>
            <div className="flex gap-3">
              {github && <Button asChild variant="ghost" size="icon" className="h-12 w-12"><a href={github} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub"><Github /></a></Button>}
              {linkedin && <Button asChild variant="ghost" size="icon" className="h-12 w-12"><a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn"><Linkedin /></a></Button>}
            </div>
          </motion.div>

          <motion.div {...enter(0.58)} className="mt-12 grid grid-cols-2 border-y border-border sm:grid-cols-4">
            {metrics.map(([value, label]) => <div key={label} className="border-r border-border px-3 py-4 first:pl-0 last:border-r-0"><div className="font-mono text-2xl font-bold text-foreground">{value}</div><div className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div></div>)}
          </motion.div>
        </div>

        <motion.div {...enter(0.35)} className="relative min-h-[510px] border-l border-t border-border bg-surface/70 p-4 sm:p-6">
          <div className="flex items-center justify-between border-b border-border pb-3 font-mono text-[9px] uppercase tracking-[0.16em]"><span className="text-primary">Analytics workstation</span><span className="text-success">● Active</span></div>
          <div className="mt-5 grid grid-cols-[1.2fr_.8fr] gap-3">
            <div className="border border-border bg-panel p-4"><span className="font-mono text-[8px] uppercase text-muted-foreground">Query / Sales validation</span><div className="mt-5 space-y-3 font-mono text-[10px] text-foreground/80">{queryRows.map((row, i) => <motion.div key={row} initial={reduced ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .7 + i * .13 }}><span className="mr-3 text-primary">{String(i + 1).padStart(2, "0")}</span>{row}</motion.div>)}</div></div>
            <div className="grid gap-3"><div className="border border-primary/30 bg-primary/5 p-4"><div className="font-mono text-[8px] uppercase text-muted-foreground">Data quality</div><div className="mt-3 font-display text-3xl font-bold">VALID</div></div><div className="border border-border bg-panel p-4"><div className="font-mono text-[8px] uppercase text-muted-foreground">Report state</div><div className="mt-3 font-display text-xl font-bold text-primary">READY</div></div></div>
          </div>
          <div className="mt-3 border border-border bg-panel p-4"><div className="flex items-center justify-between font-mono text-[8px] uppercase text-muted-foreground"><span>Pipeline activation</span><span>5 / 5</span></div><div className="mt-5 grid grid-cols-5 gap-1">{[32,56,44,78,92,66,88,48,74,98,62,82,54,90,70].map((h,i)=><motion.span key={i} initial={reduced ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: .75 + i*.04 }} className="origin-bottom bg-primary/60" style={{height:`${h/2}px`}} />)}</div></div>
          <div className="mt-3 overflow-hidden border-y border-border py-5"><motion.div initial={reduced ? false : { x: "0%" }} animate={reduced ? undefined : { x: "-50%" }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="flex w-max items-center">{[...pipeline,...pipeline].map((step,i)=><div key={`${step}-${i}`} className="flex items-center"><span className="px-4 font-mono text-[9px] font-bold uppercase tracking-[0.14em]">{step}</span><ArrowUpRight className="h-3 w-3 text-primary" /></div>)}</motion.div></div>
          <div className="mt-5 grid grid-cols-2 gap-3 font-mono text-[9px] uppercase"><div className="border-l-2 border-primary pl-3"><span className="text-muted-foreground">Tools</span><p className="mt-1 text-foreground">SQL · Power BI · Excel · Python</p></div><div className="border-l-2 border-accent pl-3"><span className="text-muted-foreground">Output</span><p className="mt-1 text-foreground">KPI · Dashboard · Report</p></div></div>
        </motion.div>
      </div>
    </section>
  );
}