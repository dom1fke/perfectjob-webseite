import "server-only";

/**
 * Spamschutz ohne Drittanbieter (kein reCAPTCHA → keine Einwilligung nötig):
 * - Honeypot-Feld, das Menschen nicht sehen
 * - Mindestzeit zwischen Laden und Absenden
 * - einfache Ratenbegrenzung pro IP (im Speicher der laufenden Instanz)
 */

const MIN_FILL_MS = 2500;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function isLikelyBot(form: FormData): boolean {
  if (String(form.get("website") ?? "") !== "") return true;
  const started = Number(form.get("_ts") ?? 0);
  if (!started || Date.now() - started < MIN_FILL_MS) return true;
  return false;
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}
