import { motion } from "motion/react";
import { Section } from "./Section";
import { knowledgeBase } from "@/mahi/knowledgeBase";
import { inView, motionEase, revealLeft, revealUp, stagger } from "@/lib/motion";

export function Experience() {
  const items = knowledgeBase.experience.experience;
  return (
    <Section
      id="experience"
      eyebrow="Section 06 / Work log"
      title="Field experience"
      description="Three internship chapters. Responsibilities are shown as recorded; missing dates and outcomes remain unclaimed."
    >
      <div className="relative border-t border-border pt-8">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: motionEase }}
          className="absolute bottom-0 left-[17px] top-8 w-px origin-top bg-primary/60 sm:left-[91px]"
        />
        <div className="space-y-14">
          {items.map((exp, i) => (
            <motion.article
              key={`${exp.company}-${exp.role}`}
              variants={stagger(i * 0.06, 0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              className="relative grid gap-5 pl-12 sm:grid-cols-[64px_1fr] sm:pl-0"
            >
              <motion.div variants={revealUp} className="timeline-marker absolute left-3 top-1 h-3 w-3 border border-primary bg-background sm:left-[85px]" />
              <span className="hidden font-mono text-[9px] text-primary sm:block">
                CH / 0{i + 1}
              </span>
              <motion.div variants={revealLeft} className="border-l border-border pl-6 sm:pl-10">
                <div className="grid gap-6 border-b border-border pb-6 lg:grid-cols-[1fr_auto]">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[.16em] text-primary">
                      {exp.company}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-bold uppercase">{exp.role}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-5 font-mono text-[9px] uppercase text-muted-foreground lg:text-right">
                    <div>
                      <span className="block text-primary">Dates</span>
                      <span className="mt-2 block">Awaiting verification</span>
                    </div>
                    <div>
                      <span className="block text-primary">Location</span>
                      <span className="mt-2 block">
                        {exp.company.includes("Pune") ? "Pune" : "Awaiting verification"}
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div variants={stagger(0.05, 0.08)} className="grid gap-8 py-6 md:grid-cols-[1.4fr_.6fr]">
                  <ExperienceColumn
                    label="What I worked on"
                    items={exp.responsibilities.slice(0, 4)}
                  />
                  <ExperienceColumn
                    label="Documented deliverables"
                    items={
                      exp.achievements.length
                        ? exp.achievements
                        : ["Awaiting verified deliverables"]
                    }
                  />
                </motion.div>
                <motion.div variants={stagger(0, 0.04)} className="flex flex-wrap gap-2">
                  {exp.technologies.slice(0, 8).map((tool) => (
                    <motion.span key={tool} variants={revealUp} className="control-tag">
                      {tool}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ExperienceColumn({ label, items }: { label: string; items: string[] }) {
  return (
    <motion.div variants={revealUp}>
      <p className="font-mono text-[8px] uppercase tracking-[.16em] text-primary">{label}</p>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
        {items.length ? (
          items.map((item) => <li key={item}>— {item}</li>)
        ) : (
          <li>— Awaiting verified information</li>
        )}
      </ul>
    </motion.div>
  );
}
