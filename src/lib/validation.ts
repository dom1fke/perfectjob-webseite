import { z } from "zod";
import { jobs } from "@/content/content";

const trimmed = (max: number) => z.string({ message: "Ungültige Eingabe" }).trim().max(max, `Maximal ${max} Zeichen`);
const required = (msg: string, max = 120) =>
  z.string({ message: msg }).trim().min(1, msg).max(max, `Maximal ${max} Zeichen`);

const phone = z
  .string()
  .trim()
  .max(40)
  .optional()
  .default("")
  .refine((v) => v === "" || /^[+0-9 ()/-]{6,}$/.test(v), "Bitte eine gültige Telefonnummer angeben");

const privacy = z.literal("on", { message: "Bitte stimmen Sie der Datenschutzerklärung zu" });

export const contactTopics = ["Allgemeine Anfrage", "Personalanfrage (Einrichtung)", "Frage zur Bewerbung"] as const;

export const contactSchema = z.object({
  topic: z.enum(contactTopics, { message: "Bitte ein Anliegen wählen" }),
  name: required("Bitte geben Sie Ihren Namen an"),
  organization: trimmed(160).optional().default(""),
  email: z.email({ message: "Bitte eine gültige E-Mail-Adresse angeben" }).trim().max(200),
  phone,
  message: required("Bitte schreiben Sie uns eine kurze Nachricht", 4000),
  privacy,
});

export const positions = [...jobs.map((j) => j.title), "Initiativbewerbung"] as const;
export const workModels = ["Vollzeit", "Teilzeit", "Minijob", "Noch offen"] as const;

export const applicationSchema = z.object({
  position: z.enum(positions as unknown as [string, ...string[]], { message: "Bitte eine Stelle wählen" }),
  firstName: required("Bitte Vornamen angeben"),
  lastName: required("Bitte Nachnamen angeben"),
  email: z.email({ message: "Bitte eine gültige E-Mail-Adresse angeben" }).trim().max(200),
  phone: phone.refine((v) => v !== "", "Bitte Telefonnummer angeben, damit wir Sie erreichen"),
  city: trimmed(120).optional().default(""),
  qualification: trimmed(200).optional().default(""),
  workModel: z.enum(workModels).optional().default("Noch offen"),
  startDate: trimmed(40).optional().default(""),
  message: trimmed(4000).optional().default(""),
  privacy,
});

export const upload = {
  maxFiles: 5,
  maxTotalBytes: 10 * 1024 * 1024,
  accept: [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"],
  mimeTypes: [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

export type FieldErrors = Record<string, string>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
