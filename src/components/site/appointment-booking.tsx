import { ClientOnly } from "@tanstack/react-router";
import { Component, lazy, Suspense, type ReactNode } from "react";
import { Building2, Check, Clock3, ExternalLink, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { appointmentTypes } from "@/lib/appointments";

const CalBookingEmbed = lazy(() => import("./cal-booking-embed"));

function CalendarLoading() {
  return (
    <p role="status" className="p-6 text-sm text-muted-foreground">
      Loading the appointment calendar… You can also use the Cal.com link above.
    </p>
  );
}

class CalendarBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override render() {
    if (this.state.failed) {
      return (
        <p role="status" className="p-6 text-sm text-muted-foreground">
          The calendar is unavailable here. Please open the selected consultation on Cal.com using
          the link above, or contact the firm.
        </p>
      );
    }
    return this.props.children;
  }
}

export function AppointmentBooking() {
  return (
    <Tabs defaultValue="online" className="mt-8">
      <TabsList
        aria-label="Consultation type"
        className="grid h-auto w-full grid-cols-1 gap-4 rounded-none bg-transparent p-0 sm:grid-cols-2"
      >
        {appointmentTypes.map((type) => {
          const Icon = type.id === "online" ? Video : Building2;
          return (
            <TabsTrigger
              key={type.id}
              value={type.id}
              className="group h-full items-start justify-start gap-4 whitespace-normal rounded-none border border-border bg-card p-5 text-left text-primary shadow-none transition-colors focus-visible:ring-gold-ink data-[state=active]:border-navy data-[state=active]:bg-navy data-[state=active]:text-on-navy data-[state=active]:shadow-none sm:p-6"
            >
              <Icon
                aria-hidden="true"
                className="mt-1 h-6 w-6 shrink-0 text-gold-ink group-data-[state=active]:text-gold"
              />
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-2xl leading-tight">{type.title}</span>
                <span className="mt-2 block text-sm font-normal text-muted-foreground group-data-[state=active]:text-on-navy-muted">
                  {type.description}
                </span>
                <span className="mt-3 flex items-center gap-2 text-xs">
                  <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
                  {type.duration}
                </span>
              </span>
              <Check
                aria-hidden="true"
                className="mt-1 h-5 w-5 shrink-0 opacity-0 group-data-[state=active]:opacity-100"
              />
            </TabsTrigger>
          );
        })}
      </TabsList>

      <p className="mt-6 border-l-2 border-gold pl-4 text-sm leading-relaxed text-muted-foreground">
        Choose a time and submit your details through Cal.com to request an appointment.
        Appointments are subject to the firm's confirmation; selecting a time alone does not confirm
        a consultation. Cal.com displays your booking status and sends updates according to the
        firm's scheduling settings.
      </p>

      {appointmentTypes.map((type) => (
        <TabsContent
          key={type.id}
          value={type.id}
          className="mt-6 min-w-0 focus-visible:ring-gold-ink"
        >
          <div className="border border-border bg-card">
            <div className="flex flex-col items-start justify-between gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:p-6">
              <h3 className="text-2xl">{type.title}</h3>
              <a
                href={type.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm text-primary underline underline-offset-4"
              >
                Open on Cal.com{" "}
                <span className="sr-only">for {type.title} (opens in a new tab)</span>
                <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
              </a>
            </div>
            <CalendarBoundary>
              <ClientOnly fallback={<CalendarLoading />}>
                <Suspense fallback={<CalendarLoading />}>
                  <CalBookingEmbed appointment={type} />
                </Suspense>
              </ClientOnly>
            </CalendarBoundary>
          </div>
        </TabsContent>
      ))}

      <noscript>
        <p className="mt-6 text-sm">
          JavaScript is needed for the calendar on this page. Open your preferred consultation
          directly on Cal.com:
        </p>
        <ul className="mt-3 space-y-3">
          {appointmentTypes.map((type) => (
            <li key={type.id}>
              <a className="underline underline-offset-4" href={type.url}>
                {type.title}
              </a>
            </li>
          ))}
        </ul>
      </noscript>
    </Tabs>
  );
}
