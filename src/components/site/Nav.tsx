import { motion } from "motion/react";
import { useEffect, useState } from "react";

const links = [
  { href: "#why-hire", label: "Why Hire" },
  { href: "#about", label: "Executive Profile" },
  { href: "#value-proposition", label: "Value" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={`glass flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 ${
          scrolled ? "shadow-2xl" : ""
        }`}
      >
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-black">
            M
          </span>
          <span className="text-sm font-semibold tracking-tight">
            MAHI<span className="text-muted-foreground"> / portfolio</span>
          </span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="glow-primary inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Hire me
        </a>
      </nav>
    </motion.header>
  );
}
