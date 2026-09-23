import { motion } from "motion/react";
import { Download, Menu, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { knowledgeBase } from "@/mahi/knowledgeBase";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  ["#top", "Home", "01"],
  ["#snapshot", "Profile", "02"],
  ["#proof", "Proof", "03"],
  ["#work-preview", "Work", "04"],
  ["#projects", "Cases", "05"],
  ["#mis", "MIS", "06"],
  ["#experience", "Experience", "07"],
  ["#stack", "Core", "08"],
  ["#technical-archive", "Archive", "09"],
  ["#credentials", "Credentials", "10"],
  ["#method", "Method", "11"],
  ["#contact", "Contact", "12"],
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#top");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const sections = links
      .map(([href]) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.15, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55 }}
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color] duration-300 ${scrolled ? "border-border bg-background/94" : "border-transparent bg-background/55"}`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Primary navigation"
      >
        <a
          href="#top"
          className="flex min-w-0 items-center gap-3"
          aria-label="Mahesh Kale Analytics Operating System home"
        >
          <span className="grid h-8 w-8 place-items-center border border-primary/50 bg-primary/10 text-primary">
            <Radio className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-bold uppercase">
              Mahesh Kale
            </span>
            <span className="block font-mono text-[8px] uppercase tracking-[.16em] text-muted-foreground">
              Data Lab
            </span>
          </span>
        </a>
        <ul className="hidden items-center gap-2 xl:flex">
          {links.map(([href, label, number]) => (
            <li key={href}>
              <a
                href={href}
                aria-current={active === href ? "location" : undefined}
                className={`nav-link group relative py-2 font-mono text-[8px] font-bold uppercase tracking-[.1em] transition-colors hover:text-primary ${active === href ? "is-active text-foreground" : "text-muted-foreground"}`}
              >
                <span className="mr-1 text-border-strong">{number}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="hidden lg:inline-flex">
            <a href={knowledgeBase.resume.url} download={knowledgeBase.resume.filename}>
              <Download /> Resume
            </a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="xl:hidden"
                aria-label="Open navigation menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="border-border bg-background/98 p-8">
              <SheetTitle className="font-display uppercase">Analytics OS</SheetTitle>
              <SheetDescription>Navigate Mahesh Kale&apos;s analytics portfolio.</SheetDescription>
              <div className="mt-10 grid gap-1">
                {links.map(([href, label, number]) => (
                  <SheetClose key={href} asChild>
                    <a
                      href={href}
                      aria-current={active === href ? "location" : undefined}
                      className={`grid grid-cols-[36px_1fr] items-center border-b py-3 font-display text-lg font-bold uppercase transition-colors ${active === href ? "border-primary text-primary" : "border-border"}`}
                    >
                      <span className="font-mono text-[9px] text-primary">{number}</span>
                      {label}
                    </a>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
