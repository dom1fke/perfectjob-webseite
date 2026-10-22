"use client";

import { MapPin } from "lucide-react";
import { useConsent } from "./consent/ConsentProvider";
import { site } from "@/config/site";

/** Zwei-Klick-Lösung: Die OpenStreetMap-Karte wird erst nach Einwilligung geladen. */
export function MapEmbed() {
  const { consent, ready, save } = useConsent();
  const { lat, lon } = site.contact.geo;
  const d = 0.006;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d}%2C${lat - d / 2}%2C${lon + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lon}`;
  const address = `${site.contact.street}, ${site.contact.zip} ${site.contact.city}`;

  if (ready && consent?.externalMedia) {
    return (
      <iframe
        title={`Karte: ${address}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="h-full min-h-80 w-full border-0"
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-80 flex-col items-center justify-center gap-4 overflow-hidden bg-sand p-8 text-center">
      {/* dekoratives Straßenraster */}
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.35]" preserveAspectRatio="none">
        <defs>
          <pattern id="map-grid" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
            <path d="M0 28h56M28 0v56" stroke="#d8d0c8" strokeWidth="6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
      </svg>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30">
        <MapPin className="h-6 w-6" aria-hidden="true" />
      </span>
      <div className="relative max-w-sm">
        <p className="font-semibold">{address}</p>
        <p className="mt-2 text-sm text-muted">
          Mit dem Laden der Karte wird Ihre IP-Adresse an OpenStreetMap übermittelt.
        </p>
      </div>
      <div className="relative flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => save({ ...(consent ?? {}), externalMedia: true })}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
        >
          Karte laden
        </button>
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-sand"
        >
          In neuem Tab öffnen
        </a>
      </div>
    </div>
  );
}
