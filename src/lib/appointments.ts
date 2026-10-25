export const appointmentTypes = [
  {
    id: "online",
    title: "Online Legal Consultation",
    description: "Video consultation",
    duration: "30 minutes",
    calLink: "labrat-pkwb0d/online-legal-consultation",
    url: "https://cal.com/labrat-pkwb0d/online-legal-consultation",
  },
  {
    id: "in-person",
    title: "In-Person Legal Consultation",
    description: "Physical consultation at the firm's Mumbai office",
    duration: "30 minutes",
    calLink: "labrat-pkwb0d/in-person-legal-consultation",
    url: "https://cal.com/labrat-pkwb0d/in-person-legal-consultation",
  },
] as const;

export type AppointmentType = (typeof appointmentTypes)[number];
