/**
 * Inhalte der Seite. Stellentexte stammen aus der alten Webseite und wurden
 * überarbeitet. TODO: Vorteile/Konditionen mit Perfect Job abstimmen – nur
 * Versprechen aufnehmen, die tatsächlich gelten.
 */

export type Job = {
  slug: string;
  title: string;
  short: string;
  tasks: string[];
  profile: string[];
};

export const jobs: Job[] = [
  {
    slug: "pflegefachkraft",
    title: "Pflegefachkraft (m/w/d)",
    short: "Examiniert in der Alten-, Kranken- oder Gesundheitspflege",
    tasks: [
      "Grundpflege sowie medizinische Behandlungspflege",
      "Lückenlose Pflegedokumentation",
      "Vergabe und Kontrolle von Medikamenten",
      "Einfühlsame Betreuung und Versorgung der Bewohner:innen bzw. Patient:innen",
    ],
    profile: [
      "Abgeschlossene Ausbildung als Pflegefachfrau/-mann, Altenpfleger:in oder Gesundheits- und Krankenpfleger:in",
      "Sicherheit in Grund- und Behandlungspflege",
      "Teamgeist und hohe Sozialkompetenz",
    ],
  },
  {
    slug: "pflegehelfer",
    title: "Pflegehelfer:in (m/w/d)",
    short: "Mit abgeschlossener Helferausbildung",
    tasks: [
      "Grundpflege und Unterstützung im Alltag",
      "Mitwirkung bei der Medikamentengabe",
      "Betreuung und Förderung der Lebensqualität",
    ],
    profile: [
      "Abgeschlossene Ausbildung zur Alten- oder Krankenpflegehilfe",
      "Gute Kenntnisse in der Grundpflege",
      "Zuverlässigkeit und Freude am Umgang mit Menschen",
    ],
  },
  {
    slug: "pflegeassistenz",
    title: "Pflegeassistenz (m/w/d)",
    short: "Auch für Quer- und Wiedereinsteiger:innen",
    tasks: [
      "Unterstützung bei der Grundpflege",
      "Hilfe bei alltäglichen Aufgaben",
      "Zuwendung, Gespräche und Begleitung",
    ],
    profile: [
      "Erste Erfahrung in der Pflege oder Betreuung – oder die Motivation, einzusteigen",
      "Lernbereitschaft und Einfühlungsvermögen",
      "Gute Deutschkenntnisse",
    ],
  },
];

export const employeeBenefits = [
  {
    icon: "euro",
    title: "Faire, pünktliche Bezahlung",
    text: "Tarifgebundene Vergütung plus Zuschläge für Nacht-, Wochenend- und Feiertagsdienste.",
  },
  {
    icon: "calendar",
    title: "Dienstplan nach Ihren Wünschen",
    text: "Sie sagen uns, wann Sie arbeiten möchten – wir planen Ihre Einsätze darum herum.",
  },
  {
    icon: "shield",
    title: "Unbefristet & sicher",
    text: "Feste Anstellung bei Perfect Job mit allen Sozialleistungen – auch zwischen den Einsätzen.",
  },
  {
    icon: "heart",
    title: "Persönliche Betreuung",
    text: "Eine feste Ansprechperson, die Sie kennt und für Sie da ist – nicht nur im Notfall.",
  },
  {
    icon: "graduation",
    title: "Weiterbildung",
    text: "Wir fördern Fortbildungen und unterstützen Sie bei Ihrem nächsten Karriereschritt.",
  },
  {
    icon: "map",
    title: "Einsätze in Ihrer Nähe",
    text: "Abwechslungsreiche Einsätze in Mainz, Wiesbaden, Frankfurt und Umgebung.",
  },
] as const;

// Stichpunkte in der großen Vorteils-Karte „Faire, pünktliche Bezahlung“ (Startseite)
export const payHighlights = [
  "Tarifgebundene Vergütung",
  "Zuschlag für Nachtdienste",
  "Zuschlag für Wochenenden",
  "Zuschlag für Feiertage",
];

