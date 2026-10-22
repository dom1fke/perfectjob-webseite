import type { Metadata } from "next";
import { Check, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { Faq, ProcessSteps } from "@/components/sections";
import { ContactForm } from "@/components/forms/ContactForm";
import { clientServices, clientTypes, faqs, processSteps } from "@/content/content";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Für Einrichtungen – Pflegepersonal anfragen",
  description:
    "Qualifiziertes Pflegepersonal für Pflegeheime, Kliniken und ambulante Dienste in Mainz, Wiesbaden und Frankfurt – kurzfristig, langfristig oder zur Festanstellung.",
};

const qualityPoints = [
  "Geprüfte Qualifikations- und Examensnachweise",
  "Erweitertes Führungszeugnis",
  "Nachweis des Impfstatus",
  "Persönliches Auswahlgespräch mit jeder Pflegekraft",
  "Feste Ansprechperson für Ihre Einrichtung",
  "Transparente Abrechnung ohne versteckte Kosten",
];

export default function EinrichtungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Für Einrichtungen"
        title={
          <>
            Pflegepersonal, auf das <span className="text-brand-600">Sie sich verlassen</span> können.
          </>
        }
        intro="Wir unterstützen Pflegeeinrichtungen, Kliniken und Pflegedienste im Rhein-Main-Gebiet mit qualifizierten Pflegekräften – damit Ihre Bewohner:innen und Patient:innen bestens versorgt sind."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="#anfrage" arrow>
            Personal anfragen
          </ButtonLink>
          <a
            href={site.contact.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ink ring-1 ring-ink/12 transition-all hover:-translate-y-0.5 hover:bg-sand"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.contact.phone}
          </a>
        </div>
      </PageHero>

      {/* Leistungen */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Unsere Leistungen"
            title="Flexibel, wenn es darauf ankommt"
            intro="Ob für einen einzelnen Dienst oder dauerhaft – wir finden die Lösung, die zu Ihrem Bedarf passt."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {clientServices.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 100}
                className="rounded-3xl border border-line p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/[0.07]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
                  <Icon name={s.icon} />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Unsere Kunden */}
      <section className="bg-sand py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Unsere Kunden"
            title="Für wen wir arbeiten"
            intro="Wir sind Partner für Einrichtungen jeder Größe – vom kleinen ambulanten Dienst bis zur Klinik."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {clientTypes.map((c, i) => (
              <Reveal key={c.title} delay={i * 80} className="rounded-3xl bg-white p-7 ring-1 ring-line">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon name={c.icon} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.text}</p>
              </Reveal>
            ))}
          </div>
          {/* TODO: Kundenlogos oder Zitate nur mit schriftlicher Freigabe der Kunden ergänzen */}
        </Container>
      </section>

      {/* Qualität */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Qualität & Sicherheit"
            title="Sorgfältig ausgewählt. Rechtlich sicher."
            intro="Wir arbeiten auf Grundlage des Arbeitnehmerüberlassungsgesetzes (AÜG) mit Erlaubnis der Bundesagentur für Arbeit. Jede Pflegekraft lernen wir persönlich kennen, bevor sie bei Ihnen im Einsatz ist."
          />
          <Reveal as="ul" className="grid gap-3 sm:grid-cols-2">
            {qualityPoints.map((p) => (
              <li key={p} className="flex gap-3 rounded-2xl bg-sand p-4 text-[0.95rem] leading-snug">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Ablauf */}
      <section className="bg-sand py-20 sm:py-28">
        <Container>
          <SectionHeading center eyebrow="Zusammenarbeit" title="So einfach erhalten Sie Unterstützung" />
          <div className="mt-16">
            <ProcessSteps steps={processSteps.clients} />
          </div>
        </Container>
      </section>

      {/* Anfrage */}
      <section id="anfrage" className="scroll-mt-20 py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Personalanfrage"
              title="Erzählen Sie uns von Ihrem Bedarf."
              intro="Wir melden uns schnellstmöglich mit einem passenden Vorschlag. Bei dringendem Bedarf rufen Sie uns am besten direkt an."
            />
            <Reveal className="mt-8">
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center gap-3 font-display text-2xl font-semibold text-ink transition-colors hover:text-brand-700"
              >
                <Phone className="h-6 w-6 text-brand-600" aria-hidden="true" />
                {site.contact.phone}
              </a>
            </Reveal>
          </div>
          <Reveal className="rounded-[2rem] bg-white p-6 shadow-xl shadow-ink/[0.05] ring-1 ring-line sm:p-10">
            <ContactForm defaultTopic="Personalanfrage (Einrichtung)" />
          </Reveal>
        </Container>
      </section>

      <Faq items={faqs.clients} title="Fragen von Einrichtungen" />
    </>
  );
}
