import { motion } from "motion/react";
import { Section } from "./Section";
import { Award, GraduationCap } from "lucide-react";
import { knowledgeBase } from "@/mahi/knowledgeBase";

export function Certifications() {
  const certs = knowledgeBase.certifications.certifications;
  const education = knowledgeBase.education.education;

  return (
    <Section
      id="certifications"
      eyebrow="Education & Certifications"
      title="Verified academic and professional credentials."
    >
      <div className="grid gap-8">
        {education.length > 0 && (
          <div className="grid gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Education
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {education.map((e, i) => (
                <motion.div
                  key={`${e.university}-${e.degree}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="glass flex items-start gap-4 rounded-2xl p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold leading-snug">
                      {e.degree}
                    </div>
                    <div className="mt-0.5 text-xs text-primary/90">
                      {e.university}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {e.graduationYear}
                      {e.grade ? ` · ${e.grade}` : ""}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {certs.length > 0 && (
          <div className="grid gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Certifications
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {certs.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="glass flex items-start gap-4 rounded-2xl p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary">
                    <Award className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold leading-snug">
                      {c.name}
                    </div>
                    <div className="mt-0.5 text-xs text-primary/90">
                      {c.organization}
                    </div>
                    {c.year && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        {c.year}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
