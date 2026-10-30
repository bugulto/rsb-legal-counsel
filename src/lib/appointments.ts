export const appointmentTypes = [
  {
    id: "online",
    title: "Online Legal Consultation",
    description: "Video consultation",
    duration: "30 minutes",
    calLink: "rsb-legal-associates-and-consultants/30min",
    url: "https://cal.com/rsb-legal-associates-and-consultants/30min",
  },
  {
    id: "in-person",
    title: "In-Person Legal Consultation",
    description: "Physical consultation at the firm's Mumbai office",
    duration: "30 minutes",
    calLink: "rsb-legal-associates-and-consultants/30min",
    url: "https://cal.com/rsb-legal-associates-and-consultants/30min",
  },
] as const;

export type AppointmentType = (typeof appointmentTypes)[number];
