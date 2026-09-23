import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Github, ImageOff, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./Section";
import { knowledgeBase } from "@/mahi/knowledgeBase";
import type { Project } from "@/mahi/types";
import { inView, revealLeft, revealScale, revealUp, stagger } from "@/lib/motion";

const statusLabels: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  planned: "Planned",
};

const evidenceLabels: Record<Project["evidenceState"], string> = {
  available: "Evidence Available",
  pending: "Evidence Pending",
};

const evidenceSlots = (project: Project) => [
  ["Screenshot", project.evidence.screenshot],
  ["Gallery", project.evidence.gallery.join(", ")],
  ["Dataset source", project.evidence.datasetSource],
  ["SQL artifact", project.evidence.sqlArtifact],
  ["Power BI artifact", project.evidence.powerBIArtifact],
  ["Excel artifact", project.evidence.excelArtifact],
  ["Project date", project.projectDate || project.evidence.projectDate],
  ["Ownership", project.ownership || project.evidence.ownership],
] as const;

export function Projects() {
  const featured = knowledgeBase.projects.projects.filter((project) => project.tier === "featured");
  const supporting = knowledgeBase.projects.projects.filter(
    (project) => project.tier === "supporting",
  );

  return (
    <Section
      id="projects"
      eyebrow="03 / Project portfolio"
      title="Analytics work register"
      description="Data Analyst and MIS work ordered by market relevance, with delivery status kept separate from evidence availability."
    >
      <div className="space-y-20">
        {featured.map((project, index) => (
          <ProjectCase key={project.title} project={project} reverse={index % 2 === 1} />
        ))}
      </div>

      <div className="mt-24 border-t border-border pt-5">
        <div className="grid gap-8 lg:grid-cols-[.55fr_1.45fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-primary">
              Supporting analytical work
            </p>
            <h3 className="mt-5 font-display text-3xl font-bold uppercase">
              Secondary projects
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Customer analytics and machine-learning work remain secondary to the Data Analyst and
              MIS portfolio.
            </p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {supporting.map((project) => (
              <article
                key={project.title}
                className="grid gap-5 py-6 sm:grid-cols-[56px_1fr_auto] sm:items-center"
              >
                <span className="font-mono text-[9px] text-primary">{project.number}</span>
                <div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={project.status} />
                    <EvidenceBadge state={project.evidenceState} />
                  </div>
                  <h4 className="mt-4 font-display text-xl font-bold">{project.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                  <p className="mt-3 font-mono text-[8px] uppercase tracking-[.12em] text-muted-foreground">
                    {project.technologies.join(" · ")}
                  </p>
                </div>
                {project.github ? (
                  <Button asChild variant="outline" size="sm">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github /> GitHub <ArrowUpRight />
                    </a>
                  </Button>
                ) : (
                  <span className="font-mono text-[8px] uppercase tracking-[.14em] text-muted-foreground">
                    GitHub pending
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProjectCase({ project, reverse }: { project: Project; reverse: boolean }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={stagger(0.04, 0.09)}
      className="project-case border-t border-border pt-5"
    >
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <motion.div variants={revealLeft} className={reverse ? "lg:order-2" : ""}>
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.16em]">
            <span className="text-primary">Case / {project.number}</span>
            <span className="text-muted-foreground">{project.category}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <StatusBadge status={project.status} />
            <EvidenceBadge state={project.evidenceState} />
          </div>
          <motion.h3
            variants={revealUp}
            className="mt-7 max-w-xl font-display text-4xl font-bold uppercase leading-[.95] sm:text-5xl"
          >
            {project.title}
          </motion.h3>
          <ProjectField label="Business question" value={project.problem} />
          <ProjectField label="Data" value={project.data} />
          <ProjectField label="Technical approach" value={project.solution} />
          <motion.div variants={stagger(0, 0.04)} className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tool) => (
              <motion.span key={tool} variants={revealUp} className="control-tag">
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={revealScale} className={reverse ? "lg:order-1" : ""}>
          <div className="case-workflow border-x border-t border-border bg-surface px-5 py-4">
            <p className="font-mono text-[8px] uppercase tracking-[.16em] text-primary">Workflow</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {project.workflow.map((step, stepIndex) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="font-mono text-[9px] font-bold uppercase">{step}</span>
                  {stepIndex < project.workflow.length - 1 && (
                    <ArrowDown className="h-3 w-3 -rotate-90 text-primary" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="evidence-frame relative flex aspect-[16/9] items-center justify-center overflow-hidden border border-border bg-panel">
            <div className="control-grid absolute inset-0 opacity-50" />
            <div className="evidence-scan absolute inset-x-0 top-0 h-px bg-primary" aria-hidden="true" />
            <div className="relative max-w-xs px-5 text-center">
              <ImageOff className="mx-auto h-7 w-7 text-primary" />
              <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[.16em]">
                {evidenceLabels[project.evidenceState]}
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {project.evidenceNote}
              </p>
            </div>
          </div>
          <div className="grid border-x border-b border-border sm:grid-cols-2">
            <ProjectField label="KPIs" value={project.kpis.join(" · ")} compact />
            <ProjectField label="Output" value={project.description} compact />
            <ProjectField label="Key findings" value={project.keyFindings.join(" · ")} compact />
            <ProjectField label="Business outcome" value={project.outcome} compact />
            <div className="border-t border-border p-5 sm:col-span-2">
              <p className="font-mono text-[8px] uppercase tracking-[.16em] text-primary">Evidence</p>
              <p className="mt-3 flex gap-2 text-sm leading-6 text-muted-foreground">
                <ShieldAlert className="mt-1 h-4 w-4 shrink-0 text-primary" />
                {project.evidenceNote}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ProjectLink label="GitHub" href={project.github} icon="github" />
                <ProjectLink label="Live demo" href={project.demo} />
              </div>
            </div>
            <details className="evidence-slots border-t border-border p-5 sm:col-span-2">
              <summary className="cursor-pointer font-mono text-[8px] font-bold uppercase tracking-[.16em] text-primary">
                Evidence register
              </summary>
              <div className="mt-4 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
                {evidenceSlots(project).map(([label, value]) => (
                  <div key={label} className="min-h-20 bg-background p-3">
                    <span className="block font-mono text-[7px] uppercase tracking-[.12em] text-muted-foreground">
                      {label}
                    </span>
                    {value && <span className="mt-2 block text-xs text-foreground">{value}</span>}
                  </div>
                ))}
              </div>
            </details>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  return (
    <span className="inline-flex border border-border bg-surface px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-[.14em] text-foreground">
      Status / {statusLabels[status]}
    </span>
  );
}

function EvidenceBadge({ state }: { state: Project["evidenceState"] }) {
  return (
    <span className="inline-flex border border-primary/40 bg-primary/5 px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-[.14em] text-primary">
      {evidenceLabels[state]}
    </span>
  );
}

function ProjectLink({ label, href, icon }: { label: string; href: string; icon?: "github" }) {
  if (!href) {
    return (
      <span className="inline-flex h-8 items-center border border-border px-3 font-mono text-[8px] uppercase tracking-[.12em] text-muted-foreground">
        {label} / Pending
      </span>
    );
  }
  return (
    <Button asChild variant="outline" size="sm">
      <a href={href} target="_blank" rel="noopener noreferrer">
        {icon === "github" && <Github />} {label} <ArrowUpRight />
      </a>
    </Button>
  );
}

function ProjectField({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <motion.div variants={revealUp} className={compact ? "min-h-28 border-t border-border p-5" : "mt-7 border-t border-border pt-4"}>
      <p className="font-mono text-[8px] uppercase tracking-[.16em] text-primary">{label}</p>
      {value && <p className="mt-2 text-sm leading-6 text-foreground/85">{value}</p>}
    </motion.div>
  );
}