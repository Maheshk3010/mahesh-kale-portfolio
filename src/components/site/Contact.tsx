import { motion } from "motion/react";
import { ArrowUpRight, Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./Section";
import social from "@/mahi/knowledge/social.json";
import contact from "@/mahi/knowledge/contact.json";
import { inView, revealScale, revealUp, stagger } from "@/lib/motion";

export function Contact() {
  const github = social.links.find((l) => l.platform === "GitHub")?.url ?? "";
  const linkedin = social.links.find((l) => l.platform === "LinkedIn")?.url ?? "";
  return (
    <Section id="contact" className="pb-32" navTitle="Contact">
      <motion.div
        variants={revealScale}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="contact-frame relative overflow-hidden border border-primary/35 bg-surface p-7 sm:p-10 md:p-14"
      >
        <div className="control-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div
            variants={stagger(0.05, 0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
          >
            <motion.p
              variants={revealUp}
              className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-primary"
            >
              Final report / Available
            </motion.p>
            <motion.h2
              variants={revealUp}
              className="mt-6 max-w-4xl font-display text-4xl font-bold uppercase leading-[.95] sm:text-6xl"
            >
              Let&apos;s talk <span className="text-primary">data.</span>
            </motion.h2>
            <motion.p
              variants={revealUp}
              className="mt-6 max-w-xl text-base leading-7 text-muted-foreground"
            >
              Open to Data Analyst and MIS Executive opportunities.
            </motion.p>
          </motion.div>
          <motion.div
            variants={stagger(0.18, 0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1"
          >
            <motion.div variants={revealUp} className="contents">
              <Button asChild size="lg">
                <a href={`mailto:${contact.email}`}>
                  <Mail />
                  Email Mahesh
                  <ArrowUpRight />
                </a>
              </Button>
            </motion.div>
            <motion.div variants={revealUp} className="contents">
              <Button asChild variant="outline" size="lg">
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>
                  <Phone />
                  {contact.phone}
                </a>
              </Button>
            </motion.div>
            {linkedin && (
              <motion.div variants={revealUp} className="contents">
                <Button asChild variant="outline" size="lg">
                  <a href={linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin />
                    LinkedIn
                    <ArrowUpRight />
                  </a>
                </Button>
              </motion.div>
            )}
            {github && (
              <motion.div variants={revealUp} className="contents">
                <Button asChild variant="outline" size="lg">
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    <Github />
                    GitHub
                    <ArrowUpRight />
                  </a>
                </Button>
              </motion.div>
            )}
            <motion.div variants={revealUp} className="contents">
              <Button
                variant="outline"
                size="lg"
                disabled
                title="Resume file awaiting verification"
              >
                <Download />
                Download resume
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
