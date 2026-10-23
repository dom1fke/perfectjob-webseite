"use client";

import { useState } from "react";
import { contactTopics } from "@/lib/validation";
import { FormAlert, FormSuccess, PrivacyCheckbox, SelectField, SpamFields, SubmitButton, TextArea, TextField } from "./fields";
import { useFormSubmit } from "./useFormSubmit";
import { apiUrl } from "@/lib/paths";

export function ContactForm({ defaultTopic = contactTopics[0] }: { defaultTopic?: (typeof contactTopics)[number] }) {
  const { status, errors, formError, startedAt, onSubmit, clearError, reset } = useFormSubmit(apiUrl("kontakt"));
  const [topic, setTopic] = useState<string>(defaultTopic);
  const isClient = topic === "Personalanfrage (Einrichtung)";

  if (status === "success") {
    return (
      <FormSuccess title="Vielen Dank für Ihre Nachricht!" onReset={reset}>
        Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich – in der Regel innerhalb von 48 Stunden.
      </FormSuccess>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onInput={(e) => clearError((e.target as HTMLInputElement).name)}
      className="relative grid gap-5 sm:grid-cols-2"
    >
      <SpamFields startedAt={startedAt} />
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
      <TextField label="Name" name="name" required autoComplete="name" error={errors.name} />
      <TextField
        label={isClient ? "Einrichtung" : "Firma / Einrichtung"}
        name="organization"
        required={false}
        autoComplete="organization"
        error={errors.organization}
      />
      <TextField label="E-Mail" name="email" type="email" required autoComplete="email" inputMode="email" error={errors.email} />
      <TextField label="Telefon" name="phone" type="tel" autoComplete="tel" inputMode="tel" error={errors.phone} />
      <TextArea
        label="Nachricht"
        name="message"
        required
        error={errors.message}
        className="sm:col-span-2"
        placeholder={
          isClient
            ? "Welche Qualifikation, welcher Zeitraum, welche Schichten?"
            : "Wie können wir Ihnen helfen?"
        }
      />
      <div className="sm:col-span-2">
        <PrivacyCheckbox error={errors.privacy} />
      </div>
      <div className="grid gap-4 sm:col-span-2">
        <FormAlert message={formError} />
        <div>
          <SubmitButton pending={status === "pending"}>Nachricht senden</SubmitButton>
        </div>
      </div>
    </form>
  );
}
