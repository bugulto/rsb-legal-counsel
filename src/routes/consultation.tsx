import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail } from "lucide-react";
import { PageHeader, Reveal, SectionTitle } from "@/components/site/layout";
import { AppointmentBooking } from "@/components/site/appointment-booking";
import { consultation, firm } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/consultation")({
  head: () =>
    seo(
      "Request a Consultation",
      "Request an online or in-person consultation with RSB Legal Associates & Consultants. Monday to Saturday, 10:30 a.m. – 7:30 p.m. IST.",
    ),
  component: Consultation,
});

const channels = [
  { icon: Phone, label: "Call", value: firm.phone, href: firm.phoneHref },
  {
    icon: Mail,
    label: "Email",
    value: firm.email,
    href: `mailto:${firm.email}?subject=Consultation%20request`,
  },
];

function Consultation() {
  return (
    <>
      <PageHeader
        eyebrow="Consultation"
        title="Request a consultation."
        intro="Choose an online or in-person consultation and request an appointment through Cal.com. You can also contact the firm by call or email."
      />
      <section aria-labelledby="booking-heading" className="py-12 md:py-16">
        <div className="container-site">
          <p className="eyebrow">Consultations by appointment</p>
          <h2 id="booking-heading" className="mt-4 text-3xl md:text-4xl">
            Choose your consultation.
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            Both consultation options are 1 hour. Availability and time zones are shown in the
            calendar. Please provide only the details needed to arrange your appointment; avoid
            sharing sensitive case information.
          </p>
          <AppointmentBooking />
        </div>
      </section>
      <section className="border-t border-border py-12 md:py-16">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionTitle eyebrow="Arrangements" title="How consultations work." />
            <dl className="mt-8 divide-y divide-border border-y border-border">
              {consultation.map((c) => (
                <div key={c.k} className="grid gap-1 py-4 text-sm sm:grid-cols-[8rem_1fr] sm:gap-4">
                  <dt className="font-semibold text-primary">{c.k}</dt>
                  <dd className="text-muted-foreground">{c.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="border border-border bg-card p-6 sm:p-8 md:p-12">
              <p className="eyebrow">Prefer to speak with us?</p>
              <h2 className="mt-4 text-3xl md:text-4xl">Contact the firm directly.</h2>
              <div className="mt-8 grid grid-cols-1 gap-4">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="group flex min-w-0 items-center gap-3 border border-border p-4 transition-colors hover:border-gold hover:bg-ivory sm:gap-5 sm:p-5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center bg-navy text-gold sm:h-12 sm:w-12">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {c.label}
                      </span>
                      <span className="block break-words font-serif text-xl text-primary">
                        {c.label === "Email" ? (
                          <>
                            {firm.email.split("@")[0]}
                            <wbr />@{firm.email.split("@")[1]}
                          </>
                        ) : (
                          c.value
                        )}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Submitting an enquiry does not, by itself, establish an advocate–client
                relationship. Consultation fees are discussed and determined by the firm.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
