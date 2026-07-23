import type {
  VoiceError,
  VoiceErrorCode,
  VoiceService,
  VoiceServiceEvents,
  VoiceServiceOptions,
  VoiceState,
} from "./types";

// Minimal typings for the Web Speech API. Not present in lib.dom yet.
type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0: { transcript: string };
};
type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
};
type SpeechRecognitionErrorEventLike = { error: string; message?: string };

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((e: SpeechRecognitionErrorEventLike) => void) | null;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function mapError(code: string): VoiceError {
  const map: Record<string, VoiceErrorCode> = {
    "no-speech": "no-speech",
    "not-allowed": "not-allowed",
    "service-not-allowed": "not-allowed",
    aborted: "aborted",
    network: "network",
  };
  const mapped = map[code] ?? "unknown";
  const message =
    mapped === "no-speech"
      ? "I couldn't understand that. Please try again."
      : mapped === "not-allowed"
        ? "Microphone permission is blocked."
        : mapped === "network"
          ? "Network issue with speech recognition."
          : "Something went wrong. Please try again.";
  return { code: mapped, message };
}

export class BrowserSpeechAdapter implements VoiceService {
  private recognition: SpeechRecognitionLike | null = null;
  private state: VoiceState = "idle";
  private finalText = "";

  isSupported(): boolean {
    return getCtor() !== null;
  }

  getState(): VoiceState {
    return this.state;
  }

  private setState(next: VoiceState, events: VoiceServiceEvents) {
    this.state = next;
    events.onStateChange?.(next);
  }

  start(events: VoiceServiceEvents, options: VoiceServiceOptions = {}) {
    const Ctor = getCtor();
    if (!Ctor) {
      events.onError?.({
        code: "not-supported",
        message: "Speech recognition is not supported in this browser.",
      });
      return;
    }
    if (this.recognition) this.abort();

    const rec = new Ctor();
    rec.lang = options.lang ?? "en-US";
    rec.interimResults = options.interimResults ?? true;
    rec.continuous = options.continuous ?? false;
    rec.maxAlternatives = 1;
    this.finalText = "";

    rec.onstart = () => this.setState("listening", events);
    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        const t = r[0].transcript;
        if (r.isFinal) this.finalText += t;
        else interim += t;
      }
      const combined = (this.finalText + interim).trim();
      if (combined) events.onPartial?.(combined);
    };
    rec.onerror = (e) => {
      events.onError?.(mapError(e.error));
    };
    rec.onend = () => {
      const text = this.finalText.trim();
      this.setState("processing", events);
      if (text) events.onFinal?.(text);
      this.recognition = null;
      this.setState("idle", events);
    };

    this.recognition = rec;
    try {
      rec.start();
    } catch {
      events.onError?.({
        code: "unknown",
        message: "Could not start the microphone.",
      });
      this.recognition = null;
      this.setState("idle", events);
    }
  }

  stop() {
    this.recognition?.stop();
  }

  abort() {
    const rec = this.recognition;
    this.recognition = null;
    try {
      rec?.abort();
    } catch {
      /* noop */
    }
    this.state = "idle";
  }
}

export const browserVoiceService: VoiceService = new BrowserSpeechAdapter();
