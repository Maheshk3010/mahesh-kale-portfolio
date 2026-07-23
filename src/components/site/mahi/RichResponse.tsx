import { useSyncExternalStore } from "react";
import {
  Info,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Sparkles,
  Target,
  ArrowDown,
  Github,


} from "lucide-react";
import { knowledgeBase, navigationService, UNVERIFIED_FALLBACK } from "@/mahi";
import type { ChatEngineResponse, Intent } from "@/mahi";
import {
  ContactCard as ContactActionCard,
  GitHubCard,
  LinkedInCard,
  ResumeCard,
} from "./cards";

/**
 * Subscribes to the NavigationService so action buttons appear/hide
 * reactively as sections mount/unmount.
 */
function useSectionAvailable(id: string): boolean {
  return useSyncExternalStore(
    (cb) => navigationService.subscribe(cb),
    () => navigationService.has(id),
    () => false,
  );
}

function NavAction({
  sectionId,
  children,
  onNavigated,
}: {
  sectionId: string;
  children: React.ReactNode;
  onNavigated?: () => void;
}) {
  const available = useSectionAvailable(sectionId);
  if (!available) return null;
  return (
    <button
      type="button"
      onClick={() => {
        navigationService.scrollTo(sectionId);
        onNavigated?.();
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-[11px] font-medium text-primary transition-all hover:border-primary/50 hover:bg-primary/15 hover:shadow-[0_0_18px_-6px_var(--primary)]"
    >
      <ArrowDown className="h-3 w-3" />
      {children}
    </button>
  );
}

function ActionsRow({ children }: { children: React.ReactNode }) {
  // Filter out nulls so the row disappears when no NavActions are available.
  const items = Array.isArray(children)
    ? (children as React.ReactNode[]).filter(Boolean)
    : children
      ? [children]
      : [];
  if (items.length === 0) return null;
  return <div className="mt-3 flex flex-wrap gap-1.5">{items}</div>;
}

/**
 * Presentation-only rich response renderer.
 * Consumes the ChatEngineResponse (intent + verified + reply) and reads the
 * shared knowledge module to present structured cards. The ChatEngine itself
 * is untouched; a future OpenAI/RAG engine returning the same shape works
 * without renderer changes.
 */
export function RichResponse({
  response,
  onAsk,
  onNavigate,
}: {
  response: ChatEngineResponse;
  onAsk: (q: string) => void;
  onNavigate?: () => void;
}) {
  const { intent, verified, reply } = response;

  if (!verified || reply.trim() === UNVERIFIED_FALLBACK) {
    return <InfoCard title="Verified Information Only" message={UNVERIFIED_FALLBACK} />;
  }

  switch (intent) {
    case "skills":
      return <SkillsCard reply={reply} onNavigate={onNavigate} />;
    case "projects":
      return <ProjectsCard reply={reply} onAsk={onAsk} onNavigate={onNavigate} />;
    case "experience":
      return <ExperienceCard reply={reply} onNavigate={onNavigate} />;
    case "education":
      return <EducationCard reply={reply} />;
    case "certifications":
      return <CertificationsCard reply={reply} onNavigate={onNavigate} />;
    case "contact":
      return <ContactActionCard reply={reply} />;
    case "github":
      return <GitHubCard reply={reply} onAsk={onAsk} />;
    case "linkedin":
      return <LinkedInCard reply={reply} />;
    case "resume":
      return <ResumeCard reply={reply} />;
    case "roles":
      return <RolesCard reply={reply} onNavigate={onNavigate} />;
    default:
      return <PlainReply reply={reply} />;
  }
}

/* -------------------------------- Building blocks -------------------------------- */

function CardShell({
  icon,
  title,
  children,
}: {
  icon?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-sm text-foreground/90 shadow-[0_10px_30px_-20px_var(--primary)]">
      {title && (
        <div className="mb-2.5 flex items-center gap-2">
          {icon && (
            <span className="grid h-6 w-6 place-items-center rounded-md bg-primary/15 text-primary">
              {icon}
            </span>
          )}
          <h4 className="text-[13px] font-semibold tracking-tight text-foreground">
            {title}
          </h4>
        </div>
      )}
      {children}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
      {children}
    </span>
  );
}

function SubtleBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-foreground/80">
      {children}
    </span>
  );
}

