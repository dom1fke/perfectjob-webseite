import Image from "next/image";
import { asset } from "@/lib/paths";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, HeartPulse, MapPin, PhoneCall, ShieldCheck, UserCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { BrandPattern, ButtonLink, Container, Eyebrow, IconBadge, SectionHeading } from "@/components/ui";
import { ContactBand, Faq, ProcessSteps } from "@/components/sections";
import { clientServices, clientTypes, employeeBenefits, faqs, processSteps } from "@/content/content";
import { site } from "@/config/site";

const trustPoints = [
  { icon: ShieldCheck, title: "Erlaubnis nach AÜG", text: "Zugelassen durch die Bundesagentur für Arbeit" },
  { icon: UserCheck, title: "Geprüfte Fachkräfte", text: "Qualifikation & Zeugnisse sorgfältig geprüft" },
  { icon: PhoneCall, title: "Persönlich erreichbar", text: "Feste Ansprechpartner statt Callcenter" },
  { icon: MapPin, title: "Regional verwurzelt", text: "Zu Hause im Rhein-Main-Gebiet" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sand">
        <BrandPattern className="absolute -bottom-24 -left-24 h-80 w-80 text-brand-600/[0.06]" />
        <Container className="relative grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-20 lg:pb-24">
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
                  <span className="block text-sm text-muted">Ich bin Einrichtung</span>
                  <span className="block font-display text-lg font-semibold">Personal anfragen</span>
                </span>
                <ArrowRight className="h-5 w-5 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:150ms]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/15 lg:aspect-[4/4.4]">
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

      {/* Für Pflegekräfte */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Für Pflegekräfte"
              title="Ein Arbeitgeber, der Ihnen den Rücken stärkt."
              intro="Bei uns stehen Sie im Mittelpunkt: faire Bezahlung, planbare Dienste und Menschen, die Ihnen zuhören."
            />
            <Reveal>
              <ButtonLink href="/karriere" arrow>
                Offene Stellen ansehen
              </ButtonLink>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {employeeBenefits.map((b, i) => (
              <Reveal
                key={b.title}
                delay={(i % 3) * 90}
                className="group rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/[0.07]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={b.icon} />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Für Einrichtungen */}
      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
        <BrandPattern className="absolute -bottom-28 -left-28 h-[26rem] w-[26rem] text-white/[0.04]" />
        <Container className="relative grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
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
          <div className="grid gap-4">
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
          </div>
        </Container>
      </section>

      {/* Ablauf */}
      <section className="bg-sand py-20 sm:py-28">
        <Container>
          <SectionHeading
            center
            eyebrow="So einfach geht's"
            title="In drei Schritten zum neuen Job"
            intro="Unkompliziert, schnell und ohne Papierkram-Marathon."
          />
          <div className="mt-16">
            <ProcessSteps steps={processSteps.applicants} />
          </div>
          <Reveal className="mt-14 flex justify-center">
            <ButtonLink href="/karriere#bewerben" arrow>
              Jetzt in 2 Minuten bewerben
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      <Faq items={[...faqs.applicants.slice(0, 3), ...faqs.clients.slice(0, 2)]} />

      <ContactBand />
    </>
  );
}
