import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2.5 text-xs font-semibold tracking-[0.16em] uppercase ${
        light ? "text-white/80" : "text-brand-700"
      }`}
    >
      <span aria-hidden="true" className={`h-0.5 w-6 rounded-full ${light ? "bg-white/70" : "bg-brand-600"}`} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  id?: string;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center [&_p:first-child]:justify-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="mt-4 text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}

type ButtonVariant = "primary" | "secondary" | "light" | "ghost-light";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 hover:shadow-brand-600/35",
  secondary: "bg-white text-ink ring-1 ring-ink/12 hover:ring-ink/25 hover:bg-sand",
  light: "bg-white text-brand-700 shadow-lg shadow-black/10 hover:bg-brand-50",
  "ghost-light": "text-white ring-1 ring-white/40 hover:bg-white/10 hover:ring-white/70",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
  ...rest
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; arrow?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${buttonStyles[variant]} ${className}`}
      {...rest}
    >
      {children}
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

/** Kopfbereich für Unterseiten */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-sand">
      <BrandPattern className="absolute -top-24 -right-24 h-96 w-96 text-brand-600/[0.07] sm:h-[32rem] sm:w-[32rem]" />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl animate-fade-up">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl leading-[1.08] font-semibold text-ink sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{intro}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}

/** Dekoratives Muster aus dem Logo-Unterstrich */
export function BrandPattern({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className} fill="currentColor">
      {Array.from({ length: 9 }).map((_, row) =>
        Array.from({ length: 9 }).map((_, col) => (
          <rect key={`${row}-${col}`} x={col * 22 + 4} y={row * 22 + 9} width="14" height="4" rx="2" />
        )),
      )}
    </svg>
  );
}

export function IconBadge({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "light" }) {
  return (
    <span
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
        tone === "brand" ? "bg-brand-50 text-brand-600" : "bg-white/15 text-white"
      }`}
    >
      {children}
    </span>
  );
}
