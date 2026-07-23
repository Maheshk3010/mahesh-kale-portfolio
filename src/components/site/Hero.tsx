import { motion } from "motion/react";
import { ArrowUpRight, Download, MapPin, Mail, FolderGit2 } from "lucide-react";
import { useEffect, useState } from "react";

const maheshPhoto = "/maheshkale_pic.jpeg";

const ROLES = [
  "Data Analyst",
  "Data Scientist",
  "Python Developer",
  "MIS Analyst",
];


const CHIPS = [
  { label: "Python", x: "6%", y: "8%", d: 0 },
  { label: "SQL", x: "88%", y: "12%", d: 0.4 },
  { label: "Power BI", x: "-2%", y: "42%", d: 0.8 },
  { label: "Flask", x: "94%", y: "46%", d: 1.2 },
  { label: "Machine Learning", x: "8%", y: "78%", d: 1.6 },
  { label: "REST API", x: "84%", y: "80%", d: 2.0 },
  { label: "GitHub", x: "48%", y: "-4%", d: 2.4 },
];

function useRotator(items: string[], interval = 2400) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items, interval]);
  return items[i];
}

export function Hero() {
  const role = useRotator(ROLES);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
    >
      {/* Background */}
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-[520px] w-[520px] rounded-full bg-primary/25 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-60 -z-10 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[160px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-b from-transparent to-background" />

      {/* Tiny particles */}
      <Particles />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-5 lg:gap-10">
        {/* LEFT — 60% */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--success)] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--success)] shadow-[0_0_10px_var(--success)]" />
            </span>
            <span className="uppercase tracking-widest text-muted-foreground">
              Open to work
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-6 text-base text-muted-foreground md:text-lg"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl lg:text-[80px]"
          >
            <span className="text-gradient">Mahesh Kale</span>
          </motion.h1>

          {/* Rotating title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              I work as a
            </span>
            <div className="relative h-9 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-3">
              <motion.div
                key={role}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-9 items-center text-sm font-semibold text-primary"
              >
                {role}
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Entry-level IT professional focused on Data Analyst, Data
            Scientist, Python Developer and MIS Analyst roles — turning data
            into decisions with Python, SQL, Power BI and machine learning.
          </motion.p>


          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="glow-primary group inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] hover:brightness-110"
            >
              <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Request Resume
            </a>
            <a
              href="#projects"
              className="glass group inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold text-foreground transition-all hover:shadow-[0_0_0_1px_var(--primary)_inset,0_10px_40px_-12px_var(--primary)]"
            >
              <FolderGit2 className="h-4 w-4 text-primary" />
              Explore Projects
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-transparent px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/5"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* RIGHT — 40% */}
        <div className="lg:col-span-2">
          <IdentityCard />
        </div>
      </div>
    </section>
  );
}

function IdentityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md"
    >
      {/* Floating tech chips */}
      <div className="pointer-events-none absolute inset-0 -m-6 md:-m-10">
        {CHIPS.map((c) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.4 + c.d * 0.1 },
              y: {
                duration: 5 + c.d,
                repeat: Infinity,
                ease: "easeInOut",
                delay: c.d,
              },
            }}
            style={{ left: c.x, top: c.y }}
            className="absolute"
          >
            <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-foreground shadow-[0_0_20px_-4px_var(--primary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
              {c.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Card */}
      <div className="glass relative overflow-hidden rounded-[2rem] p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />

        {/* Photo */}
        <div className="relative mx-auto aspect-square w-full max-w-[240px] overflow-hidden rounded-3xl border border-white/10">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-accent/20 mix-blend-overlay" />
          <img
            src={maheshPhoto}
            alt="Mahesh Kale — Data Analyst, Data Scientist, Python Developer and MIS Analyst"
            width={480}
            height={480}
            className="h-full w-full object-cover"
          />

        </div>

        {/* Name + status */}
        <div className="mt-5 text-center">
          <div className="text-lg font-semibold tracking-tight">Mahesh Kale</div>
          <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)] shadow-[0_0_10px_var(--success)]" />
            Open to work
          </div>
        </div>

        {/* Meta rows */}
        <div className="mt-5 space-y-2">
          <MetaRow
            icon={<MapPin className="h-3.5 w-3.5" />}
            label="Location"
            value="Pune, Maharashtra, India"
          />
          <MetaRow
            icon={<span className="text-[10px] font-black text-primary">EL</span>}
            label="Level"
            value="Entry-Level IT Professional"
          />
        </div>

        {/* Focus chips */}
        <div className="mt-5">
          <div className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            Current focus
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Python", "SQL", "Power BI", "Machine Learning"].map((t) => (
              <span
                key={t}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-foreground/90"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function MetaRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5">
      <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/5 text-primary">
          {icon}
        </span>
        <span className="text-[11px] uppercase tracking-widest">{label}</span>
      </div>
      <span className="truncate text-xs font-medium text-foreground">
        {value}
      </span>
    </div>
  );
}

function Particles() {
  // Deterministic positions (avoid hydration mismatch)
  const dots = Array.from({ length: 22 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    d: (i % 6) + 4,
    delay: (i % 5) * 0.6,
    size: (i % 3) + 1,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {dots.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0], y: [0, -30, -60] }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          className="absolute rounded-full bg-primary/60 shadow-[0_0_8px_var(--primary)]"
        />
      ))}
    </div>
  );
}
