import { act, cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { PawFlashes } from "@/components/purr/paw-flashes";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it("keeps a touch stamp at its original document position while scrolling", () => {
  vi.useFakeTimers();
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
  vi.stubGlobal("scrollX", 0);
  vi.stubGlobal("scrollY", 1800);
  render(<PawFlashes />);
  act(() => {
    const touch = new Event("touchstart");
    Object.defineProperty(touch, "touches", { value: [{ clientX: 150, clientY: 300 }] });
    window.dispatchEvent(touch);
  });
  const stamp = document.querySelector<HTMLElement>(".paw-flash");
  expect(stamp?.style.left).toBe("150px");
  expect(stamp?.style.top).toBe("2100px");
  act(() => {
    vi.stubGlobal("scrollY", 2400);
    window.dispatchEvent(new Event("scroll"));
  });
  expect(stamp?.style.top).toBe("2100px");
  act(() => { vi.advanceTimersByTime(3000); });
  expect(document.querySelector(".paw-flash")).toBeNull();
});