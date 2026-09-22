import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Section } from "./Section";

type Skill = {
  name: string;
  category: string;
  description: string;
  projects: string[];
  internships: string[];
  related: string[];
};

const SKILLS: Skill[] = [
  // Programming
  {
    name: "Python",
    category: "Programming",
    description:
      "Primary language for data analysis, machine learning, automation and application development.",
    projects: [
      "Apple Stock Price Prediction System",
      "Product Recommendation System",
      "Job Tracker API",
    ],
    internships: [
      "ExcelR Solutions — Data Science Intern",
      "Sysslan IT Solutions — Data Analyst Intern",
      "Codveda Technologies — Python Development Intern",
    ],
    related: ["Pandas", "NumPy", "Scikit-learn", "Flask", "Streamlit"],
  },
  {
    name: "SQL",
    category: "Programming",
    description:
      "Querying, filtering and modelling relational data for reporting and analytics workflows.",
    projects: ["Sales Dashboard"],
    internships: [
      "ExcelR Solutions — Data Science Intern",
      "Sysslan IT Solutions — Data Analyst Intern",
    ],
    related: ["MySQL", "Power BI", "Advanced Excel"],
  },

  // Analytics & BI
  {
    name: "Power BI",
    category: "Analytics & BI",
    description:
      "Interactive dashboards, KPI reporting and self-serve analytics for business stakeholders.",
    projects: ["Sales Dashboard"],
    internships: [
      "ExcelR Solutions — Data Science Intern",
      "Sysslan IT Solutions — Data Analyst Intern",
    ],
    related: ["SQL", "Advanced Excel", "Data Visualization"],
  },
  {
    name: "Advanced Excel",
    category: "Analytics & BI",
    description:
      "Formulas, pivots, KPI tracking and reporting for MIS and analytics workflows.",
    projects: ["Sales Dashboard"],
    internships: ["Sysslan IT Solutions — Data Analyst Intern"],
    related: ["Power BI", "SQL"],
  },
  {
    name: "Data Visualization",
    category: "Analytics & BI",
    description:
      "Turning raw data into decision-ready visuals using Power BI and Excel reporting.",
    projects: ["Sales Dashboard"],
    internships: [
      "ExcelR Solutions — Data Science Intern",
      "Sysslan IT Solutions — Data Analyst Intern",
    ],
    related: ["Power BI", "Advanced Excel"],
  },

  // Machine Learning
  {
    name: "Scikit-learn",
    category: "Machine Learning",
    description:
      "Classical ML models, similarity computation and evaluation for data-science prototypes.",
    projects: [
      "Apple Stock Price Prediction System",
      "Product Recommendation System",
    ],
    internships: ["ExcelR Solutions — Data Science Intern"],
    related: ["Python", "Pandas", "NumPy"],
  },
  {
    name: "TensorFlow",
    category: "Machine Learning",
    description:
      "Deep-learning framework used for LSTM-based time-series forecasting.",
    projects: ["Apple Stock Price Prediction System"],
    internships: ["ExcelR Solutions — Data Science Intern"],
    related: ["Keras", "LSTM", "Python"],
  },
  {
    name: "Keras",
    category: "Machine Learning",
    description:
      "High-level neural network API used with TensorFlow to build LSTM models.",
    projects: ["Apple Stock Price Prediction System"],
    internships: ["ExcelR Solutions — Data Science Intern"],
    related: ["TensorFlow", "LSTM"],
  },
  {
    name: "LSTM",
    category: "Machine Learning",
    description:
      "Long Short-Term Memory networks for sequence modelling and time-series forecasting.",
    projects: ["Apple Stock Price Prediction System"],
    internships: ["ExcelR Solutions — Data Science Intern"],
    related: ["TensorFlow", "Keras", "Predictive Modeling"],
  },
  {
    name: "Recommendation Systems",
    category: "Machine Learning",
    description:
      "Similarity-based product recommendation using classical ML techniques.",
    projects: ["Product Recommendation System"],
    internships: ["ExcelR Solutions — Data Science Intern"],
    related: ["Scikit-learn", "Pandas", "NumPy"],
  },
  {
    name: "Predictive Modeling",
    category: "Machine Learning",
    description:
      "Building predictive pipelines end-to-end — from feature engineering to evaluation.",
    projects: [
      "Apple Stock Price Prediction System",
      "Product Recommendation System",
    ],
    internships: ["ExcelR Solutions — Data Science Intern"],
    related: ["Scikit-learn", "TensorFlow", "LSTM"],
  },

  // Python Libraries
  {
    name: "Pandas",
    category: "Python Libraries",
    description:
      "Data wrangling, cleaning and exploratory analysis in Python workflows.",
    projects: [
      "Apple Stock Price Prediction System",
      "Product Recommendation System",
    ],
    internships: [
      "ExcelR Solutions — Data Science Intern",
      "Sysslan IT Solutions — Data Analyst Intern",
    ],
    related: ["NumPy", "Python", "Scikit-learn"],
  },
  {
    name: "NumPy",
    category: "Python Libraries",
    description:
      "Numerical computing foundation supporting Pandas and ML libraries.",
    projects: [
      "Apple Stock Price Prediction System",
      "Product Recommendation System",
    ],
    internships: ["ExcelR Solutions — Data Science Intern"],
    related: ["Pandas", "Scikit-learn"],
  },

  // Development
  {
    name: "Streamlit",
    category: "Development",
    description:
      "Interactive Python app framework used to ship data-science demos and dashboards.",
    projects: ["Apple Stock Price Prediction System"],
    internships: ["ExcelR Solutions — Data Science Intern"],
    related: ["Python", "TensorFlow"],
  },
  {
    name: "Flask",
    category: "Development",
    description:
      "Lightweight Python framework for building REST APIs and backend services.",
    projects: ["Job Tracker API"],
    internships: ["Codveda Technologies — Python Development Intern"],
    related: ["Python", "REST API", "MySQL"],
  },

  // Tools
  {
    name: "Git",
    category: "Tools",
    description:
      "Source control for day-to-day development, branching and collaboration.",
    projects: [
      "Apple Stock Price Prediction System",
      "Product Recommendation System",
      "Job Tracker API",
    ],
    internships: [
      "ExcelR Solutions — Data Science Intern",
      "Codveda Technologies — Python Development Intern",
    ],
    related: ["GitHub", "VS Code"],
  },
  {
    name: "GitHub",
    category: "Tools",
    description:
      "Hosting, versioning and showcasing project work in public repositories.",
    projects: [
      "Apple Stock Price Prediction System",
      "Product Recommendation System",
    ],
    internships: [
      "ExcelR Solutions — Data Science Intern",
      "Codveda Technologies — Python Development Intern",
    ],
    related: ["Git"],
  },
  {
    name: "VS Code",
    category: "Tools",
    description:
      "Primary IDE for Python, data-science notebooks and backend development.",
    projects: [
      "Apple Stock Price Prediction System",
      "Product Recommendation System",
      "Job Tracker API",
    ],
    internships: ["ExcelR Solutions — Data Science Intern"],
    related: ["Git", "Python"],
  },
];

