import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import maheshPhotoAsset from "@/assets/mahesh.jpg.asset.json";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const QUICK_QUESTIONS = [
  "What skills does Mahesh have?",
  "Show Python Projects",
  "Download Resume",
  "Contact Mahesh",
  "Open GitHub",
  "Show Certifications",
  "Why should I hire Mahesh?",
];

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello 👋\n\nI'm MAHI.AI — Mahesh Kale's Professional AI Career Assistant.\n\nI can answer questions about:\n• Skills\n• Projects\n• Experience\n• Resume\n• Certifications\n• Contact Information\n• GitHub\n• LinkedIn",
};

export function MahiAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: value,
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    // UI-only stub — no AI backend
    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content:
            "Thanks for your question! MAHI.AI is currently in preview mode — the conversational engine will be wired up soon. In the meantime, explore Mahesh's projects, skills and resume on this page.",
        },
      ]);
    }, 1100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      {/* Floating trigger */}
      <div className="fixed bottom-5 right-5 z-[60] md:bottom-6 md:right-6">
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open MAHI.AI assistant"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group relative flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-3 pl-3 pr-4 backdrop-blur-xl shadow-[0_10px_40px_-10px_var(--primary)]"
        >
          {/* Pulsing glow ring */}
          <span className="pointer-events-none absolute inset-0 rounded-full">
            <span className="absolute inset-0 rounded-full bg-primary/25 blur-xl animate-[pulse_2.4s_ease-in-out_infinite]" />
          </span>
          <span className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-br from-primary/40 via-transparent to-accent/30 opacity-70" />

          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_var(--primary)]">
            {open ? (
              <X className="h-4 w-4" />
            ) : (
              <span className="text-lg leading-none">🤖</span>
            )}
          </span>
          <span className="relative text-sm font-semibold tracking-tight text-foreground">
            MAHI.AI
          </span>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mahi-panel"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="MAHI.AI chat"
            className="fixed z-[70] flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--background)]/85 shadow-[0_30px_80px_-20px_rgba(6,182,212,0.35)] backdrop-blur-2xl
              bottom-24 right-3 left-3 max-h-[78vh]
              md:bottom-24 md:right-6 md:left-auto md:w-[380px] md:max-h-[600px]"
          >
            {/* Ambient glows */}
            <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

            {/* Header */}
            <div className="relative flex items-start gap-3 border-b border-white/10 bg-white/[0.03] p-4">
              <div className="relative shrink-0">
                <img
                  src={maheshPhotoAsset.url}
                  alt="Mahesh Kale"
                  className="h-11 w-11 rounded-full border border-white/15 object-cover shadow-[0_0_20px_-4px_var(--primary)]"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-[color:var(--success)] shadow-[0_0_10px_var(--success)]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🤖</span>
                  <h3 className="truncate text-sm font-semibold tracking-tight text-foreground">
                    MAHI.AI
                  </h3>
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
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
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="relative flex-1 overflow-y-auto px-4 py-4 space-y-3"
            >
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}

              {thinking && <TypingIndicator />}

              {/* Quick questions — show only when just the welcome is present */}
              {messages.length === 1 && !thinking && (
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
                        onClick={() => send(q)}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-foreground/90 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_18px_-6px_var(--primary)]"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSubmit}
              className="relative border-t border-white/10 bg-white/[0.03] p-3"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5 focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_15%,transparent)] transition-all">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask MAHI.AI anything..."
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || thinking}
                  aria-label="Send message"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_16px_-2px_var(--primary)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                <Bot className="h-3 w-3 text-primary" />
                Powered by MAHI.AI · Preview
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="mr-2 mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/15 text-sm">
          🤖
        </div>
      )}
      <div
        className={
          isUser
            ? "max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-primary-foreground shadow-[0_6px_20px_-8px_var(--primary)]"
            : "max-w-[85%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm leading-relaxed text-foreground/90 whitespace-pre-line"
        }
      >
        {message.content}
      </div>
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
        <span className="text-xs text-muted-foreground">
          MAHI.AI is thinking
        </span>
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
