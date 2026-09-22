import { motion } from "motion/react";
import { ArrowUpRight, Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./Section";
import social from "@/mahi/knowledge/social.json";
import contact from "@/mahi/knowledge/contact.json";

export function Contact() {
  const github = social.links.find((l) => l.platform === "GitHub")?.url ?? "";
  const linkedin = social.links.find((l) => l.platform === "LinkedIn")?.url ?? "";
  return (
    <Section id="contact" className="pb-32" navTitle="Contact">
      <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="relative overflow-hidden border border-primary/35 bg-surface p-7 sm:p-10 md:p-14">
        <div className="control-grid pointer-events-none absolute inset-0 opacity-40"/>
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
           <div><p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-primary">Final report / Available</p><h2 className="mt-6 max-w-4xl font-display text-4xl font-bold uppercase leading-[.95] sm:text-6xl">Let&apos;s talk <span className="text-primary">data.</span></h2><p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">Open to Data Analyst and MIS Executive opportunities.</p></div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <Button asChild size="lg"><a href={`mailto:${contact.email}`}><Mail/>Email Mahesh<ArrowUpRight/></a></Button>
            <Button asChild variant="outline" size="lg"><a href={`tel:${contact.phone.replace(/\s+/g,"")}`}><Phone/>{contact.phone}</a></Button>
            {linkedin && <Button asChild variant="outline" size="lg"><a href={linkedin} target="_blank" rel="noopener noreferrer"><Linkedin/>LinkedIn<ArrowUpRight/></a></Button>}
            {github && <Button asChild variant="outline" size="lg"><a href={github} target="_blank" rel="noopener noreferrer"><Github/>GitHub<ArrowUpRight/></a></Button>}
             <Button variant="outline" size="lg" disabled title="Resume file awaiting verification"><Download/>Download resume</Button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}