import Image from "next/image";
import { asset } from "@/lib/paths";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  HeartPulse,
  MapPin,
  Phone,
  PhoneCall,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { ProcessTabs } from "@/components/ProcessTabs";
import { BrandPattern, ButtonLink, Container, Eyebrow, IconBadge, SectionHeading } from "@/components/ui";
import { ContactBand, Faq } from "@/components/sections";
import { clientServices, clientTypes, employeeBenefits, faqs, jobs, payHighlights } from "@/content/content";
import { site } from "@/config/site";

const trustPoints = [
  { icon: ShieldCheck, title: "Erlaubnis nach AÜG", text: "Zugelassen durch die Bundesagentur für Arbeit" },
  { icon: UserCheck, title: "Geprüfte Fachkräfte", text: "Qualifikation & Zeugnisse sorgfältig geprüft" },
  { icon: PhoneCall, title: "Persönlich erreichbar", text: "Feste Ansprechpartner statt Callcenter" },
  { icon: MapPin, title: "Regional verwurzelt", text: "Zu Hause im Rhein-Main-Gebiet" },
];

// Senkt die Hemmschwelle direkt unter den Hero-Buttons (Aussagen aus den FAQ)
const heroFacts = ["Ohne Lebenslauf bewerben", "Vollzeit, Teilzeit oder Minijob", "Feste Anstellung"];

