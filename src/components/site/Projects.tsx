import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Section } from "./Section";
import {
  FolderGit2,
  Github,
  Search,
  X,
  ExternalLink,
  Sparkles,
  Star,
  Code2,
} from "lucide-react";
import { knowledgeBase } from "@/mahi/knowledgeBase";
import type { Project } from "@/mahi/types";

type Category =
  | "All"
  | "Featured"
  | "Python"
  | "Machine Learning"
  | "Recommendation Systems"
  | "Time Series"
  | "Data Analysis";

const CATEGORIES: Category[] = [
  "All",
  "Featured",
  "Python",
  "Machine Learning",
  "Recommendation Systems",
  "Time Series",
  "Data Analysis",
];

const FEATURED_TITLES = new Set<string>([
  "Apple Stock Price Prediction System",
  "Product Recommendation System",
]);

function isFeatured(p: Project) {
  return FEATURED_TITLES.has(p.title);
}

function statusFor(p: Project): { label: string; tone: "primary" | "muted" } {
  return p.github
    ? { label: "Live on GitHub", tone: "primary" }
    : { label: "In Development", tone: "muted" };
}

const BI_TECH = ["Power BI", "Excel", "Tableau"];
const DA_TECH = ["SQL", "MySQL", "Power BI", "Excel"];
const ML_TECH = ["Scikit-learn", "TensorFlow", "PyTorch"];
const PY_TECH = ["Python", "Flask", "REST API", "Pandas", "NumPy"];

type ChallengeItem = { challenge: string; solution: string };
const CHALLENGES: Record<string, ChallengeItem[]> = {
  "Apple Stock Price Prediction System": [
    {
      challenge:
        "Handling sequential time-series data and preparing it correctly for LSTM model training.",
      solution:
        "Applied data preprocessing, normalization and sliding-window sequence generation to shape inputs suitable for the LSTM network.",
    },
    {
      challenge:
        "Avoiding unstable predictions caused by noisy stock market fluctuations.",
      solution:
        "Used proper train-test splitting, feature scaling and evaluated performance with regression metrics before visualising forecasts in Streamlit.",
    },
  ],
  "Product Recommendation System": [
    {
      challenge:
        "Generating meaningful recommendations for users with limited interaction history.",
      solution:
        "Implemented similarity-based collaborative filtering with Scikit-learn and tuned the similarity computation to improve top-N recommendation quality.",
    },
    {
      challenge:
        "Balancing recommendation accuracy with response performance.",
      solution:
        "Optimised the Pandas/NumPy preprocessing pipeline and vectorised similarity logic so recommendations are returned efficiently at query time.",
    },
  ],
  "Job Tracker API": [
    {
      challenge:
        "Designing a clean REST contract for job-application CRUD across create, update, list and delete flows.",
      solution:
        "Structured Flask routes around a single resource with clear status codes and JSON payloads, keeping routing separate from data access.",
    },
    {
      challenge:
        "Persisting application data reliably and validating incoming requests.",
      solution:
        "Backed the API with a MySQL schema and added request validation plus error handling so invalid inputs fail predictably.",
    },
  ],
  "Sales Dashboard": [
    {
      challenge:
        "Consolidating scattered SQL and Excel sources into a single trustworthy data model.",
      solution:
        "Cleaned and shaped the sources in Power BI, defined consistent KPIs and modelled relationships so every visual reads from one source of truth.",
    },
    {
      challenge:
        "Making the report self-serve for non-technical stakeholders.",
      solution:
        "Designed KPI cards and interactive slicers by product, region and period so users can answer their own questions without extra reports.",
    },
  ],
};

