import "server-only";
import nodemailer from "nodemailer";

/**
 * E-Mail-Versand über SMTP (z. B. das Postfach info@perfectjob-mainz.de).
 * Konfiguration per Umgebungsvariablen – siehe .env.example.
 * Ohne SMTP-Konfiguration wird im Entwicklungsmodus nur in die Konsole geloggt.
 */

type Attachment = { filename: string; content: Buffer; contentType?: string };

export type Mail = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  to?: string;
  attachments?: Attachment[];
};

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function sendMail(mail: Mail) {
  const transport = getTransport();
  const from = process.env.MAIL_FROM ?? process.env.SMTP_USER;
  const to = mail.to ?? process.env.MAIL_TO;

  if (!transport || !to) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SMTP ist nicht konfiguriert (SMTP_HOST, SMTP_USER, SMTP_PASS, MAIL_TO).");
    }
    console.info(
      `\n[mail:dev] An: ${to ?? "(MAIL_TO fehlt)"} | Betreff: ${mail.subject}\n${mail.text}\n` +
        (mail.attachments?.length ? `Anhänge: ${mail.attachments.map((a) => a.filename).join(", ")}\n` : ""),
    );
    return;
  }

  await transport.sendMail({ from, to, ...mail });
}

const escapeMap: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => escapeMap[c]);

/** Baut eine schlichte Tabellen-Mail aus Feldern. */
export function renderFields(title: string, fields: [string, string][]) {
  const rows = fields.filter(([, v]) => v);
  const text = `${title}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#1d2126">
<h2 style="color:#d30b11;margin:0 0 16px">${escapeHtml(title)}</h2>
<table cellpadding="8" style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="vertical-align:top;color:#646b75;border-bottom:1px solid #eee;white-space:nowrap">${escapeHtml(k)}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table></div>`;
  return { text, html };
}
