import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { WhyHire } from "@/components/site/WhyHire";
import { About } from "@/components/site/About";
import { Dashboard } from "@/components/site/Dashboard";
import { Projects } from "@/components/site/Projects";
import { Skills } from "@/components/site/Skills";
import { Experience } from "@/components/site/Experience";
import { Certifications } from "@/components/site/Certifications";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Mahesh Kale — Data Analyst & MIS Executive",
      },
      {
        name: "description",
        content:
          "Mahesh Kale uses SQL, Power BI, Advanced Excel and Python for analysis, MIS reporting, KPI dashboards and reporting automation.",
      },
      {
        name: "keywords",
        content:
          "Mahesh Kale, Data Analyst, MIS Executive, SQL, Power BI, Advanced Excel, MIS Reporting, KPI Reporting, Dashboarding, Data Validation, Reporting Automation, Pune",
      },
      {
        property: "og:title",
        content:
          "Mahesh Kale — Data Analyst & MIS Executive",
      },
      {
        property: "og:description",
        content:
          "SQL, Power BI, Advanced Excel and Python for analysis, MIS reporting, KPI dashboards and business reporting.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Mahesh Kale — Data Analyst & MIS Executive",
      },
      {
        name: "twitter:description",
        content:
          "SQL, Power BI, Advanced Excel and Python for analysis, MIS reporting, KPI dashboards and business reporting.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),

  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen text-foreground">
      <Nav />
      <Hero />
      <WhyHire />
      <Projects />
      <Dashboard />
      <Skills />
      <Experience />
      <Certifications />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
