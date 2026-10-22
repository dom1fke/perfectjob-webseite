# Perfect Job – Webseite

Neue Webseite für **Perfect Job**, Personal- und Pflegedienstleister in Mainz, Wiesbaden und Frankfurt.

## Technik

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 4, Schriften lokal eingebunden (Inter, Outfit) – keine Google-Fonts-Verbindung
- Formulare (Kontakt, Personalanfrage, Bewerbung mit Datei-Upload) → E-Mail per SMTP (`nodemailer`)
- Spamschutz ohne Drittanbieter: Honeypot, Mindest-Ausfüllzeit, Ratenbegrenzung
- Cookie-Einwilligung: nur „externe Medien“ (OpenStreetMap-Karte, Zwei-Klick-Lösung); kein Tracking

## Seiten

| Pfad | Inhalt |
| --- | --- |
| `/` | Startseite mit Wegweiser Pflegekraft / Einrichtung |
| `/fuer-einrichtungen` | Leistungen, „Unsere Kunden“, Qualität, Personalanfrage |
| `/karriere` | Vorteile, Stellen, Ablauf, Bewerbungsformular |
| `/ueber-uns` | Wer wir sind, Werte, Einsatzgebiet |
| `/kontakt` | Kontaktwege, Formular, Karte (nach Einwilligung) |
| `/impressum`, `/datenschutz` | Rechtstexte |

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```

Ohne SMTP-Konfiguration werden Formular-E-Mails im Entwicklungsmodus nur in der Konsole ausgegeben.
Für den echten Versand `.env.example` nach `.env.local` kopieren und ausfüllen.

## Inhalte pflegen

- Firmendaten, Kontakt, Impressumsangaben: `src/config/site.ts`
- Stellen, Vorteile, FAQ, Ablauf: `src/content/content.ts`
- Bilder: `public/images/`

## Vor dem Livegang (TODO)

- [ ] Kontaktdaten und Bürozeiten bestätigen (`src/config/site.ts`)
- [ ] Impressum: Rechtsform, Vertretung, Register, USt-IdNr., **AÜG-Erlaubnis**, Verantwortlicher
- [ ] Datenschutz: Hosting- und E-Mail-Anbieter eintragen, AV-Verträge abschließen, Text prüfen lassen
- [ ] Bildlizenzen klären (Fotos stammen von der alten Seite, vermutlich Shutterstock) und Bildnachweise ergänzen
- [ ] Vorteile/Versprechen (Tarif, 48-h-Rückmeldung, Rufbereitschaft …) mit Perfect Job abstimmen
- [ ] Logo als Vektordatei (SVG) besorgen – aktuell nachgebaut
- [ ] Kundenlogos/Zitate nur mit schriftlicher Freigabe
- [ ] Hosting festlegen (Node-fähig, Serverstandort EU), SMTP-Zugang hinterlegen
