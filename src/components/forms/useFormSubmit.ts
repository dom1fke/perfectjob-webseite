"use client";

import { useCallback, useState, type FormEvent } from "react";
import type { FieldErrors } from "@/lib/validation";

type Status = "idle" | "pending" | "success";

/** Gemeinsame Logik für Formulare: Absenden, Fehler pro Feld, Fokus auf erstes fehlerhaftes Feld. */
export function useFormSubmit(endpoint: string, prepare?: (data: FormData) => void) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [startedAt, setStartedAt] = useState(() => Date.now());

  const clearError = useCallback((name: string) => {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const focusFirstError = (form: HTMLFormElement, names: string[]) => {
    requestAnimationFrame(() => {
      const el = names
        .map((n) => form.querySelector<HTMLElement>(`[name="${n}"]`))
        .find(Boolean);
      el?.focus({ preventScroll: true });
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Browser-Validierung mit eigenen, freundlichen Texten
    const invalid = Array.from(form.elements).filter(
      (el): el is HTMLInputElement => "validity" in el && !(el as HTMLInputElement).validity.valid,
    );
    if (invalid.length) {
      const next: FieldErrors = {};
      for (const el of invalid) {
        if (!el.name || next[el.name]) continue;
        next[el.name] =
          el.type === "checkbox"
            ? "Bitte stimmen Sie der Datenschutzerklärung zu"
            : el.validity.valueMissing
              ? "Dieses Feld wird benötigt"
              : el.type === "email"
                ? "Bitte eine gültige E-Mail-Adresse angeben"
                : "Bitte Eingabe prüfen";
      }
      setErrors(next);
      focusFirstError(form, Object.keys(next));
      return;
    }

    setStatus("pending");
    setFormError(undefined);
    const data = new FormData(form);
    prepare?.(data);

    try {
      const res = await fetch(endpoint, { method: "POST", body: data });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        setErrors({});
        form.reset();
        return;
      }
      if (json.fieldErrors) {
        setErrors(json.fieldErrors);
        focusFirstError(form, Object.keys(json.fieldErrors));
      }
      setFormError(json.error ?? (json.fieldErrors ? undefined : "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."));
    } catch {
      setFormError("Keine Verbindung. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.");
    }
    setStatus("idle");
  };

  const reset = () => {
    setStatus("idle");
    setStartedAt(Date.now());
  };

  return { status, errors, formError, startedAt, onSubmit, clearError, reset };
}
