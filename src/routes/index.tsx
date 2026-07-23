import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
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
      { title: "Mahesh Kale — AI & Full-Stack Engineer" },
      {
        name: "description",
        content:
          "MAHI Portfolio — Mahesh Kale builds AI-powered software and data-driven solutions. Selected work, experience and skills.",
      },
      { property: "og:title", content: "Mahesh Kale — AI & Full-Stack Engineer" },
      {
        property: "og:description",
        content:
          "Building AI-powered software & data-driven solutions. Selected work, experience and skills.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen text-foreground">
      <Nav />
      <Hero />
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
