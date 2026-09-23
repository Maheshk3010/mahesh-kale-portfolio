import { motion } from "motion/react";
import { Section } from "./Section";
import { ProjectWorkflow } from "./ProjectWorkflow";
import { projects } from "@/mahi/portfolio";
import { revealScale } from "@/lib/motion";

export function RealWorkPreview() {
  return (
    <Section
      id="work-preview"
      eyebrow="04 / Analytical workspace"
      title="Real work preview"
       description="A direct view into the analytical flows used across sales intelligence, data engineering, MIS reporting and customer analytics."
    >
       <div className="grid gap-5 lg:grid-cols-2">
         {projects.filter((project) => project.tier === "featured").slice(0, 4).map((project) => (
           <motion.article key={project.title} variants={revealScale} className="work-preview bg-surface">
             <div className="flex min-h-20 items-center justify-between gap-5 border-x border-t border-border px-5 py-4">
               <div>
                 <p className="font-mono text-[8px] uppercase tracking-[.14em] text-primary">Workstream / {project.number}</p>
                 <h3 className="mt-2 font-display text-lg font-bold uppercase">{project.title}</h3>
               </div>
               <span className="hidden font-mono text-[8px] uppercase text-muted-foreground sm:block">{project.category}</span>
             </div>
             <ProjectWorkflow project={project} compact />
           </motion.article>
         ))}
       </div>
    </Section>
  );
}
