import { motion } from "motion/react";
import { Section } from "./Section";
import { Award } from "lucide-react";

const certs = [
  { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2024" },
  { name: "Google Cloud Professional Data Engineer", issuer: "Google Cloud", year: "2024" },
  { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2023" },
  { name: "Kubernetes Certified Application Developer", issuer: "CNCF", year: "2023" },
];

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Credentials I earned, then applied."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {certs.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass flex items-center gap-4 rounded-2xl p-5"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary">
              <Award className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.issuer}</div>
            </div>
            <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground">
              {c.year}
            </span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
