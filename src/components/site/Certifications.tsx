import { motion } from "motion/react";
import { Section } from "./Section";
import { knowledgeBase } from "@/mahi/knowledgeBase";

export function Certifications() {
  const education = knowledgeBase.education.education;
  const certs = knowledgeBase.certifications.certifications;
  return (
    <Section id="education" eyebrow="Section 07 / Qualification record" title="Education & credentials">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div>{education.map((entry,i)=><motion.article key={entry.degree} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}} className="grid border-t border-border py-6 sm:grid-cols-[80px_1fr]"><span className="font-mono text-[9px] text-primary">ED / 0{i+1}</span><div><h3 className="font-display text-2xl font-bold uppercase">{entry.degree}</h3><p className="mt-3 text-sm text-muted-foreground">{entry.university}</p><p className="mt-2 font-mono text-[9px] uppercase tracking-[.14em] text-foreground">{entry.graduationYear}{entry.grade ? ` · ${entry.grade}`:""}</p></div></motion.article>)}</div>
        <div className="border-t border-border"><div className="py-5 font-mono text-[9px] uppercase tracking-[.16em] text-primary">Credentials register</div>{certs.map((cert,i)=><div key={cert.name} className="grid grid-cols-[28px_1fr] border-t border-border py-4"><span className="font-mono text-[8px] text-muted-foreground">{String(i+1).padStart(2,"0")}</span><div><h3 className="text-sm font-bold">{cert.name}</h3><p className="mt-1 text-xs text-muted-foreground">{cert.organization} · {cert.year || "Date not verified"} · {cert.verification ? "Verification available" : "Verification link pending"}</p></div></div>)}</div>
      </div>
    </Section>
  );
}