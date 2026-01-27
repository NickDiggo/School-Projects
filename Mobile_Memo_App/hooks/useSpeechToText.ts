import { useCallback, useMemo, useState } from "react";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
  type ExpoSpeechRecognitionErrorCode,
} from "expo-speech-recognition";

type UseSpeechToTextOptions = {
  lang?: string; // bv "nl-NL"
};

export function useSpeechToText(options: UseSpeechToTextOptions = {}) {
  const lang = options.lang ?? "nl-BE";

  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<{ code: ExpoSpeechRecognitionErrorCode; message?: string } | null>(null);

  useSpeechRecognitionEvent("start", () => {
    setRecognizing(true);
    setError(null);
  });

  useSpeechRecognitionEvent("end", () => {
    setRecognizing(false);
  });

  useSpeechRecognitionEvent("result", (event) => {
    const text = (event.results?.[0]?.transcript ?? "").trim();
    if (!text) return;
    setTranscript(text);
  });

  useSpeechRecognitionEvent("error", (event) => {
    setRecognizing(false);
    setError({ code: event.error, message: event.message });
  });

  const start = useCallback(async () => {
    setTranscript("");
    setError(null);

    const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!perm.granted) {
      setError({ code: "not-allowed", message: "Microfoon permission niet toegestaan." });
      return;
    }

    ExpoSpeechRecognitionModule.start({
      lang,
      interimResults: false,
      continuous: false,
      maxAlternatives: 1,
    });
  }, [lang]);

  const stop = useCallback(() => {
    ExpoSpeechRecognitionModule.stop();
  }, []);

  const abort = useCallback(() => {
    ExpoSpeechRecognitionModule.abort();
  }, []);

  const canStart = useMemo(() => ExpoSpeechRecognitionModule.isRecognitionAvailable(), []);

  return {
    canStart,
    recognizing,
    transcript,
    error,
    start,
    stop,
    abort,
  };
}
