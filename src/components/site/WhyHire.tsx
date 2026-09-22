import { Section } from "./Section";
import { PipelineFlow } from "./PipelineFlow";

const stages = [
  {
    step: "01",
    title: "Collect",
    copy: "Bring structured source records into one analysis path.",
    tools: "Excel · SQL · CSV",
  },
  {
    step: "02",
    title: "Clean",
    copy: "Standardize fields, formats, missing values and duplicates.",
    tools: "Power Query · Pandas",
  },
  {
    step: "03",
    title: "Validate",
    copy: "Check completeness, consistency and reconciliation rules.",
    tools: "Excel · SQL",
  },
  {
    step: "04",
    title: "Analyze",
    copy: "Query patterns, segments, trends and performance drivers.",
    tools: "SQL · Python",
  },
  {
    step: "05",
    title: "Visualize",
    copy: "Translate measures into readable KPI and trend views.",
    tools: "Power BI · Excel",
  },
  {
    step: "06",
    title: "Report",
    copy: "Deliver repeatable reporting for business review.",
    tools: "MIS · Dashboards",
  },
];

export function WhyHire() {
  return (
    <Section
      id="workflow"
      eyebrow="Section 02 / Operating model"
      title="How I work with data"
      description="A controlled path from source records to a decision-ready report."
    >
      <PipelineFlow
        label="Data analysis workflow"
        steps={stages.map((stage) => ({
          label: stage.title,
          detail: stage.copy,
          tools: stage.tools,
        }))}
      />
    </Section>
  );
}