const LEARNINGS: Record<string, string[]> = {
  "Apple Stock Price Prediction System": [
    "Understood the complete workflow of time-series forecasting using historical stock market data.",
    "Gained practical experience in building and training LSTM-based deep learning models.",
    "Learned the importance of data preprocessing, normalization, and sequence generation for predictive modeling.",
    "Improved understanding of regression model evaluation using RMSE and MAE.",
    "Developed experience in deploying machine learning applications using Streamlit.",
  ],
  "Product Recommendation System": [
    "Learned collaborative filtering techniques for personalized recommendations.",
    "Improved understanding of recommendation system evaluation and similarity-based algorithms.",
    "Strengthened skills in data preprocessing and feature engineering.",
    "Built experience integrating recommendation logic into an interactive application.",
    "Learned how recommendation systems can improve user experience in real-world applications.",
  ],
  "Job Tracker API": [
    "Learned how to design RESTful CRUD endpoints using Flask and clear URL conventions.",
    "Gained experience in separating route handling from data access logic for maintainability.",
    "Understood how to model relational data in MySQL and write SQL queries for persistent storage.",
    "Practiced validating incoming JSON requests and returning consistent error responses.",
    "Built familiarity with the full API request lifecycle, from client call to database response.",
  ],
  "Sales Dashboard": [
    "Learned how to import, clean and model data from SQL and Excel sources in Power BI.",
    "Gained experience defining business KPIs and calculated measures for sales reporting.",
    "Understood the value of interactive slicers and filters for self-service analysis.",
    "Improved data storytelling skills by designing visuals for non-technical stakeholders.",
    "Strengthened knowledge of Power Query transformations and relationship modelling.",
  ],
};

type TechDecisionItem = { technology: string; reason: string };
const TECHNOLOGY_DECISIONS: Record<string, TechDecisionItem[]> = {
  "Apple Stock Price Prediction System": [
    {
      technology: "Python",
      reason:
        "Used because of its rich ecosystem for data analysis, machine learning, and rapid application development.",
    },
    {
      technology: "Pandas",
      reason:
        "Selected for efficient preprocessing and manipulation of historical stock market data.",
    },
    {
      technology: "TensorFlow & Keras",
      reason:
        "Chosen to build and train deep learning models with a simple and scalable API.",
    },
    {
      technology: "LSTM",
      reason:
        "Selected because LSTM networks are designed to learn long-term dependencies in sequential time-series data.",
    },
    {
      technology: "Streamlit",
      reason:
        "Used to quickly build an interactive web interface for visualizing predictions.",
    },
  ],
  "Product Recommendation System": [
    {
      technology: "Python",
      reason:
        "Provides powerful libraries for recommendation algorithms and data processing.",
    },
    {
      technology: "Pandas",
      reason:
        "Used for cleaning, transforming, and organizing user-product interaction data.",
    },
    {
      technology: "Recommendation Algorithms",
      reason:
        "Selected to generate personalized product suggestions based on user behavior.",
    },
    {
      technology: "Streamlit",
      reason: "Used to create an interactive recommendation interface.",
    },
  ],
  "Job Tracker API": [
    {
      technology: "Python",
      reason:
        "Chosen for its readable syntax and strong ecosystem for backend development and API prototyping.",
    },
    {
      technology: "Flask",
      reason:
        "Selected as a lightweight micro-framework that keeps the API focused and easy to extend.",
    },
    {
      technology: "REST API",
      reason:
        "Used to define a standard, stateless contract for job-application CRUD operations.",
    },
    {
      technology: "MySQL",
      reason:
        "Chosen for reliable, structured storage of relational job-application data.",
    },
  ],
  "Sales Dashboard": [
    {
      technology: "Power BI",
      reason:
        "Selected as the primary BI platform for building interactive, self-service sales visuals.",
    },
    {
      technology: "SQL",
      reason:
        "Used to query and structure relational sales data before loading it into the dashboard.",
    },
    {
      technology: "Excel",
      reason:
        "Used as a familiar source format for raw sales data and quick ad-hoc transformations.",
    },
  ],
};

