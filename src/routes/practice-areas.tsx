import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Reveal, CtaBand } from "@/components/site/layout";
import { practiceAreas } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/practice-areas")({
  head: () => seo("Practice Areas", "Corporate, contracts, litigation, arbitration, real estate, employment and family law services by RSB Legal Associates & Consultants, Mumbai."),
  component: Practice,
});

function Practice() {
  return (
    <>
      <PageHeader eyebrow="Practice Areas" title="Legal services across advisory and litigation." intro="Comprehensive legal assistance for individuals, families, entrepreneurs, start-ups and corporate organisations." />
      <nav aria-label="Practice areas" className="sticky top-20 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-site flex gap-6 overflow-x-auto py-4 text-sm">
          {practiceAreas.map((p) => <a key={p.slug} href={`#${p.slug}`} className="link-gold shrink-0 whitespace-nowrap text-muted-foreground hover:text-primary">{p.title}</a>)}
        </div>
      </nav>
      <section className="py-16 md:py-24">
        <div className="container-site divide-y divide-border">
          {practiceAreas.map((p, i) => (
            <Reveal key={p.slug}>
              <article id={p.slug} className="grid scroll-mt-40 gap-8 py-14 md:grid-cols-12">
                <span className="font-serif text-6xl text-gold/70 md:col-span-2">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-3xl leading-tight md:col-span-4 md:text-4xl">{p.title}</h2>
                <p className="text-lg leading-relaxed text-muted-foreground md:col-span-6">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
