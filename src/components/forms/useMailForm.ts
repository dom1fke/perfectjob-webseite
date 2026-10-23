"use client";

import { useCallback, useState, type FormEvent } from "react";
import { mailtoUrl, whatsappUrl, type PreparedMessage } from "@/lib/mailto";

type FieldErrors = Record<string, string>;

/**
 * Gemeinsame Logik der Formulare: prüfen, Fehler pro Feld anzeigen, danach das
 * E-Mail-Programm (oder WhatsApp) mit vorbereiteter Nachricht öffnen.
 */
export function useMailForm(build: (data: FormData) => PreparedMessage) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [prepared, setPrepared] = useState<PreparedMessage | null>(null);
  const [channel, setChannel] = useState<"mail" | "whatsapp">("mail");

  const clearError = useCallback((name: string) => {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const via = submitter?.value === "whatsapp" ? "whatsapp" : "mail";

    // Browser-Validierung mit eigenen, freundlichen Texten
    const invalid = Array.from(form.elements).filter(
      (el): el is HTMLInputElement => "validity" in el && !(el as HTMLInputElement).validity.valid,
    );
    if (invalid.length) {
      const next: FieldErrors = {};
      for (const el of invalid) {
        if (!el.name || next[el.name]) continue;
        next[el.name] = el.validity.valueMissing
          ? "Dieses Feld wird benötigt"
          : el.type === "email"
            ? "Bitte eine gültige E-Mail-Adresse angeben"
            : el.validity.patternMismatch && el.type === "tel"
              ? "Bitte eine gültige Telefonnummer angeben"
              : el.validity.tooLong
                ? "Dieser Text ist zu lang"
                : "Bitte Eingabe prüfen";
      }
      setErrors(next);
      requestAnimationFrame(() => {
        const first = invalid.find((el) => el.name === Object.keys(next)[0]);
        first?.focus({ preventScroll: true });
        first?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return;
    }

    const message = build(new FormData(form));
    setErrors({});
    setPrepared(message);
    setChannel(via);

    if (via === "whatsapp") {
      window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = mailtoUrl(message);
    }
  };

  const back = () => setPrepared(null);

  return { errors, prepared, channel, onSubmit, clearError, back };
}
