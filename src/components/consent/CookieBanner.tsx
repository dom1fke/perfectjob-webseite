"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Cookie, X } from "lucide-react";
import { useConsent } from "./ConsentProvider";

/** Banner beim ersten Besuch + Einstellungsdialog. „Akzeptieren“ und „Ablehnen“ sind gleichwertig gestaltet. */
export function CookieBanner() {
  const { consent, bannerOpen, settingsOpen, save, openSettings, closeSettings } = useConsent();
  const [externalMedia, setExternalMedia] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (settingsOpen) {
      setExternalMedia(consent?.externalMedia ?? false);
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [settingsOpen, consent]);

  return (
    <>
      {bannerOpen && (
        <div
          role="region"
          aria-label="Cookie-Hinweis"
          className="fixed inset-x-3 bottom-3 z-[60] animate-fade-up sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-md"
        >
          <div className="rounded-2xl border border-line bg-white p-5 shadow-2xl shadow-black/15 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                <Cookie className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold">Ihre Privatsphäre</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  Wir verwenden nur technisch notwendige Speicherungen. Externe Inhalte wie unsere
                  Karte (OpenStreetMap) laden wir erst mit Ihrer Zustimmung. Mehr in der{" "}
                  <Link href="/datenschutz" className="font-medium text-ink underline underline-offset-2">
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => save({ externalMedia: false })}
                className="rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-sand"
              >
                Nur notwendige
              </button>
              <button
                type="button"
                onClick={() => save({ externalMedia: true })}
                className="rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-sand"
              >
                Alle akzeptieren
              </button>
            </div>
            <button
              type="button"
              onClick={openSettings}
              className="mt-3 w-full text-center text-sm font-medium text-muted underline-offset-2 hover:text-ink hover:underline"
            >
              Einstellungen anpassen
            </button>
          </div>
        </div>
      )}

      <dialog
        ref={dialogRef}
        onClose={closeSettings}
        aria-labelledby="consent-title"
        className="m-auto w-[calc(100%-1.5rem)] max-w-lg rounded-2xl p-0 shadow-2xl backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id="consent-title" className="font-display text-2xl font-semibold">
              Cookie-Einstellungen
            </h2>
            <button
              type="button"
              onClick={closeSettings}
              aria-label="Schließen"
              className="-mt-1 -mr-2 grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-sand hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Hier entscheiden Sie, welche Dienste wir nutzen dürfen. Ihre Auswahl können Sie jederzeit
            über „Cookie-Einstellungen“ im Seitenfuß ändern.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-xl border border-line bg-sand/60 p-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold">Technisch notwendig</h3>
                <span className="text-xs font-semibold tracking-wide text-muted uppercase">Immer aktiv</span>
              </div>
              <p className="mt-1 text-sm text-muted">
                Speichert Ihre Cookie-Auswahl, damit dieser Hinweis nicht bei jedem Besuch erscheint.
              </p>
            </div>
            <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-line p-4 transition-colors hover:border-ink/25">
              <span>
                <span className="block font-semibold">Externe Medien</span>
                <span className="mt-1 block text-sm text-muted">
                  Karte von OpenStreetMap (OpenStreetMap Foundation, UK). Dabei wird Ihre IP-Adresse an
                  den Anbieter übertragen.
                </span>
              </span>
              <input
                type="checkbox"
                checked={externalMedia}
                onChange={(e) => setExternalMedia(e.target.checked)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="relative mt-0.5 h-6 w-11 shrink-0 rounded-full bg-ink/20 transition-colors peer-checked:bg-brand-600 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-600 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5"
              />
            </label>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => save({ externalMedia })}
              className="rounded-full border border-ink/15 px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sand"
            >
              Auswahl speichern
            </button>
            <button
              type="button"
              onClick={() => save({ externalMedia: true })}
              className="rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export function CookieSettingsLink({ className = "" }: { className?: string }) {
  const { openSettings } = useConsent();
  return (
    <button type="button" onClick={openSettings} className={className}>
      Cookie-Einstellungen
    </button>
  );
}
