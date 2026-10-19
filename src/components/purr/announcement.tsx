import { useEffect, useState } from "react";
import { promo, trust } from "@/config/site";
import { formatCountdown, remainingSeconds } from "@/lib/promotion-timer";

function RunningCat() {
  return <svg viewBox="0 0 40 28" className="pixel-cat h-7 w-10 shrink-0 text-paper" shapeRendering="crispEdges" aria-hidden="true">
    <g fill="currentColor">
      <path d="M2 8h4v6h6v-2h14V6h3V2h3v5h3V3h3v14h-4v3H14v-2H8v-2H4v-4H2Z" />
      <path className="cat-leg-front" d="M28 18h4v5h5v3h-9Z" />
      <path className="cat-leg-back" d="M13 18h4v5h-5v3H7v-3h6Z" />
    </g>
    <path fill="var(--ink)" d="M34 10h2v2h-2Z" />
  </svg>;
}

export function Announcement() {
  const [seconds, setSeconds] = useState(promo.previewMinutes * 60);
  useEffect(() => {
    // This is visibly a preview, not an enforceable offer expiry.
    const key = "pure-purr-promotion-preview-deadline";
    let deadline = Date.now() + promo.previewMinutes * 60 * 1000;
    try {
      const stored = Number(sessionStorage.getItem(key));
      if (stored > 0) deadline = stored;
      else sessionStorage.setItem(key, String(deadline));
    } catch { /* The preview still works when browser storage is unavailable. */ }
    const tick = () => setSeconds(remainingSeconds(deadline, Date.now()));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const message = <>
    <RunningCat />
    <span className="font-bold">6 FREE GIFTS</span>
    <span translate="no" className="announcement-clock rounded border border-mint/40 px-2 py-0.5 font-bold text-mint">{seconds > 0 ? `Timer preview · ${formatCountdown(seconds)}` : "Timer preview ended"}</span>
    <span aria-hidden="true">·</span>
    <span>{trust.shipping.label}</span>
    <span aria-hidden="true">·</span>
    <span>{trust.trial.days}-day risk-free trial</span>
    <span aria-hidden="true">·</span>
    <span>{trust.warranty.years}-year warranty</span>
  </>;

  return <div className="on-dark announcement-bar overflow-hidden bg-ink py-2 text-[13px] font-medium text-paper" aria-label={`6 free gifts. Promotion timer preview: ${formatCountdown(seconds)}. ${trust.shipping.label}.`}>
    <div className="announcement-track flex w-max items-center">
      <div className="announcement-message flex shrink-0 items-center gap-4 px-6">{message}</div>
      <div className="announcement-message flex shrink-0 items-center gap-4 px-6" aria-hidden="true">{message}</div>
    </div>
  </div>;
}