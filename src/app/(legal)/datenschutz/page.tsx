import type { Metadata } from "next";
import { CookieSettingsLink } from "@/components/consent/CookieBanner";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
};

/*
 * TODO vor dem Livegang:
 * - Hosting-Anbieter eintragen und Auftragsverarbeitungsvertrag (AVV) abschließen
 * - E-Mail-Anbieter (SMTP) eintragen und AVV abschließen
 * - Text von einer fachkundigen Stelle prüfen lassen
 */

export default function DatenschutzPage() {
  const { contact, legal } = site;
  return (
    <>
      <h1>Datenschutzerklärung</h1>
      <p>
        Der Schutz Ihrer persönlichen Daten ist uns wichtig. Nachfolgend informieren wir Sie gemäß Art. 13 und 14
        DSGVO darüber, welche Daten wir beim Besuch dieser Website erheben und wie wir sie verwenden.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        {legal.company}
        <br />
        {contact.street}, {contact.zip} {contact.city}
        <br />
        Telefon: {contact.phone}
        <br />
        E-Mail: <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
      <p>
        Vertreten durch: {legal.representative}
      </p>

      <h2>2. Hosting und Server-Logfiles</h2>
      <p>
        Diese Website wird bei folgendem Anbieter gehostet: {legal.hostingProvider}. Mit dem Anbieter besteht ein Vertrag
        über die Auftragsverarbeitung nach Art. 28 DSGVO.
      </p>
      <p>
        Beim Aufruf der Website werden automatisch Informationen erfasst, die Ihr Browser übermittelt: IP-Adresse,
        Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Referrer-URL, Browsertyp und Betriebssystem. Diese Daten
        sind technisch erforderlich, um die Website auszuliefern und ihre Sicherheit zu gewährleisten. Rechtsgrundlage
        ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb). Die Logfiles
        werden nach spätestens 14 Tagen gelöscht, sofern sie nicht zur Aufklärung eines Sicherheitsvorfalls benötigt
        werden.
      </p>

      <h2>3. Kontaktaufnahme</h2>
      <p>
        Wenn Sie uns per Kontaktformular, E-Mail, Telefon oder WhatsApp kontaktieren, verarbeiten wir Ihre Angaben (z.
        B. Name, E-Mail-Adresse, Telefonnummer, Einrichtung, Nachricht), um Ihre Anfrage zu bearbeiten. Die Angaben aus
        dem Kontaktformular werden per E-Mail an uns weitergeleitet und nicht auf dem Webserver
        gespeichert.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit einem Vertrag zusammenhängt oder der
        Durchführung vorvertraglicher Maßnahmen dient, im Übrigen Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
        an der Beantwortung von Anfragen). Wir löschen Ihre Daten, sobald die Anfrage abschließend bearbeitet ist und
        keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>
      <p>
        <strong>WhatsApp:</strong> Wenn Sie uns über WhatsApp kontaktieren, werden Ihre Daten auch durch die WhatsApp
        Ireland Ltd. (Meta) verarbeitet; dabei ist eine Übermittlung in die USA möglich. Bitte nutzen Sie alternativ
        Telefon, E-Mail oder unser Formular, wenn Sie das nicht möchten.
      </p>

      <h2 id="bewerbung">4. Bewerbungen</h2>
      <p>
        Wenn Sie sich über unser Bewerbungsformular oder auf anderem Weg bei uns bewerben, verarbeiten wir Ihre
        Angaben (Kontaktdaten, Qualifikation, gewünschte Arbeitszeit, Nachricht sowie freiwillig hochgeladene
        Unterlagen wie Lebenslauf und Zeugnisse) ausschließlich zur Durchführung des Bewerbungsverfahrens. Die Daten
        werden per E-Mail an uns weitergeleitet und nicht auf dem Webserver gespeichert. Sie erhalten eine
        automatische Eingangsbestätigung an die angegebene E-Mail-Adresse.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO in Verbindung mit § 26 BDSG (Anbahnung eines
        Beschäftigungsverhältnisses). Soweit Sie uns freiwillig besondere Kategorien personenbezogener Daten (z. B.
        Angaben zur Gesundheit oder Schwerbehinderung) mitteilen, erfolgt die Verarbeitung nach Art. 9 Abs. 2 lit. b
        DSGVO.
      </p>
      <p>
        Kommt ein Arbeitsverhältnis zustande, werden Ihre Daten in die Personalakte übernommen. Andernfalls löschen wir
        Ihre Bewerbungsdaten spätestens sechs Monate nach Abschluss des Bewerbungsverfahrens, sofern Sie nicht in eine
        längere Speicherung (z. B. für künftige Stellenangebote) eingewilligt haben. Die Frist dient der Abwehr
        möglicher Ansprüche nach dem Allgemeinen Gleichbehandlungsgesetz (AGG).
      </p>

      <h2>5. E-Mail-Versand</h2>
      <p>
        Für den Versand der Formularinhalte nutzen wir den E-Mail-Dienst unseres Anbieters [E-Mail-Anbieter, Anschrift].
        Mit dem Anbieter besteht ein Vertrag über die Auftragsverarbeitung nach Art. 28 DSGVO.
      </p>

      <h2>6. Cookies und lokale Speicherung</h2>
      <p>
        Diese Website verwendet keine Tracking-, Analyse- oder Marketing-Cookies. Wir speichern lediglich Ihre
        Auswahl im Cookie-Hinweis im lokalen Speicher Ihres Browsers („localStorage“), damit der Hinweis nicht bei
        jedem Besuch erneut erscheint. Diese Speicherung ist technisch erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG,
        Art. 6 Abs. 1 lit. f DSGVO).
      </p>
      <p>
        Ihre Einwilligung in externe Medien können Sie jederzeit mit Wirkung für die Zukunft widerrufen oder ändern:{" "}
        <CookieSettingsLink className="font-medium text-brand-700 underline underline-offset-2" />.
      </p>

      <h2>7. Karte (OpenStreetMap)</h2>
      <p>
        Auf unserer Kontaktseite können Sie eine Karte des Anbieters OpenStreetMap Foundation, St John’s Innovation
        Centre, Cowley Road, Cambridge, CB4 0WS, Vereinigtes Königreich, laden. Die Karte wird erst nach Ihrer
        ausdrücklichen Einwilligung geladen. Dabei wird Ihre IP-Adresse an OpenStreetMap übertragen. Für das Vereinigte
        Königreich liegt ein Angemessenheitsbeschluss der EU-Kommission vor. Rechtsgrundlage ist Ihre Einwilligung
        (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Weitere Informationen:{" "}
        <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">
          Datenschutzerklärung von OpenStreetMap
        </a>
        .
      </p>

      <h2>8. Schriftarten</h2>
      <p>
        Die auf dieser Website verwendeten Schriftarten sind lokal eingebunden. Es findet keine Verbindung zu Servern
        Dritter (z. B. Google Fonts) statt.
      </p>

      <h2>9. SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung
        erkennen Sie am Schloss-Symbol in der Adresszeile Ihres Browsers.
      </p>

      <h2>10. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO)</li>
        <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Wenden Sie sich dazu einfach an <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
      <p>
        Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für uns zuständig ist
        der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz, Hintere Bleiche 34,
        55116 Mainz,{" "}
        <a href="https://www.datenschutz.rlp.de" target="_blank" rel="noopener noreferrer">
          www.datenschutz.rlp.de
        </a>
        .
      </p>

      <p className="text-sm text-muted">Stand: Oktober 2026</p>
    </>
  );
}
