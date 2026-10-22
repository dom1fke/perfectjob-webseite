import { ChevronDown, Mail, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { BrandPattern, ButtonLink, Container, SectionHeading } from "./ui";
import { site } from "@/config/site";

/** Nummerierte Ablaufschritte */
export function ProcessSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="relative grid gap-6 md:grid-cols-3 md:gap-8">
      <span
        aria-hidden="true"
        className="absolute top-7 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-brand-200 via-brand-600/40 to-brand-200 md:block"
      />
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 120} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
          <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white font-display text-xl font-semibold text-brand-600 shadow-[0_0_0_6px_var(--color-sand),0_8px_20px_-8px_rgb(211_11_17/0.35)] ring-1 ring-brand-200">
            {i + 1}
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function Faq({ items, title = "Häufige Fragen" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="FAQ" title={title} />
          <Reveal className="mt-6 text-muted">
            Ihre Frage ist nicht dabei?{" "}
            <a href={site.contact.phoneHref} className="font-semibold text-brand-700 underline-offset-4 hover:underline">
              Rufen Sie uns einfach an.
            </a>
          </Reveal>
        </div>
        <Reveal className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <details key={item.q} className="faq-item group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium transition-colors hover:text-brand-700">
                {item.q}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sand transition-all duration-300 group-open:rotate-180 group-open:bg-brand-600 group-open:text-white">
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/** Abschluss-Band mit Kontaktmöglichkeiten */
export function ContactBand({
  title = "Lassen Sie uns sprechen.",
  text = "Ob Sie einen neuen Job suchen oder Personal für Ihre Einrichtung brauchen – wir sind persönlich für Sie da.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-600 text-white">
        <BrandPattern className="absolute -top-16 -right-16 h-72 w-72 text-white/10" />
        <Container className="relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">{text}</p>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch xl:flex-row">
            <a
              href={site.contact.phoneHref}
              className="group flex flex-1 items-center gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 transition-colors hover:bg-white/15"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand-600">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-white/75">Rufen Sie uns an</span>
                <span className="font-semibold whitespace-nowrap">{site.contact.phone}</span>
              </span>
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="group flex flex-1 items-center gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 transition-colors hover:bg-white/15"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand-600">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-white/75">Schreiben Sie uns</span>
                <span className="block truncate font-semibold">{site.contact.email}</span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={200} className="lg:col-span-2">
            <ButtonLink href="/kontakt" variant="light" arrow>
              Zum Kontaktformular
            </ButtonLink>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
