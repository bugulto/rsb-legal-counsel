import { QueryClient } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteHeader, TeamPhoto } from "@/components/site/layout";

async function renderHeader() {
  const root = createRootRoute({
    component: () => (
      <>
        <SiteHeader />
        <button>Outside header</button>
        <Outlet />
      </>
    ),
  });
  const index = createRoute({ getParentRoute: () => root, path: "/", component: () => null });
  const about = createRoute({
    getParentRoute: () => root,
    path: "/about",
    component: () => <h1>About the firm</h1>,
  });
  const router = createRouter({
    routeTree: root.addChildren([index, about]),
    history: createMemoryHistory({ initialEntries: ["/"] }),
    context: { queryClient: new QueryClient() },
  });
  render(<RouterProvider router={router} />);
  await screen.findByRole("button", { name: "Open menu" });
}

describe("Mobile navigation", () => {
  it("connects its toggle to the menu and restores focus on Escape", async () => {
    await renderHeader();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    const menu = document.getElementById(toggle.getAttribute("aria-controls")!);
    expect(menu).not.toBeVisible();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(menu).toBeVisible();
    within(menu!).getByRole("link", { name: "About" }).focus();
    fireEvent.keyDown(document, { key: "Escape" });

    expect(menu).not.toBeVisible();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("closes when a visitor selects a page", async () => {
    await renderHeader();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const menu = screen.getByRole("navigation", { name: "Mobile" });
    fireEvent.click(within(menu).getByRole("link", { name: "About" }));
    await screen.findByRole("heading", { name: "About the firm" });
    expect(menu).not.toBeVisible();
  });

  it("closes on a pointer interaction outside the header", async () => {
    await renderHeader();
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside header" }));
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
        "aria-expanded",
        "false",
      ),
    );
  });
});

describe("Team photographs", () => {
  it("replaces a failed image with an identified placeholder", () => {
    render(<TeamPhoto name="Team member" photo="/missing.webp" />);
    fireEvent.error(screen.getByRole("img", { name: "Portrait of Team member" }));
    expect(
      screen.getByRole("img", { name: "Photograph of Team member unavailable" }),
    ).toBeVisible();
    expect(screen.queryByAltText("Portrait of Team member")).not.toBeInTheDocument();
  });
});
