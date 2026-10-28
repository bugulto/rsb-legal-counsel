import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHeader, Reveal } from "@/components/site/layout";
import { firm, offices } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo(
      "Contact",
      "Contact RSB Legal Associates & Consultants at our Saatrasta and Fort offices in Mumbai. Call +91 87501 17205.",
    ),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Visit or reach the firm."
        intro="Two offices in Mumbai. Please contact us in advance to confirm an appointment."
      />
      <section className="py-24 md:py-32">
        <div className="container-site grid gap-6 md:grid-cols-3">
          {[
            { icon: Phone, k: "Telephone", v: firm.phone, href: firm.phoneHref },
            { icon: Mail, k: "Email", v: firm.email, href: `mailto:${firm.email}` },
            { icon: Clock, k: "Office hours", v: firm.hours },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 80} className="border border-border bg-card p-8">
              <c.icon className="h-5 w-5 text-gold" />
              <p className="eyebrow mt-5">{c.k}</p>
              {c.href ? (
                <a
                  href={c.href}
                  className="link-gold mt-3 inline-block break-all font-sans text-2xl text-primary"
                >
                  {c.v}
                </a>
              ) : (
                <p className="mt-3 font-sans text-2xl text-primary">{c.v}</p>
              )}
            </Reveal>
          ))}
        </div>
        <div className="container-site mt-16 grid gap-6 md:grid-cols-2">
          {offices.map((o, i) => (
            <Reveal key={o.label} delay={i * 100} className="hero-pattern p-10">
              <MapPin className="h-6 w-6 text-gold" />
              <h2 className="mt-6 text-3xl text-on-navy!">{o.label}</h2>
              <address className="mt-4 not-italic leading-relaxed text-on-navy-muted">
                {o.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <p className="mt-8 text-sm text-on-navy-muted">
                For directions and appointment arrangements, please{" "}
                <a
                  href={firm.phoneHref}
                  className="underline underline-offset-4 hover:text-on-navy"
                >
                  call the firm
                </a>
                .
              </p>
            </Reveal>
          ))}
        </div>
        <div className="container-site mt-16 text-center">
          <Link to="/consultation" className="btn-outline text-primary">
            Consultation details
          </Link>
        </div>
      </section>
    </>
  );
}
