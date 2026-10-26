import { useEffect, useState } from "react";
import { Check, X, Play, Volume2, ChevronDown, Award, Sparkles, ShieldCheck, Volume1, Smartphone, Cat, Wind, Clock, Frown, Eye, RotateCcw, PackageCheck, Gift, Image as ImageIcon } from "lucide-react";
import { bundle, totalValue, savings, savingsPct, perDay, installmentAmount, giftsValue, trust, reviews, ugcVideos, brand, abTest } from "@/config/site";
import { CTA, Reveal, RiskStrip, PaymentIcons, Stars, Replace, MysteryBox, GiftIcon, useInView, useCountUp, useVariant } from "./primitives";
import { Announcement } from "./announcement";
import { LiveViewers } from "./live-viewers";
import { useCart } from "./cart";
import productImg from "@/assets/product.jpg";
import heroImg from "@/assets/pet-maison-portada.webp.asset.json";
import finalImg from "@/assets/final.jpg";
import forbesLogo from "@/assets/brand-forbes-predict.jpg.asset.json";
import animalPlanetLogo from "@/assets/brand-logotipo-minimalista-de-animal-planet.png.asset.json";
import dodoLogo from "@/assets/brand-logotipo-minimalista-de-dodo-en-blanco-y-negro.png.asset.json";
import modernCatLogo from "@/assets/brand-logotipo-minimalista-moderncat.png.asset.json";
import catsComLogo from "@/assets/brand-logotipo-cats.com-en-blanco-sobre-negro.png.asset.json";

function Em({ children }: { children: string }) {
  return <span className="em-pp">{children}</span>;
}

/* S0 */
export function TopBar() {
  return <Announcement />;
}

/* Header */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { addBundle } = useCart();
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 500);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [["How it works", "#how"], ["The bundle", "#offer"], ["Reviews", "#reviews"], ["FAQ", "#faq"]];
  return (
    <header className="sticky top-0 z-40 border-b bg-background/75 backdrop-blur-xl">
      <div className="container-pp flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 text-xl font-bold tracking-tight">Pure <Em>Purr</Em>{trust.awards.show && <span title={trust.awards.items[0]?.name} className="grid size-7 shrink-0 place-items-center rounded-full border"><Award className="size-3.5" strokeWidth={1.5} aria-hidden /></span>}</a>
        <nav className="hidden gap-8 text-sm font-medium md:flex" aria-label="Main">
          {links.map(([l, h]) => <a key={h} href={h} className="text-muted-foreground hover:text-foreground">{l}</a>)}
        </nav>
        <button onClick={addBundle} className={`btn-cta !min-h-11 !px-5 !text-sm transition-opacity ${scrolled ? "opacity-100" : "md:opacity-0 md:pointer-events-none"}`}>Get yours</button>
      </div>
    </header>
  );
}

/* S1 */
export function Hero() {
  return (
    <section id="top" className="store-cover relative isolate overflow-hidden text-paper">
      <img src={heroImg.url} alt="A grey cat sitting beside the Pure Purr self-cleaning litter box in a bright living room" fetchPriority="high" className="store-cover-image absolute inset-0 size-full object-cover" />
      <div className="store-cover-shade absolute inset-0" aria-hidden="true" />
      <div className="container-pp relative flex h-full flex-col items-center text-center">
        <h1 className="store-cover-title pt-9 md:pt-12">Never <Em>scoop</Em> again.</h1>
        <div className="mt-auto flex flex-col items-center gap-3 pb-9 md:pb-10">
          <CTA className="store-cover-cta" />
        {trust.trustpilot.show && (
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
            <Stars /> {trust.trustpilot.rating}/5 on Trustpilot
          </div>
        )}
        </div>
      </div>
    </section>
  );
}

/* S2 */
export function ProofStrip() {
  return <LiveViewers />;
}

/* S3 */
export function Problem() {
  const cards = [
    { icon: Clock, t: "5 minutes a day = 30+ hours a year", d: "That's almost a full work week spent bent over a box." },
    { icon: Wind, t: "Odor you stop noticing… until guests do", d: "Open trays let smell drift into every room." },
    { icon: Frown, t: "A box that's never as clean as your cat would like", d: "Cats are tidy. A dirty box stresses them out." },
  ];
  return (
    <section className="section-pp container-pp text-center">
      <Reveal><h2 className="h2-pp mx-auto max-w-3xl">Scooping is the chore you never <Em>signed up</Em> for.</h2></Reveal>
      <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
        {cards.map(({ icon: I, t, d }, i) => (
          <Reveal key={t} delay={i * 80} className="rounded-3xl border p-7">
            <I className="size-7" strokeWidth={1.5} /><p className="mt-5 text-xl font-bold leading-snug">{t}</p><p className="mt-2 text-muted-foreground">{d}</p>
          </Reveal>
        ))}
      </div>
      <Reveal><p className="mt-12 text-2xl font-bold">There's a <Em>better</Em> way.</p></Reveal>
    </section>
  );
}

