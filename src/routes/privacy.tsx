import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal";
import { PrivacyContent } from "@/components/site/privacy-content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo(
      "Privacy Policy",
      "How RSB Legal Associates & Consultants handles information received through enquiries and communications.",
    ),
  component: () => (
    <LegalPage title="Privacy Policy">
      <PrivacyContent />
    </LegalPage>
  ),
});
