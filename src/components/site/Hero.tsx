import { motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Database,
  Download,
  Mail,
  MapPin,
} from "lucide-react";

const maheshPhoto = "/maheshkale_pic.jpeg";

const metrics = [
  { value: "50K+", label: "Records analyzed" },
  { value: "30+", label: "SQL queries" },
  { value: "7K+", label: "ML records" },
];

const stack = ["Python", "SQL", "Power BI", "Scikit-learn", "Flask"];

export function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden border-b border-border pt-28">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div className="mx-auto grid min-h-[calc(92vh-7rem)] max-w-6xl items-center gap-12 px-6 pb-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.65fr)] lg:gap-16">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_10px_var(--success)]" />
            Available for data opportunities
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            Mahesh Sakharam Kale
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl text-balance font-display text-5xl font-bold leading-[1.03] md:text-7xl lg:text-[5rem]"
          >
            Data Analyst <span className="text-primary">&amp; Machine Learning</span> Practitioner
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg"
          >
            Data Analyst &amp; Machine Learning Practitioner with hands-on experience in transforming 50,000+ data records into actionable business insights using Python, SQL, Power BI, and Machine Learning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-9 grid gap-3 sm:flex sm:flex-wrap"
          >
            <a href="#projects" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">
              Explore Projects
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50">
              <Download className="h-4 w-4 text-primary" /> Request Resume
            </a>
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
              <Mail className="h-4 w-4" /> Contact Me
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-12 grid max-w-2xl grid-cols-3 border-y border-border"
          >
            {metrics.map((metric) => (
              <div key={metric.label} className="border-r border-border px-3 py-5 first:pl-0 last:border-r-0 sm:px-6">
                <dt className="font-mono text-xl font-bold text-foreground sm:text-2xl">{metric.value}</dt>
                <dd className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">{metric.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="glass-panel relative overflow-hidden rounded-lg p-4">
            <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border pb-4">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Analyst profile</p>
                <p className="mt-1 truncate text-sm font-semibold">Business insight workspace</p>
              </div>
              <BarChart3 className="h-5 w-5 shrink-0 text-primary" />
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border-strong bg-surface">
              <img src={maheshPhoto} alt="Mahesh Kale, Data Analyst and Machine Learning Practitioner" width={640} height={480} fetchPriority="high" className="h-full w-full object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/95 to-transparent p-4 pt-16">
                <p className="font-display text-xl font-bold">Mahesh Kale</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5 text-primary" /> Pune, Maharashtra, India</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-md border border-border bg-panel p-3">
                <Database className="h-4 w-4 text-primary" />
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Focus</p>
                <p className="mt-1 text-sm font-semibold">Analytics + ML</p>
              </div>
              <div className="rounded-md border border-border bg-panel p-3">
                <ArrowUpRight className="h-4 w-4 text-primary" />
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Status</p>
                <p className="mt-1 text-sm font-semibold">Open to work</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((item, index) => (
                <motion.span key={item} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.42 + index * 0.06 }} className="tech-badge">
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}