import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useId, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import type { AppointmentType } from "@/lib/appointments";

const colors = {
  "cal-brand": "#10263D",
  "cal-brand-emphasis": "#0b1c2d",
  "cal-brand-text": "#F8F6F0",
};

// Loaded only through ClientOnly + lazy, so the provider never initializes during SSR.
export default function CalBookingEmbed({ appointment }: { appointment: AppointmentType }) {
  const instanceId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const namespace = `rsb-${appointment.id}-${instanceId.replace(/[^a-zA-Z0-9-]/g, "")}`;
  const [status, setStatus] = useState<"loading" | "ready" | "slow" | "failed">("loading");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // The SDK currently applies only iframeAttrs.id and supplies a generic frame title.
    const labelFrame = () => {
      const iframe = container.querySelector("iframe");
      if (iframe) iframe.title = `${appointment.title} booking calendar`;
    };
    const observer = new MutationObserver(labelFrame);
    observer.observe(container, { childList: true, subtree: true });
    labelFrame();
    return () => observer.disconnect();
  }, [appointment.title]);

  useEffect(() => {
    let disposed = false;
    let unsubscribe: (() => void) | undefined;
    const timeout = window.setTimeout(() => {
      if (!disposed) setStatus((current) => (current === "loading" ? "slow" : current));
    }, 15000);
    const ready = () => {
      if (disposed) return;
      window.clearTimeout(timeout);
      setStatus("ready");
    };
    const failed = () => {
      if (disposed) return;
      window.clearTimeout(timeout);
      setStatus("failed");
    };

    getCalApi({ namespace })
      .then((api) => {
        if (disposed) return;
        api("on", { action: "linkReady", callback: ready });
        api("on", { action: "linkFailed", callback: failed });
        api("ui", {
          theme: "light",
          layout: "month_view",
          hideEventTypeDetails: false,
          cssVarsPerTheme: { light: colors, dark: colors },
        });
        unsubscribe = () => {
          api("off", { action: "linkReady", callback: ready });
          api("off", { action: "linkFailed", callback: failed });
        };
      })
      .catch(failed);

    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      unsubscribe?.();
    };
  }, [namespace]);

  return (
    <>
      {status !== "ready" && (
        <p
          role="status"
          className="flex items-start gap-3 p-5 text-sm leading-relaxed text-muted-foreground sm:p-6"
        >
          {status === "loading" && (
            <LoaderCircle
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 animate-spin motion-reduce:animate-none"
            />
          )}
          {status === "loading"
            ? `Loading ${appointment.title} calendar…`
            : status === "slow"
              ? "The calendar is taking longer to load. You can wait or open this consultation on Cal.com using the link above."
              : "The calendar could not load. Please open this consultation on Cal.com using the link above, or contact the firm."}
        </p>
      )}
      <div
        ref={containerRef}
        hidden={status === "failed"}
        aria-busy={status === "loading"}
        className={status === "loading" ? "min-h-[420px]" : ""}
      >
        <Cal
          namespace={namespace}
          calLink={appointment.calLink}
          config={{ layout: "month_view", theme: "light", iframeAttrs: { id: namespace } }}
          style={{ width: "100%" }}
        />
      </div>
    </>
  );
}
