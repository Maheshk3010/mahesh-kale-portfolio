export function Footer() {
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
              Building AI-powered software &amp; data-driven solutions.
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mahesh Kale. Crafted with care.
        </div>
      </div>
    </footer>
  );
}
