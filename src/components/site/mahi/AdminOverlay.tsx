// AdminOverlay — completely independent from MahiAI chat widget.
// Hidden by default. Unlocks only via VITE_MAHI_ADMIN=true, ?mahiAdmin=1,
// or localStorage flag. Keyboard shortcut: Ctrl+Shift+K.

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { isAdminEnabled } from "@/mahi/admin";
import { AdminPanel } from "./AdminPanel";

export function AdminOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setEnabled(isAdminEnabled());
    const onStorage = () => setEnabled(isAdminEnabled());
    window.addEventListener("storage", onStorage);

    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "K" || e.key === "k")) {
        if (isAdminEnabled()) {
          e.preventDefault();
          setOpen((v) => !v);
        }
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open MAHI Knowledge Center"
          title="Knowledge Center (Ctrl+Shift+K)"
          className="fixed bottom-4 left-4 z-[90] grid h-9 w-9 place-items-center rounded-full border border-primary/30 bg-[#0a0f1c]/80 text-primary/80 shadow-lg backdrop-blur transition-all hover:scale-105 hover:border-primary/60 hover:text-primary"
        >
          <span className="text-sm">🛡</span>
        </button>
      )}
      <AnimatePresence>{open && <AdminPanel onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
