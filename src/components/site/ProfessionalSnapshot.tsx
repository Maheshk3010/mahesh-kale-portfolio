import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { profile, coreTools, specializations } from "@/mahi/portfolio";
import profilePhoto from "@/assets/mahesh-kale-professional-profile.png.asset.json";
import { inView, revealUp, stagger } from "@/lib/motion";

const workFocus = specializations.filter((item) =>
  [
    "MIS Reporting",
    "KPI Reporting",
    "Data Validation",
    "Data Reconciliation",
    "Dashboard Development",
    "Reporting Automation",
  ].includes(item),
);

export function ProfessionalSnapshot() {
  return (
    <section
      id="snapshot"
      aria-labelledby="snapshot-title"
      className="dossier-scene border-b border-border bg-surface"
    >
      <motion.div
        variants={stagger(0.02, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20"
      >
        <motion.div
          variants={revealUp}
          className="grid gap-5 border-t border-border pt-5 lg:grid-cols-[180px_1fr]"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
            02 / Analyst dossier
          </p>
          <h2 id="snapshot-title" className="font-display text-4xl font-bold uppercase sm:text-5xl">
            Analyst dossier
          </h2>
        </motion.div>
        <div className="mt-8 grid overflow-hidden border border-border bg-background lg:grid-cols-[.78fr_1.22fr]">
          <motion.figure
            variants={revealUp}
            className="identity-frame relative aspect-square min-h-[340px] overflow-hidden border-b border-primary/35 shadow-[0_24px_70px_-45px_var(--primary)] sm:min-h-[440px] lg:aspect-auto lg:min-h-[520px] lg:border-b-0 lg:border-r"
          >
            <img
              src={profilePhoto.url}
              alt="Mahesh Kale, Data Analyst and MIS Executive"
              width="1254"
              height="1254"
              loading="eager"
              decoding="async"
              className="identity-image h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-px bg-border p-px font-mono text-[8px] uppercase">
              <div className="bg-background/95 p-3">
                <span className="block text-primary">Identity</span>
                <span className="mt-1 block">Mahesh Kale</span>
              </div>
              <div className="bg-background/95 p-3">
                <span className="block text-primary">Location</span>
                <span className="mt-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Pune, India
                </span>
              </div>
              <div className="col-span-2 bg-background/95 p-3">
                <span className="block text-primary">Role</span>
                <span className="mt-1 block">Data Analyst / MIS Executive</span>
              </div>
            </figcaption>
          </motion.figure>
          <div className="p-6 sm:p-8 lg:p-10">
            <motion.p
              variants={revealUp}
              className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-primary"
            >
              Mahesh Kale
            </motion.p>
            <motion.h3
              variants={revealUp}
              className="mt-4 font-display text-3xl font-bold uppercase sm:text-4xl"
            >
              Data Analyst <span className="text-muted-foreground">|</span> MIS Executive
            </motion.h3>
            <motion.p
              variants={revealUp}
              className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground"
            >
              I work across SQL, Power BI, Advanced Excel and Python to analyze business and
              operational data, build KPI reporting, develop dashboards and support validated
              reporting workflows.
            </motion.p>
            <motion.div variants={revealUp} className="mt-8 border-t border-border pt-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
                Core tools
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {coreTools.map((tool) => (
                  <span key={tool} className="control-tag">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div variants={revealUp} className="mt-8 border-t border-border pt-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
                Work focus
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {workFocus.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[9px] font-bold uppercase text-foreground"
                  >
                    <span className="mr-2 text-primary">+</span>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
