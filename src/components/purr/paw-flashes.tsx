import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Paw = { id: number; x: number; y: number; rotate: number; scale: number };

const PAW_LIFE_MS = 3000;
const MAX_PAWS = 6;
const MIN_GAP_MS = 450;

function PawPrint({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 554 554" fill="currentColor" className={className} aria-hidden="true">
      <path
        d="M274 72C215 13 133 52 122 142C70 140 30 183 30 238C28 287 54 326 101 339C64 418 104 483 169 495C231 507 320 507 379 495C446 481 483 417 448 339C495 324 522 285 519 238C517 183 477 140 427 142C419 52 334 13 274 72Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <ellipse cx="129" cy="244" rx="45.5" ry="55.5" />
      <ellipse cx="218" cy="159" rx="48" ry="61" />
      <ellipse cx="331" cy="159" rx="48" ry="61" />
      <ellipse cx="419.5" cy="244" rx="45.5" ry="55.5" />
      <path d="M274 238C227 238 213 277 177 312C149 337 129 367 142 403C155 440 195 452 230 438C248 431 260 425 274 425C291 425 307 434 326 440C361 453 397 444 407 409C420 373 397 339 373 317C337 284 323 238 274 238Z" />
    </svg>
  );
}

/**
 * Decorative paw prints that flash where the visitor touches the screen
 * and while they scroll, anchored to the document rather than the viewport.
 * Each paw lives 3s and dissolves with a blur.
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
        x: clientX + window.scrollX,
        y: clientY + window.scrollY,
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
  return createPortal(
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30" aria-hidden="true">
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
    </div>,
    document.body,
  );
}
