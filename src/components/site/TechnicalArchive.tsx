import { motion } from "motion/react";
import { ArrowUpRight, Github, NotebookTabs } from "lucide-react";
import { Section } from "./Section";
import { SectionTransition } from "./SectionTransition";
import { inView, revealUp, stagger } from "@/lib/motion";

const records = [
  {
    number: "01",
    group: "Python / Exploratory analytics",
    title: "E-Commerce Sales Analysis",
    description:
      "Exploratory analysis of e-commerce sales data covering products, categories, regions, customer segments and time-based sales patterns.",
    tools: ["Python", "Pandas", "Matplotlib", "Kaggle"],
    highlights: [
      "Data quality checks",
      "Null-value and duplicate handling",
      "Date conversion and time features",
      "Category and regional analysis",
      "Product and customer-segment analysis",
      "Sales visualizations",
    ],
    href: "https://www.kaggle.com/code/maheshskale/e-commerce-sales-analysis",
    action: "Open Kaggle",
    icon: NotebookTabs,
  },
  {
    number: "02",
    group: "Python / EDA",
    title: "Netflix Popular Movies Data Analysis",
    description:
      "Exploratory analysis of movie data to understand release patterns, genres, ratings and popularity.",
    tools: ["Python", "Pandas", "Matplotlib", "Kaggle"],
    highlights: [
      "Data cleaning",
      "Data quality checks",
      "Feature extraction",
      "Release-year and genre analysis",
      "Ratings and popularity analysis",
    ],
    href: "https://www.kaggle.com/code/maheshskale/netflix-popular-movies-data-analysis",
    action: "Open Kaggle",
    icon: NotebookTabs,
  },
  {
    number: "03",
    group: "Predictive / Machine learning",
    title: "Apple Stock Price Prediction — LSTM",
    description: "LSTM forecasting workflow with an interactive Streamlit interface.",
    tools: ["Python", "TensorFlow", "Keras", "Pandas", "Streamlit"],
    highlights: ["Time-series forecasting", "LSTM model training", "Interactive interface"],
    href: "https://github.com/Maheshk3010/Apple_Stock_Prediction_LSTM",
    action: "Open GitHub",
    icon: Github,
  },
  {
    number: "04",
    group: "ML / Recommendation",
    title: "Product Recommendation System",
    description: "Python recommendation prototype generating ranked product suggestions.",
    tools: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    highlights: ["User-item matrix", "Similarity computation", "Top-N ranking"],
    href: "https://github.com/Maheshk3010/Product_Recommendation_System",
    action: "Open GitHub",
    icon: Github,
  },
];

export function TechnicalArchive() {
  return (
    <>
      <SectionTransition label="Technical records available" />
      <Section
        id="technical-archive"
        eyebrow="09 / Secondary research index"
        title="Technical archive"
        description="Additional analytical work across exploratory analysis, predictive modeling and recommendation systems."
        className="technical-archive-scene"
      >
        <motion.div
          variants={stagger(0.04, 0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="archive-index border-y border-border"
        >
          {records.map((record) => {
            const Icon = record.icon;
            return (
              <motion.article
                key={record.title}
                variants={revealUp}
                className="archive-record grid gap-5 border-b border-border py-6 md:grid-cols-[64px_minmax(0,1.35fr)_minmax(220px,.65fr)] md:items-start md:gap-8"
              >
                <span className="font-mono text-xs font-bold text-success">[{record.number}]</span>
                <div className="min-w-0">
                  <p className="font-mono text-[8px] font-bold uppercase tracking-[.14em] text-primary">
                    {record.group}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold uppercase sm:text-2xl">
                    {record.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {record.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[9px] uppercase text-foreground">
                    {record.tools.map((tool) => (
                      <span key={tool}>• {tool}</span>
                    ))}
                  </div>
                </div>
                <div className="border-l border-border pl-5">
                  <p className="font-mono text-[8px] uppercase tracking-[.14em] text-muted-foreground">
                    Archive notes
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs leading-5 text-muted-foreground">
                    {record.highlights.map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                  <a
                    href={record.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[.12em] text-primary hover:text-foreground"
                  >
                    <Icon className="h-3.5 w-3.5" /> {record.action}{" "}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </Section>
    </>
  );
}
