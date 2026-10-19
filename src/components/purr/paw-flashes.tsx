import { useEffect, useRef, useState } from "react";

type Paw = { id: number; x: number; y: number; rotate: number; scale: number };

const PAW_LIFE_MS = 3000;
const MAX_PAWS = 6;
const MIN_GAP_MS = 450;

function PawPrint({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <ellipse cx="12" cy="15.5" rx="4.6" ry="3.9" />
      <ellipse cx="5.6" cy="10.4" rx="1.9" ry="2.5" transform="rotate(-18 5.6 10.4)" />
      <ellipse cx="9.6" cy="7.2" rx="1.9" ry="2.6" transform="rotate(-6 9.6 7.2)" />
      <ellipse cx="14.4" cy="7.2" rx="1.9" ry="2.6" transform="rotate(6 14.4 7.2)" />
      <ellipse cx="18.4" cy="10.4" rx="1.9" ry="2.5" transform="rotate(18 18.4 10.4)" />
    </svg>
  );
}

/**
 * Decorative paw prints that flash where the visitor touches the screen
 * and while they scroll. Each paw lives 3s and dissolves with a blur.
 * Purely visual: no pointer events, no layout impact, reduced-motion safe.
 */
export function PawFlashes() {
  const [paws, setPaws] = useState<Paw[]>([]);
  const nextId = useRef(0);
  const lastSpawn = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers = new Set<number>();

    const spawn = (clientX: number, clientY: number) => {
      const now = Date.now();
      if (now - lastSpawn.current < MIN_GAP_MS) return;
      lastSpawn.current = now;
      const paw: Paw = {
        id: nextId.current++,
        x: clientX,
        y: clientY,
        rotate: Math.random() * 50 - 25,
        scale: 0.85 + Math.random() * 0.4,
      };
      setPaws((list) => [...list.slice(-(MAX_PAWS - 1)), paw]);
      const t = window.setTimeout(() => {
        timers.delete(t);
        setPaws((list) => list.filter((p) => p.id !== paw.id));
      }, PAW_LIFE_MS);
      timers.add(t);
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) spawn(t.clientX, t.clientY);
    };
    const onScroll = () => {
      // A paw appears near the middle band of the screen while scrolling.
      spawn(
        window.innerWidth * (0.15 + Math.random() * 0.7),
        window.innerHeight * (0.25 + Math.random() * 0.5),
      );
    };

    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("scroll", onScroll);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  if (paws.length === 0) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {paws.map((p) => (
        <span
          key={p.id}
          className="paw-flash absolute text-mint"
          style={{
            left: p.x,
            top: p.y,
            transform: `translate(-50%, -50%) rotate(${p.rotate}deg) scale(${p.scale})`,
          }}
        >
          <PawPrint className="size-12 md:size-14" />
        </span>
      ))}
    </div>
  );
}
