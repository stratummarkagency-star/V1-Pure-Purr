type W = Window & { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void; ttq?: { track: (e: string, d?: unknown) => void } };

export function track(event: "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase" | "ScrollDepth", data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as W;
  w.gtag?.("event", event, data);
  w.fbq?.("track", event, data);
  w.ttq?.track(event, data);
}
