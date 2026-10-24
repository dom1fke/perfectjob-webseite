import type { Metadata } from "next";
import Image from "next/image";
import { asset } from "@/lib/paths";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { ContactBand, Faq, ProcessSteps } from "@/components/sections";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { employeeBenefits, faqs, jobs, processSteps } from "@/content/content";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Karriere – Jobs in der Pflege",
  description:
    "Jobs für Pflegefachkräfte, Pflegehelfer:innen und Pflegeassistenz in Mainz, Wiesbaden und Frankfurt. Faire Bezahlung, Wunschdienstplan, feste Anstellung. Jetzt in 2 Minuten bewerben.",
};

export default function KarrierePage() {
  return (
    <>
      <PageHero
        eyebrow="Karriere bei Perfect Job"
        title={
          <>
            Ihr Job. Ihre Zeit. <span className="text-brand-600">Ihre Zukunft.</span>
          </>
        }
        intro="Zufriedene Mitarbeiter:innen sind unsere beste Werbung. Darum bieten wir Ihnen abwechslungsreiche, gut bezahlte Jobs in der Pflege – und immer ein offenes Ohr."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="#bewerben" arrow>
            Jetzt bewerben
          </ButtonLink>
          <ButtonLink href="#stellen" variant="secondary">
            Offene Stellen
          </ButtonLink>
        </div>
      </PageHero>

      {/* Vorteile */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Ihre Vorteile"
            title="Warum Pflegekräfte gern bei uns arbeiten"
            intro="Neueinsteiger:innen, Wiedereinsteiger:innen oder Profis mit langjähriger Erfahrung: Bei uns finden Sie einen Arbeitgeber, der Pflege versteht."
          />
          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-6">
            {employeeBenefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 90} className="flex gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon name={b.icon} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Stellen */}
      <section id="stellen" className="bg-sand py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Offene Stellen" title="Finden Sie Ihre Position" />
          <div className="mt-12 grid gap-5 lg:grid-cols-3 3xl:grid-cols-4">
            {jobs.map((job, i) => (
              <Reveal
                key={job.slug}
                delay={i * 100}
                as="article"
                className="group flex flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/[0.06] sm:p-8"
              >
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-700">Vollzeit / Teilzeit</span>
                  <span className="rounded-full bg-sand px-3 py-1 text-ink-soft">{site.region.join(", ")}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold">{job.title}</h3>
                <p className="mt-1 text-muted">{job.short}</p>

                <h4 className="mt-6 text-sm font-semibold tracking-wide text-ink-soft uppercase">Ihre Aufgaben</h4>
                <ul className="mt-3 space-y-2">
                  {job.tasks.map((t) => (
                    <li key={t} className="flex gap-2.5 text-[0.95rem] leading-snug">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
                <h4 className="mt-6 text-sm font-semibold tracking-wide text-ink-soft uppercase">Ihr Profil</h4>
                <ul className="mt-3 mb-8 space-y-2">
                  {job.profile.map((t) => (
                    <li key={t} className="flex gap-2.5 text-[0.95rem] leading-snug text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/karriere?stelle=${job.slug}#bewerben`}
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition-colors duration-200 group-hover:bg-brand-600"
                >
                  Als {job.title.split(" (")[0]} bewerben
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
            {/* Unter den Stellen bzw. auf breiten Ansichten als vierte Karte daneben */}
            <Reveal className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink/20 p-6 text-center sm:p-8 lg:col-span-3 3xl:col-span-1">
              <p className="font-display text-lg font-semibold">Nichts Passendes dabei?</p>
              <p className="mt-1 text-muted">
                Bewerben Sie sich initiativ – wir finden gemeinsam den richtigen Einsatz für Sie.
              </p>
              <Link
                href="/karriere?stelle=initiativ#bewerben"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-700 hover:underline"
              >
                Initiativ bewerben <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Ablauf */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading center eyebrow="Ihr Weg zu uns" title="So läuft Ihre Bewerbung ab" />
          <div className="mt-16">
            <ProcessSteps steps={processSteps.applicants} />
          </div>
        </Container>
      </section>

      {/* Bewerbungsformular */}
      <section id="bewerben" className="scroll-mt-20 bg-sand py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Bewerbung"
              title="Bewerben Sie sich jetzt."
              intro="Ein paar Angaben genügen – den Rest klären wir im persönlichen Gespräch. Lebenslauf? Gern, aber kein Muss."
            />
            <Reveal className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block 3xl:aspect-[16/9]">
              <Image
                src={asset("/images/bewerbung-laptop.jpg")}
                alt="Junge Frau bewirbt sich entspannt am Laptop"
                fill
                sizes="35vw"
                className="object-cover object-[65%_center]"
              />
            </Reveal>
            <Reveal className="mt-6 flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-line">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm text-muted">
                Lieber telefonisch?
                <br />
                <a href={site.contact.mobileHref} className="font-semibold text-ink hover:text-brand-700">
                  {site.contact.mobile}
                </a>{" "}
                – auch per{" "}
                <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:text-brand-700">
                  WhatsApp
                </a>
              </p>
            </Reveal>
          </div>
          <Reveal className="rounded-[2rem] bg-white p-6 shadow-xl shadow-ink/[0.05] ring-1 ring-line sm:p-10">
            <ApplicationForm />
          </Reveal>
        </Container>
      </section>

      <Faq items={faqs.applicants} title="Fragen zur Bewerbung" />
      <ContactBand title="Noch Fragen? Wir sind für Sie da." text="Rufen Sie uns an oder schreiben Sie uns – wir beraten Sie gern persönlich und unverbindlich." />
    </>
  );
}
