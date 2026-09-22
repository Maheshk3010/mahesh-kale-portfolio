import { motion } from "motion/react";
import { Section } from "./Section";
import { Briefcase } from "lucide-react";
import { knowledgeBase } from "@/mahi/knowledgeBase";

export function Experience() {
  const items = knowledgeBase.experience.experience;

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Verified internship experience."
      description="Hands-on internships across Data Science, Data Analytics and Python Development — aligned to Data Analyst, Data Scientist, Python Developer and MIS Analyst roles."
    >
      <div className="grid gap-5">
        {items.map((exp, i) => (
          <motion.article
            key={`${exp.company}-${exp.role}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass-panel flex items-start gap-4 rounded-lg p-6 md:p-7"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary">
              <Briefcase className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight">
                  {exp.role}
                </h3>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {exp.duration}
                </span>
              </div>
              <p className="text-sm text-primary/90">{exp.company}</p>

              <ul className="mt-3 grid gap-1.5 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
                {exp.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              {exp.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
