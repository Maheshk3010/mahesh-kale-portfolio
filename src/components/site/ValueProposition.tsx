import { motion } from "motion/react";
import { Section } from "./Section";
import { Target, Code2, BookOpen, Briefcase } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Data-Driven Problem Solving",
    body: "Apply analytical thinking and structured problem-solving techniques to transform raw data into actionable business insights using Python, SQL, Machine Learning, and Business Intelligence tools.",
  },
  {
    icon: Code2,
    title: "Hands-on Technical Experience",
    body: "Built end-to-end machine learning and analytics projects while gaining practical experience through internships in Data Science, Data Analytics, and Python Development.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    body: "Continuously enhance technical skills through real-world projects, verified certifications, internships, and self-learning while keeping up with modern data technologies.",
  },
  {
    icon: Briefcase,
    title: "Business-Oriented Mindset",
    body: "Focus on developing practical, scalable, and user-oriented solutions that solve real business problems rather than purely academic implementations.",
  },
];

export function ValueProposition() {
  return (
    <Section
      id="value-proposition"
      eyebrow="Professional Value Proposition"
      title="What I Bring to Your Team"
      description="Four verified strengths that define how Mahesh contributes to data-focused teams."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="glass group relative overflow-hidden rounded-3xl p-6 transition-transform hover:-translate-y-1"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-opacity group-hover:opacity-100 opacity-60" />
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary">
              <v.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {v.body}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
