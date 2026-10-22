import { Container } from "@/components/ui";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-16 sm:py-24">
      <article
        className="mx-auto max-w-3xl text-ink-soft [&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-2 [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:text-ink sm:[&_h1]:text-5xl [&_h2]:mt-12 [&_h2]:scroll-mt-28 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mt-1.5 [&_p]:mt-4 [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6"
      >
        {children}
      </article>
    </Container>
  );
}
