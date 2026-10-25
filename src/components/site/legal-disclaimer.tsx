import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Scale } from "lucide-react";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DisclaimerContent } from "./disclaimer-content";
import { PrivacyContent } from "./privacy-content";
import { disclaimerIntroduction } from "@/lib/disclaimer";

type LegalDisclaimerProps = {
  open: boolean;
  acknowledged: boolean;
  onAcknowledge: () => void;
  onClose: () => void;
};

export function LegalDisclaimer({
  open,
  acknowledged,
  onAcknowledge,
  onClose,
}: LegalDisclaimerProps) {
  const [view, setView] = useState<"disclaimer" | "privacy">("disclaimer");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) setView("disclaimer");
  }, [open]);

  useEffect(() => {
    titleRef.current?.focus();
  }, [view]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && acknowledged) onClose();
      }}
    >
      <DialogPortal>
        <DialogOverlay className="z-[100] bg-navy-deep/80" />
        {/* Compose the existing primitives without DialogContent's unconditional close icon. */}
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-[101] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden border border-gold/50 bg-ivory shadow-2xl"
          onEscapeKeyDown={(event) => {
            if (!acknowledged) event.preventDefault();
          }}
          onInteractOutside={(event) => {
            if (!acknowledged) event.preventDefault();
          }}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            openerRef.current =
              document.activeElement instanceof HTMLElement ? document.activeElement : null;
            titleRef.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            const opener = openerRef.current;
            if (opener && opener !== document.body && opener.isConnected) opener.focus();
            else document.getElementById("main")?.focus();
          }}
        >
          <div className="shrink-0 border-b border-border px-6 py-5 sm:px-9 sm:py-6">
            <p className="eyebrow text-[0.65rem] leading-relaxed">
              RSB Legal Associates & Consultants
            </p>
            <div className="mt-3 flex items-center gap-3">
              <Scale aria-hidden="true" className="h-6 w-6 shrink-0 text-gold-ink" />
              <DialogTitle
                ref={titleRef}
                tabIndex={-1}
                className="font-serif text-3xl font-medium leading-tight sm:text-4xl"
              >
                {view === "disclaimer" ? "Disclaimer" : "Privacy Policy"}
              </DialogTitle>
            </div>
          </div>
          <div
            role="region"
            aria-label={view === "disclaimer" ? "Disclaimer terms" : "Privacy Policy text"}
            tabIndex={0}
            className="min-h-0 overflow-y-auto overscroll-contain px-6 py-6 text-sm leading-relaxed text-muted-foreground sm:px-9 sm:text-base"
          >
            <p className="mb-5 border-l-2 border-gold pl-3 text-xs leading-relaxed">
              Draft — subject to review and approval by the firm's advocates before production
              launch.
            </p>
            <DialogDescription className="mb-5 text-sm leading-relaxed sm:text-base">
              {view === "disclaimer"
                ? disclaimerIntroduction
                : "How the firm uses information received through enquiries and communications."}
            </DialogDescription>
            {view === "disclaimer" ? (
              <DisclaimerContent onReadPrivacy={() => setView("privacy")} />
            ) : (
              <div className="space-y-5 [&_h2]:text-2xl">
                <PrivacyContent />
              </div>
            )}
          </div>
          <div className="flex shrink-0 flex-col gap-4 border-t border-border bg-card px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9">
            {view === "privacy" ? (
              <button
                type="button"
                onClick={() => setView("disclaimer")}
                className="inline-flex min-h-11 items-center justify-center gap-2 text-sm text-primary underline underline-offset-4"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Back to disclaimer
              </button>
            ) : (
              <>
                <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
                  Acknowledging this disclaimer does not establish legal representation.
                </p>
                <button
                  type="button"
                  onClick={acknowledged ? onClose : onAcknowledge}
                  className="btn-primary w-full shrink-0 cursor-pointer sm:w-auto"
                >
                  {acknowledged ? "Close" : "I AGREE"}
                </button>
              </>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
