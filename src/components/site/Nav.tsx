import { motion } from "motion/react";
import { Download, Menu, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  ["#top", "Home"],
  ["#projects", "Work"],
  ["#mis", "MIS"],
  ["#stack", "Stack"],
  ["#experience", "Experience"],
  ["#education", "Education"],
  ["#about", "About"],
  ["#contact", "Contact"],
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
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between px-5 transition-all sm:px-8 ${scrolled ? "shadow-[0_15px_40px_-30px_var(--primary)]" : ""}`}
        aria-label="Primary navigation"
      >
        <a
          href="#top"
          className="flex min-w-0 items-center gap-3"
          aria-label="Mahesh Kale Analytics Control Room home"
        >
          <span className="relative grid h-8 w-8 place-items-center border border-primary/50 bg-primary/10 font-mono text-xs font-bold text-primary">
            <Radio className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-bold uppercase">
              Mahesh Kale
            </span>
            <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
              Analytics Control Room
            </span>
          </span>
        </a>
        <ul className="hidden items-center gap-5 lg:flex">
          {links.map(([href, label], i) => (
            <li key={href}>
              <a
                href={href}
                aria-current={active === href ? "location" : undefined}
                className={`nav-link group relative py-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] transition-colors hover:text-primary ${active === href ? "is-active text-foreground" : "text-muted-foreground"}`}
              >
                <span className="mr-1 text-border-strong">0{i + 1}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled
            title="Resume file awaiting verification"
            className="hidden xl:inline-flex"
          >
            <Download />
            Resume
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="border-border bg-background/98 p-8">
              <SheetTitle className="font-display uppercase">Control Room</SheetTitle>
              <SheetDescription>Navigate Mahesh Kale&apos;s analytics workspace.</SheetDescription>
              <div className="mt-12 grid gap-1">
                {links.map(([href, label], i) => (
                  <SheetClose key={href} asChild>
                    <a
                      href={href}
                      aria-current={active === href ? "location" : undefined}
                      className={`grid grid-cols-[36px_1fr] items-center border-b py-4 font-display text-xl font-bold uppercase transition-colors ${active === href ? "border-primary text-primary" : "border-border"}`}
                    >
                      <span className="font-mono text-[10px] text-primary">0{i + 1}</span>
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
