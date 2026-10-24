"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { nav, site } from "@/config/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü bei Seitenwechsel schließen
  useEffect(() => setOpen(false), [pathname]);

  // Scroll sperren und Escape-Taste im offenen Mobilmenü
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled || open
            ? "bg-white/90 shadow-[0_1px_0_var(--color-line),0_8px_24px_-12px_rgb(0_0_0/0.12)] backdrop-blur-md"
            : "bg-white"
        }`}
      >
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <div
          className={`mx-auto flex max-w-site items-center justify-between gap-6 px-4 sm:px-6 lg:px-10 2xl:px-16 transition-[height] duration-300 ${
            scrolled ? "h-16 lg:h-[4.5rem]" : "h-[4.5rem] lg:h-20"
          }`}
        >
          <Logo />

          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors duration-200 ${
                      isActive(item.href) ? "text-brand-700" : "text-ink-soft hover:bg-sand hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand-600 transition-transform duration-300 ${
                        isActive(item.href) ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={site.contact.phoneHref}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-brand-700"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.contact.phone}
            </a>
            <Link
              href="/karriere#bewerben"
              className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/30 transition-all duration-200 hover:-translate-y-px hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/30 active:translate-y-0"
            >
              Jetzt bewerben
            </Link>
          </div>

          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-sand lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobilmenü – bewusst außerhalb von <header>: dessen backdrop-filter würde
          „fixed“ sonst auf die Kopfzeile beziehen und das Menü auf 0 px Höhe schrumpfen. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden"
        style={{ top: scrolled ? "4rem" : "4.5rem" }}
      >
        <nav aria-label="Mobile Navigation" className="px-4 pt-4 pb-10">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href} className="animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex items-center justify-between border-b border-line py-4 font-display text-2xl ${
                    isActive(item.href) ? "text-brand-700" : "text-ink"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && <span className="h-2 w-2 rounded-full bg-brand-600" aria-hidden="true" />}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link
              href="/karriere#bewerben"
              className="rounded-full bg-brand-600 px-6 py-4 text-center font-semibold text-white"
            >
              Jetzt bewerben
            </Link>
            <a
              href={site.contact.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-line px-6 py-4 font-semibold text-ink"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.contact.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
