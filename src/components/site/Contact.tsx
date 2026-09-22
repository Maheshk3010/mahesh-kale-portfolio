import { motion } from "motion/react";
import { Section } from "./Section";
import { ArrowUpRight, Github, Linkedin, Mail, MessageSquare, Phone } from "lucide-react";
import social from "@/mahi/knowledge/social.json";
import contact from "@/mahi/knowledge/contact.json";

function findLink(platform: string) {
  const entry = social.links.find(
    (l) => l.platform.toLowerCase() === platform.toLowerCase(),
  );
  return entry?.url?.trim() ? entry.url : "";
}

export function Contact() {
  const github = findLink("GitHub");
  const linkedin = findLink("LinkedIn");
  const email = (contact.email ?? "").trim();
  const phone = (contact.phone ?? "").trim();

  return (
    <Section id="contact" className="pb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel relative overflow-hidden rounded-lg p-8 sm:p-10 md:p-16"
      >

        <div className="relative max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)] shadow-[0_0_12px_var(--success)]" />
            Open to new opportunities
          </div>
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Let&apos;s turn data into
            <br />
            <span className="text-gradient">decisions together.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Recruiters and hiring managers — reach out for Data Analyst, Data
            Scientist, Python Developer or MIS Analyst roles. Mahesh replies
            within 24 hours.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open GitHub profile in a new tab"
                className="glow-primary group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                <Github className="h-4 w-4" />
                View GitHub
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                {email}
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open LinkedIn profile in a new tab"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
                Connect on LinkedIn
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5 text-primary" />
              Or ask MAHI.AI in the bottom-right corner.
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
