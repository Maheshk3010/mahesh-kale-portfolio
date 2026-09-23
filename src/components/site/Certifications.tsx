import { motion } from "motion/react";
import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { Section } from "./Section";
import { credentials, education } from "@/mahi/portfolio";
import { inView, revealUp, stagger } from "@/lib/motion";

export function Certifications() {
  return (
    <Section
      id="credentials"
      eyebrow="09 / Qualification record"
      title="Credential archive"
      description="Formal education, professional training and documented credentials."
      className="archive-scene"
    >
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div className="border-t border-border">
          {education.map((entry, index) => (
            <motion.article
              key={entry.degree}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              variants={revealUp}
              className="border-b border-border py-6"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="font-mono text-[8px] uppercase tracking-[.14em] text-primary">
                  {index === 0 ? "Formal education" : "Professional training"}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold uppercase">{entry.degree}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{entry.university}</p>
              <p className="mt-2 font-mono text-[9px] uppercase">
                {entry.graduationYear}
                {entry.grade ? ` · ${entry.grade}` : ""}
              </p>
            </motion.article>
          ))}
        </div>
        <motion.div
          variants={stagger(0.03, 0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="grid sm:grid-cols-2"
        >
          {credentials.map((cert, index) => (
            <motion.article
              key={cert.name}
              variants={revealUp}
              className="credential-row border border-border p-5"
            >
              <div className="flex items-center justify-between">
                <Award className="h-4 w-4 text-primary" />
                <span className="font-mono text-[8px] text-muted-foreground">
                  CR / {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-7 text-base font-bold">{cert.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {cert.organization} · {cert.year}
              </p>
              {cert.verification && (
                <a
                  href={cert.verification}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-mono text-[9px] uppercase text-primary"
                >
                  Verify <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