type WorkflowStep = { step: number; title: string; description: string; tech?: string };
const WORKFLOWS: Record<string, WorkflowStep[]> = {
  "Apple Stock Price Prediction System": [
    { step: 1, title: "Collect Historical Apple Stock Data", description: "Load historical market data into the pipeline for analysis.", tech: "Pandas" },
    { step: 2, title: "Clean & Prepare Dataset", description: "Handle missing values, format dates and remove inconsistencies.", tech: "Pandas, NumPy" },
    { step: 3, title: "Normalize Features", description: "Scale price values so the model learns patterns instead of magnitudes.", tech: "Scikit-learn" },
    { step: 4, title: "Generate Time-Series Sequences", description: "Create sliding windows of past prices to feed the LSTM.", tech: "NumPy" },
    { step: 5, title: "Train LSTM Model", description: "Build and fit a deep-learning model to learn sequential dependencies.", tech: "TensorFlow, Keras" },
    { step: 6, title: "Predict Future Prices", description: "Use the trained model to forecast upcoming stock prices.", tech: "TensorFlow" },
    { step: 7, title: "Evaluate Model Performance", description: "Measure prediction quality with regression metrics.", tech: "RMSE, MAE" },
    { step: 8, title: "Display Predictions using Streamlit", description: "Expose results through an interactive web interface.", tech: "Streamlit" },
  ],
  "Product Recommendation System": [
    { step: 1, title: "Load User & Product Data", description: "Import interaction or rating data into the workspace.", tech: "Pandas" },
    { step: 2, title: "Clean Dataset", description: "Remove duplicates, handle missing ratings and normalize entries.", tech: "Pandas, NumPy" },
    { step: 3, title: "Generate User-Item Matrix", description: "Reshape data into a matrix of users against products.", tech: "Pandas" },
    { step: 4, title: "Compute Similarity", description: "Calculate similarity between users or items for recommendations.", tech: "Scikit-learn" },
    { step: 5, title: "Generate Recommendations", description: "Produce a list of top-N product suggestions.", tech: "Recommendation Algorithms" },
    { step: 6, title: "Rank Results", description: "Order recommendations by relevance score.", tech: "Pandas" },
    { step: 7, title: "Display Recommendations in Streamlit", description: "Present recommendations through an interactive app.", tech: "Streamlit" },
  ],
  "Job Tracker API": [
    { step: 1, title: "Define API Requirements & Endpoints", description: "Map out the CRUD operations needed for job applications.", tech: "REST API" },
    { step: 2, title: "Set Up Flask Application", description: "Initialize the Python backend and route structure.", tech: "Flask" },
    { step: 3, title: "Design MySQL Schema", description: "Create tables to store job applications reliably.", tech: "MySQL" },
    { step: 4, title: "Implement CRUD Routes", description: "Build create, read, update and delete endpoints.", tech: "Flask, SQL" },
    { step: 5, title: "Add Request Validation", description: "Validate incoming JSON and return consistent errors.", tech: "Python" },
    { step: 6, title: "Test API Endpoints", description: "Verify each endpoint responds correctly with sample requests.", tech: "Postman/cURL" },
    { step: 7, title: "Document the API", description: "Record endpoint URLs, payloads and responses for users.", tech: "Markdown" },
  ],
  "Sales Dashboard": [
    { step: 1, title: "Gather SQL & Excel Data Sources", description: "Collect raw sales data from existing files and databases.", tech: "SQL, Excel" },
    { step: 2, title: "Clean & Transform Data in Power Query", description: "Standardize formats, remove errors and shape the dataset.", tech: "Power Query" },
    { step: 3, title: "Model Relationships & Define KPIs", description: "Link tables and create calculated measures for reporting.", tech: "Power BI" },
    { step: 4, title: "Build Visuals & Charts", description: "Create KPI cards, trend lines and breakdown charts.", tech: "Power BI" },
    { step: 5, title: "Add Slicers & Filters", description: "Enable self-service filtering by product, region and period.", tech: "Power BI" },
    { step: 6, title: "Publish & Share Dashboard", description: "Finalize the report for stakeholder review.", tech: "Power BI" },
  ],
};

function techHas(p: Project, list: string[]) {
  return p.technologies.some((t) => list.includes(t));
}

function categoriesFor(p: Project): Category[] {
  const cats: Category[] = [];
  if (isFeatured(p)) cats.push("Featured");
  if (techHas(p, DA_TECH) || techHas(p, BI_TECH)) cats.push("Data Analysis");
  if (techHas(p, ML_TECH) || /recommendation/i.test(p.title))
    cats.push("Machine Learning");
  if (/recommendation/i.test(p.title)) cats.push("Recommendation Systems");
  if (/time series|forecast|stock/i.test(p.title + p.description))
    cats.push("Time Series");
  if (techHas(p, PY_TECH)) cats.push("Python");
  return Array.from(new Set(cats));
}

function rolesFor(p: Project): string[] {
  const roles = new Set<string>();
  if (techHas(p, BI_TECH) || techHas(p, ["SQL", "Excel", "MySQL"])) {
    roles.add("Data Analyst");
    roles.add("MIS Analyst");
  }
  if (
    techHas(p, ML_TECH) ||
    techHas(p, ["Pandas", "NumPy", "Scikit-learn"]) ||
    /recommendation|forecast|ml/i.test(p.title)
  )
    roles.add("Data Scientist");
  if (techHas(p, ["Python", "Flask", "REST API"]))
    roles.add("Python Developer");
  return Array.from(roles);
}

