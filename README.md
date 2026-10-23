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

## Vorschau auf GitHub Pages

Bei jedem Push auf `main` baut `.github/workflows/pages.yml` eine statische Vorschau:
https://dom1fke.github.io/perfectjob-webseite/

- Einmalig einstellen: *Settings → Pages → Source: „GitHub Actions“*
- Die Vorschau hat keinen Server: Formulare zeigen nur einen Hinweis statt zu senden, Sicherheits-Header fehlen.
- Sie ist für Suchmaschinen gesperrt (`noindex`) und nicht als Live-Seite gedacht.

## Livebetrieb auf dem Webspace (Apache + PHP)

Die Seite läuft dort als statischer Export, die Formulare über zwei PHP-Skripte (`php/`).
E-Mails gehen über die `mail()`-Funktion des Hosters – es liegt kein Postfach-Passwort auf dem Server.

**Voraussetzung:** Eine PHP-Version mit den Sicherheitskorrekturen vom 21.10.2026
(mind. 8.2.35 / 8.3.36 / 8.4.27 / 8.5.12). Prüfen mit `php/tools/php-version-check.php`
(einzeln hochladen, aufrufen, sofort wieder löschen).

```bash
npm run build:webspace -- /neu   # Testordner perfectjob-mainz.de/neu/ (noindex)
npm run build:webspace           # Hauptverzeichnis
```

1. Inhalt von `webspace-build/` per SFTP in den Web-Ordner (bzw. `/neu`) hochladen – inkl. der `.htaccess`-Dateien.
2. `php/lib/config.example.php` als `perfectjob-config.php` **eine Ebene über** dem Web-Ordner ablegen und ausfüllen
   (notfalls als `lib/config.php`; `lib/` ist gesperrt). Zum Testen `'dry_run' => true`.
3. Formulare testen; prüfen, dass `…/lib/bootstrap.php` und `…/lib/config.php` mit 403 antworten.
4. Vor dem Wechsel ins Hauptverzeichnis: Sicherung der alten WordPress-Seite.

Die Auswahllisten (Stellen, Arbeitszeit) für die PHP-Prüfung erzeugt der Build aus `src/content/content.ts`.
Ändern sich die Anliegen im Kontaktformular, `php/api/kontakt.php` mit anpassen.

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
