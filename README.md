# Perfect Job – Webseite

Neue Webseite für **Perfect Job**, Personal- und Pflegedienstleister in Mainz, Wiesbaden und Frankfurt.

## Technik

- Next.js 15 (App Router) als **rein statischer Export** – kein Server-Code, kein PHP, keine Datenbank
- Tailwind CSS 4, Schriften lokal eingebunden (Inter, Outfit) – keine Google-Fonts-Verbindung
- Formulare (Kontakt, Personalanfrage, Bewerbung) bereiten eine E-Mail bzw. WhatsApp-Nachricht vor, die
  Besucher:innen selbst absenden (`mailto:`). Die Webseite überträgt oder speichert keine Formulardaten.
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
npm run build      # erzeugt den Ordner out/
npm run preview    # out/ lokal ansehen: http://localhost:4000
```

## Veröffentlichen

### Webspace (z. B. der bisherige Hoster von perfectjob-mainz.de)

1. `npm run build` – für einen Testordner: `NEXT_PUBLIC_BASE_PATH=/neu NEXT_PUBLIC_NOINDEX=true npm run build`
   (dann in `out/.htaccess` `ErrorDocument 404 /neu/404.html` setzen)
2. Den **Inhalt** von `out/` per SFTP hochladen – inklusive `.htaccess` (Sicherheits-Header, HTTPS, PHP gesperrt).
3. Vor dem Ersetzen der alten Seite: Sicherung der WordPress-Installation. Wird danach kein PHP mehr gebraucht,
   kann PHP im Kundenmenü des Hosters abgeschaltet werden.

### Vorschau auf GitHub Pages

Bei jedem Push auf `main` baut `.github/workflows/pages.yml` die Vorschau (noindex):
https://dom1fke.github.io/perfectjob-webseite/ – Einstellung: *Settings → Pages → Source: „GitHub Actions“*.

## Inhalte pflegen

- Firmendaten, Kontakt, Impressumsangaben: `src/config/site.ts`
- Stellen, Vorteile, FAQ, Ablauf: `src/content/content.ts`; Formular-Auswahllisten: `src/content/forms.ts`
- Bilder: `public/images/`

## Vor dem Livegang (TODO)

- [ ] Kontaktdaten und Bürozeiten bestätigen (`src/config/site.ts`)
- [ ] Impressum: Rechtsform, Vertretung, Register, USt-IdNr., **AÜG-Erlaubnis**, Verantwortlicher
- [ ] Datenschutz: Hosting- und E-Mail-Anbieter eintragen, AV-Verträge abschließen, Text prüfen lassen
- [ ] Bildlizenzen klären (Fotos stammen von der alten Seite, vermutlich Shutterstock) und Bildnachweise ergänzen
- [ ] Vorteile/Versprechen (Tarif, 48-h-Rückmeldung, Rufbereitschaft …) mit Perfect Job abstimmen
- [ ] Logo als Vektordatei (SVG) besorgen – aktuell nachgebaut
- [ ] Kundenlogos/Zitate nur mit schriftlicher Freigabe

## Frühere Varianten

Echte Formulare mit Datei-Upload gab es als Node.js-Version (Commit `b84d60a`) und als PHP-Version (Commit `3116dbc`).
Sie lassen sich aus der Git-Historie zurückholen, falls später ein Node-Hoster genutzt wird.
