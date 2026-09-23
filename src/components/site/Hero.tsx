import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Check, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { coreTools } from "@/mahi/portfolio";
import { knowledgeBase } from "@/mahi/knowledgeBase";
import { heroEnter, motionEase, stagger } from "@/lib/motion";

const modules = [
  ["Data engine", "Online"],
  ["Reporting core", "Online"],
  ["Validation system", "Online"],
  ["Analyst profile", "Loaded"],
];

export function Hero() {
  const reduced = useReducedMotion();
  const github = knowledgeBase.social.links.find((item) => item.platform === "GitHub")?.url ?? "";
  const linkedin =
    knowledgeBase.social.links.find((item) => item.platform === "LinkedIn")?.url ?? "";
  return (
    <section
      id="top"
      className="relative scroll-mt-16 overflow-hidden border-b border-border pt-16 lg:min-h-[calc(100svh-1px)]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: motionEase }}
        className="control-grid pointer-events-none absolute inset-0"
      />
      <div className="data-stream pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-7 px-5 py-8 sm:px-8 sm:py-10 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.08fr_.92fr] lg:gap-10 lg:py-12">
        <div className="relative z-10 min-w-0">
          <motion.div
            variants={heroEnter(0)}
            initial="hidden"
            animate="visible"
            className="mb-5 flex items-center justify-between border-b border-border pb-3 font-mono text-[8px] font-bold uppercase tracking-[.14em] sm:hidden"
          >
            <span className="text-primary">Data intelligence lab</span>
            <span className="flex items-center gap-1 text-success">
              <Check className="h-3 w-3" /> Systems online
            </span>
          </motion.div>
          <motion.h1
            variants={heroEnter(0)}
            initial="hidden"
            animate="visible"
            className="font-display text-2xl font-bold uppercase sm:text-3xl"
          >
            Mahesh Kale
          </motion.h1>
          <motion.p
            variants={heroEnter(reduced ? 0 : 0.04)}
            initial="hidden"
            animate="visible"
            className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-primary"
          >
            Data Analyst <span className="text-muted-foreground">/</span> MIS Executive
          </motion.p>
          <motion.h2
            variants={heroEnter(reduced ? 0 : 0.08)}
            initial="hidden"
            animate="visible"
            className="mt-5 max-w-4xl font-display text-[2.35rem] font-bold uppercase leading-[.92] sm:text-[3.35rem] lg:text-[3.2rem] xl:text-[3.5rem]"
          >
            Turning business and operational data into{" "}
            <span className="text-primary">validated insights</span>, KPI reporting and
            decision-ready dashboards.
          </motion.h2>
          <motion.p
            variants={heroEnter(reduced ? 0 : 0.12)}
            initial="hidden"
            animate="visible"
            className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7"
          >
            SQL, Power BI, Advanced Excel and Python applied to reporting, validation,
            reconciliation and dashboard development.
          </motion.p>
          <motion.div
            variants={stagger(reduced ? 0 : 0.16, 0.03)}
            initial="hidden"
            animate="visible"
            className="mt-5 flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Core analytics tools"
          >
            {coreTools.map((tool) => (
              <motion.span
                key={tool}
                variants={heroEnter(0)}
                className="font-mono text-[9px] font-bold uppercase tracking-[.14em]"
              >
                <span className="mr-2 text-primary">●</span>
                {tool}
              </motion.span>
            ))}
          </motion.div>
          <motion.div
            variants={heroEnter(reduced ? 0 : 0.2)}
            initial="hidden"
            animate="visible"
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <a href="#projects">
                View my work <ArrowDown />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={knowledgeBase.resume.url} download={knowledgeBase.resume.filename}>
                <Download /> Download resume
              </a>
            </Button>
            {github && (
              <Button asChild variant="ghost" size="icon">
                <a href={github} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub">
                  <Github />
                </a>
              </Button>
            )}
            {linkedin && (
              <Button asChild variant="ghost" size="icon">
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open LinkedIn"
                >
                  <Linkedin />
                </a>
              </Button>
            )}
          </motion.div>
        </div>
        <motion.div
          variants={heroEnter(reduced ? 0 : 0.16)}
          initial="hidden"
          animate="visible"
          className="workstation-panel relative hidden min-w-0 overflow-hidden border-l border-t border-border bg-surface/75 p-4 sm:block sm:p-6 lg:h-full lg:max-h-[540px]"
        >
          <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-[9px] uppercase tracking-[.14em]">
            <span className="text-primary">Data intelligence lab</span>
            <span className="text-muted-foreground">Initializing...</span>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {modules.map(([title, detail], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduced ? 0 : 0.48 + index * 0.08, ease: motionEase }}
                className={`group grid grid-cols-[32px_1fr_auto] items-center border border-border bg-panel p-3 ${index > 1 ? "hidden lg:grid" : "grid"}`}
              >
                <span className="font-mono text-[8px] text-primary">0{index + 1}</span>
                <div>
                  <p className="font-display text-base font-bold uppercase">{title}</p>
                  <p className="mt-1 flex items-center gap-1 font-mono text-[8px] uppercase text-success">
                    <Check className="h-3 w-3" />
                    {detail}
                  </p>
                </div>
                <span className="h-2 w-2 bg-success" />
              </motion.div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-px bg-border text-center font-mono text-[8px] uppercase">
            <div className="bg-background p-3">
              <span className="text-muted-foreground">Input</span>
              <p className="mt-2 text-foreground">Raw data</p>
            </div>
            <div className="bg-background p-3">
              <span className="text-muted-foreground">Control</span>
              <p className="mt-2 text-primary">Validated</p>
            </div>
            <div className="bg-background p-3">
              <span className="text-muted-foreground">Output</span>
              <p className="mt-2 text-success">Report ready</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
