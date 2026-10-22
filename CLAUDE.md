# Perfect Job – Webseite

Firmenwebseite für einen Personaldienstleister in der Pflege (Arbeitnehmerüberlassung) im Rhein-Main-Gebiet. Sprache der Seite und des Codes (Kommentare): Deutsch, Anrede „Sie“, gendergerecht mit Doppelpunkt (Pflegekräfte, Mitarbeiter:innen).

- Node 22 über nvm: in nicht-interaktiven Shells zuerst `source ~/.nvm/nvm.sh`.
- Prüfen: `npx tsc --noEmit`, `npm run lint`, `npm run build`.
- Markenfarbe `brand-600` = #D30B11 (Logo-Rot), Neutraltöne `ink`, `sand`, `line` – definiert in `src/app/globals.css` (`@theme`).
- Firmendaten nur in `src/config/site.ts`, Inhalte in `src/content/content.ts` – nicht in Komponenten hart kodieren.
- Rechtliches: keine externen Dienste (Fonts, Maps, Analytics, reCAPTCHA) ohne Einwilligung über `ConsentProvider` einbinden; neue Dienste auch in `/datenschutz` und im Cookie-Dialog ergänzen.
- Animationen über `<Reveal>` bzw. `animate-fade-up`; `prefers-reduced-motion` wird global respektiert.
- Mit `TODO` markierte Platzhalter sind offene Angaben von Perfect Job (siehe README).
