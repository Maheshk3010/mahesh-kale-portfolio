import { motion } from "motion/react";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./Section";
import { knowledgeBase } from "@/mahi/knowledgeBase";
import { inView, revealScale, revealUp, stagger } from "@/lib/motion";

export function Contact() {
  const { contact, social, resume } = knowledgeBase;
  const github = social.links.find((item) => item.platform === "GitHub")?.url ?? "";
  const linkedin = social.links.find((item) => item.platform === "LinkedIn")?.url ?? "";
  const actions = [
    { label: "Download resume", href: resume.url, icon: Download, download: resume.filename },
    { label: "LinkedIn", href: linkedin, icon: Linkedin },
    { label: "GitHub", href: github, icon: Github },
    { label: "Email", href: `mailto:${contact.email}`, icon: Mail },
  ].filter((action) => action.href);
  return (
    <Section id="contact" className="pb-32" navTitle="Contact">
      <motion.div
        variants={revealScale}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="contact-frame relative overflow-hidden border border-primary/35 bg-surface p-7 sm:p-10 md:p-14"
      >
        <div className="control-grid pointer-events-none absolute inset-0 opacity-35" />
        <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div variants={stagger(0.05, 0.08)}>
            <motion.p
              variants={revealUp}
              className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-primary"
            >
              11 / System ready
            </motion.p>
            <motion.h2
              variants={revealUp}
              className="mt-6 max-w-4xl font-display text-5xl font-bold uppercase leading-[.95] sm:text-7xl"
            >
              System <span className="text-primary">ready.</span>
            </motion.h2>
            <motion.p
              variants={revealUp}
              className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground"
            >
              Ready to turn business data into decision-ready insights.
            </motion.p>
            <motion.p
              variants={revealUp}
              className="mt-8 font-mono text-[9px] uppercase tracking-[.16em] text-success"
            >
              Analytics core / Session complete
            </motion.p>
          </motion.div>
          <motion.div
            variants={stagger(0.18, 0.06)}
            className="grid gap-2 sm:grid-cols-2 lg:min-w-64 lg:grid-cols-1"
          >
            {actions.map(({ label, href, icon: Icon, download }, index) => (
              <motion.div key={label} variants={revealUp} className="[&>*]:w-full">
                <Button asChild variant={index === 0 ? "default" : "outline"} size="lg">
                  <a
                    href={href}
                    download={download}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <Icon />
                    {label}
                    <ArrowUpRight />
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
