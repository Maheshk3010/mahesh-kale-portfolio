import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { Section } from "./Section";
import { inView, revealUp, stagger } from "@/lib/motion";

const process = ["Understand", "Prepare", "Validate", "Analyze", "Visualize", "Communicate"];

export function About() {
  return (
    <Section id="about" eyebrow="Section 08 / Operator profile" title="Behind the analysis">
      <div className="grid gap-8 border-y border-border py-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[4/3] overflow-hidden border border-border bg-panel"
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
            Mahesh Kale is a Computer Science graduate focused on data analysis, MIS reporting and
            business intelligence.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            His documented work spans SQL analysis, Power BI reporting, Advanced Excel, Python-based
            data preparation and three internships across data and software workflows. Supporting
            machine-learning projects extend that technical foundation without defining the primary
            role focus.
          </p>
          <div className="mt-8 grid gap-px bg-border sm:grid-cols-3">
            <Fact label="Degree" value="B.Sc. Computer Science" />
            <Fact label="Field exposure" value="3 internships" />
            <Fact label="Primary roles" value="Data Analyst · MIS Executive" />
          </div>
          <motion.div
            variants={stagger(0.08, 0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="analysis-sequence mt-8 grid grid-cols-2 gap-px bg-border sm:grid-cols-3 xl:grid-cols-6"
          >
            {process.map((step, i) => (
              <motion.div key={step} variants={revealUp} className="bg-background p-3">
                <span className="font-mono text-[8px] text-primary">0{i + 1}</span>
                <p className="mt-2 font-mono text-[8px] font-bold uppercase">{step}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background p-4">
      <p className="font-mono text-[8px] uppercase tracking-[.14em] text-primary">{label}</p>
      <p className="mt-2 text-sm font-bold">{value}</p>
    </div>
  );
}
