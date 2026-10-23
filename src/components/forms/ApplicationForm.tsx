"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type DragEvent } from "react";
import { useSearchParams } from "next/navigation";
import { FileText, UploadCloud, X } from "lucide-react";
import { jobs } from "@/content/content";
import { positions, upload, workModels } from "@/lib/validation";
import {
  FieldError,
  FormAlert,
  FormSuccess,
  PrivacyCheckbox,
  SelectField,
  SpamFields,
  SubmitButton,
  TextArea,
  TextField,
} from "./fields";
import { useFormSubmit } from "./useFormSubmit";
import { apiUrl } from "@/lib/paths";

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export function ApplicationForm() {
  const params = useSearchParams();
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>();
  const [position, setPosition] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const { status, errors, formError, startedAt, onSubmit, clearError, reset } = useFormSubmit(
    apiUrl("bewerbung"),
    (data) => {
      data.delete("files");
      files.forEach((f) => data.append("files", f));
    },
  );

  // Vorauswahl über ?stelle=… (Buttons in den Stellenkarten)
  useEffect(() => {
    const slug = params.get("stelle");
    const job = jobs.find((j) => j.slug === slug);
    if (job) {
      setPosition(job.title);
      clearError("position");
    }
  }, [params, clearError]);

  useEffect(() => {
    if (status === "success") setFiles([]);
  }, [status]);

  const addFiles = (list: FileList | File[]) => {
    const incoming = Array.from(list);
    const bad = incoming.find((f) => !upload.accept.some((ext) => f.name.toLowerCase().endsWith(ext)));
    if (bad) return setFileError(`„${bad.name}“: Bitte nur PDF, JPG, PNG oder Word-Dateien.`);
    const next = [...files, ...incoming].slice(0, upload.maxFiles);
    const total = next.reduce((s, f) => s + f.size, 0);
    if (total > upload.maxTotalBytes) return setFileError("Die Dateien dürfen zusammen höchstens 10 MB groß sein.");
    if (files.length + incoming.length > upload.maxFiles) setFileError(`Maximal ${upload.maxFiles} Dateien möglich.`);
    else setFileError(undefined);
    clearError("files");
    setFiles(next);
  };

  if (status === "success") {
    return (
      <FormSuccess
        title="Bewerbung erfolgreich gesendet!"
        onReset={() => {
          reset();
          setPosition("");
        }}
      >
        Vielen Dank für Ihr Interesse an Perfect Job. Sie erhalten gleich eine Eingangsbestätigung per E-Mail. Wir melden
        uns innerhalb von 48 Stunden bei Ihnen.
      </FormSuccess>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onInput={(e) => clearError((e.target as HTMLInputElement).name)}
      className="relative grid gap-5 sm:grid-cols-2"
    >
      <SpamFields startedAt={startedAt} />
      <SelectField
        label="Ich bewerbe mich als"
        name="position"
        required
        options={positions}
        placeholder="Bitte wählen"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        error={errors.position}
        className="sm:col-span-2"
      />
      <TextField label="Vorname" name="firstName" required autoComplete="given-name" error={errors.firstName} />
      <TextField label="Nachname" name="lastName" required autoComplete="family-name" error={errors.lastName} />
      <TextField label="E-Mail" name="email" type="email" required autoComplete="email" inputMode="email" error={errors.email} />
      <TextField label="Telefon" name="phone" type="tel" required autoComplete="tel" inputMode="tel" error={errors.phone} />

      {/* Optionale Angaben – eingeklappt, damit die Kurzbewerbung schnell bleibt */}
      <div className="sm:col-span-2">
        <button
          type="button"
          onClick={() => setShowDetails((v) => !v)}
          aria-expanded={showDetails}
          aria-controls="application-details"
          className="flex w-full items-center justify-between rounded-xl border border-dashed border-ink/20 px-4 py-3.5 text-left text-sm font-semibold text-ink-soft transition-colors hover:border-ink/40 hover:bg-sand/60"
        >
          <span>
            Weitere Angaben <span className="font-normal text-muted">(optional – Qualifikation, Arbeitszeit, Start)</span>
          </span>
          <span className={`text-xl leading-none transition-transform duration-300 ${showDetails ? "rotate-45" : ""}`} aria-hidden="true">
            +
          </span>
        </button>
      </div>
      <div
        id="application-details"
        className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out sm:col-span-2 ${
          showDetails ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        inert={!showDetails}
      >
        <div className="overflow-hidden">
          <div className="grid gap-5 pt-1 pb-1 sm:grid-cols-2">
            <TextField label="Wohnort" name="city" autoComplete="address-level2" error={errors.city} />
            <TextField
              label="Qualifikation / Abschluss"
              name="qualification"
              placeholder="z. B. Pflegefachfrau, 5 Jahre Erfahrung"
              error={errors.qualification}
            />
            <SelectField label="Gewünschte Arbeitszeit" name="workModel" options={workModels} defaultValue="Noch offen" error={errors.workModel} />
            <TextField label="Frühester Start" name="startDate" placeholder="z. B. sofort, 01.12." error={errors.startDate} />
            <TextArea
              label="Nachricht an uns"
              name="message"
              rows={4}
              placeholder="Was ist Ihnen bei Ihrem nächsten Job wichtig?"
              error={errors.message}
              className="sm:col-span-2"
            />
          </div>
        </div>
      </div>

      <FileDrop files={files} onAdd={addFiles} onRemove={(i) => setFiles(files.filter((_, idx) => idx !== i))} error={fileError ?? errors.files} />

      <div className="sm:col-span-2">
        <PrivacyCheckbox error={errors.privacy}>
          Ich habe die{" "}
          <Link href="/datenschutz#bewerbung" target="_blank" className="font-semibold text-ink underline underline-offset-2">
            Datenschutzhinweise für Bewerber:innen
          </Link>{" "}
          gelesen. Meine Daten werden ausschließlich für das Bewerbungsverfahren genutzt und spätestens 6 Monate nach
          dessen Abschluss gelöscht.
        </PrivacyCheckbox>
      </div>
      <div className="grid gap-4 sm:col-span-2">
        <FormAlert message={formError} />
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <SubmitButton pending={status === "pending"}>Bewerbung absenden</SubmitButton>
          <p className="text-sm text-muted">Dauert keine 2 Minuten.</p>
        </div>
      </div>
    </form>
  );
}

function FileDrop({
  files,
  onAdd,
  onRemove,
  error,
}: {
  files: File[];
  onAdd: (files: FileList | File[]) => void;
  onRemove: (index: number) => void;
  error?: string;
}) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) onAdd(e.dataTransfer.files);
  };

  return (
    <div className="sm:col-span-2">
      <span className="mb-1.5 block text-sm font-semibold text-ink-soft">
        Lebenslauf &amp; Zeugnisse <span className="font-normal text-muted">(optional)</span>
      </span>
      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-all duration-200 ${
          dragging
            ? "scale-[1.01] border-brand-600 bg-brand-50"
            : error
              ? "border-brand-600/60 bg-brand-50/40"
              : "border-line bg-sand/50 hover:border-ink/25 hover:bg-sand"
        }`}
      >
        <UploadCloud className={`h-8 w-8 transition-colors ${dragging ? "text-brand-600" : "text-muted"}`} aria-hidden="true" />
        <span className="mt-3 text-sm">
          <span className="font-semibold text-brand-700">Dateien auswählen</span> oder hierher ziehen
        </span>
        <span className="mt-1 text-xs text-muted">PDF, JPG, PNG oder Word · max. 5 Dateien, zusammen 10 MB</span>
        <input
          ref={input}
          id={id}
          type="file"
          name="files"
          multiple
          accept={upload.accept.join(",")}
          className="sr-only"
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => {
            if (e.target.files) onAdd(e.target.files);
            e.target.value = "";
          }}
        />
      </label>
      <FieldError id={`${id}-error`} error={error} />
      {files.length > 0 && (
        <ul className="mt-3 grid gap-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm animate-fade-up"
            >
              <FileText className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate font-medium">{f.name}</span>
              <span className="text-xs text-muted">{formatSize(f.size)}</span>
              <button
                type="button"
                onClick={() => onRemove(i)}
                aria-label={`${f.name} entfernen`}
                className="-mr-1 grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-sand hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
