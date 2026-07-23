import { useState } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  FileText,
  ExternalLink,
  Download,
  Copy,
  Check,
  MapPin,
  Info,
  Sparkles,
} from "lucide-react";
import { analyticsService, knowledgeBase, UNVERIFIED_FALLBACK } from "@/mahi";
import type { AnalyticsActionType } from "@/mahi";

/* ---------------------------- Building blocks ---------------------------- */

export function ActionButton({
  href,
  onClick,
  icon,
  children,
  variant = "default",
  download,
  external = true,
  analyticsAction,
  analyticsLabel,
}: {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: "default" | "primary";
  download?: boolean | string;
  external?: boolean;
  analyticsAction?: AnalyticsActionType;
  analyticsLabel?: string;
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all";
  const styles =
    variant === "primary"
      ? "border border-primary/50 bg-primary/15 text-primary hover:bg-primary/25 hover:shadow-[0_0_18px_-6px_var(--primary)]"
      : "border border-white/10 bg-white/[0.04] text-foreground/90 hover:border-primary/40 hover:bg-primary/10 hover:text-primary";
  const cls = `${base} ${styles}`;
  const track = () => {
    if (analyticsAction) analyticsService.trackAction(analyticsAction, analyticsLabel);
  };

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...(download !== undefined ? { download } : {})}
        onClick={() => {
          track();
          onClick?.();
        }}
        className={cls}
      >
        {icon}
        {children}
        {external && !download && <ExternalLink className="h-3 w-3 opacity-70" />}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={() => {
        track();
        onClick?.();
      }}
      className={cls}
    >
      {icon}
      {children}
    </button>
  );
}

export function CopyButton({
  value,
  label,
  icon,
  analyticsAction,
}: {
  value: string;
  label: string;
  icon?: React.ReactNode;
  analyticsAction?: AnalyticsActionType;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <ActionButton
      icon={copied ? <Check className="h-3 w-3 text-primary" /> : (icon ?? <Copy className="h-3 w-3" />)}
      analyticsAction={analyticsAction}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* ignore */
        }
      }}
    >
      {copied ? "Copied" : label}
    </ActionButton>
  );
}