function difficultyFor(p: Project): "Beginner" | "Intermediate" | "Advanced" {
  const n = p.technologies.length;
  if (n >= 5) return "Advanced";
  if (n >= 3) return "Intermediate";
  return "Beginner";
}

export function Projects() {
  const projects = knowledgeBase.projects.projects;
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Project | null>(null);

  const enriched = useMemo(
    () =>
      projects.map((p) => ({
        project: p,
        cats: categoriesFor(p),
        roles: rolesFor(p),
        difficulty: difficultyFor(p),
      })),
    [projects],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = enriched.filter(({ project, cats, roles }) => {
      const inCat = category === "All" || cats.includes(category);
      if (!inCat) return false;
      if (!q) return true;
      const hay = [
        project.title,
        project.description,
        ...project.technologies,
        ...cats,
        ...roles,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
    // Featured first
    return [...list].sort(
      (a, b) => Number(isFeatured(b.project)) - Number(isFeatured(a.project)),
    );
  }, [enriched, category, query]);

  const featured = useMemo(
    () => enriched.filter(({ project }) => isFeatured(project)),
    [enriched],
  );

  if (!projects.length) {
    return (
      <Section
        id="projects"
        eyebrow="Selected work"
        title="Projects — verified information only."
      >
        <div className="glass rounded-3xl p-6 text-sm text-muted-foreground">
          I don&apos;t have verified information regarding that topic.
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Recruiter-ready project showcase."
      description="Verified projects aligned to Data Analyst, Data Scientist, Python Developer and MIS Analyst roles. Filter, search and open any project for full context."
    >
      {/* Featured strip */}
      {featured.length > 0 && (
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Star className="h-3.5 w-3.5 text-primary" /> Featured projects
          </div>
          <div className="flex flex-wrap gap-2">
            {featured.map(({ project }) => (
              <button
                key={project.title}
                type="button"
                onClick={() => setActive(project)}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-all hover:border-primary/60 hover:bg-primary/15"
              >
                <Star className="h-3 w-3" /> {project.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="mb-6 grid gap-3 md:flex md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search project, tech or role…"
            aria-label="Search projects"
            className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary/50 focus:bg-white/10"
          />
        </div>
        <div
          role="tablist"
          aria-label="Project categories"
          className="flex flex-wrap gap-1.5"
        >
          {CATEGORIES.map((c) => {
            const on = category === c;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={on}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                  on
                    ? "border-primary/60 bg-primary/15 text-primary shadow-[0_0_18px_-6px_var(--primary)]"
                    : "border-white/10 bg-white/5 text-foreground/70 hover:border-white/20 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map(({ project, cats, roles, difficulty }, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="glass flex flex-col gap-4 rounded-3xl p-6"
          >
            <div className="flex items-start gap-3">
              <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary">
                <FolderGit2 className="h-5 w-5" />
                {isFeatured(project) && (
                  <span
                    aria-label="Featured project"
                    className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full border border-primary/60 bg-background text-primary"
                  >
                    <Star className="h-2.5 w-2.5" />
                  </span>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  {isFeatured(project) && (
                    <Badge tone="primary">Featured</Badge>
                  )}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {cats
                .filter((c) => c !== "Featured")
                .slice(0, 2)
                .map((c) => (
                  <Badge key={c} tone="primary">
                    {c}
                  </Badge>
                ))}
              {roles.slice(0, 2).map((r) => (
                <Badge key={r} tone="accent">
                  {r}
                </Badge>
              ))}
              <Badge tone="muted">{difficulty}</Badge>
              <Badge tone={statusFor(project).tone}>
                {statusFor(project).label}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-foreground/80"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActive(project)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:border-primary/60 hover:bg-primary/15"
              >
                <Sparkles className="h-3.5 w-3.5" /> View Details
              </button>
              {project.github ? (
                <>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-all hover:border-white/25 hover:text-foreground"
                  >
                    <Code2 className="h-3.5 w-3.5" /> View Code
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-all hover:border-white/25 hover:text-foreground"
                  >
                    <Github className="h-3.5 w-3.5" /> Open GitHub
                  </a>
                </>
              ) : (
                <span
                  aria-label="Repository not yet published"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <Github className="h-3.5 w-3.5" /> Repository Coming Soon
                </span>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-all hover:border-white/25 hover:text-foreground"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Demo
                </a>
              )}
            </div>
          </motion.article>
        ))}

        {filtered.length === 0 && (
          <div className="glass col-span-full rounded-3xl p-6 text-sm text-muted-foreground">
            No verified projects match those filters.
          </div>
        )}
      </div>

      {/* Details modal */}
      <AnimatePresence>
        {active && (
          <ProjectDetails
            project={active}
            related={enriched
              .filter(({ project: p }) => p.title !== active.title)
              .filter(({ cats }) =>
                categoriesFor(active).some((c) => cats.includes(c)),
              )
              .map(({ project: p }) => p)}
            onClose={() => setActive(null)}
            onOpen={(p) => setActive(p)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: "primary" | "accent" | "muted";
  children: React.ReactNode;
}) {
  const cls =
    tone === "primary"
      ? "border-primary/40 bg-primary/10 text-primary"
      : tone === "accent"
        ? "border-accent/40 bg-accent/10 text-accent"
        : "border-white/10 bg-white/5 text-foreground/70";
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${cls}`}
    >
      {children}
    </span>
  );
}

function ProjectDetails({
  project,
  related,
  onClose,
  onOpen,
}: {
  project: Project;
  related: Project[];
  onClose: () => void;
  onOpen: (p: Project) => void;
}) {
  const roles = rolesFor(project);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] grid place-items-center bg-background/70 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="glass relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-foreground/80 transition-all hover:border-white/25 hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="pr-10 text-xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {roles.map((r) => (
            <Badge key={r} tone="accent">
              {r}
            </Badge>
          ))}
        </div>

        <DetailBlock title="Overview">{project.description}</DetailBlock>
        <DetailBlock title="Business Problem">{project.problem}</DetailBlock>
        <DetailBlock title="Approach & Implementation">
          {project.solution}
        </DetailBlock>

        {CHALLENGES[project.title]?.length > 0 && (
          <DetailBlock title="Challenges & Solutions">
            <ul className="grid gap-3">
              {CHALLENGES[project.title].map((c, idx) => (
                <li
                  key={idx}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Challenge {idx + 1}
                  </div>
                  <div className="mt-1 text-sm text-foreground/90">
                    {c.challenge}
                  </div>
                  <div className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-accent">
                    Solution
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {c.solution}
                  </div>
                </li>
              ))}
            </ul>
          </DetailBlock>
        )}

        {LEARNINGS[project.title]?.length > 0 && (
          <DetailBlock title="Key Learnings">
            <ul className="grid gap-1.5">
              {LEARNINGS[project.title].map((l, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  {l}
                </li>
              ))}
            </ul>
          </DetailBlock>
        )}

        {TECHNOLOGY_DECISIONS[project.title]?.length > 0 && (
          <DetailBlock title="Technology Decisions">
            <ul className="grid gap-3">
              {TECHNOLOGY_DECISIONS[project.title].map((d, idx) => (
                <li
                  key={idx}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="text-sm font-semibold text-foreground/90">
                    {d.technology}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {d.reason}
                  </div>
                </li>
              ))}
            </ul>
          </DetailBlock>
        )}

        {project.features.length > 0 && (
          <DetailBlock title="Key Features">
            <ul className="grid gap-1.5">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  {f}
                </li>
              ))}
            </ul>
          </DetailBlock>
        )}

        <DetailBlock title="Technologies">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-foreground/80"
              >
                {t}
              </span>
            ))}
          </div>
        </DetailBlock>

        {project.interviewExplanation && (
          <DetailBlock title="How I explain it in interviews">
            {project.interviewExplanation}
          </DetailBlock>
        )}

        {project.outcome && (
          <DetailBlock title="Outcome & role fit">
            {project.outcome}
          </DetailBlock>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-all hover:border-white/25 hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-all hover:border-white/25 hover:text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Demo
            </a>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Related projects
            </div>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <button
                  key={r.title}
                  type="button"
                  onClick={() => onOpen(r)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/80 transition-all hover:border-primary/40 hover:text-primary"
                >
                  {r.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <div className="text-sm leading-relaxed text-foreground/90">{children}</div>
    </div>
  );
}
