"use client";

import Link from "next/link";
import { useId, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

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

/** Pflicht-Checkbox zur Datenschutzerklärung */
export function PrivacyCheckbox({ error, children }: { error?: string; children?: ReactNode }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-soft">
        <input
          id={id}
          type="checkbox"
          name="privacy"
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-brand-600"
        />
        <span>
          {children ?? (
            <>
              Ich habe die{" "}
              <Link href="/datenschutz" target="_blank" className="font-semibold text-ink underline underline-offset-2">
                Datenschutzerklärung
              </Link>{" "}
              gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage einverstanden.
            </>
          )}
          <span className="text-brand-600" aria-hidden="true">
            {" "}*
          </span>
        </span>
      </label>
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

/** Unsichtbare Spamschutz-Felder (Honeypot + Zeitstempel) */
export function SpamFields({ startedAt }: { startedAt: number }) {
  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input type="hidden" name="_ts" value={startedAt} />
    </>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-4 font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 active:translate-y-0 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0 sm:w-auto"
    >
      {pending && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
      {pending ? "Wird gesendet …" : children}
    </button>
  );
}

export function FormAlert({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div role="alert" className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800 animate-fade-up">
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export function FormSuccess({ title, children, onReset }: { title: string; children: ReactNode; onReset?: () => void }) {
  return (
    <div role="status" className="flex flex-col items-center px-4 py-12 text-center animate-fade-up">
      <span className="relative grid h-20 w-20 place-items-center rounded-full bg-green-50 text-green-700">
        <span className="absolute inset-0 animate-ping rounded-full bg-green-100 [animation-iteration-count:1]" />
        <CheckCircle2 className="relative h-10 w-10" aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-display text-2xl font-semibold">{title}</h3>
      <div className="mt-3 max-w-md leading-relaxed text-muted">{children}</div>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-8 rounded-full px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/15 transition-colors hover:bg-sand"
        >
          Weitere Nachricht senden
        </button>
      )}
    </div>
  );
}