const GROUP_ORDER = [
  "Programming",
  "Analytics & BI",
  "Machine Learning",
  "Python Libraries",
  "Development",
  "Tools",
];

export function Skills() {
  const [active, setActive] = useState<Skill | null>(null);

  const groups = useMemo(() => {
    return GROUP_ORDER.map((title) => ({
      title,
      items: SKILLS.filter((s) => s.category === title),
    })).filter((g) => g.items.length > 0);
  }, []);

  return (
    <Section
      id="skills"
      eyebrow="Technical Expertise"
      title="Every skill mapped to verified project or internship work."
      description="Click any skill to see where it has been applied — projects, internships and related technologies."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass-panel rounded-lg p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-tight">{g.title}</h3>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((it, badgeIndex) => (
                <motion.button
                  key={it.name}
                  type="button"
                  onClick={() => setActive(it)}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 + badgeIndex * 0.035 }}
                  className="tech-badge transition-colors hover:border-primary hover:text-primary"
                >
                  {it.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-muted-foreground transition-colors hover:text-primary"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-4">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {active.category}
                </span>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">
                  {active.name}
                </h3>
                <p className="mt-2 text-sm text-foreground/80">
                  {active.description}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="mb-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                    Applied in projects
                  </div>
                  {active.projects.length > 0 ? (
                    <ul className="space-y-1 text-sm text-foreground/90">
                      {active.projects.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Used across day-to-day development workflow.
                    </p>
                  )}
                </div>

                <div>
                  <div className="mb-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                    Applied in internships
                  </div>
                  {active.internships.length > 0 ? (
                    <ul className="space-y-1 text-sm text-foreground/90">
                      {active.internships.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No direct internship mapping.
                    </p>
                  )}
                </div>

                {active.related.length > 0 && (
                  <div>
                    <div className="mb-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                      Related technologies
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {active.related.map((r) => (
                        <span
                          key={r}
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-foreground/90"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
