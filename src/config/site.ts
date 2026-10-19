/**
 * PURE PURR — SINGLE SOURCE OF TRUTH
 * Prices, values and every trust claim live here.
 * Set `show: false` (or leave a value unconfirmed) to hide its block.
 * Anything marked [REPLACE] must be swapped for real, verifiable data before launch.
 */

export const brand = {
  name: "Pure Purr",
  tagline: "Less scooping. More purring.",
  email: "hello@purepurr.com [REPLACE]",
  year: 2026,
};

export const abTest = {
  // A/B-ready variants. Pick with ?h1=b / ?cta=b / ?price=b
  h1: { a: "Never scoop again.", b: "Less scooping. More purring." },
  cta: { a: "Claim my Pure Purr + free gifts", b: "Yes, I want my weekends back" },
  priceFormat: { a: "perDay", b: "installments" } as const,
};

export type BundleItem = {
  id: string;
  name: string;
  benefit: string;
  value: number;
  valueLabel?: string;
  free: boolean;
  mystery?: boolean;
};

export const bundle = {
  name: "Pure Purr Complete Bundle",
  price: 499,
  warrantyYears: 3,
  installments: { show: false, count: 4, provider: "Klarna / Shop Pay [REPLACE: enable only if active]" },
  items: [
    { id: "box", name: "Pure Purr Self-Cleaning Litter Box", benefit: "The box that cleans itself. ", value: 599, free: false },
    { id: "stairs", name: "Purr Steps Cat Stairs", benefit: "Easy, comfortable access for kittens, seniors and small cats.", value: 69, free: true },
    { id: "bags", name: "Waste Bags, 5-pack", benefit: "Everything you need to start swapping, not scooping.", value: 29, free: true },
    { id: "litter", name: "Pure Purr Clumping Litter, 11 lb (5 kg)", benefit: "Fill up and go. Ready on day one.", value: 29, free: true },
    { id: "fresh", name: "Soft Vanilla Freshener", benefit: "Proven by sciencie: they naturally love vainilla.", value: 25, free: true },
    { id: "ebook", name: "The Purr Method: Cat Massage Therapy eBook", benefit: "A step-by-step guide to massaging your cat the right way.  So why not pamper them?", value: 29, free: true },
    { id: "mystery", name: "Mystery Gift Box", benefit: "A hand-picked surprise for you and your cat.", value: 39, valueLabel: "$39+", free: true, mystery: true },
  ] as BundleItem[],
  orderBump: { show: true, name: "Extra Waste Bags, 5-pack", price: 19 },
};

export const totalValue = () => bundle.items.reduce((s, i) => s + i.value, 0);
export const giftItems = () => bundle.items.filter((i) => i.free);
export const giftsValue = () => giftItems().reduce((s, i) => s + i.value, 0);
export const savings = () => totalValue() - bundle.price;
export const savingsPct = () => Math.round((savings() / totalValue()) * 100);
export const perDay = () => (bundle.price / (bundle.warrantyYears * 365)).toFixed(2);
export const installmentAmount = () => (bundle.price / bundle.installments.count).toFixed(2);

export const promo = {
  previewMinutes: 18,
  // Real deadline only. Leave show:false until you have a true date.
  giftsDeadline: { show: false, date: "[REPLACE: real date]" },
};

export const trust = {
  trustpilot: { show: true, rating: 4.8, reviews: '["We don\'t say it, our family does."', url: "[REPLACE: Trustpilot URL]", distribution: [88, 8, 2, 1, 1] },
  warranty: { show: true, years: 3, text: "Repair or replacement" },
  trial: { show: true, days: 30 },
  protection: { show: true, text: "Refund or replacement if it arrives damaged or never arrives" },
  shipping: { show: true, free: true, minDays: 3, maxDays: 5, worldwide: true, eta: "3–5 days worldwide", label: "Fast free shipping (3–5 days worldwide)" },
  support: { show: false, text: "Real humans. Replies within 24h." },
  community: { show: true, count: 9000, label: "happy cat parents" },
  heritage: { years: 10, text: "Over 10 years perfecting products for your beloved felines." },
  giving: { percent: 4, text: "Thanks to your purchase, we donate 4% to homeless cats." },
  positioning: { show: false, text: "Fast becoming the litter box cats and their owners love most in the U.S." },
  awards: {
    show: true,
    items: [
      { name: "CES Innovation Awards", detail: "[REPLACE: exact category]" },
      { name: "Pet Innovation Awards", detail: "[REPLACE: exact name & category]" },
      { name: "Pet & Animal Tech Award", detail: "[REPLACE: exact name & category]" },
    ],
  },
  certification: { show: true, name: "Feline safety certification", detail: "[REPLACE: body & number]" },
  press: {
    show: true,
    items: [
      { name: "cats.com", url: "[REPLACE]" },
      { name: "Forbes", url: "[REPLACE]" },
      { name: "Wired", url: "[REPLACE]" },
    ],
  },
};

export type Review = { title: string; body: string; name: string; city: string; cat: string; verified: boolean; placeholder: boolean };

// Real reviews only. Placeholders show a visible [REPLACE WITH REAL REVIEW] tag.
export const reviews: Review[] = [
  "No more scooping",
  "Odor gone",
  "Multi-cat home",
  "My cat adapted fast",
  "Quiet & stylish",
  "App alerts & easy setup",
].map((t) => ({ title: t, body: "[REPLACE WITH REAL REVIEW] Customer's own words go here, two short lines max.", name: "[Name]", city: "[City]", cat: "[Cat's name]", verified: false, placeholder: true }));

export const ugcVideos = Array.from({ length: 6 }, (_, i) => ({ handle: `@[REPLACE_${i + 1}]`, src: "", poster: "" }));

export const analytics = {
  ga4: "", // G-XXXX [REPLACE]
  metaPixel: "", // [REPLACE]
  tiktokPixel: "", // [REPLACE]
  clarity: "", // [REPLACE]
};
