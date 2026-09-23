import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./Section";
import { ProjectWorkflow } from "./ProjectWorkflow";
import { projects } from "@/mahi/portfolio";
import type { Project } from "@/mahi/types";
import { inView, revealLeft, revealScale, revealUp, stagger } from "@/lib/motion";

export function Projects() {
  const featured = projects.filter((project) => project.tier === "featured");
  const supporting = projects.filter((project) => project.tier === "supporting");
  return (
    <Section
      id="projects"
      eyebrow="05 / Investigation archive"
      title="Case files"
      description="Business-focused analytical records across sales intelligence, SQL & ETL, MIS operations, customer retention and predictive analytics."
      className="casefiles-scene"
    >
      <div className="space-y-16 md:space-y-24">
        {featured.map((project, index) => (
          <ProjectCase key={project.title} project={project} reverse={index % 2 === 1} />
        ))}
      </div>
      <div className="mt-16 grid gap-8 border-t border-border pt-6 md:mt-24 lg:grid-cols-[.55fr_1.45fr]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.16em] text-primary">
            Supporting technical work
          </p>
          <h3 className="mt-5 font-display text-3xl font-bold uppercase">Technical depth</h3>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Focused machine-learning implementations that remain secondary to the analytics and MIS
            portfolio.
          </p>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {supporting.map((project) => (
            <article
              key={project.title}
              className="grid gap-5 py-6 sm:grid-cols-[48px_1fr_auto] sm:items-center"
            >
              <span className="font-mono text-[9px] text-primary">{project.number}</span>
              <div>
                <h4 className="font-display text-xl font-bold uppercase">{project.title}</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>
                <p className="mt-3 font-mono text-[8px] uppercase tracking-[.1em] text-muted-foreground">
                  {project.technologies.join(" · ")}
                </p>
              </div>
              {project.github && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github /> GitHub <ArrowUpRight />
                  </a>
                </Button>
              )}
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProjectCase({ project, reverse }: { project: Project; reverse: boolean }) {
  const fields = [
    ["Business question", project.problem],
    ["Data", project.data],
  ].filter(([, value]) => value);
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={stagger(0.04, 0.08)}
      className="project-case scroll-mt-20 border-t border-border pt-5"
    >
      <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr]">
        <motion.div variants={revealLeft} className={reverse ? "lg:order-2" : ""}>
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.14em]">
            <span className="text-primary">Case {project.number}</span>
            <span className="text-muted-foreground">{project.category}</span>
          </div>
          <h3 className="mt-7 max-w-xl font-display text-4xl font-bold uppercase leading-[.98] sm:text-5xl">
            {project.title}
          </h3>
          <div className="mt-7 divide-y divide-border border-y border-border">
            {fields.slice(0, 3).map(([label, value]) => (
              <ProjectField key={label} label={label} value={value} />
            ))}
          </div>
          <div className="mt-6">
            <p className="font-mono text-[8px] uppercase tracking-[.14em] text-primary">
              Tech stack
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tool) => (
                <span key={tool} className="control-tag">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          {project.github && (
            <div className="mt-7">
              <Button asChild size="lg">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github /> View GitHub <ArrowUpRight />
                </a>
              </Button>
            </div>
          )}
        </motion.div>
        <motion.div variants={revealScale} className={reverse ? "lg:order-1" : ""}>
          <div className="case-workflow border-x border-t border-border bg-surface px-5 py-4">
            <p className="font-mono text-[8px] uppercase tracking-[.14em] text-primary">
              Analytical workflow
            </p>
          </div>
          <ProjectWorkflow project={project} />
          <div className="grid border-x border-b border-border sm:grid-cols-2">
            <ProjectField
              label="Key output"
              value={project.output || project.description}
              compact
            />
            <ProjectField
              label="Insight focus"
              value={project.keyFindings.join(" · ") || project.features.join(" · ")}
              compact
            />
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

function ProjectField({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string | string[];
  compact?: boolean;
}) {
  return (
    <motion.div
      variants={revealUp}
      className={compact ? "min-h-28 border-t border-border p-5" : "py-4"}
    >
      <p className="font-mono text-[8px] uppercase tracking-[.14em] text-primary">{label}</p>
      <p className="mt-2 text-sm leading-6 text-foreground/85">{value}</p>
    </motion.div>
  );
}
