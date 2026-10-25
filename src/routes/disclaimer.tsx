import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal";
import { disclaimer } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/disclaimer")({
  head: () =>
    seo(
      "Legal Disclaimer",
      "Legal disclaimer for the website of RSB Legal Associates & Consultants.",
    ),
  component: () => (
    <LegalPage title="Legal Disclaimer">
      <p>{disclaimer}</p>
    </LegalPage>
  ),
});
