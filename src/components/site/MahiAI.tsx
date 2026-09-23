import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send, X, Sparkles, Mic, Loader2, BarChart3 } from "lucide-react";
import profilePhoto from "@/assets/mahesh-kale-professional-profile.png.asset.json";
import { analyticsService, mahiEngine, UNVERIFIED_FALLBACK } from "@/mahi";
import type { ChatMessage as EngineMessage, Intent } from "@/mahi";
import { useVoiceInput } from "@/mahi/voice";
import { RichResponse } from "./mahi/RichResponse";
import { AnalyticsPanel } from "./mahi/AnalyticsPanel";

const maheshPhotoUrl = profilePhoto.url;

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
  suggestions?: string[];
  unverified?: boolean;
  intent?: Intent;
  verified?: boolean;
};

const QUICK_QUESTIONS = [
  "Show projects",
  "Show MIS experience",
  "Show skills",
  "Download Resume",
  "Open GitHub",
  "How can I contact Mahesh?",
];

const WELCOME_TEXT =
  "MAHI.AI is Mahesh Kale's local portfolio assistant. Ask about projects, MIS experience, skills, resume, GitHub or contact details.";

export function MahiAI() {
  const [open, setOpen] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [mobileTriggerVisible, setMobileTriggerVisible] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const manageDialogKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setShowAnalytics(false);
        setOpen(false);
        window.setTimeout(() => triggerRef.current?.focus(), reducedMotion ? 0 : 320);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", manageDialogKeyboard);
    return () => window.removeEventListener("keydown", manageDialogKeyboard);
  }, [open, reducedMotion]);

  useEffect(() => {
    const updateTrigger = () => {
      if (window.innerWidth >= 768) {
        setMobileTriggerVisible(true);
        return;
      }
      const snapshot = document.getElementById("snapshot");
      const proof = document.getElementById("proof");
      const start = snapshot?.offsetTop ?? Number.POSITIVE_INFINITY;
      const end = proof?.offsetTop ?? start;
      setMobileTriggerVisible(window.scrollY < start - 120 || window.scrollY >= end - 120);
    };
    updateTrigger();
    window.addEventListener("scroll", updateTrigger, { passive: true });
    window.addEventListener("resize", updateTrigger);
    return () => {
      window.removeEventListener("scroll", updateTrigger);
      window.removeEventListener("resize", updateTrigger);
    };
  }, []);

  const engineHistory = useMemo<EngineMessage[]>(
    () =>
      messages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        createdAt: m.createdAt,
      })),
    [messages],
  );

  const send = useCallback(
    async (text: string) => {
      const value = text.trim();
      if (!value || thinking) return;
      const now = Date.now();
      const userMsg: ChatMessage = {
        id: `u-${now}`,
        role: "user",
        content: value,
        createdAt: now,
      };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setThinking(true);
      analyticsService.trackQuestion(value);

      try {
        const response = await mahiEngine.ask(value, engineHistory);
        analyticsService.trackResponse(value, response);
        setMessages((m) => [
          ...m,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: response.reply,
            createdAt: Date.now(),
            suggestions: response.suggestions,
            intent: response.intent,
            verified: response.verified,
            unverified: !response.verified || response.reply.trim() === UNVERIFIED_FALLBACK,
          },
        ]);
      } catch {
        setMessages((m) => [
          ...m,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: UNVERIFIED_FALLBACK,
            createdAt: Date.now(),
            unverified: true,
          },
        ]);
      } finally {
        setThinking(false);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    },
    [engineHistory, thinking],
  );

  const sendRef = useRef(send);
  useEffect(() => {
    sendRef.current = send;
  }, [send]);

  const voice = useVoiceInput({
    onPartial: (t) => setInput(t),
    onFinal: (t) => {
      setInput("");
      analyticsService.trackAction("voice_input");
      sendRef.current(t);
      setTimeout(() => inputRef.current?.focus(), 50);
    },
  });

  useEffect(() => {
    if (!open || !voice.supported) return;
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "m" || e.key === "M")) {
        e.preventDefault();
        voice.toggle();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, voice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const showWelcome = messages.length === 0;

  return (
    <>
      {/* Floating trigger */}
      <div
        className={`fixed bottom-5 right-3 z-[80] transition-opacity md:bottom-6 md:right-6 ${mobileTriggerVisible || open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <motion.button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open MAHI.AI assistant"
          initial={false}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group relative flex items-center gap-2 border border-primary/40 bg-background/95 p-2 backdrop-blur-xl md:py-2.5 md:pl-2.5 md:pr-3"
        >
          <span className="relative grid h-8 w-8 place-items-center bg-primary text-primary-foreground">
            {open ? <X className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
          </span>
          <span className="relative hidden font-mono text-[10px] font-bold uppercase tracking-[.12em] text-foreground md:inline">
            Ask MAHI
          </span>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="mahi-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[65] bg-background/70 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />
            <motion.div
              key="mahi-panel"
              ref={panelRef}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="MAHI.AI chat"
              className="fixed z-[70] flex flex-col overflow-hidden border border-border bg-background/96 shadow-2xl backdrop-blur-2xl
              bottom-24 right-3 left-3 max-h-[78vh]
              md:bottom-24 md:right-6 md:left-auto md:w-[380px] md:max-h-[600px]"
            >
              {/* Header */}
              <div className="relative flex items-start gap-3 border-b border-border bg-surface p-4">
                <div className="relative shrink-0">
                  <img
                    src={maheshPhotoUrl}
                    alt="Mahesh Kale"
                    width={44}
                    height={44}
                    className="h-11 w-11 border border-primary/40 object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-[color:var(--success)] shadow-[0_0_10px_var(--success)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base" aria-hidden="true">
                      🤖
                    </span>
                    <h3 className="truncate text-sm font-semibold tracking-tight text-foreground">
                      MAHI.AI
                    </h3>
                    <span className="ml-auto inline-flex items-center gap-1 border border-border bg-background px-2 py-1 text-[10px] font-medium text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)] shadow-[0_0_8px_var(--success)]" />
                      Online
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] font-medium text-primary">
                    Professional Career Assistant
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    Helping recruiters understand Mahesh faster.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAnalytics(true)}
                  aria-label="Open recruiter analytics"
                  title="Recruiter analytics"
                  className="grid h-11 w-11 shrink-0 place-items-center border border-border bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="grid h-11 w-11 shrink-0 place-items-center border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <AnimatePresence>
                {showAnalytics && <AnalyticsPanel onClose={() => setShowAnalytics(false)} />}
              </AnimatePresence>

              {/* Messages */}
              <div ref={scrollRef} className="relative flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {showWelcome ? (
                  <>
                    <MessageBubble
                      message={{
                        id: "welcome",
                        role: "assistant",
                        content: WELCOME_TEXT,
                        createdAt: 0,
                      }}
                    />
                    <div className="pt-1">
                      <div className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                        <Sparkles className="h-3 w-3 text-primary" />
                        Quick questions
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {QUICK_QUESTIONS.map((q) => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => {
                              analyticsService.trackAction("quick_question", q);
                              send(q);
                            }}
                            className="min-h-11 border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground/90 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  messages.map((m) => <MessageBubble key={m.id} message={m} onSuggestion={send} />)
                )}

                {thinking && <TypingIndicator />}
              </div>

              {/* Composer */}
              <form
                onSubmit={handleSubmit}
                className="relative border-t border-white/10 bg-white/[0.03] p-3"
              >
                <AnimatePresence>
                  {(voice.state !== "idle" || voice.error) && (
                    <motion.div
                      key="voice-status"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="mb-2 flex items-center justify-between gap-2 border border-primary/30 bg-primary/10 px-3 py-2 text-[11px] text-foreground/90"
                    >
                      {voice.error ? (
                        <span className="text-destructive-foreground/90">{voice.error}</span>
                      ) : voice.state === "listening" ? (
                        <span className="flex items-center gap-2">
                          <span className="flex items-end gap-0.5">
                            {[0, 1, 2, 3, 4].map((i) => (
                              <motion.span
                                key={i}
                                className="w-0.5 rounded-full bg-primary"
                                animate={reducedMotion ? { height: 8 } : { height: [4, 12, 4] }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </span>
                          <span className="font-medium text-primary">Listening…</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <Loader2 className="h-3 w-3 animate-spin text-primary" />
                          Processing…
                        </span>
                      )}
                      {voice.state === "listening" && (
                        <button
                          type="button"
                          onClick={voice.stop}
                          className="text-[10px] font-medium text-primary hover:underline"
                        >
                          Stop
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex items-end gap-2 border border-border bg-surface px-3 py-1.5 transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Ask MAHI.AI anything..."
                    className="min-w-0 flex-1 resize-none bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none max-h-28"
                  />
                  {voice.supported && (
                    <motion.button
                      type="button"
                      onClick={voice.toggle}
                      disabled={thinking}
                      aria-label={
                        voice.state === "listening" ? "Stop voice input" : "Start voice input"
                      }
                      aria-pressed={voice.state === "listening"}
                      title="Voice input (Alt+M)"
                      whileTap={{ scale: 0.92 }}
                      className={`relative grid h-11 w-11 shrink-0 place-items-center border transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                        voice.state === "listening"
                          ? "border-primary/60 bg-primary/20 text-primary shadow-[0_0_16px_-2px_var(--primary)]"
                          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
                      }`}
                    >
                      {voice.state === "processing" ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Mic className="h-3.5 w-3.5" />
                      )}
                      {voice.state === "listening" && (
                        <span className="pointer-events-none absolute inline-flex h-9 w-9 bg-primary/40 opacity-60 animate-ping" />
                      )}
                    </motion.button>
                  )}
                  <button
                    type="submit"
                    disabled={!input.trim() || thinking}
                    aria-label="Send message"
                    className="grid h-11 w-11 shrink-0 place-items-center bg-primary text-primary-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                  <Bot className="h-3 w-3 text-primary" />
                  Powered by MAHI.AI · Local Engine
                  {voice.supported && (
                    <>
                      <span className="mx-1 opacity-40">·</span>
                      <span>Alt+M to speak</span>
                    </>
                  )}
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({
  message,
  onSuggestion,
}: {
  message: ChatMessage;
  onSuggestion?: (q: string) => void;
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex justify-end"
      >
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-primary-foreground shadow-[0_6px_20px_-8px_var(--primary)]">
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-start"
    >
      <div className="flex w-full justify-start">
        <div className="mr-2 mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/15 text-sm">
          🤖
        </div>
        <div className="min-w-0 max-w-[88%] flex-1">
          {message.intent ? (
            <RichResponse
              response={{
                reply: message.content,
                intent: message.intent,
                verified: message.verified ?? true,
                suggestions: message.suggestions,
              }}
              onAsk={(q) => onSuggestion?.(q)}
            />
          ) : (
            <div className="rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
              {message.content}
            </div>
          )}
        </div>
      </div>
      {message.suggestions && message.suggestions.length > 0 && onSuggestion && (
        <div className="mt-2 ml-9 flex flex-wrap gap-1.5">
          {message.suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSuggestion(s)}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-foreground/80 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2"
    >
      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/15 text-sm">
        🤖
      </div>
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
        <span className="text-xs text-muted-foreground">MAHI.AI is thinking</span>
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </span>
      </div>
    </motion.div>
  );
}
