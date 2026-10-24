"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Paperclip } from "lucide-react";
import { jobs } from "@/content/content";
import { phonePattern, positions, workModels } from "@/content/forms";
import { fieldLines, MESSAGE_MAX_LENGTH } from "@/lib/mailto";
import { MessageOpened, PrivacyNote, SelectField, SendButtons, TextArea, TextField } from "./fields";
import { useMailForm } from "./useMailForm";

const text = (data: FormData, name: string) => String(data.get(name) ?? "");

/**
 * Liest ?stelle=… (Buttons in den Stellenkarten) und wählt die Stelle vor.
 * Eigene Komponente in <Suspense>, damit das Formular selbst schon im statischen
 * HTML steht und nicht erst nach dem Laden des JavaScripts erscheint.
 */
function PositionFromQuery({ onSelect }: { onSelect: (title: string) => void }) {
  const params = useSearchParams();
  useEffect(() => {
    const slug = params.get("stelle");
    if (slug === "initiativ") return onSelect("Initiativbewerbung");
    const job = jobs.find((j) => j.slug === slug);
    if (job) onSelect(job.title);
  }, [params, onSelect]);
  return null;
}

export function ApplicationForm() {
  const [position, setPosition] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const { errors, prepared, channel, onSubmit, clearError, back } = useMailForm((data) => {
    const name = `${text(data, "firstName")} ${text(data, "lastName")}`.trim();
    const message = text(data, "message");
    return {
      subject: `Bewerbung als ${text(data, "position")} – ${name}`,
      body:
        `Guten Tag,\n\nhiermit bewerbe ich mich als ${text(data, "position")}.\n\n` +
        fieldLines([
          ["Name", name],
          ["E-Mail", text(data, "email")],
          ["Telefon", text(data, "phone")],
          ["Wohnort", text(data, "city")],
          ["Qualifikation", text(data, "qualification")],
          ["Gewünschte Arbeitszeit", text(data, "workModel")],
          ["Frühester Start", text(data, "startDate")],
        ]) +
        (message ? `\n\n${message}` : "") +
        `\n\nViele Grüße\n${name}`,
    };
  });

  const selectPosition = useCallback(
    (title: string) => {
      setPosition(title);
      clearError("position");
    },
    [clearError],
  );

  return (
    <>
      <Suspense>
        <PositionFromQuery onSelect={selectPosition} />
      </Suspense>
      {prepared && <MessageOpened message={prepared} channel={channel} attachHint onBack={back} />}
      <form
        noValidate
        hidden={!!prepared}
        onSubmit={onSubmit}
        onInput={(e) => clearError((e.target as HTMLInputElement).name)}
        className="grid gap-5 sm:grid-cols-2"
      >
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
        <TextField label="Vorname" name="firstName" required maxLength={120} autoComplete="given-name" error={errors.firstName} />
        <TextField label="Nachname" name="lastName" required maxLength={120} autoComplete="family-name" error={errors.lastName} />
        <TextField
          label="E-Mail"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          inputMode="email"
          error={errors.email}
        />
        <TextField
          label="Telefon"
          name="phone"
          type="tel"
          required
          pattern={phonePattern}
          autoComplete="tel"
          inputMode="tel"
          error={errors.phone}
        />

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
              <TextField label="Wohnort" name="city" maxLength={120} autoComplete="address-level2" error={errors.city} />
              <TextField
                label="Qualifikation / Abschluss"
                name="qualification"
                maxLength={200}
                placeholder="z. B. Pflegefachfrau, 5 Jahre Erfahrung"
                error={errors.qualification}
              />
              <SelectField label="Gewünschte Arbeitszeit" name="workModel" options={workModels} defaultValue="Noch offen" error={errors.workModel} />
              <TextField label="Frühester Start" name="startDate" maxLength={40} placeholder="z. B. sofort, 01.12." error={errors.startDate} />
              <TextArea
                label="Nachricht an uns"
                name="message"
                rows={4}
                maxLength={MESSAGE_MAX_LENGTH}
                placeholder="Was ist Ihnen bei Ihrem nächsten Job wichtig?"
                error={errors.message}
                className="sm:col-span-2"
              />
            </div>
          </div>
        </div>

        <p className="flex gap-3 text-sm leading-relaxed text-muted sm:col-span-2">
          <Paperclip className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
          <span>
            <span className="font-semibold text-ink">Lebenslauf oder Zeugnisse?</span> Gern – hängen Sie sie einfach in Ihrem
            E-Mail-Programm an. Ein Muss sind sie nicht.
          </span>
        </p>

        <div className="sm:col-span-2">
          <PrivacyNote href="/datenschutz#bewerbung">
            Ihre Angaben werden nicht auf dieser Webseite gespeichert, sondern nur in eine E-Mail an uns übernommen, die Sie
            selbst absenden. Wir nutzen sie ausschließlich für das Bewerbungsverfahren und löschen sie spätestens 6 Monate
            nach dessen Abschluss. Mehr in den Hinweisen für Bewerber:innen in der{" "}
          </PrivacyNote>
        </div>
        <div className="sm:col-span-2">
          <SendButtons label="Bewerbung senden" hint="Öffnet Ihr E-Mail-Programm mit allen Angaben – dauert keine 2 Minuten." />
        </div>
      </form>
    </>
  );
}