export const clientServices = [
  {
    icon: "clock",
    title: "Kurzfristige Unterstützung",
    text: "Personalausfall durch Krankheit oder Urlaub? Wir reagieren schnell – oft schon für den nächsten Dienst.",
  },
  {
    icon: "users",
    title: "Langfristige Überlassung",
    text: "Verlässliche Pflegekräfte über Wochen und Monate, die Ihr Team kennen und Ihre Abläufe verstehen.",
  },
  {
    icon: "handshake",
    title: "Personalvermittlung",
    text: "Sie suchen dauerhaft Verstärkung? Wir finden passende Fachkräfte für eine Festanstellung in Ihrem Haus.",
  },
] as const;

export const clientTypes = [
  { icon: "building", title: "Stationäre Pflegeeinrichtungen", text: "Alten- und Pflegeheime, Senioreneinrichtungen" },
  { icon: "hospital", title: "Kliniken & Krankenhäuser", text: "Stationen, Funktionsbereiche, Reha-Kliniken" },
  { icon: "home", title: "Ambulante Pflegedienste", text: "Unterstützung in der häuslichen Pflege" },
  { icon: "activity", title: "Intensiv- & Sonderpflege", text: "Außerklinische Intensivpflege, Wohngemeinschaften" },
] as const;

export const processSteps = {
  applicants: [
    { title: "Bewerben", text: "In zwei Minuten online – ein Lebenslauf ist kein Muss." },
    { title: "Kennenlernen", text: "Wir melden uns innerhalb von 48 Stunden für ein persönliches Gespräch." },
    { title: "Loslegen", text: "Vertrag, Einarbeitung, erster Einsatz – wir begleiten Sie bei jedem Schritt." },
  ],
  clients: [
    { title: "Bedarf melden", text: "Per Telefon oder Formular: Qualifikation, Zeitraum, Schichten." },
    { title: "Passende Kraft", text: "Wir wählen geprüfte Pflegekräfte aus, die zu Ihrem Haus passen." },
    { title: "Einsatz & Betreuung", text: "Wir bleiben Ansprechpartner während des gesamten Einsatzes." },
  ],
};

export const faqs = {
  applicants: [
    {
      q: "Brauche ich für die Bewerbung einen Lebenslauf?",
      a: "Nein. Eine Kurzbewerbung mit Ihren Kontaktdaten und Ihrer Qualifikation reicht völlig. Alles Weitere besprechen wir im persönlichen Gespräch.",
    },
    {
      q: "Bin ich bei Perfect Job fest angestellt?",
      a: "Ja. Sie erhalten einen Arbeitsvertrag bei Perfect Job mit allen Sozialleistungen, Urlaubsanspruch und Lohnfortzahlung – auch in Zeiten zwischen zwei Einsätzen.",
    },
    {
      q: "Kann ich meine Arbeitszeiten mitbestimmen?",
      a: "Unbedingt. Ob Vollzeit, Teilzeit oder Minijob, nur Frühdienste oder keine Wochenenden – wir richten die Einsätze nach Ihren Wünschen aus.",
    },
    {
      q: "Wie schnell erhalte ich eine Rückmeldung?",
      a: "In der Regel melden wir uns innerhalb von 48 Stunden telefonisch oder per E-Mail bei Ihnen.",
    },
  ],
  clients: [
    {
      q: "Wie kurzfristig können Sie Personal stellen?",
      a: "Das hängt von Qualifikation und Schicht ab. Häufig können wir bereits innerhalb von 24 bis 48 Stunden unterstützen. Rufen Sie uns am besten direkt an.",
    },
    {
      q: "Sind Ihre Pflegekräfte geprüft?",
      a: "Ja. Wir prüfen Qualifikationsnachweise, Berufserfahrung, erweitertes Führungszeugnis und Impfstatus, bevor eine Pflegekraft bei Ihnen eingesetzt wird.",
    },
    {
      q: "Auf welcher Grundlage arbeiten Sie?",
      a: "Wir arbeiten auf Basis des Arbeitnehmerüberlassungsgesetzes (AÜG) mit gültiger Erlaubnis der Bundesagentur für Arbeit. Gerne senden wir Ihnen unsere Unterlagen zu.",
    },
  ],
};
