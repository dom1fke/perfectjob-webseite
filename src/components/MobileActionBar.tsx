"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone, Send } from "lucide-react";
import { site } from "@/config/site";

/** Schnellzugriff auf dem Handy: Anrufen & Bewerben – erscheint nach kurzem Scrollen. */
export function MobileActionBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/impressum" || pathname === "/datenschutz") return null;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-2 gap-2">
        <a
          href={site.contact.phoneHref}
          tabIndex={visible ? 0 : -1}
          className="flex items-center justify-center gap-2 rounded-full border border-ink/15 py-3 text-sm font-semibold text-ink active:bg-sand"
        >
          <Phone className="h-4 w-4" aria-hidden="true" /> Anrufen
        </a>
        <Link
          href="/karriere#bewerben"
          tabIndex={visible ? 0 : -1}
          className="flex items-center justify-center gap-2 rounded-full bg-brand-600 py-3 text-sm font-semibold text-white active:bg-brand-700"
        >
          <Send className="h-4 w-4" aria-hidden="true" /> Bewerben
        </Link>
      </div>
    </div>
  );
}