function CardShell({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-sm text-foreground/90 shadow-[0_10px_30px_-20px_var(--primary)]">
      <div className="mb-2.5 flex items-start gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="text-[13px] font-semibold tracking-tight text-foreground">
            {title}
          </h4>
          {subtitle && (
            <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export function UnverifiedCard({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-3.5">
      <div className="flex items-start gap-2.5">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
          <Info className="h-3.5 w-3.5" />
        </span>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-primary">
            Verified Information Only
          </div>
          <p className="mt-1 text-sm leading-relaxed text-foreground/90">{message}</p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Resume -------------------------------- */

export function ResumeCard({ reply }: { reply?: string }) {
  const r = knowledgeBase.resume;
  if (!r.url) {
    return <UnverifiedCard message="I don't have a verified resume available." />;
  }
  return (
    <CardShell
      icon={<FileText className="h-4 w-4" />}
      title={r.filename || "Resume"}
      subtitle={r.updated ? `Last updated · ${r.updated}` : "Professional resume"}
    >
      {reply && (
        <p className="mb-2.5 text-[12px] leading-relaxed text-foreground/80">
          {firstLine(reply)}
        </p>
      )}
      {r.summary && (
        <p className="mb-2.5 text-[12px] leading-relaxed text-foreground/75">
          {r.summary}
        </p>
      )}
      <div className="flex flex-wrap gap-1.5">
        <ActionButton
          href={r.url}
          icon={<FileText className="h-3 w-3" />}
          variant="primary"
          analyticsAction="resume_view"
        >
          View Resume
        </ActionButton>
        <ActionButton
          href={r.url}
          icon={<Download className="h-3 w-3" />}
          download={r.filename || true}
          external={false}
          analyticsAction="resume_download"
        >
          Download Resume
        </ActionButton>
      </div>
    </CardShell>
  );
}

/* -------------------------------- GitHub -------------------------------- */

export function GitHubCard({
  reply,
  onAsk,
}: {
  reply?: string;
  onAsk?: (q: string) => void;
}) {
  const link =
    knowledgeBase.social.links.find((l) => l.platform.toLowerCase() === "github") ??
    (knowledgeBase.contact.github
      ? { platform: "GitHub", url: knowledgeBase.contact.github, handle: "" }
      : null);

  if (!link?.url) {
    return (
      <UnverifiedCard message="I don't have a verified GitHub profile available." />
    );
  }

  const repoCount = knowledgeBase.projects.projects.length;
  const handle = link.handle || link.url.replace(/^https?:\/\/(www\.)?github\.com\//, "");

  return (
    <CardShell
      icon={<Github className="h-4 w-4" />}
      title="GitHub Profile"
      subtitle={handle ? `@${handle.replace(/^@/, "")}` : link.url}
    >
      {reply && (
        <p className="mb-2.5 text-[12px] leading-relaxed text-foreground/80">
          {firstLine(reply)}
        </p>
      )}
      {repoCount > 0 && (
        <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-foreground/80">
          <Sparkles className="h-3 w-3 text-primary" />
          {repoCount} featured project{repoCount === 1 ? "" : "s"}
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        <ActionButton
          href={link.url}
          icon={<Github className="h-3 w-3" />}
          variant="primary"
          analyticsAction="github_open"
        >
          Open GitHub Profile
        </ActionButton>
        {repoCount > 0 && onAsk && (
          <ActionButton
            icon={<Sparkles className="h-3 w-3" />}
            analyticsAction="github_view_projects"
            onClick={() => onAsk("Show me Mahesh's projects")}
          >
            View Featured Projects
          </ActionButton>
        )}
      </div>
    </CardShell>
  );
}

/* ------------------------------- LinkedIn ------------------------------- */

export function LinkedInCard({ reply }: { reply?: string }) {
  const link =
    knowledgeBase.social.links.find((l) => l.platform.toLowerCase() === "linkedin") ??
    (knowledgeBase.contact.linkedin
      ? { platform: "LinkedIn", url: knowledgeBase.contact.linkedin, handle: "" }
      : null);

  if (!link?.url) {
    return (
      <UnverifiedCard message="I don't have a verified LinkedIn profile available." />
    );
  }

  const handle =
    link.handle ||
    link.url.replace(/^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/, "").replace(/\/$/, "");

  return (
    <CardShell
      icon={<Linkedin className="h-4 w-4" />}
      title="LinkedIn Profile"
      subtitle={handle ? `linkedin.com/in/${handle}` : link.url}
    >
      {reply && (
        <p className="mb-2.5 text-[12px] leading-relaxed text-foreground/80">
          {firstLine(reply)}
        </p>
      )}
      <div className="flex flex-wrap gap-1.5">
        <ActionButton
          href={link.url}
          icon={<Linkedin className="h-3 w-3" />}
          variant="primary"
          analyticsAction="linkedin_open"
        >
          Open LinkedIn
        </ActionButton>
      </div>
    </CardShell>
  );
}

/* -------------------------------- Contact ------------------------------- */

export function ContactCard({ reply }: { reply?: string }) {
  const c = knowledgeBase.contact;
  const hasAny = c.email || c.phone;
  if (!hasAny) {
    return (
      <UnverifiedCard message="I don't have verified contact details available. Please reach out via LinkedIn." />
    );
  }
  return (
    <CardShell
      icon={<Mail className="h-4 w-4" />}
      title="Contact Mahesh"
      subtitle={c.availability || undefined}
    >
      {reply && (
        <p className="mb-2.5 text-[12px] leading-relaxed text-foreground/80">
          {firstLine(reply)}
        </p>
      )}
      <div className="mb-2.5 space-y-1.5 text-[12px] text-foreground/85">
        {c.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-3 w-3 text-primary" />
            <span className="truncate">{c.email}</span>
          </div>
        )}
        {c.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-3 w-3 text-primary" />
            <span>{c.phone}</span>
          </div>
        )}
        {c.location && (
          <div className="flex items-center gap-2 text-foreground/70">
            <MapPin className="h-3 w-3 text-primary" />
            <span>{c.location}</span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {c.email && (
          <>
            <ActionButton
              href={`mailto:${c.email}`}
              icon={<Mail className="h-3 w-3" />}
              variant="primary"
              external={false}
              analyticsAction="email_click"
            >
              Email
            </ActionButton>
            <CopyButton
              value={c.email}
              label="Copy Email"
              icon={<Copy className="h-3 w-3" />}
              analyticsAction="copy_email"
            />
          </>
        )}
        {c.phone && (
          <>
            <ActionButton
              href={`tel:${c.phone}`}
              icon={<Phone className="h-3 w-3" />}
              external={false}
              analyticsAction="phone_click"
            >
              Call
            </ActionButton>
            <CopyButton
              value={c.phone}
              label="Copy Phone"
              icon={<Copy className="h-3 w-3" />}
              analyticsAction="copy_phone"
            />
          </>
        )}
        {c.linkedin && (
          <ActionButton
            href={c.linkedin}
            icon={<Linkedin className="h-3 w-3" />}
            analyticsAction="linkedin_open"
          >
            LinkedIn
          </ActionButton>
        )}
      </div>
    </CardShell>
  );
}

/* --------------------------- Follow-up chips --------------------------- */

export function FollowUpSuggestions({
  suggestions,
  onAsk,
}: {
  suggestions?: string[];
  onAsk: (q: string) => void;
}) {
  if (!suggestions || suggestions.length === 0) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      <div className="w-full text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        Suggested next
      </div>
      {suggestions.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onAsk(s)}
          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-foreground/80 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
        >
          {s}
        </button>
      ))}
    </div>
  );
}

/* -------------------------------- helpers -------------------------------- */

function firstLine(text: string): string {
  const trimmed = text.trim();
  const idx = trimmed.indexOf("\n");
  return idx === -1 ? trimmed : trimmed.slice(0, idx);
}
