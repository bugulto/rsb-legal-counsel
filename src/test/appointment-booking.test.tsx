import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AppointmentBooking } from "@/components/site/appointment-booking";
import CalBookingEmbed from "@/components/site/cal-booking-embed";
import { appointmentTypes } from "@/lib/appointments";

const provider = vi.hoisted(() => ({
  listeners: new Map<string, () => void>(),
  failRendering: false,
  getApi: vi.fn(),
}));

vi.mock("@calcom/embed-react", () => ({
  default: ({ calLink }: { calLink: string }) => {
    if (provider.failRendering) throw new Error("Provider failed");
    return <iframe title="Book a call" data-cal-link={calLink} />;
  },
  getCalApi: provider.getApi,
}));

beforeEach(() => {
  provider.listeners.clear();
  provider.failRendering = false;
  provider.getApi.mockReset();
  provider.getApi.mockImplementation(
    async ({ namespace }: { namespace: string }) =>
      (command: string, options: { action: string; callback: () => void }) => {
        if (command === "on")
          provider.listeners.set(`${namespace}:${options.action}`, options.callback);
        if (command === "off") provider.listeners.delete(`${namespace}:${options.action}`);
      },
  );
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

async function calendar(title: string) {
  return screen.findByTitle(`${title} booking calendar`);
}

function notify(action: string) {
  act(() => {
    for (const [key, callback] of provider.listeners) if (key.endsWith(`:${action}`)) callback();
  });
}

describe("Consultation booking", () => {
  it("keeps provider initialization out of SSR and exposes both direct booking links", () => {
    const html = renderToString(<AppointmentBooking />);
    expect(html).not.toContain("<iframe");
    expect(html).toContain("https://cal.com/labrat-pkwb0d/online-legal-consultation");
    expect(html).toContain("https://cal.com/labrat-pkwb0d/in-person-legal-consultation");
    expect(provider.getApi).not.toHaveBeenCalled();
  });

  it("switches the embedded event and its fallback link together", async () => {
    render(<AppointmentBooking />);
    expect(await calendar("Online Legal Consultation")).toHaveAttribute(
      "data-cal-link",
      "labrat-pkwb0d/online-legal-consultation",
    );
    expect(
      screen.getByRole("link", { name: /Open on Cal.com for Online Legal Consultation/ }),
    ).toHaveAttribute("href", "https://cal.com/labrat-pkwb0d/online-legal-consultation");

    fireEvent.mouseDown(screen.getByRole("tab", { name: /^In-Person Legal Consultation/ }), {
      button: 0,
      ctrlKey: false,
    });
    expect(await calendar("In-Person Legal Consultation")).toHaveAttribute(
      "data-cal-link",
      "labrat-pkwb0d/in-person-legal-consultation",
    );
    expect(
      screen.queryByTitle("Online Legal Consultation booking calendar"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Open on Cal.com for In-Person Legal Consultation/ }),
    ).toHaveAttribute("href", "https://cal.com/labrat-pkwb0d/in-person-legal-consultation");

    fireEvent.mouseDown(screen.getByRole("tab", { name: /^Online Legal Consultation/ }), {
      button: 0,
      ctrlKey: false,
    });
    await calendar("Online Legal Consultation");
    expect(provider.getApi.mock.calls.at(-1)?.[0].namespace).not.toBe(
      provider.getApi.mock.calls[0]?.[0].namespace,
    );
    expect(provider.listeners.size).toBe(2);
  });

  it("supports selecting a consultation with the keyboard", async () => {
    render(<AppointmentBooking />);
    await calendar("Online Legal Consultation");
    const online = screen.getByRole("tab", { name: /^Online Legal Consultation/ });
    online.focus();
    fireEvent.keyDown(online, { key: "ArrowRight" });
    await waitFor(() =>
      expect(screen.getByRole("tab", { name: /^In-Person Legal Consultation/ })).toHaveAttribute(
        "aria-selected",
        "true",
      ),
    );
    await calendar("In-Person Legal Consultation");
  });

  it("reports a provider failure while keeping the correct fallback available", async () => {
    render(<AppointmentBooking />);
    await calendar("Online Legal Consultation");
    await waitFor(() => expect(provider.listeners.size).toBe(2));
    notify("linkFailed");
    expect(screen.getByRole("status")).toHaveTextContent("calendar could not load");
    expect(
      screen.getByRole("link", { name: /Open on Cal.com for Online Legal Consultation/ }),
    ).toBeVisible();
  });

  it("recovers from provider render errors with a direct booking option", async () => {
    provider.failRendering = true;
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<AppointmentBooking />);
    await screen.findByText(/The calendar is unavailable here/);
    expect(
      screen.getByRole("link", { name: /Open on Cal.com for Online Legal Consultation/ }),
    ).toBeVisible();
    expect(errorLog).toHaveBeenCalled();
  });

  it("changes a stalled load to helpful guidance and can still become ready", async () => {
    vi.useFakeTimers();
    render(<CalBookingEmbed appointment={appointmentTypes[0]} />);
    await act(async () => {});
    act(() => vi.advanceTimersByTime(15000));
    expect(screen.getByRole("status")).toHaveTextContent("taking longer to load");
    notify("linkReady");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    cleanup();
    expect(provider.listeners.size).toBe(0);
  });
});
