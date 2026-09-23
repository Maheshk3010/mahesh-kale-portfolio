import { knowledgeBase } from "./knowledgeBase";
import profilePhoto from "@/assets/mahesh-kale-professional-profile.png.asset.json";

const siteUrl = "https://mahesh-kale-portfolio.lovable.app";

export const site = {
  name: "Mahesh Kale Data Intelligence Lab",
  url: siteUrl,
  image: `${siteUrl}${profilePhoto.url}`,
  title: "Mahesh Kale — Data Analyst & MIS Executive",
  description:
    "Mahesh Kale is a Data Analyst and MIS Executive using SQL, Power BI, Advanced Excel and Python for analysis, KPI reporting, dashboards and reporting automation.",
};

export const coreTools = ["SQL", "Power BI", "Advanced Excel", "Python"];

export const specializations = [
  "MIS Reporting",
  "KPI Reporting",
  "Data Validation",
  "Data Reconciliation",
  "Dashboard Development",
  "Reporting Automation",
  "Business Reporting",
];

export const proofMetrics = [
  { label: "Data scale", value: 50, suffix: "K+", detail: "Records" },
  { label: "Customer analytics", value: 7, suffix: "K+", detail: "Customer records" },
  { label: "Reporting", value: 15, suffix: "+", detail: "KPI frameworks" },
  { label: "Experience", value: 3, suffix: "", detail: "Internships" },
];

export const capabilityGroups = [
  {
    verb: "Analyze",
    tools: ["SQL", "Python", "Pandas", "NumPy"],
    context: "Sales performance · Customer analytics",
  },
  {
    verb: "Report",
    tools: ["Power BI", "Advanced Excel", "DAX", "Power Query"],
    context: "MIS · KPI reporting · Dashboards",
  },
  {
    verb: "Validate",
    tools: ["Data Cleaning", "Data Validation", "Data Reconciliation"],
    context: "Reporting inputs · Operational data",
  },
  {
    verb: "Visualize",
    tools: ["KPI Dashboards", "Business Reporting", "Data Visualization"],
    context: "Management-ready decision views",
  },
  {
    verb: "Automate",
    tools: ["Reporting Automation", "Power Query", "Python", "SQL"],
    context: "Repeatable reporting workflows",
  },
];

export const misModules = [
  { title: "Daily MIS", detail: "Structured daily operating view for recurring review." },
  { title: "Weekly MIS", detail: "Consolidated weekly performance and exception view." },
  { title: "Monthly MIS", detail: "Period-level management reporting structure." },
  { title: "KPI Tracker", detail: "Consistent calculation and monitoring of business measures." },
  { title: "Target vs Actual", detail: "Performance comparison against defined targets." },
  { title: "SLA / TAT", detail: "Operational service and turnaround-time monitoring." },
  {
    title: "Data Reconciliation",
    detail: "Cross-checks between source, transformed and reported values.",
  },
  {
    title: "Exception Monitoring",
    detail: "Focused review of discrepancies and reporting exceptions.",
  },
];

export const methodology = [
  "Question",
  "Data",
  "Clean",
  "Validate",
  "Transform",
  "Analyze",
  "Visualize",
  "Report",
  "Insight",
];

export const profile = knowledgeBase.profile;
export const projects = knowledgeBase.projects.projects;
export const experience = knowledgeBase.experience.experience;
export const education = knowledgeBase.education.education;
export const credentials = knowledgeBase.certifications.certifications;
