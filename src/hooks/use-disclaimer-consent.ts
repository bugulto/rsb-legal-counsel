import { useEffect, useRef, useState } from "react";
import { disclaimerStorageKey } from "@/lib/disclaimer";

function readAcknowledgment(): boolean | undefined {
  try {
    return window.localStorage.getItem(disclaimerStorageKey) === "true";
  } catch {
    return undefined;
  }
}

export function useDisclaimerConsent() {
  // Storage is read only after hydration; server and initial client renders match.
  const [open, setOpen] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const sessionOnly = useRef(false);

  useEffect(() => {
    const stored = readAcknowledgment() ?? false;
    setAcknowledged(stored);
    setOpen(!stored);

    const syncStorage = () => {
      if (sessionOnly.current) return;
      const next = readAcknowledgment();
      // Keep the in-memory acknowledgment if storage is blocked by the browser.
      if (next === undefined) return;
      setAcknowledged(next);
      if (!next) setOpen(true);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === disclaimerStorageKey || event.key === null) syncStorage();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", syncStorage);
    window.addEventListener("pageshow", syncStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", syncStorage);
      window.removeEventListener("pageshow", syncStorage);
    };
  }, []);

  const acknowledge = () => {
    try {
      window.localStorage.setItem(disclaimerStorageKey, "true");
    } catch {
      // Acknowledgment still lasts for this app session when persistence is unavailable.
      sessionOnly.current = true;
    }
    setAcknowledged(true);
    setOpen(false);
  };

  return {
    open,
    acknowledged,
    acknowledge,
    reopen: () => setOpen(true),
    close: () => {
      if (acknowledged) setOpen(false);
    },
  };
}
