import { site } from "@/config/site";

/**
 * Formulare ohne Server: Aus den Angaben wird eine fertige E-Mail (mailto:) bzw.
 * WhatsApp-Nachricht gebaut, die Besucher:innen selbst absenden. Die Webseite
 * verarbeitet oder speichert dabei keine Daten.
 */

export type PreparedMessage = { subject: string; body: string };

/** Zeilen „Bezeichnung: Wert“, leere Werte werden ausgelassen. */
export function fieldLines(fields: [string, string][]): string {
  return fields
    .filter(([, value]) => value.trim() !== "")
    .map(([label, value]) => (value.includes("\n") ? `${label}:\n${value.trim()}` : `${label}: ${value.trim()}`))
    .join("\n");
}

const encode = (s: string) => encodeURIComponent(s.replace(/\r?\n/g, "\r\n"));

export const mailtoUrl = ({ subject, body }: PreparedMessage) =>
  `mailto:${site.contact.email}?subject=${encode(subject)}&body=${encode(body)}`;

export const whatsappUrl = ({ subject, body }: PreparedMessage) =>
  `${site.contact.whatsappHref}?text=${encode(`${subject}\n\n${body}`)}`;

export const plainText = ({ subject, body }: PreparedMessage) =>
  `An: ${site.contact.email}\nBetreff: ${subject}\n\n${body}`;

/** Freitext kurz halten – manche E-Mail-Programme kappen lange mailto-Links (ca. 2000 Zeichen). */
export const MESSAGE_MAX_LENGTH = 1000;
