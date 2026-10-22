/**
 * Zentrale Firmendaten. Alles, was mit "TODO" markiert ist, muss vor dem
 * Livegang von Perfect Job bestätigt bzw. ergänzt werden – insbesondere die
 * Pflichtangaben fürs Impressum.
 */
export const site = {
  name: "Perfect Job",
  tagline: "Personal- und Pflegedienstleister",
  url: "https://perfectjob-mainz.de",
  description:
    "Perfect Job vermittelt qualifizierte Pflegekräfte an Pflegeheime, Kliniken und Pflegedienste in Mainz, Wiesbaden und Frankfurt – und bietet Pflegekräften faire, sichere Jobs.",
  region: ["Mainz", "Wiesbaden", "Frankfurt"],

  contact: {
    // TODO: Kontaktdaten bestätigen (Stand der alten Webseite 2019)
    phone: "06131 5705001",
    phoneHref: "tel:+4961315705001",
    mobile: "0151 27766999",
    mobileHref: "tel:+4915127766999",
    whatsappHref: "https://wa.me/4915127766999",
    email: "info@perfectjob-mainz.de",
    street: "Am Taubertsberg 4",
    zip: "55122",
    city: "Mainz",
    // Koordinaten für die Karte (OpenStreetMap)
    geo: { lat: 49.9956, lon: 8.2443 },
    hours: [
      // TODO: Bürozeiten bestätigen
      { days: "Mo – Fr", time: "08:00 – 17:00 Uhr" },
      { days: "Rufbereitschaft", time: "rund um die Uhr" },
    ],
  },

  legal: {
    // TODO: Pflichtangaben fürs Impressum ergänzen (§ 5 DDG)
    company: "Perfect Job [Rechtsform, z. B. GmbH]",
    representative: "[Name der Geschäftsführung / Inhaber:in]",
    register: "[Registergericht, z. B. Amtsgericht Mainz, HRB 00000]",
    vatId: "[USt-IdNr. gemäß § 27a UStG, z. B. DE000000000]",
    // Bei Arbeitnehmerüberlassung Pflicht: Erlaubnis nach § 1 AÜG
    auegPermit:
      "[Erlaubnis zur Arbeitnehmerüberlassung, erteilt durch die Bundesagentur für Arbeit, Regionaldirektion …, am …]",
    supervisoryAuthority: "[Zuständige Aufsichtsbehörde, falls vorhanden]",
    contentResponsible: "[Name, Anschrift – verantwortlich nach § 18 Abs. 2 MStV]",
    hostingProvider: "[Hosting-Anbieter, Anschrift]",
  },
} as const;

export const nav = [
  { href: "/", label: "Start" },
  { href: "/fuer-einrichtungen", label: "Für Einrichtungen" },
  { href: "/karriere", label: "Karriere" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
