import type { ReactNode } from "react";
import { PageHeader } from "./layout";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} />
      <section className="py-20">
        <div className="container-site max-w-3xl">
          <p className="mb-10 border-l-2 border-gold bg-card p-4 text-sm text-muted-foreground">
            Draft — subject to legal review before publication.
          </p>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground [&_h2]:mt-12 [&_h2]:text-3xl">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
