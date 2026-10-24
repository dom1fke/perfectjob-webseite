import Link from "next/link";
import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { Logo } from "./Logo";
import { CookieSettingsLink } from "./consent/CookieBanner";
import { nav, site } from "@/config/site";

export function Footer() {
  const { contact } = site;
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto grid max-w-site gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <Logo inverted />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/65">
            Ihr Partner für Pflegepersonal in {site.region.join(", ")} und Umgebung – zuverlässig,
            persönlich und fair.
          </p>
        </div>

        <nav aria-label="Seiten">
          <h2 className="text-xs font-semibold tracking-[0.14em] text-white/50 uppercase">Seiten</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.14em] text-white/50 uppercase">Rechtliches</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/impressum" className="transition-colors hover:text-white">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="transition-colors hover:text-white">
                Datenschutz
              </Link>
            </li>
            <li>
              <CookieSettingsLink className="transition-colors hover:text-white" />
            </li>
          </ul>
        </div>

        <address className="not-italic">
          <h2 className="text-xs font-semibold tracking-[0.14em] text-white/50 uppercase">Kontakt</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
              <span>
                {contact.street}
                <br />
                {contact.zip} {contact.city}
              </span>
            </li>
            <li>
              <a href={contact.phoneHref} className="flex gap-3 transition-colors hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.mobileHref} className="flex gap-3 transition-colors hover:text-white">
                <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                {contact.mobile}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex gap-3 transition-colors hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
          </ul>
        </address>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-site flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {site.name}. Alle Rechte vorbehalten.</p>
          <p>Personaldienstleistung in der Pflege · {site.region.join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
