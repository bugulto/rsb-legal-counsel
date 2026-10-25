import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LegalDisclaimer } from "@/components/site/legal-disclaimer";
import { useDisclaimerConsent } from "@/hooks/use-disclaimer-consent";
import { disclaimerStorageKey } from "@/lib/disclaimer";

function ConsentHarness() {
  const consent = useDisclaimerConsent();
  return (
    <>
      <main id="main" tabIndex={-1}>
        <button>Underlying page action</button>
      </main>
      <button onClick={consent.reopen}>Legal Disclaimer</button>
      <LegalDisclaimer
        open={consent.open}
        acknowledged={consent.acknowledged}
        onAcknowledge={consent.acknowledge}
        onClose={consent.close}
      />
    </>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

async function disclaimerDialog() {
  return screen.findByRole("dialog", { name: "Disclaimer" });
}

async function accept() {
  fireEvent.click(screen.getByRole("button", { name: "I AGREE" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
}

describe("Legal disclaimer consent", () => {
  it("shows all four numbered terms with an accessible name and description, and focuses the heading", async () => {
    render(<ConsentHarness />);
    const dialog = await disclaimerDialog();
    expect(within(dialog).getAllByRole("listitem")).toHaveLength(4);
    expect(dialog).toHaveAccessibleDescription(/As per the rules of the Bar Council of India/);
    expect(within(dialog).getByRole("heading", { name: "Disclaimer" })).toHaveFocus();
    expect(within(dialog).getByText(/Draft — subject to review and approval/)).toBeVisible();
    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.pointerDown(document.body);
    expect(dialog).toBeVisible();
    expect(window.localStorage.getItem(disclaimerStorageKey)).toBeNull();
  });

  it("persists agreement, returns focus to main, and stays closed on a fresh mount", async () => {
    const first = render(<ConsentHarness />);
    await disclaimerDialog();
    await accept();
    expect(window.localStorage.getItem(disclaimerStorageKey)).toBe("true");
    expect(document.getElementById("main")).toHaveFocus();
    first.unmount();
    render(<ConsentHarness />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("requires agreement again when only an older disclaimer version is stored", async () => {
    window.localStorage.setItem("rsb-legal-disclaimer-v0", "true");
    render(<ConsentHarness />);
    await disclaimerDialog();
  });

  it("reopens after the acknowledgment is cleared", async () => {
    window.localStorage.setItem(disclaimerStorageKey, "true");
    render(<ConsentHarness />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    act(() => {
      window.localStorage.removeItem(disclaimerStorageKey);
      window.dispatchEvent(
        new StorageEvent("storage", { key: disclaimerStorageKey, newValue: null }),
      );
    });
    await disclaimerDialog();
    expect(screen.getByRole("button", { name: "I AGREE" })).toBeVisible();
  });

  it("lets an acknowledged visitor reopen and close the text without recording new agreement", async () => {
    window.localStorage.setItem(disclaimerStorageKey, "true");
    const storageWrite = vi.spyOn(Storage.prototype, "setItem");
    render(<ConsentHarness />);
    const trigger = screen.getByRole("button", { name: "Legal Disclaimer" });
    trigger.focus();
    fireEvent.click(trigger);
    await disclaimerDialog();
    expect(screen.queryByRole("button", { name: "I AGREE" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
    expect(storageWrite).not.toHaveBeenCalled();
  });

  it("allows reading the existing Privacy Policy before agreeing", async () => {
    render(<ConsentHarness />);
    await disclaimerDialog();
    fireEvent.click(screen.getByRole("button", { name: "Privacy Policy" }));
    const policy = await screen.findByRole("dialog", { name: "Privacy Policy" });
    expect(within(policy).getByRole("heading", { name: "Use of information" })).toBeVisible();
    expect(within(policy).getByRole("heading", { name: "Confidentiality" })).toBeVisible();
    expect(within(policy).getByRole("heading", { name: "Privacy Policy" })).toHaveFocus();
    expect(window.localStorage.getItem(disclaimerStorageKey)).toBeNull();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(policy).toBeVisible();
    fireEvent.click(within(policy).getByRole("button", { name: "Back to disclaimer" }));
    await disclaimerDialog();
    await accept();
  });

  it("works for the current session if storage writes are rejected", async () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage full", "QuotaExceededError");
    });
    render(<ConsentHarness />);
    await disclaimerDialog();
    await accept();
    fireEvent(window, new Event("focus"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("still prompts and accepts if the browser blocks storage access", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("Blocked", "SecurityError");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Blocked", "SecurityError");
    });
    render(<ConsentHarness />);
    await disclaimerDialog();
    await accept();
  });

  it("never reads browser storage while rendering on the server", () => {
    const storageRead = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage must not be read during SSR");
    });
    expect(() => renderToString(<ConsentHarness />)).not.toThrow();
    expect(storageRead).not.toHaveBeenCalled();
  });
});
