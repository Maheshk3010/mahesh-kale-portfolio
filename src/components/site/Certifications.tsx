import { motion } from "motion/react";
import { Section } from "./Section";
import { knowledgeBase } from "@/mahi/knowledgeBase";
import { inView, revealUp, stagger } from "@/lib/motion";

export function Certifications() {
  const education = knowledgeBase.education.education;
  const certs = knowledgeBase.certifications.certifications;
  return (
    <Section id="education" eyebrow="07 / Qualification record" title="Education & credentials">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="pb-5 font-mono text-[9px] uppercase tracking-[.16em] text-primary">
            Academic education & professional training
          </p>
          {education.map((entry, i) => (
            <motion.article
              key={entry.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="grid border-t border-border py-6 sm:grid-cols-[80px_1fr]"
            >
              <span className="font-mono text-[9px] text-primary">
                {i === 0 ? "ED" : "TR"} / 0{i + 1}
              </span>
              <div>
                <p className="mb-2 font-mono text-[8px] uppercase tracking-[.14em] text-muted-foreground">
                  {i === 0 ? "Formal education" : "Professional training"}
                </p>
                <h3 className="font-display text-2xl font-bold uppercase">{entry.degree}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{entry.university}</p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[.14em] text-foreground">
                  {entry.graduationYear}
                  {entry.grade ? ` · ${entry.grade}` : ""}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="border-t border-border"
        >
          <div className="py-5 font-mono text-[9px] uppercase tracking-[.16em] text-primary">
            Credentials
          </div>
          {certs.map((cert, i) => (
            <motion.div
              variants={revealUp}
              key={cert.name}
              className="credential-row grid grid-cols-[28px_1fr] border-t border-border py-4"
            >
              <span className="font-mono text-[8px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-sm font-bold">{cert.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Issuer: {cert.organization} · {cert.year || "Year pending"} ·{" "}
                  {cert.verification ? "Verification link available" : "Verification link pending"}{" "}
                  · Credential ID pending
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
