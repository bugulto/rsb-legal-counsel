import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Reveal, CtaBand } from "@/components/site/layout";
import { approach } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/approach")({
  head: () => seo("Our Approach", "The four-stage client approach of RSB Legal Associates & Consultants: consultation, assessment, strategy and ongoing support."),
  component: Approach,
});

function Approach() {
  return (
    <>
      <PageHeader eyebrow="Our Approach" title="The four-stage client approach." intro="A structured, client-focused approach ensuring each matter is addressed with due consideration to the client's specific circumstances, objectives and legal requirements." />
      <section className="py-24 md:py-32">
        <ol className="container-site relative max-w-4xl">
          <span className="absolute bottom-0 left-[2.65rem] top-0 w-px bg-gold/40 md:left-[3.15rem]" aria-hidden />
          {approach.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <li className="relative grid grid-cols-[3.5rem_1fr] gap-6 pb-16 md:grid-cols-[4.5rem_1fr] md:gap-10">
                <span className="relative z-10 grid h-14 w-14 place-items-center border border-gold bg-background font-serif text-2xl text-primary md:h-[4.5rem] md:w-[4.5rem] md:text-3xl">{i + 1}</span>
                <div className="pt-2">
                  <p className="eyebrow">Stage {i + 1}</p>
                  <h2 className="mt-3 text-3xl md:text-4xl">{a.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{a.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
      <CtaBand />
    </>
  );
}
