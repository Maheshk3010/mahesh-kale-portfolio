import { motion } from "motion/react";
import { Section } from "./Section";
import { BarChart3, Database, Brain } from "lucide-react";

const pillars = [
  {
    icon: BarChart3,
    title: "Data analysis & visualization",
    body: "SQL, Power BI and Advanced Excel to clean, model and present data so stakeholders can act on it quickly.",
  },
  {
    icon: Brain,
    title: "Python & machine learning",
    body: "Pandas, NumPy and Scikit-learn for analysis, automation and predictive modeling — from stock forecasts to recommendation systems.",
  },
  {
    icon: Database,
    title: "MIS & reporting",
    body: "MySQL, Flask and REST APIs to build repeatable reports and lightweight tools that support operations and MIS teams.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="Executive Profile"
      title="Turning Data into Insights and Intelligent Solutions."
      description={
        <>
          I am Mahesh Sakharam Kale, a Computer Science graduate specializing in Artificial Intelligence, Machine Learning, and Virtual Reality. Through internships in Data Science, Data Analytics, and Python Development, I have developed practical experience in building data-driven solutions using Python, SQL, Power BI, Machine Learning, and data visualization techniques.
          <br />
          <br />
          My portfolio showcases verified projects including an LSTM-based Apple Stock Price Prediction System and a Product Recommendation System, demonstrating end-to-end capabilities in data preprocessing, predictive modeling, recommendation systems, and application development.
          <br />
          <br />
          I enjoy solving real-world business problems through analytical thinking, clean code, and practical machine learning solutions. I improve my technical skills through hands-on projects, internships, and structured learning while maintaining a strong focus on building reliable and scalable solutions.
          <br />
          <br />
          Currently, I am seeking opportunities as a Data Analyst, Data Scientist, Python Developer, or MIS Analyst where I can contribute technical expertise, analytical problem-solving, and a continuous learning mindset to deliver meaningful business impact.
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="glass group relative overflow-hidden rounded-3xl p-6 transition-transform hover:-translate-y-1"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-opacity group-hover:opacity-100 opacity-60" />
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary">
              <p.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {p.body}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
