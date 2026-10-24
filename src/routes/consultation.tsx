import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, CalendarClock, Video, Building2 } from "lucide-react";
import { PageHeader, Reveal, SectionTitle } from "@/components/site/layout";
import { consultation, firm } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/consultation")({
  head: () => seo("Book a Consultation", "Request an online or in-person consultation with RSB Legal Associates & Consultants. Monday to Saturday, 10:30 a.m. – 7:30 p.m. IST."),
  component: Consultation,
});

const channels = [
  { icon: Phone, label: "Call", value: firm.phone, href: firm.phoneHref },
  { icon: MessageCircle, label: "WhatsApp", value: firm.phone, href: firm.whatsappHref },
  { icon: Mail, label: "Email", value: firm.email, href: `mailto:${firm.email}?subject=Consultation%20request` },
];

function Consultation() {
  return (
    <>
      <PageHeader eyebrow="Consultation" title="Request a consultation." intro="Consultations are available by prior appointment, online or in person. Timings are confirmed with you directly by call, email or WhatsApp." />
      <section className="py-24 md:py-32">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionTitle eyebrow="Arrangements" title="How consultations work." />
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="border border-border bg-card p-5"><Video className="h-5 w-5 text-gold" /><p className="mt-3 font-serif text-xl text-primary">Online</p></div>
              <div className="border border-border bg-card p-5"><Building2 className="h-5 w-5 text-gold" /><p className="mt-3 font-serif text-xl text-primary">In person</p></div>
            </div>
            <dl className="mt-8 divide-y divide-border border-y border-border">
              {consultation.map((c) => (
                <div key={c.k} className="grid gap-1 py-4 text-sm sm:grid-cols-[8rem_1fr] sm:gap-4">
                  <dt className="font-semibold text-primary">{c.k}</dt><dd className="text-muted-foreground">{c.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="border border-border bg-card p-8 md:p-12">
              <p className="eyebrow">Contact the firm to schedule</p>
              <h2 className="mt-4 text-3xl md:text-4xl">Choose how you'd like to reach us.</h2>
              <div className="mt-8 grid gap-4">
                {channels.map((c) => (
                  <a key={c.label} href={c.href} target={c.label === "WhatsApp" ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-5 border border-border p-5 transition-colors hover:border-gold hover:bg-ivory">
                    <span className="grid h-12 w-12 shrink-0 place-items-center bg-navy text-gold"><c.icon className="h-5 w-5" /></span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.label}</span>
                      <span className="block truncate font-serif text-xl text-primary">{c.value}</span>
                    </span>
                  </a>
                ))}
              </div>
              <div className="mt-8 flex items-start gap-4 border border-dashed border-gold/60 bg-ivory p-6">
                <CalendarClock className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="font-serif text-xl text-primary">Online scheduling — coming soon</p>
                  <p className="mt-1 text-sm text-muted-foreground">An online appointment calendar will be connected here later. Until then, please contact the firm directly to arrange a time.</p>
                </div>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">Submitting an enquiry does not, by itself, establish an advocate–client relationship. Consultation fees are discussed and determined by the firm.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
