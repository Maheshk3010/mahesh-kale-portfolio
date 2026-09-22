import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Github, X } from "lucide-react";
import { Section } from "./Section";
import { knowledgeBase } from "@/mahi/knowledgeBase";
import type { Project } from "@/mahi/types";

const proofByProject: Record<string, { value: string; label: string }[]> = {
  "Sales Performance Analysis (SQL)": [
    { value: "50K+", label: "Retail records" },
    { value: "30+", label: "Optimized queries" },
  ],
  "Sales Dashboard (Power BI)": [
    { value: "DAX", label: "Business measures" },
    { value: "ETL", label: "Power Query" },
  ],
  "Customer Churn Prediction": [
    { value: "7K+", label: "Customer records" },
    { value: "ML", label: "Classification" },
  ],
  "Apple Stock Price Prediction": [
    { value: "LSTM", label: "Deep learning" },
    { value: "LIVE", label: "Streamlit app" },
  ],
};

export function Projects() {
  const projects = knowledgeBase.projects.projects.filter((project) => project.github);
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Section id="projects" eyebrow="Selected work" title="Completed projects. Measurable proof." description="Production-ready analysis, business intelligence, and machine-learning work with direct source access.">
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article key={project.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.5, delay: index * 0.08 }} className="glass-panel group flex min-h-[340px] flex-col rounded-lg p-6 transition-transform hover:-translate-y-1">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">Project 0{index + 1} · Complete</p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight">{project.title}</h3>
              </div>
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-label="Completed project" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              {(proofByProject[project.title] ?? []).map((proof) => (
                <div key={proof.label} className="rounded-md border border-border bg-panel p-3">
                  <p className="font-mono text-xl font-bold text-foreground">{proof.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{proof.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm leading-7 text-muted-foreground">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((technology, badgeIndex) => (
                <motion.span key={technology} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 + badgeIndex * 0.035 }} className="tech-badge">{technology}</motion.span>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-4 pt-7">
              <button type="button" onClick={() => setActive(project)} className="text-sm font-bold text-primary transition-colors hover:text-accent">View case study</button>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">GitHub <ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {active && <ProjectDialog project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </Section>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-background/85 p-4 backdrop-blur-md" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${project.title} case study`}>
      <motion.article initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} onClick={(event) => event.stopPropagation()} className="glass-panel relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-lg p-6 md:p-8">
        <button type="button" onClick={onClose} aria-label="Close case study" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-md border border-border bg-panel text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-success">Completed project</p>
        <h3 className="mt-3 pr-12 font-display text-3xl font-bold">{project.title}</h3>
        <Detail title="Business problem">{project.problem}</Detail>
        <Detail title="Technical solution">{project.solution}</Detail>
        <Detail title="Outcome">{project.outcome}</Detail>
        <div className="mt-6 flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="tech-badge">{technology}</span>)}</div>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground"><Github className="h-4 w-4" /> View source on GitHub <ArrowUpRight className="h-4 w-4" /></a>
      </motion.article>
    </motion.div>
  );
}

function Detail({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="mt-7 border-t border-border pt-5"><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{title}</p><p className="mt-2 text-sm leading-7 text-foreground/90">{children}</p></div>;
}