export default function Home() {
  const [leadBenefit, ...moreBenefits] = employeeBenefits;
  const wideBenefit = moreBenefits[moreBenefits.length - 1];
  const gridBenefits = moreBenefits.slice(0, -1);
  const standby = site.contact.hours[1];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sand">
        <BrandPattern className="absolute -bottom-24 -left-24 h-80 w-80 text-brand-600/[0.06]" />
        <Container className="relative grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-20 lg:pb-24 3xl:gap-24">
          <div className="animate-fade-up">
            <Eyebrow>
              Personaldienstleister Pflege<span className="hidden sm:inline"> · {site.region.join(" · ")}</span>
            </Eyebrow>
            <h1 className="mt-6 text-[2.6rem] leading-[1.05] font-semibold text-ink sm:text-6xl lg:text-[4.25rem]">
              Gute Pflege beginnt mit den <span className="text-brand-600">richtigen Menschen.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Wir bringen engagierte Pflegekräfte und Einrichtungen zusammen – zuverlässig, persönlich und mit
              echtem Verständnis für den Pflegealltag.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <Link
                href="/karriere"
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-brand-600 p-5 text-white shadow-xl shadow-brand-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-700 hover:shadow-2xl hover:shadow-brand-600/30"
              >
                <IconBadge tone="light">
                  <HeartPulse className="h-6 w-6" aria-hidden="true" />
                </IconBadge>
                <span className="flex-1">
                  <span className="block text-sm text-white/80">Ich bin Pflegekraft</span>
                  <span className="block font-display text-lg font-semibold">Job finden</span>
                </span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/fuer-einrichtungen"
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg shadow-black/5 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-ink/15"
              >
                <IconBadge>
                  <Building2 className="h-6 w-6" aria-hidden="true" />
                </IconBadge>
                <span className="flex-1">
                  <span className="block text-sm text-muted">Ich bin eine Einrichtung</span>
                  <span className="block font-display text-lg font-semibold">Personal anfragen</span>
                </span>
                <ArrowRight className="h-5 w-5 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink" aria-hidden="true" />
              </Link>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink-soft">
              {heroFacts.map((fact) => (
                <li key={fact} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-green-700" aria-hidden="true" strokeWidth={2.5} />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative animate-fade-up [animation-delay:150ms]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/15 lg:aspect-[4/4.4] 2xl:aspect-[4/3] 3xl:aspect-[16/10] 4xl:aspect-[21/9]">
              <Image
                src={asset("/images/team-haende.jpg")}
                alt="Pflegekräfte legen als Zeichen des Zusammenhalts die Hände übereinander"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[50%_60%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white p-4 pr-6 shadow-xl shadow-ink/10 sm:-left-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-green-50 text-green-700">
                <BadgeCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold">Rückmeldung in 48 h</span>
                <span className="block text-xs text-muted">auf jede Bewerbung &amp; Anfrage</span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Vertrauenspunkte */}
      <section aria-label="Warum Perfect Job" className="border-b border-line bg-white">
        <Container className="grid grid-cols-1 gap-x-8 gap-y-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="flex items-start gap-3.5">
              <p.icon className="mt-0.5 h-6 w-6 shrink-0 text-brand-600" aria-hidden="true" strokeWidth={1.75} />
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-0.5 text-sm text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Für Pflegekräfte – Bento-Raster: stärkstes Argument groß, Rest kompakt */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Für Pflegekräfte"
            title="Ein Arbeitgeber, der Ihnen den Rücken stärkt."
            intro="Bei uns stehen Sie im Mittelpunkt: faire Bezahlung, planbare Dienste und Menschen, die Ihnen zuhören."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            <Reveal className="relative flex flex-col overflow-hidden rounded-3xl bg-brand-600 p-7 text-white sm:col-span-2 sm:p-9 lg:row-span-2">
              <BrandPattern className="absolute -right-12 -bottom-12 h-64 w-64 text-white/10" />
              <IconBadge tone="light">
                <Icon name={leadBenefit.icon} />
              </IconBadge>
              <h3 className="mt-8 font-display text-3xl leading-tight font-semibold sm:text-4xl">{leadBenefit.title}</h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-white/85">{leadBenefit.text}</p>
              <ul className="relative mt-8 grid gap-3 sm:grid-cols-2">
                {payHighlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15">
                      <Check className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="relative mt-10 flex flex-wrap gap-3 lg:mt-auto lg:pt-10">
                <ButtonLink href="/karriere#stellen" variant="light" arrow>
                  Offene Stellen ansehen
                </ButtonLink>
              </div>
            </Reveal>
            {gridBenefits.map((b, i) => (
              <Reveal
                key={b.title}
                delay={(i % 2) * 90}
                className="group flex gap-4 rounded-3xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/[0.07] sm:flex-col sm:gap-0 sm:p-7"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={b.icon} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold sm:mt-6 sm:text-xl">{b.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted sm:mt-2">{b.text}</p>
                </div>
              </Reveal>
            ))}
            <Reveal className="flex flex-col gap-5 rounded-3xl bg-sand p-6 sm:col-span-2 sm:p-7 lg:col-span-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-brand-600 shadow-sm">
                  <Icon name={wideBenefit.icon} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold sm:text-xl">{wideBenefit.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{wideBenefit.text}</p>
                </div>
              </div>
              <ul className="hidden flex-wrap gap-2 sm:flex">
                {site.region.map((city) => (
                  <li
                    key={city}
                    className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-line"
                  >
                    <MapPin className="h-4 w-4 text-brand-600" aria-hidden="true" />
                    {city}
                  </li>
                ))}
                <li className="rounded-full px-3 py-2 text-sm text-muted">und Umgebung</li>
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Offene Stellen – direkt auf der Startseite statt erst auf der Karriereseite */}
      <section className="bg-sand py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Offene Stellen"
              title="Finden Sie Ihre Position."
              intro="Wählen Sie Ihre Qualifikation – die Bewerbung dauert keine zwei Minuten."
            />
            <Reveal>
              <Link
                href="/karriere#stellen"
                className="group inline-flex items-center gap-2 font-semibold text-brand-700 underline-offset-4 hover:underline"
              >
                Alle Details zu den Stellen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {jobs.map((job, i) => (
              <Reveal
                key={job.slug}
                as="article"
                delay={i * 90}
                className="group relative flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/[0.06] sm:p-7"
              >
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-700">Vollzeit / Teilzeit</span>
                  <span className="flex items-center gap-1 rounded-full bg-sand px-3 py-1 text-ink-soft">
                    <MapPin className="h-3 w-3" aria-hidden="true" /> Rhein-Main
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold sm:text-2xl">{job.title}</h3>
                <p className="mt-1.5 mb-7 text-muted">{job.short}</p>
                <Link
                  href={`/karriere?stelle=${job.slug}#bewerben`}
                  className="mt-auto inline-flex items-center justify-between gap-2 rounded-full bg-ink py-3 pr-4 pl-6 font-semibold text-white transition-colors duration-200 group-hover:bg-brand-600 after:absolute after:inset-0 after:rounded-3xl"
                >
                  Jetzt bewerben
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
            <Reveal
              delay={jobs.length * 90}
              className="flex flex-col justify-center rounded-3xl border border-dashed border-ink/20 p-6 sm:p-7"
            >
              <p className="font-display text-xl font-semibold">Nichts Passendes dabei?</p>
              <p className="mt-1.5 text-muted">Bewerben Sie sich initiativ – wir finden gemeinsam den richtigen Einsatz.</p>
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

      {/* Für Einrichtungen */}
      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
        <BrandPattern className="absolute -bottom-28 -left-28 h-[26rem] w-[26rem] text-white/[0.04]" />
        <Container className="relative grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20 3xl:grid-cols-[1fr_2fr]">
          <Reveal>
            <Eyebrow light>Für Einrichtungen</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Wenn Personal fehlt, sind wir da.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Krankheitswelle, Urlaubszeit oder dauerhafter Fachkräftemangel: Wir unterstützen Pflegeeinrichtungen,
              Kliniken und Pflegedienste mit qualifiziertem Personal – kurzfristig oder langfristig.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {clientTypes.map((c) => (
                <li key={c.title} className="flex items-center gap-2 rounded-full bg-white/[0.07] px-4 py-2 text-sm ring-1 ring-white/10">
                  <Icon name={c.icon} className="h-4 w-4 text-brand-500" />
                  {c.title}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/fuer-einrichtungen#anfrage" arrow>
                Personal anfragen
              </ButtonLink>
              <ButtonLink href="/fuer-einrichtungen" variant="ghost-light">
                Mehr erfahren
              </ButtonLink>
            </div>
          </Reveal>
          <div className="grid gap-4 3xl:grid-cols-3">
            {clientServices.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 110}
                className="flex gap-5 rounded-3xl bg-white/[0.05] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.08] sm:p-7"
              >
                <IconBadge tone="light">
                  <Icon name={s.icon} />
                </IconBadge>
                <div>
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/65">{s.text}</p>
                </div>
              </Reveal>
            ))}
            {/* Bei kurzfristigem Ausfall zählt der direkte Draht – Telefonnummer statt Formular */}
            <Reveal delay={clientServices.length * 110} className="3xl:col-span-3">
              <a
                href={site.contact.phoneHref}
                className="group flex items-center gap-4 rounded-3xl bg-brand-600 p-5 transition-colors duration-300 hover:bg-brand-700 sm:gap-5 sm:p-7"
              >
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-brand-600">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 ring-2 ring-brand-600 motion-safe:animate-pulse" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm text-white/80">
                    Kurzfristiger Ausfall? {standby.days} {standby.time}
                  </span>
                  <span className="block font-display text-2xl font-semibold">{site.contact.phone}</span>
                </span>
                <ArrowRight className="hidden h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 sm:block" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Ablauf – umschaltbar für beide Zielgruppen */}
      <section className="bg-sand py-20 sm:py-28">
        <Container>
          <ProcessTabs />
        </Container>
      </section>

      <Faq items={[...faqs.applicants.slice(0, 3), ...faqs.clients.slice(0, 2)]} />

      <ContactBand />
    </>
  );
}
