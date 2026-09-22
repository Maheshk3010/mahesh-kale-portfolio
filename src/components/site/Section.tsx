import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useSectionRegistration } from "@/mahi/useSectionRegistration";
import { inView, revealUp, stagger } from "@/lib/motion";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  navTitle,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  navTitle?: string;
}) {
  const registrationTitle = navTitle ?? (typeof title === "string" ? title : eyebrow ?? id ?? "");
  const ref = useSectionRegistration<HTMLElement>(id, registrationTitle);
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={stagger(0, 0.1)}
      className={`control-section relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 md:py-28 ${className}`}
    >
      {(eyebrow || title || description) && (
        <motion.header variants={revealUp} className="mb-12 grid gap-5 border-t border-border pt-5 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</div>
          <div className="max-w-4xl">
            {title && <h2 className="font-display text-4xl font-bold leading-[1.02] sm:text-5xl md:text-6xl">{title}</h2>}
            {description && <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>}
          </div>
        </motion.header>
      )}
      {children}
    </motion.section>
  );
}