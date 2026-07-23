import { motion } from "motion/react";
import {
  ArrowLeft,
  BarChart3,
  FileText,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  MousePointerClick,
  Phone,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import { useMemo } from "react";
import { analyticsService, useAnalytics } from "@/mahi/analytics";
import type { AnalyticsActionType, AnalyticsCounts } from "@/mahi/analytics";
import type { Intent } from "@/mahi";

const INTENT_LABEL: Partial<Record<Intent, string>> = {
  profile: "Profile",
  skills: "Skills",
  projects: "Projects",
  experience: "Experience",
  education: "Education",
  certifications: "Certifications",
  resume: "Resume",
  contact: "Contact",
  github: "GitHub",
  linkedin: "LinkedIn",
  roles: "Role fit",
  interview: "Interview",
  general: "General",
  unknown: "Other",
};

const ACTION_LABEL: Record<AnalyticsActionType, { label: string; icon: React.ReactNode }> = {
  resume_view: { label: "Resume views", icon: <FileText className="h-3 w-3" /> },
  resume_download: { label: "Resume downloads", icon: <FileText className="h-3 w-3" /> },
  github_open: { label: "GitHub opens", icon: <Github className="h-3 w-3" /> },
  github_view_projects: { label: "GitHub project views", icon: <Github className="h-3 w-3" /> },
  linkedin_open: { label: "LinkedIn opens", icon: <Linkedin className="h-3 w-3" /> },
  email_click: { label: "Email clicks", icon: <Mail className="h-3 w-3" /> },
  phone_click: { label: "Phone clicks", icon: <Phone className="h-3 w-3" /> },
  copy_email: { label: "Email copied", icon: <Mail className="h-3 w-3" /> },
  copy_phone: { label: "Phone copied", icon: <Phone className="h-3 w-3" /> },
  quick_question: { label: "Quick questions", icon: <Sparkles className="h-3 w-3" /> },
  voice_input: { label: "Voice inputs", icon: <MousePointerClick className="h-3 w-3" /> },
  navigate_section: { label: "Section jumps", icon: <MousePointerClick className="h-3 w-3" /> },
};

export function AnalyticsPanel({ onClose }: { onClose: () => void }) {
  const snapshot = useAnalytics();
  const { counts } = snapshot;

  const summary = useMemo(() => analyticsService.buildSessionSummary(), [snapshot]);
  const topSkills = analyticsService.topEntries(counts.skills, 5);
  const topProjects = analyticsService.topEntries(counts.projects, 5);
  const topRoles = analyticsService.topEntries(counts.roles, 3);
  const topCerts = analyticsService.topEntries(counts.certifications, 3);
  const topics = Object.entries(counts.topics)
    .filter(([, v]) => (v ?? 0) > 0)
    .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
    .slice(0, 6) as Array<[Intent, number]>;
  const actions = Object.entries(counts.actions)
    .filter(([, v]) => (v ?? 0) > 0)
    .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0)) as Array<[AnalyticsActionType, number]>;

  return (
    <motion.section
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-10 flex flex-col overflow-hidden rounded-3xl bg-[color:var(--background)]/95 backdrop-blur-xl"
      role="region"
      aria-label="Recruiter analytics dashboard"
    >
      <header className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Back to chat"
          className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
        <div className="grid h-7 w-7 place-items-center rounded-md bg-primary/15 text-primary">
          <BarChart3 className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Recruiter Analytics
          </h3>
          <p className="text-[11px] text-muted-foreground">Session-only · never leaves this browser</p>
        </div>
        <button
          type="button"
          onClick={() => analyticsService.reset()}
          className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          title="Clear session analytics"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <SessionSummaryCard summary={summary} counts={counts} startedAt={snapshot.startedAt} />

        <div className="grid grid-cols-2 gap-2">
          <StatCard
            icon={<MessageSquare className="h-3.5 w-3.5" />}
            label="Questions"
            value={counts.questions}
          />
          <StatCard
            icon={<Target className="h-3.5 w-3.5" />}
            label="Topics"
            value={topics.length}
          />
        </div>

        <AnalyticsCard title="Topics discussed" icon={<Target className="h-3.5 w-3.5" />}>
          {topics.length === 0 ? (
            <EmptyRow>No topics yet.</EmptyRow>
          ) : (
            <BarList
              items={topics.map(([intent, v]) => ({
                key: INTENT_LABEL[intent] ?? intent,
                value: v ?? 0,
              }))}
            />
          )}
        </AnalyticsCard>

        <AnalyticsCard title="Most viewed skills" icon={<Sparkles className="h-3.5 w-3.5" />}>
          {topSkills.length === 0 ? (
            <EmptyRow>Ask about a skill to populate this list.</EmptyRow>
          ) : (
            <BarList items={topSkills} />
          )}
        </AnalyticsCard>

        <AnalyticsCard title="Most viewed projects" icon={<Sparkles className="h-3.5 w-3.5" />}>
          {topProjects.length === 0 ? (
            <EmptyRow>No projects viewed yet.</EmptyRow>
          ) : (
            <BarList items={topProjects} />
          )}
        </AnalyticsCard>

        {topRoles.length > 0 && (
          <AnalyticsCard title="Most requested roles" icon={<Target className="h-3.5 w-3.5" />}>
            <BarList items={topRoles} />
          </AnalyticsCard>
        )}

        {topCerts.length > 0 && (
          <AnalyticsCard title="Most requested certifications" icon={<Sparkles className="h-3.5 w-3.5" />}>
            <BarList items={topCerts} />
          </AnalyticsCard>
        )}

        <AnalyticsCard title="Actions performed" icon={<MousePointerClick className="h-3.5 w-3.5" />}>
          {actions.length === 0 ? (
            <EmptyRow>No actions performed yet.</EmptyRow>
          ) : (
            <ul className="space-y-1.5">
              {actions.map(([action, count]) => {
                const meta = ACTION_LABEL[action];
                return (
                  <li
                    key={action}
                    className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[12px]"
                  >
                    <span className="flex items-center gap-2 text-foreground/85">
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-primary/15 text-primary">
                        {meta?.icon ?? <MousePointerClick className="h-3 w-3" />}
                      </span>
                      {meta?.label ?? action}
                    </span>
                    <span className="font-medium tabular-nums text-primary">{count}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </AnalyticsCard>
      </div>
    </motion.section>
  );
}

/* -------------------------------- Sub-cards ------------------------------- */

function SessionSummaryCard({
  summary,
  counts,
  startedAt,
}: {
  summary: string;
  counts: AnalyticsCounts;
  startedAt: number;
}) {
  const minutes = Math.max(1, Math.round((Date.now() - startedAt) / 60000));
  return (
    <div className="rounded-2xl border border-primary/25 bg-primary/[0.06] p-3.5 shadow-[0_10px_30px_-20px_var(--primary)]">
      <div className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-primary">
        <BarChart3 className="h-3 w-3" />
        Session summary
      </div>
      <p className="text-[13px] leading-relaxed text-foreground/90">{summary}</p>
      <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5">
          {counts.questions} question{counts.questions === 1 ? "" : "s"}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5">
          ~{minutes} min session
        </span>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        <span className="grid h-5 w-5 place-items-center rounded-md bg-primary/15 text-primary">
          {icon}
        </span>
        {label}
      </div>
      <div className="mt-1.5 text-2xl font-semibold tabular-nums text-foreground">{value}</div>
    </div>
  );
}

export function AnalyticsCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
      <header className="mb-2 flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-primary/15 text-primary">
          {icon}
        </span>
        <h4 className="text-[12px] font-semibold tracking-tight text-foreground">{title}</h4>
      </header>
      {children}
    </section>
  );
}

function BarList({ items }: { items: Array<{ key: string; value: number }> }) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <ul className="space-y-1.5">
      {items.map((item) => {
        const pct = Math.round((item.value / max) * 100);
        return (
          <li key={item.key} className="space-y-0.5">
            <div className="flex items-center justify-between gap-2 text-[12px]">
              <span className="truncate text-foreground/85">{item.key}</span>
              <span className="tabular-nums text-primary">{item.value}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary shadow-[0_0_10px_-2px_var(--primary)]"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function EmptyRow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] italic text-muted-foreground">{children}</p>
  );
}
