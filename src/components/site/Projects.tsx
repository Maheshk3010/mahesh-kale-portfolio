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
