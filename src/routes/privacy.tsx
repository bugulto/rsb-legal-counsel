import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo(
      "Privacy Policy",
      "How RSB Legal Associates & Consultants handles information received through enquiries and communications.",
    ),
  component: () => (
    <LegalPage title="Privacy Policy">
      <h2>Use of information</h2>
      <p>
        Information submitted through website contact forms, appointment requests, email or other
        communication channels may be used to respond to enquiries, schedule consultations, assess
        legal requirements and provide agreed legal services. The firm shall take reasonable
        measures to safeguard such information in accordance with applicable law.
      </p>
      <h2>Confidentiality</h2>
      <p>
        RSB Legal Associates & Consultants respects the confidentiality of information and documents
        received from individual and corporate clients. Such information shall be handled with due
        care and shall not be disclosed except as authorised by the client, required for the
        professional engagement, or permitted or required by applicable law and professional
        obligations.
      </p>
    </LegalPage>
  ),
});
