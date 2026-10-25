import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal";
import { DisclaimerContent } from "@/components/site/disclaimer-content";
import { disclaimerIntroduction } from "@/lib/disclaimer";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/disclaimer")({
  head: () =>
    seo(
      "Legal Disclaimer",
      "Legal disclaimer for the website of RSB Legal Associates & Consultants.",
    ),
  component: () => (
    <LegalPage title="Legal Disclaimer">
      <p>{disclaimerIntroduction}</p>
      <DisclaimerContent />
    </LegalPage>
  ),
});
