import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { WhyHire } from "@/components/site/WhyHire";
import { About } from "@/components/site/About";
import { ValueProposition } from "@/components/site/ValueProposition";
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
          "Mahesh Kale — Data Analyst · Data Scientist · Python Developer · MIS Analyst",
      },
      {
        name: "description",
        content:
          "MAHI Portfolio — Mahesh Kale is an entry-level IT professional targeting Data Analyst, Data Scientist, Python Developer and MIS Analyst roles. Verified skills: Python, SQL, Power BI, Machine Learning.",
      },
      {
        name: "keywords",
        content:
          "Mahesh Kale, Data Analyst, Data Scientist, Python Developer, MIS Analyst, Python, SQL, Power BI, Pandas, NumPy, Scikit-learn, Machine Learning, MySQL, Flask, REST API, Pune",
      },
      {
        property: "og:title",
        content:
          "Mahesh Kale — Data Analyst · Data Scientist · Python Developer · MIS Analyst",
      },
      {
        property: "og:description",
        content:
          "Entry-level IT professional focused on Data Analyst, Data Scientist, Python Developer and MIS Analyst roles. Python, SQL, Power BI and machine-learning fundamentals.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Mahesh Kale — Data Analyst · Data Scientist · Python Developer · MIS Analyst",
      },
      {
        name: "twitter:description",
        content:
          "Entry-level IT professional targeting Data Analyst, Data Scientist, Python Developer and MIS Analyst roles.",
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
      <About />
      <Dashboard />
      <Projects />
      <Skills />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
