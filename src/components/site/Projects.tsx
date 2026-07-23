import { motion } from "motion/react";
import { Section } from "./Section";
import { FolderGit2 } from "lucide-react";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects — verified information only."
      description="Project details will appear here once verified. Everything on this portfolio is aligned to Data Analyst, Data Scientist, Python Developer and MIS Analyst roles."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="glass flex items-start gap-4 rounded-3xl p-6 md:p-7"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary">
          <FolderGit2 className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight">
            No verified projects yet
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I don&apos;t have verified information regarding that topic. Verified
            data analysis, data science, Python and MIS reporting projects will
            be published here.
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
