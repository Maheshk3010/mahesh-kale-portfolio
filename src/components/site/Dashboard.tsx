import { motion } from "motion/react";
import { Section } from "./Section";

const capabilities = [
  [
    "01",
    "MIS Reporting",
    "Organize recurring operational data into structured reports for review.",
    "Excel · SQL · Power BI",
  ],
  [
    "02",
    "KPI Reporting",
    "Define and present business measures with consistent calculation logic.",
    "DAX · Excel · Power BI",
  ],
  [
    "03",
    "Data Validation",
    "Check source completeness, field consistency and reporting readiness.",
    "SQL · Excel · Reconciliation",
  ],
  [
    "04",
    "Reporting Automation",
    "Use repeatable transformations to reduce manual reporting steps.",
    "Python · Power Query",
  ],
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
        <div className="grid border-b border-border md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map(([number, title, copy, tools], i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="border-b border-border p-6 md:border-r xl:border-b-0"
            >
              <div className="font-mono text-[9px] text-primary">CAPABILITY / {number}</div>
              <h3 className="mt-8 font-display text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p>
              <p className="mt-8 border-t border-border pt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground">
                {tools}
              </p>
            </motion.article>
          ))}
        </div>
        <div className="p-6 sm:p-8">
          <div className="mb-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em]">
            <span className="text-muted-foreground">Reporting pipeline</span>
            <span className="text-success">Controlled flow</span>
          </div>
          <div className="relative grid gap-px overflow-hidden bg-border md:grid-cols-6">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1 }}
              className="absolute inset-x-0 top-0 z-10 h-px origin-left bg-primary"
            />
            {flow.map((item, i) => (
              <div key={item} className="relative bg-background px-4 py-5">
                <span className="font-mono text-[8px] text-primary">0{i + 1}</span>
                <p className="mt-2 text-sm font-bold uppercase">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
