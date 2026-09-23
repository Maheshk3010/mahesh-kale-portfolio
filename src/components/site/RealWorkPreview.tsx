import { motion } from "motion/react";
import { Section } from "./Section";
import { ProjectWorkflow } from "./ProjectWorkflow";
import { projects } from "@/mahi/portfolio";
import { revealScale } from "@/lib/motion";

export function RealWorkPreview() {
  const project = projects.find((item) => item.number === "01");
  if (!project) return null;

  return (
    <Section
      id="work-preview"
      eyebrow="04 / Real workspace"
      title="Real workspace"
      description="A direct view into the reporting workflow behind Sales Performance Intelligence."
      className="workspace-scene"
    >
      <motion.article variants={revealScale} className="work-preview bg-surface">
        <div className="grid gap-px bg-border md:grid-cols-4">
          {[
            ["Project", project.title],
            ["Input", project.data],
            ["Process", "SQL → KPI → Power BI"],
            ["Output", "Management dashboard"],
          ].map(([label, value]) => (
            <div key={label} className="bg-background p-5">
              <p className="font-mono text-[8px] uppercase tracking-[.14em] text-primary">
                {label}
              </p>
              <p className="mt-3 text-sm font-bold uppercase leading-6">{value}</p>
            </div>
          ))}
        </div>
        <ProjectWorkflow project={project} />
      </motion.article>
    </Section>
  );
}
