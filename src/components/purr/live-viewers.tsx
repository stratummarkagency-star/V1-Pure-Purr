import { useEffect, useState } from "react";

/** Next viewer count: small random walk, clamped to a realistic range. */
export function nextViewers(current: number, min = 18, max = 47): number {
  const step = Math.floor(Math.random() * 7) - 3; // -3..+3
  return Math.min(max, Math.max(min, current + step));
}

export function LiveViewers() {
  const [viewers, setViewers] = useState(27);
  const [added, setAdded] = useState(9);

  useEffect(() => {
    setAdded(6 + Math.floor(Math.random() * 7));
    setViewers(20 + Math.floor(Math.random() * 15));
    const id = setInterval(() => setViewers((v) => nextViewers(v)), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-y bg-mint-soft py-6" aria-label="Live activity (preview)">
      <div className="container-pp flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
        <p className="flex items-center gap-3 text-2xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          <span className="relative inline-flex size-4 shrink-0 sm:size-5">
            <span className="absolute inset-0 animate-ping rounded-full bg-mint opacity-70" />
            <span className="relative size-full animate-pulse rounded-full bg-mint shadow-[0_0_14px_var(--mint)]" />
          </span>
          <span><span translate="no" className="tabular-nums">{viewers}</span> people are viewing this</span>
        </p>
        <p className="text-lg font-bold text-muted-foreground sm:text-2xl md:text-3xl">
          · <span translate="no" className="tabular-nums">{added}</span> added to cart
        </p>
      </div>
      <p className="mt-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground opacity-60">Preview demo numbers</p>
    </section>
  );
}