function ActionButton({
  href,
  onClick,
  icon,
  children,
}: {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const cls =
    "inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-foreground/90 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {icon}
        {children}
        <ExternalLink className="h-3 w-3 opacity-70" />
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {icon}
      {children}
    </button>
  );
}

function PlainReply({ reply }: { reply: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
      {reply}
    </div>
  );
}

function InfoCard({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-3.5">
      <div className="flex items-start gap-2.5">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
          <Info className="h-3.5 w-3.5" />
        </span>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-primary">
            {title}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-foreground/90">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Intent cards --------------------------------- */

function SkillsCard({ reply, onNavigate }: { reply: string; onNavigate?: () => void }) {
  const skills = knowledgeBase.skills.skills.filter((s) => s.confidence === "verified");
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});
  return (
    <CardShell icon={<Code2 className="h-3.5 w-3.5" />} title="Skills">
      {reply && (
        <p className="mb-3 text-[12px] leading-relaxed text-foreground/75 whitespace-pre-line">
          {firstLine(reply)}
        </p>
      )}
      <div className="space-y-2.5">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {category}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.map((s) => (
                <Badge key={s.name}>{s.name}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ActionsRow>
        <NavAction sectionId="skills" onNavigated={onNavigate}>
          View Skills
        </NavAction>
      </ActionsRow>
    </CardShell>
  );
}

function ProjectsCard({
  reply,
  onAsk,
  onNavigate,
}: {
  reply: string;
  onAsk: (q: string) => void;
  onNavigate?: () => void;
}) {
  const projects = knowledgeBase.projects.projects;
  if (!projects.length) {
    return <InfoCard title="Verified Information Only" message={UNVERIFIED_FALLBACK} />;
  }
  return (
    <div className="space-y-2.5">
      {reply && (
        <div className="text-[12px] leading-relaxed text-foreground/80 whitespace-pre-line">
          {firstLine(reply)}
        </div>
      )}
      {projects.map((p) => (
        <CardShell key={p.title} icon={<Sparkles className="h-3.5 w-3.5" />} title={p.title}>
          {p.description && (
            <p className="mb-2 text-[12px] leading-relaxed text-foreground/80">
              {p.description}
            </p>
          )}
          {p.technologies?.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {p.technologies.map((t) => (
                <SubtleBadge key={t}>{t}</SubtleBadge>
              ))}
            </div>
          )}
          {p.features?.length > 0 && (
            <ul className="mb-2 space-y-1 text-[12px] text-foreground/80">
              {p.features.slice(0, 3).map((f) => (
                <li key={f} className="flex gap-1.5">
                  <span className="text-primary">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-1.5">
            <ActionButton
              icon={<Info className="h-3 w-3" />}
              onClick={() => onAsk(`Tell me more about ${p.title}`)}
            >
              View Details
            </ActionButton>
            {p.github && (
              <ActionButton href={p.github} icon={<Github className="h-3 w-3" />}>
                Open GitHub
              </ActionButton>
            )}
            <NavAction sectionId="projects" onNavigated={onNavigate}>
              View Project
            </NavAction>
          </div>
        </CardShell>
      ))}
    </div>
  );
}

function ExperienceCard({ reply, onNavigate }: { reply: string; onNavigate?: () => void }) {
  const items = knowledgeBase.experience.experience;
  if (!items.length) {
    return <InfoCard title="Verified Information Only" message={UNVERIFIED_FALLBACK} />;
  }
  return (
    <div className="space-y-2.5">
      {reply && (
        <div className="text-[12px] leading-relaxed text-foreground/80 whitespace-pre-line">
          {firstLine(reply)}
        </div>
      )}
      {items.map((e) => (
        <CardShell
          key={`${e.company}-${e.role}`}
          icon={<Briefcase className="h-3.5 w-3.5" />}
          title={e.role}
        >
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[12px] text-foreground/80">
            <span className="font-medium text-foreground">{e.company}</span>
            {e.duration && <SubtleBadge>{e.duration}</SubtleBadge>}
          </div>
          {e.responsibilities?.length > 0 && (
            <ul className="mb-2 space-y-1 text-[12px] text-foreground/80">
              {e.responsibilities.map((r) => (
                <li key={r} className="flex gap-1.5">
                  <span className="text-primary">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          )}
          {e.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {e.technologies.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          )}
        </CardShell>
      ))}
      <ActionsRow>
        <NavAction sectionId="experience" onNavigated={onNavigate}>
          View Experience
        </NavAction>
      </ActionsRow>
    </div>
  );
}

function EducationCard({ reply }: { reply: string }) {
  const items = knowledgeBase.education.education;
  if (!items.length) {
    return <InfoCard title="Verified Information Only" message={UNVERIFIED_FALLBACK} />;
  }
  return (
    <div className="space-y-2.5">
      {reply && (
        <div className="text-[12px] leading-relaxed text-foreground/80 whitespace-pre-line">
          {firstLine(reply)}
        </div>
      )}
      {items.map((e) => (
        <CardShell
          key={`${e.degree}-${e.university}`}
          icon={<GraduationCap className="h-3.5 w-3.5" />}
          title={e.degree}
        >
          <div className="text-[12px] text-foreground/80">{e.university}</div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {e.graduationYear && <SubtleBadge>Class of {e.graduationYear}</SubtleBadge>}
            {e.grade && <Badge>{e.grade}</Badge>}
          </div>
        </CardShell>
      ))}
    </div>
  );
}

function CertificationsCard({ reply, onNavigate }: { reply: string; onNavigate?: () => void }) {
  const items = knowledgeBase.certifications.certifications;
  if (!items.length) {
    return <InfoCard title="Verified Information Only" message={UNVERIFIED_FALLBACK} />;
  }
  return (
    <div className="space-y-2.5">
      {reply && (
        <div className="text-[12px] leading-relaxed text-foreground/80 whitespace-pre-line">
          {firstLine(reply)}
        </div>
      )}
      {items.map((c) => (
        <CardShell
          key={c.name}
          icon={<Award className="h-3.5 w-3.5" />}
          title={c.name}
        >
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-foreground/80">
            <span>{c.organization}</span>
            {c.year && <SubtleBadge>{c.year}</SubtleBadge>}
          </div>
        </CardShell>
      ))}
      <ActionsRow>
        <NavAction sectionId="certifications" onNavigated={onNavigate}>
          View Certifications
        </NavAction>
      </ActionsRow>
    </div>
  );
}


function RolesCard({ reply, onNavigate }: { reply: string; onNavigate?: () => void }) {
  const roles = knowledgeBase.roles.roles;
  if (!roles.length) {
    return <InfoCard title="Verified Information Only" message={UNVERIFIED_FALLBACK} />;
  }
  return (
    <div className="space-y-2.5">
      {reply && (
        <div className="text-[12px] leading-relaxed text-foreground/80 whitespace-pre-line">
          {firstLine(reply)}
        </div>
      )}
      {roles.map((r) => (
        <CardShell
          key={r.title}
          icon={<Target className="h-3.5 w-3.5" />}
          title={r.title}
        >
          {r.supportedBy?.length > 0 && (
            <>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Supported by
              </div>
              <div className="flex flex-wrap gap-1.5">
                {r.supportedBy.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </>
          )}
        </CardShell>
      ))}
      <ActionsRow>
        <NavAction sectionId="skills" onNavigated={onNavigate}>
          View Skills
        </NavAction>
        <NavAction sectionId="experience" onNavigated={onNavigate}>
          View Experience
        </NavAction>
      </ActionsRow>
    </div>
  );
}

/* --------------------------------- helpers --------------------------------- */

function firstLine(text: string): string {
  const trimmed = text.trim();
  const idx = trimmed.indexOf("\n");
  return idx === -1 ? trimmed : trimmed.slice(0, idx);
}

export function isRichIntent(intent: Intent): boolean {
  return [
    "skills",
    "projects",
    "experience",
    "education",
    "certifications",
    "contact",
    "github",
    "linkedin",
    "resume",
    "roles",
  ].includes(intent);
}
