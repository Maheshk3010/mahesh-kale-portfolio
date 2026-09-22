import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" eyebrow="08 / Professional snapshot" title="Behind the analysis">
      <div className="grid gap-8 border-y border-border py-8 lg:grid-cols-[.55fr_1.45fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[4/3] max-w-md overflow-hidden border border-border bg-panel"
        >
          <img
            src="/maheshkale_pic.jpeg"
            alt="Mahesh Kale, Data Analyst and MIS Executive candidate"
            width={640}
            height={480}
            loading="lazy"
            className="h-full w-full object-cover object-top grayscale-[20%]"
          />
          <div className="absolute inset-x-0 bottom-0 border-t border-border bg-background/90 px-4 py-3 backdrop-blur">
            <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.14em] text-muted-foreground">
              <MapPin className="h-3 w-3 text-primary" />
              Pune, Maharashtra, India
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col justify-center"
        >
          <p className="font-display text-2xl font-bold leading-9 sm:text-3xl">
            Computer Science background applied to analytics, reporting and business intelligence.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            Mahesh works across SQL analysis, Power BI reporting, Advanced Excel and Python-based
            data preparation. His focus is turning structured business questions into validated
            reporting outputs.
          </p>
          <p className="mt-6 font-mono text-[9px] uppercase tracking-[.16em] text-primary">
            Pune, Maharashtra, India
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
