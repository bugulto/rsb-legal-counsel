import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader, Reveal, SectionTitle, CtaBand } from "@/components/site/layout";
import { intro, mission, vision, strengths, values, courtroomModel } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About the Firm", "History, mission, vision and core strengths of RSB Legal Associates & Consultants, established in 2023 in Mumbai."),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader eyebrow="About Us" title="A legal practice built on dedication and fairness." intro="Established in 2023, RSB Legal Associates & Consultants serves individual clients and corporate entities across Mumbai." />
      <section className="py-24 md:py-32">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><SectionTitle eyebrow="Our Story" title="Who we are." /></Reveal>
          <Reveal delay={100} className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-8">
            {intro.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          </Reveal>
        </div>
      </section>
      <section className="bg-card py-24">
        <div className="container-site"><div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {[{ k: "Mission", v: mission }, { k: "Vision", v: vision }].map((x, i) => (
            <Reveal key={x.k} delay={i * 100} className="bg-card p-10 md:p-16">
              <p className="eyebrow">Our {x.k}</p>
              <p className="mt-6 font-serif text-3xl leading-snug text-primary">{x.v}</p>
            </Reveal>
          ))}
        </div></div>
      </section>
      <section className="py-24 md:py-32">
        <div className="container-site grid gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionTitle eyebrow="Core Strengths" title="What the firm offers." />
            <ul className="mt-10 space-y-5">
              {strengths.map((s) => <li key={s} className="flex gap-4"><Check className="mt-1 h-5 w-5 shrink-0 text-gold" /><span className="leading-relaxed">{s}</span></li>)}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <SectionTitle eyebrow="Values & Approach" title="Our professional foundation." />
            <div className="mt-10 flex flex-wrap gap-3">
              {values.map((v) => <span key={v} className="border border-gold/60 px-5 py-3 font-serif text-xl text-primary">{v}</span>)}
            </div>
            <p className="mt-8 leading-relaxed text-muted-foreground">With an emphasis on understanding each client's specific circumstances, objectives and challenges, the firm strives to build lasting professional relationships and provide reliable legal support.</p>
          </Reveal>
        </div>
      </section>
      <section className="hero-pattern py-24">
        <div className="container-site">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Advisory + Litigation</p>
            <h2 className="mt-4 text-4xl text-on-navy! md:text-5xl">Bridging legal advisory and courtroom representation.</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {courtroomModel.map((m, i) => (
              <Reveal key={m.title} delay={i * 80} className="border-l border-gold/50 pl-6">
                <h3 className="text-2xl text-on-navy!">{m.title}</h3>
                <p className="mt-3 text-on-navy-muted">{m.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
