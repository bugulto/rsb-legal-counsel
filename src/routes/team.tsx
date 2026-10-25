import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Reveal, TeamPhoto, CtaBand } from "@/components/site/layout";
import { team } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/team")({
  head: () =>
    seo(
      "Our Team",
      "Meet the advocates and legal professionals of RSB Legal Associates & Consultants, Mumbai.",
    ),
  component: Team,
});

function Team() {
  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="Advocates working across advisory, drafting and litigation."
        intro="The firm is supported by a team of advocates and legal professionals working across advisory, drafting, litigation and dispute resolution."
      />
      <section className="py-24 md:py-32">
        <div className="container-site space-y-24">
          {team.map((m, i) => (
            <Reveal key={m.slug}>
              <article
                id={m.slug}
                className="grid scroll-mt-28 items-center gap-10 md:grid-cols-12"
              >
                <div className={`md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
                  <div className="relative">
                    <div
                      className="absolute -bottom-4 -right-4 h-full w-full border border-gold/50"
                      aria-hidden
                    />
                    <TeamPhoto
                      name={m.name}
                      photo={m.photo}
                      className="relative aspect-[4/5] w-full"
                    />
                  </div>
                </div>
                <div
                  className={`md:col-span-6 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}
                >
                  <p className="eyebrow">{m.role}</p>
                  <h2 className="mt-4 text-4xl md:text-5xl">{m.name}</h2>
                  <span className="gold-rule mt-6" />
                  <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{m.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
