import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { CartProvider } from "@/components/purr/cart";
import { PawFlashes } from "@/components/purr/paw-flashes";
import { TopBar, Header, Hero, ProofStrip, Problem, HowItWorks, Benefits, Comparison, Offer, Guarantees, Reviews, Recognition, InTheBox, FAQ, FinalCTA, Footer, StickyMobile } from "@/components/purr/sections";
import { bundle, totalValue } from "@/config/site";
import { track } from "@/lib/track";

const title = "Pure Purr Self-Cleaning Litter Box — Never Scoop Again";
const description = `The self-cleaning litter box that locks away odor. Complete Bundle with 6 free gifts: $${bundle.price} ($${totalValue()} value). Fast free shipping worldwide in 3–5 days, 30-day trial, 3-year warranty.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: bundle.name,
        brand: { "@type": "Brand", name: "Pure Purr" },
        description,
        offers: { "@type": "Offer", price: bundle.price, priceCurrency: "USD", availability: "https://schema.org/InStock" },
      }),
    }],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    track("ViewContent", { value: bundle.price, currency: "USD" });
    const marks = new Set<number>();
    const f = () => {
      const p = Math.round(((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100);
      for (const m of [25, 50, 75, 100]) if (p >= m && !marks.has(m)) { marks.add(m); track("ScrollDepth", { percent: m }); }
    };
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <CartProvider>
      <PawFlashes />
      <TopBar />
      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <Problem />
        <HowItWorks />
        <Benefits />
        <Comparison />
        <Offer />
        <Guarantees />
        <Reviews />
        <Recognition />
        <InTheBox />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobile />
    </CartProvider>
  );
}
