import type { Metadata } from "next";
import Image from "next/image";
import { asset } from "@/lib/paths";
import { Ear, HeartHandshake, Scale, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import { ContactBand } from "@/components/sections";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Perfect Job ist Ihr regionaler Personal- und Pflegedienstleister aus Mainz. Lernen Sie uns, unsere Werte und unser Einsatzgebiet kennen.",
};

const values = [
  {
    icon: HeartHandshake,
    title: "Menschlichkeit",
    text: "Pflege ist Beziehungsarbeit. Wir behandeln unsere Mitarbeiter:innen so, wie gute Pflege mit Menschen umgeht: respektvoll und auf Augenhöhe.",
  },
  {
    icon: ShieldCheck,
    title: "Verlässlichkeit",
    text: "Zusagen halten wir ein. Einrichtungen können sich auf unser Personal verlassen – und unser Personal auf uns.",
  },
  {
    icon: Scale,
    title: "Fairness",
    text: "Faire Bezahlung, transparente Konditionen und ehrliche Kommunikation sind für uns selbstverständlich.",
  },
  {
    icon: Ear,
    title: "Ein offenes Ohr",
    text: "Probleme lösen wir im Gespräch. Unsere Ansprechpartner:innen sind erreichbar, wenn Sie sie brauchen.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title={
          <>
            Wir verbinden Menschen, <span className="text-brand-600">die Pflege möglich machen.</span>
          </>
        }
        intro={`${site.name} ist Ihr Personal- und Pflegedienstleister in ${site.region.join(", ")}. Wir bringen qualifizierte Pflegekräfte und Einrichtungen zusammen – mit Herz, Erfahrung und regionaler Nähe.`}
      />

      {/* Geschichte / Mission */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/10 3xl:aspect-[16/9] 4xl:aspect-[21/9]">
            <Image
              src={asset("/images/team-haende.jpg")}
              alt="Ein Team aus Pflegekräften hält zusammen"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Wer wir sind" title="Aus der Region, für die Region." />
            {/* TODO: Text mit Perfect Job abstimmen – Gründungsjahr, Geschichte, Team */}
            <Reveal className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Gute Pflege braucht Zeit, Fachwissen und vor allem Menschen, die mit Leidenschaft dabei sind. Genau
                diese Menschen finden, fördern und begleiten wir.
              </p>
              <p>
                Zahlreichen Neueinsteiger:innen haben wir den Weg in dieses wichtige Berufsfeld geebnet – und vielen
                Arbeitsuchenden die Chance gegeben, wieder auf eigenen Beinen zu stehen. Gleichzeitig sind wir für
                Pflegeeinrichtungen ein verlässlicher Partner, wenn Personal knapp wird.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Werte */}
      <section className="bg-sand py-20 sm:py-28">
        <Container>
          <SectionHeading center eyebrow="Unsere Werte" title="Wofür wir stehen" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90} className="rounded-3xl bg-white p-7 ring-1 ring-line">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                  <v.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Einsatzgebiet */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="Einsatzgebiet"
            title="Zu Hause im Rhein-Main-Gebiet"
            intro="Von unserem Standort in Mainz aus betreuen wir Einrichtungen und Pflegekräfte in der gesamten Region – kurze Wege inklusive."
          />
          <Reveal>
            <RegionGraphic />
          </Reveal>
        </Container>
      </section>

      <ContactBand title="Lernen Sie uns kennen." text="Wir freuen uns auf ein persönliches Gespräch – ob am Telefon oder bei einer Tasse Kaffee in unserem Büro in Mainz." />
    </>
  );
}

/** Schematische Darstellung der drei Standorte (keine echte Karte → keine externen Dienste) */
function RegionGraphic() {
  const cities = [
    { name: "Wiesbaden", x: 120, y: 92, size: 8 },
    { name: "Frankfurt", x: 330, y: 88, size: 8 },
    { name: "Mainz", x: 150, y: 190, size: 13, main: true },
  ];
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-sand p-6 sm:p-10">
      <svg viewBox="0 0 440 280" className="h-auto w-full" role="img" aria-label="Einsatzgebiet: Mainz, Wiesbaden und Frankfurt">
        {/* Rhein & Main, stilisiert */}
        <path d="M-10 230 C 60 215, 110 205, 150 175 S 230 140, 260 150 S 360 120, 450 100" fill="none" stroke="#c9dce8" strokeWidth="14" strokeLinecap="round" />
        <path d="M150 175 C 130 160, 95 150, 60 160 S 0 175, -10 170" fill="none" stroke="#c9dce8" strokeWidth="14" strokeLinecap="round" />
        <circle cx="200" cy="140" r="150" fill="#d30b11" opacity="0.05" />
        <circle cx="200" cy="140" r="95" fill="#d30b11" opacity="0.06" />
        {cities.map((c) => (
          <g key={c.name}>
            {c.main && <circle cx={c.x} cy={c.y} r="26" fill="#d30b11" opacity="0.15" />}
            <circle cx={c.x} cy={c.y} r={c.size} fill={c.main ? "#d30b11" : "#1d2126"} stroke="#fff" strokeWidth="3" />
            <text
              x={c.x + (c.main ? 22 : 16)}
              y={c.y + 6}
              fontFamily="Outfit Variable, sans-serif"
              fontSize={c.main ? 22 : 18}
              fontWeight={c.main ? 600 : 500}
              fill="#1d2126"
            >
              {c.name}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-4 text-center text-sm text-muted">
        Hauptsitz: {site.contact.street}, {site.contact.zip} {site.contact.city}
      </p>
    </div>
  );
}
