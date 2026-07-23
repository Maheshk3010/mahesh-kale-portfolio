// Voice service abstraction. Keeps the UI independent of the underlying
// speech recognition provider so a future AI voice backend can replace the
// browser implementation without any UI or ChatEngine changes.

export type VoiceState = "idle" | "listening" | "processing";

export type VoiceErrorCode =
  | "not-supported"
  | "no-speech"
  | "not-allowed"
  | "aborted"
  | "network"
  | "unknown";

export interface VoiceError {
  code: VoiceErrorCode;
  message: string;
}

export interface VoiceServiceEvents {
  onStateChange?: (state: VoiceState) => void;
  onPartial?: (transcript: string) => void;
  onFinal?: (transcript: string) => void;
  onError?: (error: VoiceError) => void;
}

export interface VoiceServiceOptions {
  lang?: string;
  interimResults?: boolean;
  continuous?: boolean;
}

export interface VoiceService {
  isSupported(): boolean;
  start(events: VoiceServiceEvents, options?: VoiceServiceOptions): void;
  stop(): void;
  abort(): void;
  getState(): VoiceState;
}
