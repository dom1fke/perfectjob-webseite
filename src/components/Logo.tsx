import Link from "next/link";

/** Bildmarke: rotes Quadrat mit „PJ“ und Unterstrich – nachgebaut aus dem Originallogo. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <rect width="48" height="48" fill="#d30b11" />
      <g fill="#fff" fillRule="evenodd">
        <path d="M11 11h7.6a6 6 0 0 1 0 12H15.6v7H11Z M15.6 15.2v3.6h2.9a1.8 1.8 0 0 0 0-3.6Z" />
        <path d="M32.4 11H37v13.4a5.6 5.6 0 0 1-5.6 5.6h-5v-4.3h4.4a1.6 1.6 0 0 0 1.6-1.6Z" />
        <rect x="11" y="34.5" width="26" height="3.6" />
      </g>
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-md"
      aria-label="Perfect Job – zur Startseite"
    >
      <LogoMark className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:scale-[1.04] sm:h-11 sm:w-11" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.35rem] font-normal tracking-[0.08em] sm:text-[1.5rem] ${
            inverted ? "text-white" : "text-ink-soft"
          }`}
        >
          PERFECT JOB
        </span>
        <span
          className={`mt-1 text-[0.52rem] font-semibold tracking-[0.12em] sm:text-[0.58rem] ${
            inverted ? "text-white/75" : "text-muted"
          }`}
        >
          PERSONAL- UND PFLEGEDIENSTLEISTER
        </span>
      </span>
    </Link>
  );
}
