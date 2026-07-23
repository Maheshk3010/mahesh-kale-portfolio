import { motion } from "motion/react";
import { Section } from "./Section";
import { ArrowUpRight, Mail } from "lucide-react";

export function Contact() {
  return (
    <Section id="contact" className="pb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative overflow-hidden rounded-[2rem] p-10 md:p-16"
      >
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/25 blur-[120px]" />
        <div className="pointer-events-none absolute -left-32 -bottom-40 h-96 w-96 rounded-full bg-accent/20 blur-[140px]" />

        <div className="relative max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)] shadow-[0_0_12px_var(--success)]" />
            Open to new opportunities
          </div>
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Let&apos;s build something
            <br />
            <span className="text-gradient">worth shipping.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Whether you&apos;re a recruiter, founder or teammate — reach out. I
            reply within 24 hours.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="mailto:hello@maheshkale.dev"
              className="glow-primary group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <Mail className="h-4 w-4" />
              hello@maheshkale.dev
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-white/10"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
