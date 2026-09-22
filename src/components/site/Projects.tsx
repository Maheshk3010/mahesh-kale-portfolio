import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Github, ImageOff, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./Section";
import { knowledgeBase } from "@/mahi/knowledgeBase";
import { inView, revealLeft, revealScale, revealUp, stagger } from "@/lib/motion";

const primaryProjects = [
  {
    title: "Sales Performance Analysis",
    number: "01",
    type: "SQL / Business analysis",
    question: "Which revenue, product, customer and sales patterns can be isolated from retail transactions?",
    data: "50,000+ retail transaction records.",
    workflow: ["Clean", "Validate", "Query", "Compare", "Report"],
    process: "30+ business queries using joins, CTEs, aggregations and window functions.",
    tools: ["SQL", "CTEs", "Window Functions", "Data Analysis"],
    output: "Structured business-query analysis across retail transactions.",
    finding: "Awaiting verified project findings.",
    evidence: "No matching repository, screenshot or case-study file is stored in the current portfolio.",
  },
  {
    title: "Sales Dashboard",
    number: "02",
    type: "Power BI / Reporting",
    question: "How can sales stakeholders review revenue, orders and growth from one reporting view?",
    data: "SQL / Excel source structure documented; source dataset size is not verified.",
    workflow: ["Prepare", "Model", "Calculate", "Visualize", "Review"],
    process: "Power Query transformation → relational model → KPI measures → interactive report.",
    tools: ["Power BI", "Excel", "SQL", "DAX", "Power Query"],
    output: "Interactive sales dashboard architecture with KPI cards and slicers.",
    finding: "Awaiting verified project findings.",
    evidence: "No matching repository or dashboard screenshot is stored in the current portfolio.",
  },
  {
    title: "Customer Churn Analysis",
    number: "03",
    type: "Customer analytics / Supporting ML",
    question: "Which customer records show patterns associated with churn?",
    data: "7,000+ customer records.",
    workflow: ["Clean", "Prepare", "Compare", "Evaluate", "Explain"],
    process: "Python classification workflow covering cleaning, feature preparation, model comparison and evaluation.",
    tools: ["Python", "Pandas", "Scikit-learn", "Classification"],
    output: "An evaluated customer-churn classification workflow.",
    finding: "Awaiting verified project findings.",
    evidence: "The current portfolio has no verified matching repository, screenshot or live demo.",
  },
];

export function Projects() {
  const apple = knowledgeBase.projects.projects.find((p) => p.title.includes("Apple Stock"));
  return (
    <Section
      id="projects"
      eyebrow="03 / Evidence register"
      title="Selected case studies"
      description="Three analytical workstreams, structured around the question, data, method, output and current evidence state."
    >
      <div className="space-y-20">
        {primaryProjects.map((project, index) => (
          <motion.article
            key={project.title}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={stagger(0.04, 0.09)}
            className="project-case border-t border-border pt-5"
          >
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
              <motion.div variants={revealLeft} className={index % 2 ? "lg:order-2" : ""}>
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em]">
                  <span className="text-primary">Case / {project.number}</span>
                  <span className="text-muted-foreground">{project.type}</span>
                </div>
                <motion.h3
                  variants={revealUp}
                  className="mt-8 max-w-lg font-display text-4xl font-bold uppercase leading-[.95] sm:text-5xl"
                >
                  {project.title}
                </motion.h3>
                <ProjectField label="Business question" value={project.question} />
                <ProjectField label="Data" value={project.data} />
                <ProjectField label="Technical approach" value={project.process} />
                <motion.div variants={stagger(0, 0.04)} className="mt-6 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <motion.span key={tool} variants={revealUp} className="control-tag">
                      {tool}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div variants={revealScale} className={index % 2 ? "lg:order-1" : ""}>
                <div className="case-workflow border-x border-t border-border bg-surface px-5 py-4">
                  <p className="font-mono text-[8px] uppercase tracking-[.16em] text-primary">Workflow</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {project.workflow.map((step, stepIndex) => (
                      <div key={step} className="flex items-center gap-2">
                        <span className="font-mono text-[9px] font-bold uppercase">{step}</span>
                        {stepIndex < project.workflow.length - 1 && <ArrowDown className="h-3 w-3 -rotate-90 text-primary" />}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="evidence-frame relative flex aspect-[16/9] items-center justify-center overflow-hidden border border-border bg-panel">
                  <div className="control-grid absolute inset-0 opacity-50" />
                  <div
                    className="evidence-scan absolute inset-x-0 top-0 h-px bg-primary"
                    aria-hidden="true"
                  />
                  <div className="relative max-w-xs text-center">
                    <ImageOff className="mx-auto h-7 w-7 text-primary" />
                    <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[.16em]">
                      Evidence frame reserved
                    </p>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      No verified visual output is stored for this case study. This area will only display real project evidence.
                    </p>
                  </div>
                </div>
                <div className="grid border-x border-b border-border sm:grid-cols-2">
                  <ProjectField label="Business output" value={project.output} compact />
                  <ProjectField label="Key findings" value={project.finding} compact />
                  <div className="border-t border-border p-5 sm:col-span-2">
                    <p className="font-mono text-[8px] uppercase tracking-[.16em] text-primary">
                      Evidence
                    </p>
                    <p className="mt-3 flex gap-2 text-sm leading-6 text-muted-foreground">
                      <ShieldAlert className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      {project.evidence}
                    </p>
                    <span className="mt-4 inline-flex font-mono text-[8px] uppercase tracking-[.14em] text-muted-foreground">GitHub / Case study / Demo unavailable until verified</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-24 border-t border-border pt-5">
        <div className="grid gap-6 lg:grid-cols-[.55fr_1.45fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-primary">
              Additional technical work
            </p>
            <h3 className="mt-5 font-display text-3xl font-bold uppercase">Supporting analytics</h3>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Machine-learning projects remain secondary to the reporting and BI portfolio.
            </p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {[apple].filter(Boolean).map(
              (project, index) =>
                project && (
                  <div
                    key={project.title}
                    className="grid gap-4 py-6 sm:grid-cols-[40px_1fr_auto] sm:items-center"
                  >
                    <span className="font-mono text-[9px] text-primary">0{index + 1}</span>
                    <div>
                      <h4 className="font-display text-xl font-bold">{project.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    {project.github ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github />
                          GitHub
                          <ArrowUpRight />
                        </a>
                      </Button>
                    ) : (
                      <span className="font-mono text-[8px] uppercase tracking-[.14em] text-muted-foreground">
                        Evidence link unavailable
                      </span>
                    )}
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProjectField({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <motion.div
      variants={revealUp}
      className={`${compact ? "p-5" : "mt-7 border-t border-border pt-4"}`}
    >
      <p className="font-mono text-[8px] uppercase tracking-[.16em] text-primary">{label}</p>
      <p className="mt-2 text-sm leading-6 text-foreground/85">{value}</p>
    </motion.div>
  );
}

