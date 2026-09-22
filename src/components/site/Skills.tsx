import { motion } from "motion/react";
import { Section } from "./Section";

const stack = [
  ["Analyze", "SQL · Python · Pandas"],
  ["Report", "Power BI · Advanced Excel · DAX · Power Query"],
  ["Validate", "Data Cleaning · Data Validation · Reconciliation"],
  ["Visualize", "Power BI · Excel · KPI Dashboards"],
  ["Automate", "Python · Power Query · Reporting Workflows"],
  ["Tools", "Git · GitHub · Jupyter · VS Code"],
  ["Supporting", "Scikit-learn · Machine Learning"],
];

export function Skills() {
  return (
    <Section id="stack" eyebrow="Section 05 / Toolchain" title="Analytics stack" description="Tools organized by the work they perform—not by logo or popularity.">
      <div className="border-t border-border">
        {stack.map(([verb,tools],i)=><motion.div key={verb} initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.06}} className="group grid border-b border-border py-6 sm:grid-cols-[80px_220px_1fr] sm:items-center"><span className="font-mono text-[10px] text-primary">0{i+1}</span><h3 className="mt-2 font-display text-2xl font-bold uppercase group-hover:text-primary sm:mt-0">{verb}</h3><p className="mt-3 font-mono text-xs uppercase leading-6 tracking-[0.1em] text-muted-foreground sm:mt-0">{tools}</p></motion.div>)}
      </div>
    </Section>
  );
}