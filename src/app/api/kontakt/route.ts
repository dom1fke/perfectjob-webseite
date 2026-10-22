import { NextResponse } from "next/server";
import { contactSchema, toFieldErrors } from "@/lib/validation";
import { renderFields, sendMail } from "@/lib/mail";
import { clientIp, isLikelyBot, isRateLimited } from "@/lib/spam-guard";

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });

  // Bots erhalten eine scheinbare Erfolgsmeldung, damit sie nicht nachjustieren.
  if (isLikelyBot(form)) return NextResponse.json({ ok: true });
  if (isRateLimited(clientIp(request.headers))) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut oder rufen Sie uns an." },
      { status: 429 },
    );
  }

  const parsed = contactSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return NextResponse.json({ fieldErrors: toFieldErrors(parsed.error) }, { status: 422 });
  }
  const d = parsed.data;

  const { text, html } = renderFields(`Neue Kontaktanfrage: ${d.topic}`, [
    ["Anliegen", d.topic],
    ["Name", d.name],
    ["Einrichtung", d.organization],
    ["E-Mail", d.email],
    ["Telefon", d.phone],
    ["Nachricht", d.message],
  ]);

  try {
    await sendMail({ subject: `[Website] ${d.topic} – ${d.name}`, text, html, replyTo: d.email });
  } catch (err) {
    console.error("Kontaktformular: Versand fehlgeschlagen", err);
    return NextResponse.json(
      { error: "Die Nachricht konnte gerade nicht gesendet werden. Bitte rufen Sie uns an oder schreiben Sie eine E-Mail." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
