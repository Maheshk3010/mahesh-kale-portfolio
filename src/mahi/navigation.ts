/**
 * NavigationService — decoupled boundary between the MAHI.AI chat surface
 * (or any future AI provider) and the portfolio DOM.
 *
 * Sections self-register on mount and unregister on unmount. Consumers only
 * ever talk to this service; they never query the DOM directly.
 */

export interface SectionRegistration {
  id: string;
  title: string;
  element: HTMLElement;
}

export interface NavigationService {
  register(entry: SectionRegistration): () => void;
  unregister(id: string): void;
  has(id: string): boolean;
  list(): SectionRegistration[];
  scrollTo(id: string, options?: { highlight?: boolean }): boolean;
  subscribe(listener: () => void): () => void;
}

const HIGHLIGHT_CLASS = "mahi-highlight";
const HIGHLIGHT_DURATION_MS = 2400;

class DomNavigationService implements NavigationService {
  private sections = new Map<string, SectionRegistration>();
  private listeners = new Set<() => void>();
  private highlightTimers = new Map<string, ReturnType<typeof setTimeout>>();

  register(entry: SectionRegistration) {
    this.sections.set(entry.id, entry);
    this.emit();
    return () => this.unregister(entry.id);
  }

  unregister(id: string) {
    if (this.sections.delete(id)) this.emit();
  }

  has(id: string) {
    return this.sections.has(id);
  }

  list() {
    return Array.from(this.sections.values());
  }

  scrollTo(id: string, options: { highlight?: boolean } = { highlight: true }) {
    const entry = this.sections.get(id);
    if (!entry) return false;
    const { element } = entry;

    element.scrollIntoView({ behavior: "smooth", block: "start" });

    if (options.highlight !== false) {
      const existing = this.highlightTimers.get(id);
      if (existing) {
        clearTimeout(existing);
        element.classList.remove(HIGHLIGHT_CLASS);
        // Force reflow so the animation restarts cleanly.
        void element.offsetWidth;
      }
      element.classList.add(HIGHLIGHT_CLASS);
      const timer = setTimeout(() => {
        element.classList.remove(HIGHLIGHT_CLASS);
        this.highlightTimers.delete(id);
      }, HIGHLIGHT_DURATION_MS);
      this.highlightTimers.set(id, timer);
    }

    return true;
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    for (const l of this.listeners) l();
  }
}

export const navigationService: NavigationService = new DomNavigationService();
