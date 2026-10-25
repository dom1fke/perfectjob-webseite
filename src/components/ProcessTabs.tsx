"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Building2, HeartPulse } from "lucide-react";
import { ProcessSteps } from "./sections";
import { ButtonLink, Eyebrow } from "./ui";
import { processSteps } from "@/content/content";

const tabs = [
  {
    id: "pflegekraefte",
    prefix: "Ich bin ",
    label: "Pflegekraft",
    icon: HeartPulse,
    title: "In drei Schritten zum neuen Job",
    intro: "Unkompliziert, schnell und ohne Papierkram-Marathon.",
    steps: processSteps.applicants,
    cta: { href: "/karriere#bewerben", label: "Jetzt in 2 Minuten bewerben" },
  },
  {
    id: "einrichtungen",
    prefix: "Ich bin eine ",
    label: "Einrichtung",
    icon: Building2,
    title: "In drei Schritten zu Ihrer Verstärkung",
    intro: "Ein Anruf genügt – den Rest organisieren wir.",
    steps: processSteps.clients,
    cta: { href: "/fuer-einrichtungen#anfrage", label: "Personal anfragen" },
  },
] as const;

/** Ablauf mit Umschalter zwischen Pflegekräften und Einrichtungen (ARIA-Tabs). */
export function ProcessTabs() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Eyebrow>So einfach geht&apos;s</Eyebrow>
        </div>
        <div
          role="tablist"
          aria-label="Ablauf für"
          onKeyDown={onKey}
          className="mx-auto mt-6 inline-grid grid-cols-2 gap-1 rounded-full bg-white p-1.5 shadow-sm ring-1 ring-line"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={active === i}
              aria-controls={`panel-${tab.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={`flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-200 sm:px-6 ${
                active === i ? "bg-brand-600 text-white shadow-md shadow-brand-600/25" : "text-ink-soft hover:bg-sand"
              }`}
            >
              <tab.icon className="h-4 w-4" aria-hidden="true" />
              <span>
                <span className="hidden sm:inline">{tab.prefix}</span>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={active !== i}
        >
          <div className="mx-auto mt-8 max-w-2xl animate-fade-up text-center">
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {tab.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{tab.intro}</p>
          </div>
          <div className="mt-16">
            <ProcessSteps steps={tab.steps} />
          </div>
          <div className="mt-14 flex justify-center">
            <ButtonLink href={tab.cta.href} arrow>
              {tab.cta.label}
            </ButtonLink>
          </div>
        </div>
      ))}
    </div>
  );
}
