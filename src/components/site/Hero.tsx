import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Available for AI &amp; Full-Stack engineering roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl lg:text-[88px]"
        >
          Building <span className="text-gradient">AI-powered</span> software
          <br className="hidden md:block" /> &amp; data-driven solutions.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          I&apos;m <span className="text-foreground font-medium">Mahesh Kale</span> —
          an engineer designing production-grade AI systems, resilient backends
          and interfaces people actually enjoy using.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="glow-primary group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            View selected work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-white/10"
          >
            Get in touch
          </a>
          <div className="ml-1 flex items-center gap-1">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {[
            { k: "4+", v: "Years shipping" },
            { k: "30+", v: "Projects delivered" },
            { k: "12", v: "AI systems in prod" },
            { k: "99.9%", v: "Uptime SLOs" },
          ].map((s) => (
            <div
              key={s.v}
              className="glass rounded-2xl px-4 py-5 text-left"
            >
              <div className="text-3xl font-semibold tracking-tight text-foreground">
                {s.k}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
