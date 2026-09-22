import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import social from "@/mahi/knowledge/social.json";
import { heroEnter, motionEase, stagger } from "@/lib/motion";

const pipeline = ["Raw data", "Validate", "Analyze", "KPI", "Dashboard", "Report"];
const stack = ["SQL", "Power BI", "Advanced Excel", "Python"];
const queryRows = [
  "SELECT revenue, region",
  "FROM sales_records",
  "WHERE quality_flag = 'valid'",
  "GROUP BY region;",
];

export function Hero() {
  const github = social.links.find((item) => item.platform === "GitHub")?.url ?? "";
  const linkedin = social.links.find((item) => item.platform === "LinkedIn")?.url ?? "";
  return (
    <section
      id="top"
      className="relative min-h-[92svh] overflow-hidden border-b border-border pt-16"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: motionEase }}
        className="control-grid pointer-events-none absolute inset-0"
      />
      <div className="data-stream pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-data-paths pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="hero-data-path hero-data-path-a" />
        <span className="hero-data-path hero-data-path-b" />
        <span className="hero-data-path hero-data-path-c" />
      </div>
      <div className="mx-auto grid min-h-[calc(92svh-4rem)] min-w-0 max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(400px,.92fr)] lg:py-16">
        <div className="relative z-10 min-w-0">
          <motion.div
            variants={heroEnter(0.04)}
            initial="hidden"
            animate="visible"
            className="mb-8 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="h-px w-10 bg-primary" />
            Profile / Analytics operations
          </motion.div>
          <motion.p
            variants={heroEnter(0.09)}
            initial="hidden"
            animate="visible"
            className="font-display text-xl font-bold uppercase tracking-normal text-foreground sm:text-2xl"
          >
            Mahesh Kale
          </motion.p>
          <motion.p
            variants={heroEnter(0.14)}
            initial="hidden"
            animate="visible"
            className="mt-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-primary"
          >
            Data Analyst <span className="text-muted-foreground">|</span> MIS Executive
          </motion.p>
          <motion.h1
            variants={heroEnter(0.18)}
            initial="hidden"
            animate="visible"
            className="mt-4 max-w-4xl font-display text-[clamp(3.25rem,8vw,7rem)] font-bold uppercase leading-[0.84] tracking-normal"
          >
            Data
            <br />
            <span className="text-primary">Analyst</span>
          </motion.h1>
          <motion.p
            variants={heroEnter(0.23)}
            initial="hidden"
            animate="visible"
            className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground sm:text-sm"
          >
            MIS <span className="mx-2 text-primary">•</span> Reporting{" "}
            <span className="mx-2 text-primary">•</span> BI
          </motion.p>
          <motion.p
            variants={heroEnter(0.28)}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            SQL, Power BI, Advanced Excel and Python for data analysis, reporting, dashboards and
            business performance insights.
          </motion.p>

          <motion.div
            variants={stagger(0.32, 0.05)}
            initial="hidden"
            animate="visible"
            className="mt-5 flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Core analytics tools"
          >
            {stack.map((tool) => (
              <motion.span
                key={tool}
                variants={heroEnter(0)}
                className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-foreground"
              >
                <span className="mr-2 text-primary">●</span>
                {tool}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            variants={heroEnter(0.43)}
            initial="hidden"
            animate="visible"
            className="mt-8 flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button asChild size="lg" className="h-12 uppercase">
              <a href="#projects">
                View my work <ArrowDown />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              disabled
              title="Resume file awaiting verification"
              className="h-12 uppercase"
            >
              <Download /> Download resume
            </Button>
            <div className="flex gap-3">
              {github && (
                <Button asChild variant="ghost" size="icon" className="h-12 w-12">
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open GitHub"
                  >
                    <Github />
                  </a>
                </Button>
              )}
              {linkedin && (
                <Button asChild variant="ghost" size="icon" className="h-12 w-12">
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
            </div>
          </motion.div>

          <motion.div
            variants={heroEnter(0.5)}
            initial="hidden"
            animate="visible"
            className="mt-10 flex items-center gap-4 border-t border-border pt-4"
          >
            <span className="font-mono text-[8px] uppercase tracking-[.16em] text-muted-foreground">
              Work focus
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[.12em] text-foreground">
              Analytics · MIS · Reporting · Dashboards
            </span>
          </motion.div>
        </div>

        <motion.div
          variants={heroEnter(0.3)}
          initial="hidden"
          animate="visible"
          className="workstation-panel relative min-w-0 overflow-hidden border-l border-t border-border bg-surface/70 p-4 sm:min-h-[510px] sm:p-6"
        >
          <div className="flex items-center justify-between border-b border-border pb-3 font-mono text-[9px] uppercase tracking-[0.16em]">
            <span className="text-primary">Analytics workstation</span>
            <span className="text-success">● Active</span>
          </div>
          <div className="mt-5 grid grid-cols-[1.2fr_.8fr] gap-3">
            <div className="border border-border bg-panel p-4">
              <span className="font-mono text-[8px] uppercase text-muted-foreground">
                Query / Sales validation
              </span>
              <div className="mt-5 space-y-3 font-mono text-[10px] text-foreground/80">
                {queryRows.map((row, i) => (
                  <motion.div
                    key={row}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.56 + i * 0.08, ease: motionEase }}
                  >
                    <span className="mr-3 text-primary">{String(i + 1).padStart(2, "0")}</span>
                    {row}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              <div className="border border-primary/30 bg-primary/5 p-4">
                <div className="font-mono text-[8px] uppercase text-muted-foreground">
                  Data quality
                </div>
                <div className="mt-3 font-display text-3xl font-bold">VALID</div>
              </div>
              <div className="border border-border bg-panel p-4">
                <div className="font-mono text-[8px] uppercase text-muted-foreground">
                  Report state
                </div>
                <div className="mt-3 font-display text-xl font-bold text-primary">READY</div>
              </div>
            </div>
          </div>
          <div className="mt-3 border border-border bg-panel p-4">
            <div className="flex items-center justify-between font-mono text-[8px] uppercase text-muted-foreground">
              <span>Validation sequence</span>
              <span>Checks / 04</span>
            </div>
            <div className="mt-4 grid gap-px bg-border sm:grid-cols-4">
              {["Schema", "Nulls", "Duplicates", "Types"].map((check, i) => (
                <motion.div
                  key={check}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.72 + i * 0.07 }}
                  className="bg-background px-3 py-3 font-mono text-[8px] uppercase text-foreground"
                >
                  <span className="mr-2 text-success">✓</span>
                  {check}
                </motion.div>
              ))}
            </div>
          </div>
          <div
            className="mt-3 overflow-hidden border-y border-border py-5"
            aria-label="Analytics pipeline"
          >
            <motion.div
              variants={stagger(0.62, 0.08)}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-y-4 sm:grid-cols-3"
            >
              {pipeline.map((step, i) => (
                <motion.div
                  key={step}
                  variants={heroEnter(0)}
                  className="flex min-w-0 items-center"
                >
                  <span className="px-2 font-mono text-[8px] font-bold uppercase tracking-[0.12em] sm:px-3">
                    {step}
                  </span>
                  {i < pipeline.length - 1 && (
                    <ArrowUpRight className="h-3 w-3 shrink-0 text-primary" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 font-mono text-[9px] uppercase">
            <div className="border-l-2 border-primary pl-3">
              <span className="text-muted-foreground">Tools</span>
              <p className="mt-1 text-foreground">SQL · Power BI · Excel · Python</p>
            </div>
            <div className="border-l-2 border-accent pl-3">
              <span className="text-muted-foreground">Output</span>
              <p className="mt-1 text-foreground">KPI · Dashboard · Report</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
