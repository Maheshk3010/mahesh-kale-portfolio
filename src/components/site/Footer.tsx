export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-8 font-mono text-[9px] uppercase tracking-[.14em] text-muted-foreground sm:px-8 md:flex-row">
        <span>Mahesh Kale / Analytics Operating System</span>
        <span>Data Analyst · MIS Executive · Pune</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
