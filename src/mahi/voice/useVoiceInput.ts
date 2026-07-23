import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { browserVoiceService } from "./browserSpeechAdapter";
import type { VoiceService, VoiceState } from "./types";

interface UseVoiceInputOptions {
  service?: VoiceService;
  lang?: string;
  onFinal: (transcript: string) => void;
  onPartial?: (transcript: string) => void;
}

interface UseVoiceInputReturn {
  supported: boolean;
  state: VoiceState;
  error: string | null;
  start: () => void;
  stop: () => void;
  toggle: () => void;
}

export function useVoiceInput({
  service,
  lang = "en-US",
  onFinal,
  onPartial,
}: UseVoiceInputOptions): UseVoiceInputReturn {
  const voice = useMemo(() => service ?? browserVoiceService, [service]);
  const [supported] = useState(() => voice.isSupported());
  const [state, setState] = useState<VoiceState>("idle");
  const [error, setError] = useState<string | null>(null);
  const finalRef = useRef(onFinal);
  const partialRef = useRef(onPartial);

  useEffect(() => {
    finalRef.current = onFinal;
    partialRef.current = onPartial;
  }, [onFinal, onPartial]);

  useEffect(() => () => voice.abort(), [voice]);

  const start = useCallback(() => {
    if (!supported) return;
    setError(null);
    voice.start(
      {
        onStateChange: setState,
        onPartial: (t) => partialRef.current?.(t),
        onFinal: (t) => finalRef.current(t),
        onError: (e) => setError(e.message),
      },
      { lang, interimResults: true, continuous: false },
    );
  }, [voice, supported, lang]);

  const stop = useCallback(() => voice.stop(), [voice]);

  const toggle = useCallback(() => {
    if (state === "listening") voice.stop();
    else start();
  }, [state, voice, start]);

  return { supported, state, error, start, stop, toggle };
}
