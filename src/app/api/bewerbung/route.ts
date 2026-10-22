import { NextResponse } from "next/server";
import { applicationSchema, toFieldErrors, upload } from "@/lib/validation";
import { escapeHtml, renderFields, sendMail } from "@/lib/mail";
import { clientIp, isLikelyBot, isRateLimited } from "@/lib/spam-guard";
import { site } from "@/config/site";

export const runtime = "nodejs";

// Dateisignaturen, damit nur echte Dokumente/Bilder durchkommen
const signatures: { ext: string[]; bytes: number[] }[] = [
  { ext: [".pdf"], bytes: [0x25, 0x50, 0x44, 0x46] },
  { ext: [".jpg", ".jpeg"], bytes: [0xff, 0xd8, 0xff] },
  { ext: [".png"], bytes: [0x89, 0x50, 0x4e, 0x47] },
  { ext: [".doc"], bytes: [0xd0, 0xcf, 0x11, 0xe0] },
  { ext: [".docx"], bytes: [0x50, 0x4b, 0x03, 0x04] },
];

function hasValidSignature(name: string, buf: Buffer) {
  const ext = name.slice(name.lastIndexOf(".")).toLowerCase();
  const sig = signatures.find((s) => s.ext.includes(ext));
  return !!sig && sig.bytes.every((b, i) => buf[i] === b);
}

const safeName = (name: string) => name.replace(/[^\p{L}\p{N}._ -]/gu, "_").slice(0, 100);

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });

  if (isLikelyBot(form)) return NextResponse.json({ ok: true });
  if (isRateLimited(clientIp(request.headers))) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut oder rufen Sie uns an." },
      { status: 429 },
    );
  }

  const fields = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === "string"));
  const parsed = applicationSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json({ fieldErrors: toFieldErrors(parsed.error) }, { status: 422 });
  }
  const d = parsed.data;

  // Anhänge prüfen
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > upload.maxFiles) {
    return NextResponse.json({ fieldErrors: { files: `Bitte höchstens ${upload.maxFiles} Dateien anhängen.` } }, { status: 422 });
  }
  const total = files.reduce((sum, f) => sum + f.size, 0);
  if (total > upload.maxTotalBytes) {
    return NextResponse.json({ fieldErrors: { files: "Die Dateien sind zusammen größer als 10 MB." } }, { status: 422 });
  }
  const attachments = [];
  for (const file of files) {
    const buf = Buffer.from(await file.arrayBuffer());
    if (!hasValidSignature(file.name, buf)) {
      return NextResponse.json(
        { fieldErrors: { files: `„${file.name}“ hat kein erlaubtes Format (PDF, JPG, PNG, Word).` } },
        { status: 422 },
      );
    }
    attachments.push({ filename: safeName(file.name), content: buf, contentType: file.type || undefined });
  }

  const name = `${d.firstName} ${d.lastName}`;
  const { text, html } = renderFields(`Neue Bewerbung: ${d.position}`, [
    ["Stelle", d.position],
    ["Name", name],
    ["E-Mail", d.email],
    ["Telefon", d.phone],
    ["Wohnort", d.city],
    ["Qualifikation", d.qualification],
    ["Arbeitszeit", d.workModel],
    ["Frühester Start", d.startDate],
    ["Nachricht", d.message],
    ["Anhänge", attachments.map((a) => a.filename).join(", ") || "keine (Kurzbewerbung)"],
  ]);

  try {
    await sendMail({ subject: `[Bewerbung] ${d.position} – ${name}`, text, html, replyTo: d.email, attachments });
  } catch (err) {
    console.error("Bewerbung: Versand fehlgeschlagen", err);
    return NextResponse.json(
      { error: "Ihre Bewerbung konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns an." },
      { status: 502 },
    );
  }

  // Eingangsbestätigung an Bewerber:in – fester Text, damit das Formular nicht für Spam missbraucht werden kann
  const confirmText = `Hallo ${d.firstName},\n\nvielen Dank für Ihre Bewerbung als ${d.position}! Wir haben Ihre Unterlagen erhalten und melden uns in der Regel innerhalb von 48 Stunden bei Ihnen.\n\nBei Fragen erreichen Sie uns unter ${site.contact.phone}.\n\nHerzliche Grüße\nIhr Team von ${site.name}`;
  await sendMail({
    to: d.email,
    subject: `Ihre Bewerbung bei ${site.name}`,
    text: confirmText,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1d2126">${escapeHtml(confirmText).replace(/\n/g, "<br>")}</div>`,
  }).catch((err) => console.error("Bewerbung: Eingangsbestätigung fehlgeschlagen", err));

  return NextResponse.json({ ok: true });
}
