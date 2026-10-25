import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { Reveal, SectionTitle, TeamPhoto, CtaBand } from "@/components/site/layout";
import {
  firm,
  intro,
  strengths,
  practiceAreas,
  courtroomModel,
  team,
  approach,
  offices,
  consultation,
} from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "Advocates & Legal Consultants in Mumbai",
      "RSB Legal Associates & Consultants — integrated corporate advisory and courtroom representation in Mumbai. Equity, Fairness, Justice.",
    ),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="hero-pattern">
        <div className="container-site grid items-center gap-16 py-24 md:py-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Established {firm.established} · Mumbai</p>
            <h1 className="mt-6 text-5xl leading-[1.02] text-on-navy! md:text-7xl">
              RSB Legal Associates <span className="italic text-gold">&</span> Consultants
            </h1>
            <p className="mt-6 font-serif text-2xl italic text-gold md:text-3xl">{firm.tagline}</p>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-on-navy-muted">
              Practical, responsive and solution-oriented legal services for individuals and
              corporate entities — from the corporate office to the courtroom.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/consultation" className="btn-primary">
                Request a Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/practice-areas" className="btn-outline-light">
                Practice Areas
              </Link>
            </div>
          </Reveal>
          <Reveal delay={200} className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 border border-gold/40" aria-hidden />
              <img
                src={logo}
                alt="RSB Legal Associates and Consultants logo"
                width={640}
                height={641}
                fetchPriority="high"
                className="relative w-full bg-card"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionTitle
              eyebrow="The Firm"
              title="Coordinated legal support for individuals and businesses."
            />
          </Reveal>
          <Reveal
            delay={100}
            className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-7"
          >
            <p>{intro[0]}</p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary link-gold"
            >
              About the firm <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="container-site mt-20">
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {strengths.map((s, i) => (
              <Reveal key={s} delay={i * 80} className="bg-background p-8">
                <span className="font-serif text-3xl text-gold-ink">0{i + 1}</span>
                <p className="mt-4 text-sm leading-relaxed">{s}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-24 md:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Reveal>
              <SectionTitle eyebrow="Practice Areas" title="Seven areas of practice." />
            </Reveal>
            <Link to="/practice-areas" className="btn-outline self-start text-primary md:self-auto">
              View all
            </Link>
          </div>
          <div className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((p, i) => {
              const fullRow = i === practiceAreas.length - 1;
              return (
                <Reveal
                  key={p.slug}
                  delay={(i % 3) * 80}
                  className={`bg-card ${fullRow ? "md:col-span-2 lg:col-span-3" : ""}`}
                >
                  <Link
                    to="/practice-areas"
                    hash={p.slug}
                    className={`group block h-full p-8 transition-colors hover:bg-ivory focus-visible:bg-ivory md:p-10 ${fullRow ? "md:grid md:grid-cols-[2rem_1fr_1fr_auto] md:items-start md:gap-6" : ""}`}
                  >
                    <span className="text-xs tracking-[0.2em] text-gold-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className={`mt-4 text-2xl leading-snug ${fullRow ? "md:mt-0" : ""}`}>
                      {p.title}
                    </h3>
                    <p
                      className={`mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground ${fullRow ? "md:mt-0 md:line-clamp-none" : ""}`}
                    >
                      {p.text}
                    </p>
                    <ArrowRight
                      aria-hidden="true"
                      className={`mt-6 h-4 w-4 text-gold transition-transform group-hover:translate-x-1 ${fullRow ? "md:mt-1" : ""}`}
                    />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="hero-pattern py-24 md:py-32">
        <div className="container-site">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Our distinguishing model</p>
            <h2 className="mt-4 text-4xl text-on-navy! md:text-6xl">
              Corporate office <span className="italic text-gold">to</span> courtroom.
            </h2>
            <p className="mt-6 text-lg text-on-navy-muted">
              A coordinated legal support model that bridges advisory and litigation.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {courtroomModel.map((m, i) => (
              <Reveal key={m.title} delay={i * 100} className="border-t border-gold/50 pt-6">
                <h3 className="text-2xl text-on-navy!">{m.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-on-navy-muted">{m.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Reveal>
              <SectionTitle eyebrow="Our Team" title="Advocates and legal professionals." />
            </Reveal>
            <Link to="/team" className="btn-outline self-start text-primary md:self-auto">
              Meet the team
            </Link>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.slice(0, 4).map((m, i) => (
              <Reveal key={m.slug} delay={i * 80}>
                <Link to="/team" hash={m.slug} className="group block">
                  <div className="overflow-hidden">
                    <TeamPhoto
                      name={m.name}
                      photo={m.photo}
                      className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-5 text-xl">{m.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold-ink">{m.role}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-24 md:py-32">
        <div className="container-site">
          <Reveal>
            <SectionTitle eyebrow="Our Approach" title="The four-stage client approach." />
          </Reveal>
          <ol className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
            {approach.map((a, i) => (
              <li key={a.title} className="bg-card p-8">
                <Reveal delay={i * 80}>
                  <span className="font-serif text-6xl text-gold/70">{i + 1}</span>
                  <h3 className="mt-4 text-2xl">{a.title}</h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                    {a.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
          <Link
            to="/approach"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary link-gold"
          >
            Read the full approach <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-site grid gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionTitle eyebrow="Consultations" title="By prior appointment." />
            <dl className="mt-10 divide-y divide-border border-y border-border">
              {consultation.slice(0, 4).map((c) => (
                <div key={c.k} className="grid gap-1 py-4 text-sm sm:grid-cols-[8rem_1fr] sm:gap-4">
                  <dt className="font-semibold text-primary">{c.k}</dt>
                  <dd className="text-muted-foreground">{c.v}</dd>
                </div>
              ))}
            </dl>
            <Link to="/consultation" className="btn-outline mt-10 text-primary">
              Consultation details
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <SectionTitle eyebrow="Offices" title="Two offices in Mumbai." />
            <div className="mt-10 space-y-6">
              {offices.map((o) => (
                <div key={o.label} className="flex gap-4 border border-border bg-card p-6">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <address className="not-italic">
                    <p className="font-serif text-xl text-primary">{o.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {o.lines.join(" ")}
                    </p>
                  </address>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
