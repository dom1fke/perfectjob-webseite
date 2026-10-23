"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { AlertCircle, ArrowLeft, Check, Copy, Mail, MailCheck, MessageCircle, ShieldCheck } from "lucide-react";
import { site } from "@/config/site";
import { mailtoUrl, plainText, whatsappUrl, type PreparedMessage } from "@/lib/mailto";

const inputBase =
  "peer block w-full rounded-xl border bg-white px-4 py-3.5 text-[1rem] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-200 outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 aria-[invalid=true]:border-brand-600 aria-[invalid=true]:bg-brand-50/40";

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
};

function FieldShell({
  id,
  label,
  error,
  hint,
  required,
  className = "",
  children,
}: Omit<BaseProps, "name"> & { id: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-soft">
        {label}
        {required ? (
          <span className="text-brand-600" aria-hidden="true">
            {" "}*
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      <FieldError id={`${id}-error`} error={error} />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  return (
    <p
      id={id}
      aria-live="polite"
      className={`grid transition-[grid-template-rows,opacity] duration-300 ${error ? "mt-1.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
    >
      <span className="flex items-center gap-1.5 overflow-hidden text-sm text-brand-700">
        {error && <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />}
        {error}
      </span>
    </p>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}

export function TextField({
  label,
  name,
  error,
  hint,
  required,
  className,
  type = "text",
  ...rest
}: BaseProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${inputBase} border-line`}
        {...rest}
      />
    </FieldShell>
  );
}

export function TextArea({
  label,
  name,
  error,
  hint,
  required,
  className,
  ...rest
}: BaseProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name">) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${inputBase} min-h-32 resize-y border-line`}
        {...rest}
      />
    </FieldShell>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  required,
  className,
  options,
  placeholder,
  ...rest
}: BaseProps & { options: readonly string[]; placeholder?: string } & Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "name"
  >) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={`${inputBase} appearance-none border-line pr-11`}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-muted"
        >
          <path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </FieldShell>
  );
}

/** Hinweis statt Einwilligungs-Checkbox: Die Seite selbst verarbeitet keine Formulardaten. */
export function PrivacyNote({ children, href = "/datenschutz" }: { children?: ReactNode; href?: string }) {
  return (
    <p className="flex gap-3 rounded-xl bg-sand/70 p-4 text-sm leading-relaxed text-muted">
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
      <span>
        {children ?? (
          <>
            Ihre Angaben werden nicht auf dieser Webseite gespeichert, sondern nur in eine E-Mail an uns übernommen, die
            Sie selbst absenden. Mehr in der{" "}
          </>
        )}
        <Link href={href} target="_blank" className="font-semibold text-ink underline underline-offset-2">
          Datenschutzerklärung
        </Link>
        .
      </span>
    </p>
  );
}

/** Absenden per E-Mail-Programm (Standard) oder WhatsApp */
export function SendButtons({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          value="mail"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-4 font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 active:translate-y-0 sm:w-auto"
        >
          <Mail className="h-5 w-5" aria-hidden="true" />
          {label}
        </button>
        <button
          type="submit"
          value="whatsapp"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-ink ring-1 ring-ink/15 transition-colors duration-200 hover:bg-sand sm:w-auto"
        >
          <MessageCircle className="h-5 w-5 text-[#1a9e4b]" aria-hidden="true" />
          Per WhatsApp
        </button>
      </div>
      <p className="text-sm text-muted">{hint}</p>
    </div>
  );
}

/** Ansicht nach dem Öffnen des E-Mail-Programms – mit Plan B, falls sich nichts geöffnet hat. */
export function MessageOpened({
  message,
  channel,
  attachHint,
  onBack,
}: {
  message: PreparedMessage;
  channel: "mail" | "whatsapp";
  attachHint?: boolean;
  onBack: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(plainText(message));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div role="status" className="animate-fade-up">
      <div className="flex flex-col items-center px-2 pt-6 pb-8 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-green-50 text-green-700">
          {channel === "mail" ? <MailCheck className="h-10 w-10" aria-hidden="true" /> : <MessageCircle className="h-10 w-10" aria-hidden="true" />}
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold">Fast geschafft!</h3>
        <p className="mt-3 max-w-md leading-relaxed text-muted">
          {channel === "mail"
            ? "Ihr E-Mail-Programm hat sich mit einer vorbereiteten Nachricht geöffnet. Bitte tippen Sie dort auf „Senden“."
            : "WhatsApp hat sich mit einer vorbereiteten Nachricht geöffnet. Bitte senden Sie sie dort ab."}
          {attachHint && channel === "mail" && " Ihren Lebenslauf können Sie gern als Anhang hinzufügen – ein Muss ist er nicht."}
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-sand/50 p-5 sm:p-6">
        <p className="font-semibold">Es hat sich nichts geöffnet?</p>
        <p className="mt-1 text-sm text-muted">
          Kopieren Sie den vorbereiteten Text und senden Sie ihn an{" "}
          <span className="font-semibold text-ink">{site.contact.email}</span> – oder nutzen Sie WhatsApp.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? "Kopiert" : "Text kopieren"}
          </button>
          <a
            href={channel === "mail" ? whatsappUrl(message) : mailtoUrl(message)}
            {...(channel === "mail" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/15 transition-colors hover:bg-sand"
          >
            {channel === "mail" ? "Per WhatsApp senden" : "Per E-Mail senden"}
          </a>
        </div>
        <details className="mt-4 text-sm">
          <summary className="cursor-pointer font-medium text-muted hover:text-ink">Vorbereiteten Text anzeigen</summary>
          <pre className="mt-3 max-h-64 overflow-auto rounded-xl bg-white p-4 font-sans text-sm whitespace-pre-wrap ring-1 ring-line">
            {plainText(message)}
          </pre>
        </details>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Zurück zum Formular
      </button>
    </div>
  );
}
