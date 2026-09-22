import { motion } from "motion/react";
import { Section } from "./Section";
import { Target, Wrench, MapPin, Clock } from "lucide-react";
import rolesData from "@/mahi/knowledge/roles.json";
import skillsData from "@/mahi/knowledge/skills.json";
import profile from "@/mahi/knowledge/profile.json";

const roles = rolesData.roles;
const skillCount = (skillsData as { skills: Array<unknown> }).skills.length;

const stats = [
  { icon: Target, label: "Target roles", value: String(roles.length) },
  { icon: Wrench, label: "Verified skills", value: String(skillCount) },
  { icon: Clock, label: "Availability", value: profile.availability },
  { icon: MapPin, label: "Based in", value: "Pune, India" },
];

export function Dashboard() {
  return (
    <Section
      id="dashboard"
      eyebrow="Career focus"
      title="Aligned to four data-focused roles."
      description="A verified snapshot of where Mahesh is focused today — target roles, core toolset and availability. No inflated metrics, just the facts."
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel overflow-hidden rounded-lg p-6 md:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-md border border-border bg-panel p-4"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <s.icon className="h-4 w-4 text-primary" />
                <span className="text-[10px] uppercase tracking-widest">
                  {s.label}
                </span>
              </div>
              <div className="mt-3 truncate text-lg font-semibold tracking-tight md:text-xl">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-md border border-border bg-panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Target roles</div>
              <div className="text-xs text-muted-foreground">
                Four data-focused positions Mahesh is actively pursuing
              </div>
            </div>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Verified
            </span>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {roles.map((r, i) => (
              <motion.li
                key={r.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold tracking-tight">
                    {r.title}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Role 0{i + 1}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.supportedBy.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-foreground/90"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </Section>
  );
}
