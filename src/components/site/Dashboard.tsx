import { motion } from "motion/react";
import { Calculator, Database, FileCheck2, RefreshCcw, Scale } from "lucide-react";
import { Section } from "./Section";
import { PipelineFlow } from "./PipelineFlow";
import { inView, revealUp, stagger } from "@/lib/motion";

const capabilities = [
  { number: "01", title: "MIS Reporting", copy: "Organize recurring operational data into structured reports for review.", tools: "Excel · SQL · Power BI", icon: Database },
  { number: "02", title: "KPI Reporting", copy: "Define and present business measures with consistent calculation logic.", tools: "DAX · Excel · Power BI", icon: Calculator },
  { number: "03", title: "Data Validation", copy: "Check source completeness, field consistency and reporting readiness.", tools: "SQL · Excel · Reconciliation", icon: FileCheck2 },
  { number: "04", title: "Data Reconciliation", copy: "Compare reporting inputs and outputs for consistency before review.", tools: "Excel · SQL · Validation", icon: Scale },
  { number: "05", title: "Reporting Automation", copy: "Use repeatable transformations to reduce manual reporting steps.", tools: "Python · Power Query", icon: RefreshCcw },
];

const flow = [
  "Source data",
  "Excel / SQL",
  "Validation",
  "KPI calculation",
  "Power BI / Excel",
  "Management insight",
];

export function Dashboard() {
  return (
    <Section
      id="mis"
      eyebrow="Section 04 / Reporting operations"
      title="MIS & reporting"
      description="Accuracy first: a reporting chain designed around validated inputs, consistent KPIs and clear management output."
    >
      <div className="border border-border bg-surface">
        <motion.div variants={stagger()} initial="hidden" whileInView="visible" viewport={inView} className="grid border-b border-border md:grid-cols-2 xl:grid-cols-5">
          {capabilities.map(({ number, title, copy, tools, icon: Icon }) => (
            <motion.article
              key={title}
              variants={revealUp}
              className="mis-capability group border-b border-border p-6 md:border-r xl:border-b-0"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-primary">CAPABILITY / {number}</span>
                <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
              </div>
              <h3 className="mt-8 font-display text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p>
              <p className="mt-8 border-t border-border pt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground">
                {tools}
              </p>
            </motion.article>
          ))}
        </motion.div>
        <div className="p-6 sm:p-8">
          <div className="mb-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em]">
            <span className="text-muted-foreground">Reporting pipeline</span>
            <span className="text-success">Controlled flow</span>
          </div>
          <PipelineFlow compact label="MIS reporting pipeline" steps={flow.map((item) => ({ label: item }))} />
        </div>
      </div>
    </Section>
  );
}
