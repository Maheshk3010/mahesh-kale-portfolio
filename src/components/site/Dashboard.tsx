import { motion } from "motion/react";
import { Section } from "./Section";
import { Activity, GitCommit, Cpu, Zap } from "lucide-react";

const stats = [
  { icon: GitCommit, label: "Commits (365d)", value: "1,842", trend: "+12%" },
  { icon: Activity, label: "Deploys shipped", value: "312", trend: "+8%" },
  { icon: Cpu, label: "Models in prod", value: "12", trend: "+3" },
  { icon: Zap, label: "Avg. p95 latency", value: "184ms", trend: "-22%" },
];

const bars = [42, 61, 55, 78, 66, 82, 71, 90, 74, 88, 96, 84];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export function Dashboard() {
  return (
    <Section
      id="dashboard"
      eyebrow="Career dashboard"
      title="A quantified year of building."
      description="A live-feel snapshot of what I've been shipping — output, reliability and the systems that keep improving."
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass overflow-hidden rounded-3xl p-6 md:p-8"
      >
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="flex items-center justify-between text-muted-foreground">
                <s.icon className="h-4 w-4" />
                <span className="rounded-full bg-[color:var(--success)]/15 px-2 py-0.5 text-[10px] font-semibold text-[color:var(--success)]">
                  {s.trend}
                </span>
              </div>
              <div className="mt-3 text-2xl font-semibold tracking-tight">
                {s.value}
              </div>
              <div className="mt-0.5 text-xs uppercase tracking-widest text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Shipping cadence</div>
              <div className="text-xs text-muted-foreground">
                Merges to main, last 12 months
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" />
              volume
            </div>
          </div>

          <div className="flex h-40 items-end gap-2">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex-1 rounded-t-md bg-gradient-to-t from-primary/70 to-accent/90"
              >
                <span className="pointer-events-none absolute inset-x-0 -top-6 text-center text-[10px] font-semibold text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  {h}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            {months.map((m, i) => (
              <div key={i} className="flex-1 text-center text-[10px] text-muted-foreground">
                {m}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
