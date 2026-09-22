import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { AnalyticsSnapshot } from "@/components/site/AnalyticsSnapshot";
import { About } from "@/components/site/About";
import { Dashboard } from "@/components/site/Dashboard";
import { Projects } from "@/components/site/Projects";
import { Skills } from "@/components/site/Skills";
import { Experience } from "@/components/site/Experience";
import { Certifications } from "@/components/site/Certifications";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { ScrollSignal } from "@/components/site/ScrollSignal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Mahesh Kale — Data Analyst & MIS Executive",
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
        content: "Mahesh Kale — Data Analyst & MIS Executive",
      },
      {
        property: "og:description",
        content:
          "SQL, Power BI, Advanced Excel and Python for analysis, MIS reporting, KPI dashboards and business reporting.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mahesh-kale-portfolio.vercel.app/" },
      {
        property: "og:image",
        content: "https://mahesh-kale-portfolio.vercel.app/maheshkale_pic.jpeg",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://mahesh-kale-portfolio.vercel.app/maheshkale_pic.jpeg",
      },
      {
        name: "twitter:title",
        content: "Mahesh Kale — Data Analyst & MIS Executive",
      },
      {
        name: "twitter:description",
        content:
          "SQL, Power BI, Advanced Excel and Python for analysis, MIS reporting, KPI dashboards and business reporting.",
      },
    ],
    links: [{ rel: "canonical", href: "https://mahesh-kale-portfolio.vercel.app/" }],
  }),

  component: Index,
});

function Index() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mahesh Sakharam Kale",
    url: "https://mahesh-kale-portfolio.vercel.app/",
    image: "https://mahesh-kale-portfolio.vercel.app/maheshkale_pic.jpeg",
    jobTitle: ["Data Analyst", "MIS Executive"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: ["https://github.com/Maheshk3010", "https://www.linkedin.com/in/maheshkale3010/"],
    knowsAbout: [
      "SQL",
      "Power BI",
      "Advanced Excel",
      "Python",
      "MIS Reporting",
      "KPI Reporting",
      "Data Validation",
      "Business Reporting",
    ],
  };
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="sr-only z-[100] bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <main id="main-content" className="relative min-h-screen text-foreground">
        <ScrollSignal />
        <Nav />
        <Hero />
        <AnalyticsSnapshot />
        <Projects />
        <Dashboard />
        <Experience />
        <Skills />
        <Certifications />
        <About />
        <Contact />
        <Footer />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </MotionConfig>
  );
}
