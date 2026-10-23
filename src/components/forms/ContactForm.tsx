"use client";

import { useState } from "react";
import { contactTopics, phonePattern, type ContactTopic } from "@/content/forms";
import { fieldLines, MESSAGE_MAX_LENGTH } from "@/lib/mailto";
import { MessageOpened, PrivacyNote, SelectField, SendButtons, TextArea, TextField } from "./fields";
import { useMailForm } from "./useMailForm";

const text = (data: FormData, name: string) => String(data.get(name) ?? "");

export function ContactForm({ defaultTopic = contactTopics[0] }: { defaultTopic?: ContactTopic }) {
  const [topic, setTopic] = useState<string>(defaultTopic);
  const isClient = topic === "Personalanfrage (Einrichtung)";

  const { errors, prepared, channel, onSubmit, clearError, back } = useMailForm((data) => ({
    subject: `${text(data, "topic")} – ${text(data, "name")}`,
    body: `Guten Tag,\n\n${text(data, "message")}\n\n${fieldLines([
      ["Name", text(data, "name")],
      ["Einrichtung", text(data, "organization")],
      ["E-Mail", text(data, "email")],
      ["Telefon", text(data, "phone")],
    ])}`,
  }));

  return (
    <>
      {prepared && <MessageOpened message={prepared} channel={channel} onBack={back} />}
      <form
        noValidate
        hidden={!!prepared}
        onSubmit={onSubmit}
        onInput={(e) => clearError((e.target as HTMLInputElement).name)}
        className="grid gap-5 sm:grid-cols-2"
      >
        <SelectField
          label="Ihr Anliegen"
          name="topic"
          required
          options={contactTopics}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          error={errors.topic}
          className="sm:col-span-2"
        />
        <TextField label="Name" name="name" required maxLength={120} autoComplete="name" error={errors.name} />
        <TextField
          label={isClient ? "Einrichtung" : "Firma / Einrichtung"}
          name="organization"
          maxLength={160}
          autoComplete="organization"
          error={errors.organization}
        />
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
          pattern={phonePattern}
          autoComplete="tel"
          inputMode="tel"
          error={errors.phone}
        />
        <TextArea
          label="Nachricht"
          name="message"
          required
          maxLength={MESSAGE_MAX_LENGTH}
          error={errors.message}
          className="sm:col-span-2"
          placeholder={isClient ? "Welche Qualifikation, welcher Zeitraum, welche Schichten?" : "Wie können wir Ihnen helfen?"}
        />
        <div className="sm:col-span-2">
          <PrivacyNote />
        </div>
        <div className="sm:col-span-2">
          <SendButtons label="Nachricht senden" hint="Öffnet Ihr E-Mail-Programm mit allen Angaben – Sie senden die Nachricht dort ab." />
        </div>
      </form>
    </>
  );
}
