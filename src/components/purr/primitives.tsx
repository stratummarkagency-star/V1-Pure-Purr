import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ShieldCheck, RotateCcw, Truck, PackageCheck, Star, Lock } from "lucide-react";
import { abTest, trust } from "@/config/site";
import { useCart } from "./cart";

export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.12);
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${seen ? "is-visible" : ""} ${className}`}>{children}</div>;
}

export function useCountUp(target: number, start: boolean, ms = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(target); return; }
    let raf = 0; const t0 = performance.now();
    const step = (t: number) => { const p = Math.min(1, (t - t0) / ms); setV(Math.round(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start, ms]);
  return v;
}

export function useVariant() {
  const [v, setV] = useState({ h1: "a" as "a" | "b", cta: "a" as "a" | "b", price: "a" as "a" | "b" });
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const pick = (k: string) => (q.get(k) === "b" ? "b" : "a") as "a" | "b";
    setV({ h1: pick("h1"), cta: pick("cta"), price: pick("price") });
  }, []);
  return v;
}

export function CTA({ label, className = "", full = false }: { label?: string; className?: string; full?: boolean }) {
  const { addBundle } = useCart();
  const v = useVariant();
  return (
    <button type="button" onClick={addBundle} className={`btn-cta ${full ? "w-full" : ""} ${className}`}>
      {label ?? abTest.cta[v.cta]} <ArrowRight className="cta-arrow size-5" strokeWidth={2} aria-hidden />
    </button>
  );
}

export function Stars({ className = "size-4" }: { className?: string }) {
  return <span className="inline-flex gap-0.5" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`${className} fill-current`} strokeWidth={1.5} aria-hidden />)}</span>;
}

export function Replace({ children = "REPLACE" }: { children?: ReactNode }) {
  return <span className="tag-replace">[{children}]</span>;
}

export function RiskStrip({ className = "" }: { className?: string }) {
  const items = [
    trust.trial.show && { icon: RotateCcw, t: `${trust.trial.days}-day risk-free` },
    trust.warranty.show && { icon: ShieldCheck, t: `${trust.warranty.years}-year warranty` },
    trust.shipping.show && { icon: Truck, t: "Free shipping" },
    trust.protection.show && { icon: PackageCheck, t: "Purchase protection" },
  ].filter(Boolean) as { icon: typeof Truck; t: string }[];
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium ${className}`}>
      {items.map(({ icon: I, t }) => <li key={t} className="inline-flex items-center gap-1.5"><I className="size-4" strokeWidth={1.5} aria-hidden />{t}</li>)}
    </ul>
  );
}

const PAY = ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "Shop Pay", "PayPal", "Klarna"];
export function PaymentIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <span className="inline-flex items-center gap-1 text-xs font-semibold mr-1"><Lock className="size-3.5" strokeWidth={1.5} aria-hidden />Secure checkout</span>
      {PAY.map((p) => <span key={p} className="rounded-md border border-current/15 px-2 py-0.5 text-[11px] font-bold opacity-80">{p}</span>)}
    </div>
  );
}

/** Line-icon: a closed box with a question mark on its face. */
export function MysteryBox({ className = "", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2.6" y="4.8" width="18.8" height="3.8" rx="1.4" />
      <path d="M4.4 8.6v8.9a2.4 2.4 0 0 0 2.4 2.4h10.4a2.4 2.4 0 0 0 2.4-2.4V8.6" />
      <g transform="translate(2.4 3.85) scale(0.8)" strokeWidth={1.88}>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </g>
      <path d="M19.6 1.5c.25.95.5 1.2 1.45 1.45-.95.25-1.2.5-1.45 1.45-.25-.95-.5-1.2-1.45-1.45.95-.25 1.2-.5 1.45-1.45Z" />
      <path d="M4.6 2.3c.17.63.33.8.96.97-.63.17-.8.33-.97.96-.17-.63-.33-.8-.96-.97.63-.17.8-.33.97-.97Z" />
    </svg>
  );
}

