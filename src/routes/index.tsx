import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { ProfessionalSnapshot } from "@/components/site/ProfessionalSnapshot";
import { AnalyticsSnapshot } from "@/components/site/AnalyticsSnapshot";
import { RealWorkPreview } from "@/components/site/RealWorkPreview";
import { Projects } from "@/components/site/Projects";
import { Dashboard } from "@/components/site/Dashboard";
import { Experience } from "@/components/site/Experience";
import { Skills } from "@/components/site/Skills";
import { Certifications } from "@/components/site/Certifications";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { ScrollSignal } from "@/components/site/ScrollSignal";
import { site } from "@/mahi/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: site.title },
      { name: "description", content: site.description },
      {
        name: "keywords",
        content:
          "Mahesh Kale, Data Analyst, MIS Executive, Reporting Analyst, BI Analyst, SQL, Power BI, Advanced Excel, MIS Reporting, KPI Reporting, Pune",
      },
      { property: "og:title", content: site.title },
      { property: "og:description", content: site.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${site.url}/` },
      { property: "og:image", content: site.image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: site.title },
      { name: "twitter:description", content: site.description },
      { name: "twitter:image", content: site.image },
    ],
    links: [{ rel: "canonical", href: `${site.url}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mahesh Sakharam Kale",
          url: `${site.url}/`,
          image: site.image,
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
            "Data Reconciliation",
            "Business Reporting",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
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
        <ProfessionalSnapshot />
        <AnalyticsSnapshot />
        <RealWorkPreview />
        <Projects />
        <Dashboard />
        <Experience />
        <Skills />
        <Certifications />
        <About />
        <Contact />
        <Footer />
      </main>
    </MotionConfig>
  );
}
