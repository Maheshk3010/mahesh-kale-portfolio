import { motion } from "motion/react";
import { ArrowUpRight, Github, ImageOff, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./Section";
import { knowledgeBase } from "@/mahi/knowledgeBase";
import { inView, revealLeft, revealScale, revealUp, stagger } from "@/lib/motion";

const primaryProjects = [
  {
    title: "Sales Dashboard (Power BI)",
    number: "01",
    type: "BI / Reporting",
    question:
      "How can sales stakeholders review revenue, orders and growth from one reporting view?",
    data: "SQL / Excel source structure documented; screenshot and source dataset await verification.",
    process: "Power Query transformation → relational model → KPI measures → interactive report.",
    tools: ["Power BI", "Excel", "SQL", "DAX", "Power Query"],
    output: "Interactive sales dashboard architecture.",
    finding: "Awaiting verified project findings.",
    result: "Awaiting verified business outcome.",
    evidence: "Repository currently does not verify the displayed Power BI project.",
  },
  {
    title: "Sales Performance Analysis (SQL)",
    number: "02",
    type: "SQL / Analysis",
    question:
      "Which revenue, product, customer and sales patterns can be isolated from retail transactions?",
    data: "50,000+ retail transaction records.",
    process: "30+ queries using joins, CTEs, aggregations and window functions.",
    tools: ["SQL", "CTEs", "Window Functions", "Data Analysis"],
    output: "Structured business-query analysis.",
    finding: "Awaiting verified project findings.",
    result: "Awaiting verified business outcome.",
    evidence: "Repository currently does not verify the displayed SQL project.",
  },
];

export function Projects() {
  const apple = knowledgeBase.projects.projects.find((p) => p.title.includes("Apple Stock"));
  const churn = knowledgeBase.projects.projects.find((p) => p.title.includes("Churn"));
  return (
    <Section
      id="projects"
      eyebrow="Section 03 / Evidence register"
      title="Selected analytics work"
      description="Selected projects demonstrating data analysis, SQL, BI, reporting and business-focused problem solving."
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
                  <span className="text-primary">Project / {project.number}</span>
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
                <ProjectField label="Analysis" value={project.process} />
                <motion.div variants={stagger(0, 0.04)} className="mt-6 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <motion.span key={tool} variants={revealUp} className="control-tag">
                      {tool}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div variants={revealScale} className={index % 2 ? "lg:order-1" : ""}>
                <div className="evidence-frame relative flex aspect-[16/10] items-center justify-center overflow-hidden border border-border bg-panel">
                  <div className="control-grid absolute inset-0 opacity-50" />
                  <div
                    className="evidence-scan absolute inset-x-0 top-0 h-px bg-primary"
                    aria-hidden="true"
                  />
                  <div className="relative max-w-xs text-center">
                    <ImageOff className="mx-auto h-7 w-7 text-primary" />
                    <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[.16em]">
                      Real project screenshot required
                    </p>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      No dashboard image is stored in the current project. This frame is reserved
                      for verified evidence.
                    </p>
                  </div>
                </div>
                <div className="grid border-x border-b border-border sm:grid-cols-2">
                  <ProjectField label="Output" value={project.output} compact />
                  <ProjectField label="Key findings" value={project.finding} compact />
                  <ProjectField label="Result" value={project.result} compact />
                  <div className="border-t border-border p-5 sm:border-l">
                    <p className="font-mono text-[8px] uppercase tracking-[.16em] text-primary">
                      Evidence
                    </p>
                    <p className="mt-3 flex gap-2 text-sm leading-6 text-muted-foreground">
                      <ShieldAlert className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      {project.evidence}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" disabled>
                        Case study pending
                      </Button>
                      <Button size="sm" variant="outline" disabled>
                        GitHub pending
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-20 grid border-y border-border lg:grid-cols-[.55fr_1.45fr]">
        <div className="border-b border-border py-6 lg:border-b-0 lg:border-r lg:pr-8">
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-primary">
            Portfolio gap / Reserved
          </p>
          <h3 className="mt-5 font-display text-3xl font-bold uppercase">ETL & MIS evidence</h3>
        </div>
        <div className="grid sm:grid-cols-2">
          <EvidenceSlot
            title="SQL data warehouse / ETL"
            note="No verified project record, repository, or output exists in the current portfolio."
          />
          <EvidenceSlot
            title="MIS reporting project"
            note="No verified project record, report, or screenshot exists in the current portfolio."
          />
        </div>
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
            {[apple, churn].filter(Boolean).map(
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
                    {index === 0 && project.github ? (
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

function EvidenceSlot({ title, note }: { title: string; note: string }) {
  return (
    <div className="border-b border-border p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <p className="font-mono text-[8px] uppercase tracking-[.16em] text-muted-foreground">
        Awaiting verified entry
      </p>
      <h4 className="mt-4 font-display text-xl font-bold uppercase">{title}</h4>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{note}</p>
    </div>
  );
}
