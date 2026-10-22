import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-28 text-center sm:py-36">
      <p className="font-display text-8xl font-semibold text-brand-600">404</p>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Diese Seite gibt es leider nicht.</h1>
      <p className="mt-4 max-w-md text-lg text-muted">
        Vielleicht hat sich die Adresse geändert. Auf der Startseite finden Sie alles Wichtige.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" arrow>
          Zur Startseite
        </ButtonLink>
        <ButtonLink href="/kontakt" variant="secondary">
          Kontakt
        </ButtonLink>
      </div>
    </Container>
  );
}
