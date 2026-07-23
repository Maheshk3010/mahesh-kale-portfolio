import { motion } from "motion/react";
import { Section } from "./Section";
import {
  BadgeCheck,
  Briefcase,
  GraduationCap,
  Github,
  Rocket,
  MapPin,
  ArrowRight,
} from "lucide-react";

const highlights = [
  {
    icon: Rocket,
    label: "Target roles",
    value: "Data Analyst · Data Scientist · Python Developer · MIS Analyst",
  },
  {
    icon: BadgeCheck,
    label: "Core toolkit",
    value: "Python · SQL · Pandas · Scikit-learn · TensorFlow · Power BI",
  },
  {
    icon: Briefcase,
    label: "Internships",
    value: "ExcelR Solutions · Sysslan IT Solutions · Codveda Technologies",
  },
  {
    icon: Github,
    label: "Verified GitHub projects",
    value: "Apple Stock Price Prediction (LSTM) · Product Recommendation System",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.Sc. Computer Science (AI, ML & VR) — Sandip University · 7.94 CGPA",
  },
  {
    icon: MapPin,
    label: "Location & status",
    value: "Pune, India · Open to work · Immediately available",
  },
];

export function WhyHire() {
  return (
    <Section
      id="why-hire"
      eyebrow="60-Second Overview"
      title={
        <>
          Why hire Mahesh?
          <br />
          <span className="text-muted-foreground">Verified at a glance.</span>
        </>
      }
      description="Everything below is verified from Mahesh's portfolio, internships and public GitHub — no inflated metrics, no invented outcomes."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((h, i) => (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="glass group relative overflow-hidden rounded-2xl p-5"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary">
                <h.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {h.label}
                  <BadgeCheck className="h-3 w-3 text-primary" aria-label="Verified" />
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                  {h.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
        <a
          href="#projects"
          className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 font-semibold text-primary transition-all hover:border-primary/60 hover:bg-primary/15"
        >
          See featured projects <ArrowRight className="h-3.5 w-3.5" />
        </a>
        <a
          href="#experience"
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-semibold text-foreground/80 transition-all hover:border-white/25 hover:text-foreground"
        >
          Internship experience
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-semibold text-foreground/80 transition-all hover:border-white/25 hover:text-foreground"
        >
          Contact & resume
        </a>
      </div>
    </Section>
  );
}
