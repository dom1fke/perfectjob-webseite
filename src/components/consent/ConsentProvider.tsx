"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Einwilligungsverwaltung (TDDDG § 25 / DSGVO Art. 6 Abs. 1 lit. a).
 *
 * Die Seite setzt selbst keine Tracking- oder Marketing-Cookies. Einwilligungs-
 * pflichtig sind nur „externe Medien“ (die Karte von OpenStreetMap), die erst
 * nach Zustimmung geladen werden. Die Auswahl wird lokal im Browser gespeichert
 * (technisch notwendig) und kann jederzeit über „Cookie-Einstellungen“ geändert
 * werden.
 */

const STORAGE_KEY = "pj-consent";
// Erhöhen, wenn sich die Kategorien ändern – dann wird erneut gefragt.
const CONSENT_VERSION = 1;

export type ConsentState = {
  externalMedia: boolean;
};

type StoredConsent = ConsentState & { version: number; date: string };

type ConsentContextValue = {
  consent: ConsentState | null;
  ready: boolean;
  bannerOpen: boolean;
  settingsOpen: boolean;
  save: (next: ConsentState) => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readStored(): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    return parsed.version === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) setConsent({ externalMedia: stored.externalMedia });
    setReady(true);
  }, []);

  const save = useCallback((next: ConsentState) => {
    setConsent(next);
    setSettingsOpen(false);
    try {
      const value: StoredConsent = {
        ...next,
        version: CONSENT_VERSION,
        date: new Date().toISOString(),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // Speichern nicht möglich (z. B. privater Modus) – Auswahl gilt dann nur für diese Sitzung.
    }
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      ready,
      bannerOpen: ready && consent === null && !settingsOpen,
      settingsOpen,
      save,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }),
    [consent, ready, settingsOpen, save],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent muss innerhalb von <ConsentProvider> verwendet werden");
  return ctx;
}