/* S4 */
export function HowItWorks() {
  const steps = [
    ["Your cat does their thing.", "No training tricks. Just a clean, comfy box."],
    ["Pure Purr cleans up — after your cat leaves.", "Sensors pause it instantly if they return."],
    ["You swap the bag. That's it.", "Waste stays sealed in a closed drawer until you're ready."],
  ];
  return (
    <section id="how" className="section-pp scroll-mt-20 bg-mint-soft">
      <div className="container-pp grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal><p className="eyebrow-pp text-muted-foreground">How it works</p><h2 className="h2-pp mt-3">Three steps. <Em>Zero</Em> scooping.</h2></Reveal>
          <ol className="mt-10 space-y-7">
            {steps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 100}><li className="flex gap-5"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-lg font-bold text-paper">{i + 1}</span><div><p className="text-lg font-bold">{t}</p><p className="text-muted-foreground">{d}</p></div></li></Reveal>
            ))}
          </ol>
          <div className="mt-10"><CTA /></div>
        </div>
        <Reveal className="md:col-span-7">
          <div className="grid aspect-video place-items-center rounded-3xl border bg-background text-center shadow-soft">
            <div><span className="mx-auto grid size-16 place-items-center rounded-full bg-ink text-paper"><Play className="size-6 fill-current" /></span><p className="mt-3 font-semibold">Demo video · 15–20s</p><Replace>REPLACE: demo video</Replace></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* S5 */
