import { motion } from "motion/react";
import { Section } from "./Section";
import { experience } from "@/mahi/portfolio";
import { inView, motionEase, revealLeft, revealUp, stagger } from "@/lib/motion";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="07 / Field record"
      title="Field log"
      description="Internship experience across data preparation, analytics, reporting and supporting Python development."
      className="fieldlog-scene"
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
          {experience.map((exp, index) => {
            const details = exp.deliverables?.length
              ? exp.deliverables
              : exp.responsibilities.slice(0, 4);
            return (
              <motion.article
                key={`${exp.company}-${exp.role}`}
                variants={stagger(index * 0.06, 0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
                className="relative grid gap-5 pl-12 sm:grid-cols-[64px_1fr] sm:pl-0"
              >
                <motion.div
                  variants={revealUp}
                  className="timeline-marker absolute left-3 top-1 h-3 w-3 border border-primary bg-background sm:left-[85px]"
                />
                <span className="hidden font-mono text-[9px] text-primary sm:block">
                  CH / 0{index + 1}
                </span>
                <motion.div variants={revealLeft} className="border-l border-border pl-6 sm:pl-10">
                  <div className="grid gap-6 border-b border-border pb-6 lg:grid-cols-[1fr_auto]">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[.14em] text-primary">
                        {exp.company}
                      </p>
                      <h3 className="mt-3 font-display text-3xl font-bold uppercase">{exp.role}</h3>
                    </div>
                    <div className="font-mono text-[9px] uppercase text-muted-foreground lg:text-right">
                      <span className="block text-primary">Date</span>
                      <span className="mt-2 block">
                        {exp.startDate && exp.endDate
                          ? `${exp.startDate} – ${exp.endDate}`
                          : exp.duration}
                      </span>
                      {exp.location && <span className="mt-2 block">{exp.location}</span>}
                    </div>
                  </div>
                  <div className="grid gap-8 py-6 md:grid-cols-[1.15fr_.85fr]">
                    <ExperienceColumn label="Work area & responsibilities" items={details} />
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[.14em] text-primary">
                        Tools
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.technologies.slice(0, 9).map((tool) => (
                          <span key={tool} className="control-tag">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function ExperienceColumn({ label, items }: { label: string; items: string[] }) {
  return (
    <motion.div variants={revealUp}>
      <p className="font-mono text-[8px] uppercase tracking-[.14em] text-primary">{label}</p>
      <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
        {items.map((item) => (
          <li key={item}>— {item}</li>
        ))}
      </ul>
    </motion.div>
  );
}
