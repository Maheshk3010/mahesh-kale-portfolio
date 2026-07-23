import contact from "@/mahi/knowledge/contact.json";
import social from "@/mahi/knowledge/social.json";

export function Footer() {
  const linkedin = social.links.find((l) => l.platform === "LinkedIn")?.url ?? "";
  const github = social.links.find((l) => l.platform === "GitHub")?.url ?? "";
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-black">
            M
          </span>
          <div>
            <div className="text-sm font-semibold">MAHI Portfolio</div>
            <div className="text-xs text-muted-foreground">
              Data Analyst · Data Scientist · Python Developer · MIS Analyst.
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="hover:text-foreground">
              {contact.email}
            </a>
          )}
          {contact.phone && (
            <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="hover:text-foreground">
              {contact.phone}
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">
              LinkedIn
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="hover:text-foreground">
              GitHub
            </a>
          )}
          <span>© {new Date().getFullYear()} Mahesh Kale.</span>
        </div>
      </div>
    </footer>
  );
}