export function Benefits() {
  const b = [
    { icon: Sparkles, t: "Zero scooping", d: "Cleans itself after every visit." },
    { icon: Wind, t: "Odor, locked away", d: "Sealed drawer with odor control." },
    { icon: ShieldCheck, t: "Safety first", d: "Sensors stop the cycle if your cat comes near." },
    { icon: Volume1, t: "Whisper-quiet", d: "Quiet operation, day or night." },
    { icon: Smartphone, t: "Smart app alerts", d: "Know when your cat visits and when the drawer is full." },
    { icon: Cat, t: "Up to 3 cats, 24 lb each", d: "One box for the whole crew (up to 11 kg each)." },
  ];
  return (
    <section className="section-pp container-pp">
      <Reveal className="text-center"><h2 className="h2-pp">Everything you want. <Em>Nothing</Em> you don't.</h2><p className="mt-3 text-muted-foreground">For cat parents who want a beautiful, fresh home.</p></Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {b.map(({ icon: I, t, d }, i) => (
          <Reveal key={t} delay={i * 60} className="rounded-3xl border p-7 transition-transform hover:-translate-y-0.5 hover:shadow-soft">
            <span className="grid size-12 place-items-center rounded-2xl bg-accent"><I className="size-6" strokeWidth={1.5} /></span>
            <p className="mt-5 text-xl font-bold">{t}</p><p className="mt-1 text-muted-foreground">{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* S6 */
export function Comparison() {
  const rows: [string, string, string][] = [
    ["Effort", "Scoop every day", "Change the bag every 20 days"],
    ["Odor", "Open tray, smell spreads", "Sealed drawer, odor control"],
    ["Safety sensors", "—", "Pause if your cat comes near"],
    ["App alerts", "—", "Visits + full-drawer alerts"],
    ["Multi-cat", "Fills up fast", "Up to 3 cats, 24 lb each"],
    ["Looks", "A plastic tray", "Clean design for any home"],
  ];
  return (
    <section className="section-pp bg-mint-soft">
      <div className="container-pp max-w-4xl">
        <Reveal className="text-center"><h2 className="h2-pp">Scooping vs. <Em>Pure Purr</Em></h2></Reveal>
        <Reveal className="mt-12 overflow-hidden rounded-3xl border bg-background shadow-soft">
          <div className="grid grid-cols-[1fr_1fr_1.2fr] text-sm md:text-base">
            <div className="p-4 md:p-5" /><div className="p-4 font-bold md:p-5">Scooping</div><div className="bg-accent p-4 font-bold md:p-5">Pure Purr</div>
            {rows.map(([k, a, b]) => (
              <div key={k} className="contents">
                <div className="border-t p-4 font-semibold md:p-5">{k}</div>
                <div className="flex gap-2 border-t p-4 text-muted-foreground md:p-5"><X className="size-4 shrink-0 mt-1" strokeWidth={1.5} />{a}</div>
                <div className="flex gap-2 border-t border-ink/10 bg-accent/40 p-4 font-medium md:p-5"><Check className="size-4 shrink-0 mt-1" strokeWidth={2.5} />{b}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* S7 — The offer */
export function Offer() {
  const [ref, seen] = useInView<HTMLDivElement>(0.25);
  const [shown, setShown] = useState(0);
  const items = bundle.items;
  useEffect(() => {
    if (!seen) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(items.length); return; }
    let i = 0; const id = setInterval(() => { i++; setShown(i); if (i >= items.length) clearInterval(id); }, 220);
    return () => clearInterval(id);
  }, [seen, items.length]);
  const done = shown >= items.length;
  const counted = useCountUp(totalValue(), done, 900);
  const [priceIn, setPriceIn] = useState(false);
  useEffect(() => { if (done) { const t = setTimeout(() => setPriceIn(true), 950); return () => clearTimeout(t); } return undefined; }, [done]);

  return (
    <section id="offer" className="on-dark section-pp scroll-mt-16 bg-ink text-paper">
      <div className="container-pp max-w-4xl">
        <div className="text-center">
          <p className="eyebrow-pp text-mint">The complete bundle</p>
          <h2 className="h2-pp mt-3">${totalValue()} of value. <Em>{`Yours for $${bundle.price}.`}</Em></h2>
          <p className="mx-auto mt-4 max-w-xl text-paper/70">Includes 6 free gifts worth ${giftsValue()} — everything your cat needs from day one.</p>
        </div>
        <div ref={ref} className="mt-12 overflow-hidden rounded-3xl border border-paper/10 bg-paper/[0.04]">
          {items.map((it, i) => (
            <div key={it.id} className={`flex items-center gap-4 border-b border-paper/10 p-4 transition-all duration-400 md:p-5 ${i < shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
              <div className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-paper/10 md:size-16">
                {it.id === "box" ? <img src={productImg} alt="" width={64} height={64} loading="lazy" className="size-full object-cover" /> : it.mystery ? (
                  <MysteryBox className="size-7 text-mint" strokeWidth={1.5} />
                ) : <GiftIcon id={it.id} className="size-7 text-mint" />}
                {it.id !== "box" && !it.mystery && <span className="absolute bottom-0.5 text-[8px] font-bold text-paper/50">{"\n"}</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 font-bold leading-tight">{i < shown && <Check className="size-4 shrink-0 text-mint" strokeWidth={2.5} />}{it.name}</p>
                <p className="mt-0.5 text-sm text-paper/60">{it.benefit}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className={`text-sm ${it.free ? "line-through text-paper/50" : "font-bold"}`}>{it.valueLabel ?? `$${it.value}`}</p>
                {it.free && <span className="mt-1 inline-block rounded-full bg-mint px-2.5 py-0.5 text-xs font-bold text-ink">FREE</span>}
              </div>
            </div>
          ))}
          <div className="space-y-3 p-6 text-center md:p-10">
            <p className="text-paper/60">Total value <span className="line-through">${done ? counted : 0}</span></p>
            <p className="text-paper/70">Today</p>
            <p className={`text-7xl font-bold tracking-tight md:text-8xl ${priceIn ? "animate-flash" : "opacity-0"}`}>${bundle.price}</p>
            <span className="inline-block rounded-full bg-mint px-4 py-1.5 text-sm font-bold text-ink">You save ${savings()} ({savingsPct()}%)</span>
            <p className="text-sm text-paper/60">Just ${perDay()}/day over your {bundle.warrantyYears}-year warranty{bundle.installments.show && ` · or ${bundle.installments.count} payments of $${installmentAmount()}`}</p>
            <p className="text-sm text-paper/60">Bought separately, it costs ${savings()} more.</p>
            <div className="pt-4"><CTA label="Yes — send me my Pure Purr + free gifts" full className="md:w-auto" /></div>
            <p className="text-sm text-paper/70">Gifts are added automatically. No codes. Ships together.</p>
            <RiskStrip className="justify-center pt-2 text-paper/70" />
            <PaymentIcons className="justify-center pt-2 text-paper/70" />
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-paper/50">Value = regular price of each item sold separately.</p>
      </div>
    </section>
  );
}

/* S8 */
export function Guarantees() {
  const cards = [
    trust.trial.show && { icon: RotateCcw, t: `${trust.trial.days}-Day Risk-Free Trial`, d: "Let your cat try it at home. Not a fit? Send it back." },
    trust.warranty.show && { icon: ShieldCheck, t: `${trust.warranty.years}-Year Warranty`, d: `${trust.warranty.text}. We've got you covered.` },
    trust.protection.show && { icon: PackageCheck, t: "Purchase Protection", d: `${trust.protection.text}.` },
  ].filter(Boolean) as { icon: typeof Check; t: string; d: string }[];
  return (
    <section className="section-pp container-pp text-center">
      <Reveal><h2 className="h2-pp">Try it risk-free. <Em>Your cat decides.</Em></h2></Reveal>
      <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
        {cards.map(({ icon: I, t, d }, i) => (
          <Reveal key={t} delay={i * 80} className="rounded-3xl border bg-mint-soft p-7">
            <I className="size-8" strokeWidth={1.5} /><p className="mt-5 text-xl font-bold">{t}</p><p className="mt-2 text-muted-foreground">{d}</p>
          </Reveal>
        ))}
      </div>
      {trust.support.show && <p className="mt-8 font-semibold">{trust.support.text}</p>}
      <div className="mt-10"><CTA /></div>
    </section>
  );
}

/* S9 */
export function Reviews() {
  const t = trust.trustpilot;
  return (
    <section id="reviews" className="section-pp scroll-mt-16 bg-mint-soft">
      <div className="container-pp">
        <div className="grid gap-10 md:grid-cols-12">
          {t.show && (
            <Reveal className="md:col-span-4">
              <p className="text-7xl font-bold">{t.rating}</p>
              <Stars className="size-5" />
              <p className="mt-2 text-sm text-muted-foreground">&quot;We don&apos;t say it, our family does.&quot;&nbsp;</p>
              <div className="mt-6 space-y-2">
                {t.distribution.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm"><span className="w-3">{5 - i}</span><div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-ink" style={{ width: `${p}%` }} /></div><span className="w-9 text-right text-muted-foreground">{p}%</span></div>
                ))}
              </div>
              <p className="mt-3"><Replace>REPLACE: official TrustBox + real distribution</Replace></p>
            </Reveal>
          )}
          <div className="md:col-span-8">
            <h2 className="h2-pp">Cat parents <Em>love</Em> it.</h2>
            <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
              {reviews.map((r) => (
                <article key={r.title} className="w-[280px] shrink-0 snap-start rounded-3xl border bg-background p-6 shadow-soft">
                  <Stars />
                  <p className="mt-3 font-bold">{r.title}</p>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{r.body}</p>
                  <p className="mt-4 text-sm font-semibold">{r.name}, {r.city} · cat: {r.cat}</p>
                  {r.verified && !r.placeholder && <p className="mt-1 text-xs font-bold">Verified buyer</p>}
                </article>
              ))}
            </div>
          </div>
        </div>

        <h3 className="h2-pp mt-20 text-center">Purr-approved in <Em>real homes.</Em></h3>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {ugcVideos.map((v) => (
            <div key={v.handle} className="relative grid aspect-[9/16] place-items-center overflow-hidden rounded-3xl border bg-background">
              <Play className="size-8" strokeWidth={1.5} />
              <span className="absolute left-3 top-3"><Replace>REPLACE</Replace></span>
              <span className="absolute bottom-3 left-3 text-xs font-semibold">{v.handle}</span>
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[10px]"><Volume2 className="size-3" />{""}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 md:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="grid aspect-square place-items-center rounded-2xl border bg-background"><ImageIcon className="size-5 text-muted-foreground" strokeWidth={1.5} /><span className="sr-only">Customer photo placeholder</span></div>)}
        </div>
        <p className="mt-3 text-center"><Replace>REPLACE: real customer videos & photos</Replace></p>
      </div>
    </section>
  );
}

/* S10 */
function Counter({ to, suffix = "", decimals = 0, label }: { to: number; suffix?: string; decimals?: number; label: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const v = useCountUp(to * 10 ** decimals, seen);
  return <div ref={ref} className="text-center"><p className="text-4xl font-bold md:text-5xl">{(v / 10 ** decimals).toFixed(decimals)}{suffix}</p><p className="mt-1 text-sm text-paper/70">{label}</p></div>;
}
const brandLogos = [
  { name: "Forbes", src: forbesLogo.url },
  { name: "Animal Planet", src: animalPlanetLogo.url },
  { name: "The Dodo", src: dodoLogo.url },
  { name: "Modern Cat", src: modernCatLogo.url },
  { name: "Cats.com", src: catsComLogo.url },
];
/* S10a — press/sponsor marquee only */
export function Recognition() {
  return (
    <section id="recognition" className="on-dark bg-ink text-paper pt-16 pb-7 md:pt-28 md:pb-7">
      <div className="container-pp">
        <Reveal className="text-center"><h2 className="h2-pp">Recognized for <Em>innovation</Em> & safety</h2></Reveal>
      </div>
      <div className="brand-marquee mt-12 overflow-hidden" aria-label="Brands that feature us: Forbes, Animal Planet, The Dodo, Modern Cat, Cats.com">
        <div className="brand-track flex w-max items-center">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-16 px-8 md:gap-24 md:px-12" aria-hidden={k === 1 || undefined}>
              {brandLogos.map((b) => <img key={b.name} src={b.src} alt={k === 0 ? b.name : ""} loading="lazy" className="brand-logo h-14 w-auto object-contain md:h-20" />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* S10b — numbers, heritage & giving */
export function TrustNumbers() {
  return (
    <section id="trust-numbers" className="on-dark bg-ink text-paper pt-7 pb-16 md:pt-7 md:pb-28">
      <div className="container-pp">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {trust.community.show && <Counter to={trust.community.count} suffix="+" label={trust.community.label} />}
          {trust.trustpilot.show && <Counter to={trust.trustpilot.rating} decimals={1} suffix="/5" label="Trustpilot rating" />}
          {trust.warranty.show && <Counter to={trust.warranty.years} suffix="-year" label="warranty" />}
          {trust.trial.show && <Counter to={trust.trial.days} suffix="-day" label="risk-free trial" />}
        </div>
        <div className="mt-14 grid gap-8 border-t border-paper/15 pt-10 md:grid-cols-2">
          <div className="flex items-start gap-4"><Cat className="size-8 shrink-0 text-mint" strokeWidth={1.5} /><div><p className="text-3xl font-bold">{trust.heritage.years}+ years</p><p className="mt-2 text-paper/70">{trust.heritage.text}</p></div></div>
          <div className="flex items-start gap-4"><Gift className="size-8 shrink-0 text-mint" strokeWidth={1.5} /><div><p className="text-3xl font-bold">{trust.giving.percent}% for homeless cats</p><p className="mt-2 text-paper/70">{trust.giving.text}</p></div></div>
        </div>
      </div>
    </section>
  );
}

/* Accordion */
function Acc({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <div className="divide-y rounded-3xl border bg-background">
      {items.map((it) => (
        <details key={it.q} className="group px-6">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-bold">{it.q}<ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" strokeWidth={1.5} /></summary>
          <div className="pb-5 text-muted-foreground">{it.a}</div>
        </details>
      ))}
    </div>
  );
}

/* S11 */
export function InTheBox() {
  return (
    <section className="section-pp bg-mint-soft">
      <div className="container-pp max-w-3xl">
        <Reveal className="text-center"><h2 className="h2-pp">What's <Em>included</Em></h2></Reveal>
        <div className="mt-10">
          <Acc items={[
            { q: "What's in the box", a: <ul className="list-disc space-y-1 pl-5">{bundle.items.map((i) => <li key={i.id}>{i.name}</li>)}</ul> },
            { q: "Specs", a: <ul className="list-disc space-y-1 pl-5"><li>Up to 3 cats per box</li><li>Up to 24 lb (11 kg) per cat</li><li>Sealed waste drawer with odor control</li><li>Safety sensors · quiet operation · app alerts</li><li>Dimensions, weight, power: <Replace /></li></ul> },
            { q: "Care", a: "Fill with clumping litter up to the MAX line. Swap the waste bag when the app says the drawer is full. Wipe down as needed. Full care guide: [REPLACE]." },
          ]} />
        </div>
      </div>
    </section>
  );
}

/* S12 */
export function FAQ() {
  const items = [
    { q: "Is it safe for my cat?", a: "Yes. The cleaning cycle only starts after your cat leaves. Safety sensors stop the cycle right away if your cat comes near." },
    { q: "Will my cat actually use it?", a: "Most cats settle in quickly. With 2+ cats or senior cats, it can take 2–4 weeks. We suggest starting in manual mode so they get used to it first." },
    { q: "Does it work for multiple cats?", a: "Yes. One Pure Purr handles up to 3 cats, up to 24 lb (11 kg) each." },
    { q: "What litter do I use?", a: "Any clumping litter, filled up to the MAX line. Avoid tofu litter that falls apart. Your first 11 lb bag is included free." },
    { q: "How loud is it?", a: "It runs quietly, so it won't bother you or your cat." },
    { q: "How do I empty it?", a: "Waste is sealed in a closed drawer. Just swap the bag now and then — the app tells you when it's full." },
    { q: "How do the free gifts work?", a: "They're added to your order automatically. No codes. Everything ships together." },
    { q: "Shipping?", a: <>{trust.shipping.label}. We ship worldwide.</> },
    { q: "Returns and warranty?", a: `You get a ${trust.trial.days}-day risk-free trial and a ${trust.warranty.years}-year warranty (${trust.warranty.text.toLowerCase()}).` },
    { q: "What's in the Mystery Box?", a: "A surprise! Hand-picked for you and your cat." },
  ];
  return (
    <section id="faq" className="section-pp container-pp max-w-3xl scroll-mt-16">
      <Reveal className="text-center"><h2 className="h2-pp">Questions? <Em>Answered.</Em></h2></Reveal>
      <div className="mt-10"><Acc items={items} /></div>
    </section>
  );
}

/* S13 */
export function FinalCTA() {
  return (
    <section id="final" className="on-dark relative overflow-hidden bg-ink text-paper">
      <img src={finalImg} alt="A relaxed woman reading on the sofa with her cat asleep on her lap" width={1600} height={1008} loading="lazy" className="absolute inset-0 size-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" aria-hidden />
      <div className="section-pp container-pp relative">
        <div className="max-w-2xl">
          <h2 className="h2-pp">Give your cat the cleanest box in the house. <Em>Give yourself your weekends back.</Em></h2>
          <p className="mt-5 text-paper/75">The Pure Purr Complete Bundle: self-cleaning litter box + 6 free gifts worth ${giftsValue()}.</p>
          <div className="mt-6 flex items-end gap-3"><span className="text-5xl font-bold">${bundle.price}</span><span className="pb-1.5 text-paper/60 line-through">${totalValue()}</span><span className="mb-2 rounded-full bg-mint px-3 py-1 text-sm font-bold text-ink">Save ${savings()}</span></div>
          <div className="mt-8"><CTA label={abTest.cta.b} /></div>
          <RiskStrip className="mt-6 text-paper/75" />
        </div>
      </div>
    </section>
  );
}

/* S14 */
export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container-pp flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div><p className="text-xl font-bold">Pure <Em>Purr</Em></p><p className="mt-1 text-sm text-muted-foreground">{brand.tagline}</p></div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Policies">
          {["Shipping policy", "Returns", "Warranty", "Privacy", "Terms"].map((l) => <a key={l} href="#" className="hover:text-foreground">{l}{l === "Terms" ? <br /> : " "}<span className="sr-only">[REPLACE link]</span></a>)}
          <a href={`mailto:${brand.email}`} className="hover:text-foreground">Contact: {brand.email}</a>
        </nav>
      </div>
      <div className="container-pp mt-8 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
        <PaymentIcons className="text-muted-foreground" />
        <p className="text-sm text-muted-foreground">© Copyright {brand.year},{"\u00a0"}Pure Purr</p>
      </div>
    </footer>
  );
}

/* Sticky mobile bar */
export function StickyMobile() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => {
      const final = document.getElementById("final");
      const pastHero = window.scrollY > 700;
      const atFinal = final ? final.getBoundingClientRect().top < window.innerHeight : false;
      setShow(pastHero && !atFinal);
    };
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className={`fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 p-3 backdrop-blur-xl transition-transform md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}>
      <div className="flex items-center gap-3">
        <div className="text-sm leading-tight"><p className="font-bold">${bundle.price}</p><p className="text-muted-foreground">6 free gifts</p></div>
        <CTA label="Get yours" full className="flex-1" />
      </div>
    </div>
  );
}
