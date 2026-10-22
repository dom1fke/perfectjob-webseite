import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone, Smartphone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Container, PageHero } from "@/components/ui";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontakt zu ${site.name} in Mainz: Telefon ${site.contact.phone}, E-Mail ${site.contact.email}. Wir beraten Pflegekräfte und Einrichtungen persönlich.`,
};

export default function KontaktPage() {
  const { contact } = site;
  const channels = [
    { icon: Phone, label: "Telefon (Büro)", value: contact.phone, href: contact.phoneHref },
    { icon: Smartphone, label: "Mobil", value: contact.mobile, href: contact.mobileHref },
    { icon: MessageCircle, label: "WhatsApp", value: "Nachricht schreiben", href: contact.whatsappHref, external: true },
    { icon: Mail, label: "E-Mail", value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title={
          <>
            Wir freuen uns auf <span className="text-brand-600">Ihre Nachricht.</span>
          </>
        }
        intro="Ob Bewerbung, Personalanfrage oder einfach eine Frage – wir sind persönlich für Sie da und melden uns schnell zurück."
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div className="space-y-4">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 70}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-line p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/[0.06]"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-200 group-hover:bg-brand-600 group-hover:text-white">
                    <c.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{c.label}</span>
                    <span className="block truncate font-semibold">{c.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal delay={280} className="grid gap-4 rounded-2xl bg-sand p-5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="flex gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <address className="not-italic">
                  <span className="block font-semibold">{site.name}</span>
                  {contact.street}
                  <br />
                  {contact.zip} {contact.city}
                </address>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                  {contact.hours.map((h) => (
                    <div key={h.days} className="contents">
                      <dt className="font-semibold">{h.days}</dt>
                      <dd className="text-muted">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          <Reveal className="rounded-[2rem] bg-white p-6 shadow-xl shadow-ink/[0.05] ring-1 ring-line sm:p-10">
            <h2 className="font-display text-2xl font-semibold">Schreiben Sie uns</h2>
            <p className="mt-1 mb-8 text-muted">Felder mit * sind Pflichtfelder.</p>
            <ContactForm />
          </Reveal>
        </Container>
      </section>

      <section aria-label="Anfahrt" className="px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="h-96 overflow-hidden rounded-[2rem] ring-1 ring-line">
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
