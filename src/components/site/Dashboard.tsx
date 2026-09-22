import { motion } from "motion/react";
import { Calculator, Database, FileCheck2, RefreshCcw } from "lucide-react";
import { Section } from "./Section";
import { PipelineFlow } from "./PipelineFlow";
import { inView, revealUp, stagger } from "@/lib/motion";

const capabilities = [
  {
    number: "01",
    title: "MIS Reporting",
    copy: "Organize recurring operational data into structured reports for review.",
    tools: "Excel · SQL · Power BI",
    icon: Database,
  },
  {
    number: "02",
    title: "KPI Reporting",
    copy: "Define and present business measures with consistent calculation logic.",
    tools: "DAX · Excel · Power BI",
    icon: Calculator,
  },
  {
    number: "03",
    title: "Data Validation",
    copy: "Check source completeness, field consistency and reporting readiness.",
    tools: "SQL · Excel · Reconciliation",
    icon: FileCheck2,
  },
  {
    number: "04",
    title: "Reporting Automation",
    copy: "Use repeatable transformations to reduce manual reporting steps.",
    tools: "Python · Power Query",
    icon: RefreshCcw,
  },
];

const flow = [
  "Source data",
  "Excel / SQL",
  "Data validation",
  "Reconciliation",
  "KPI calculation",
  "Power BI / Report",
  "Management view",
];

const evidenceSlots = [
  "Daily / weekly / monthly MIS",
  "KPI tracker",
  "Excel report",
  "Power BI dashboard",
  "Reconciliation output",
  "Validation workflow",
  "Target vs actual",
  "Performance report",
];

export function Dashboard() {
  return (
    <Section
      id="mis"
      eyebrow="04 / Reporting operations"
      title="MIS & reporting"
      description="Accuracy first: a reporting chain designed around validated inputs, consistent KPIs and clear management output."
    >
      <div className="border border-border bg-surface">
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="grid border-b border-border md:grid-cols-2 xl:grid-cols-4"
        >
          {capabilities.map(({ number, title, copy, tools, icon: Icon }) => (
            <motion.article
              key={title}
              variants={revealUp}
              className="mis-capability group border-b border-border p-6 md:border-r xl:border-b-0"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-primary">CAPABILITY / {number}</span>
                <Icon
                  className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-8 font-display text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p>
              <p className="mt-8 border-t border-border pt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground">
                {tools}
              </p>
            </motion.article>
          ))}
        </motion.div>
        <div className="mis-console p-6 sm:p-8">
          <div className="mb-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em]">
            <span className="text-muted-foreground">Reporting pipeline</span>
            <span className="text-success">Validated before reporting</span>
          </div>
          <PipelineFlow
            compact
            label="MIS reporting pipeline"
            steps={flow.map((item) => ({ label: item }))}
          />
        </div>
        <div className="border-t border-border p-6 sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[.16em]">
            <span className="text-muted-foreground">MIS evidence register</span>
            <span className="text-primary">Awaiting verified outputs</span>
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {evidenceSlots.map((item, index) => (
              <div key={item} className="mis-proof-slot bg-background p-4">
                <span className="font-mono text-[8px] text-primary">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-sm font-semibold">{item}</p>
                <p className="mt-2 font-mono text-[7px] uppercase tracking-[.12em] text-muted-foreground">Evidence pending</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
