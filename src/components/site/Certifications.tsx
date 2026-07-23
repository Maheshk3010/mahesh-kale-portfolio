import { motion } from "motion/react";
import { Section } from "./Section";
import { Award } from "lucide-react";

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Certifications — verified information only."
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="glass flex items-start gap-4 rounded-2xl p-5"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary">
          <Award className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <div className="text-sm font-semibold">No verified certifications yet</div>
          <div className="mt-1 text-xs text-muted-foreground">
            I don&apos;t have verified information regarding that topic.
            Certifications relevant to Data Analyst, Data Scientist, Python
            Developer and MIS Analyst roles will appear here once verified.
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
