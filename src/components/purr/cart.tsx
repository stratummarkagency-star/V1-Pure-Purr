import { createContext, useContext, useState, type ReactNode } from "react";
import { X, Check, ShieldCheck, Gift, Lock, Loader2 } from "lucide-react";
import { bundle, giftItems, savings, trust } from "@/config/site";
import { track } from "@/lib/track";
import productImg from "@/assets/product.jpg";

type Ctx = { open: boolean; inCart: boolean; addBundle: () => void; setOpen: (b: boolean) => void };
const CartCtx = createContext<Ctx | null>(null);
export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("CartProvider missing");
  return c;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [inCart, setInCart] = useState(false);
  const addBundle = () => {
    setInCart(true);
    setOpen(true);
    track("AddToCart", { value: bundle.price, currency: "USD" });
  };
  return (
    <CartCtx.Provider value={{ open, inCart, addBundle, setOpen }}>
      {children}
      <CartDrawer />
    </CartCtx.Provider>
  );
}

function CartDrawer() {
  const { open, setOpen, inCart } = useCart();
  const [bump, setBump] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const subtotal = bundle.price + (bump ? bundle.orderBump.price : 0);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Your cart">
      <button aria-label="Close cart" className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-soft">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-bold">{checkout ? "Checkout" : "Your cart"}</h2>
          <button onClick={() => setOpen(false)} className="grid size-12 place-items-center rounded-full hover:bg-muted" aria-label="Close"><X className="size-5" strokeWidth={1.5} /></button>
        </header>
        {checkout ? <Checkout total={subtotal} onBack={() => setCheckout(false)} /> : !inCart ? <p className="p-6 text-muted-foreground">Your cart is empty.</p> : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="mb-4 rounded-2xl bg-accent px-4 py-3 text-sm font-bold">You're saving ${savings()} today</div>
              <div className="flex gap-4">
                <img src={productImg} alt="Pure Purr Self-Cleaning Litter Box" width={80} height={80} className="size-20 rounded-2xl border object-cover" />
                <div className="flex-1">
                  <p className="font-bold leading-tight">{bundle.name}</p>
                  <p className="text-sm text-muted-foreground">Qty 1</p>
                </div>
                <p className="font-bold">${bundle.price}</p>
              </div>
              <ul className="mt-4 space-y-2 border-l-2 border-accent pl-4">
                {giftItems().map((g) => (
                  <li key={g.id} className="flex items-start justify-between gap-3 text-sm">
                    <span className="inline-flex items-start gap-2"><Gift className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden />{g.name}</span>
                    <span className="shrink-0 font-semibold">$0.00</span>
                  </li>
                ))}
              </ul>
              {bundle.orderBump.show && (
                <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-sm">
                  <input type="checkbox" checked={bump} onChange={(e) => setBump(e.target.checked)} className="size-5 accent-[var(--ink)]" />
                  <span className="flex-1">Add {bundle.orderBump.name}</span>
                  <span className="font-bold">+${bundle.orderBump.price}</span>
                </label>
              )}
            </div>
            <footer className="space-y-3 border-t px-6 py-5">
              <div className="flex justify-between text-sm"><span>Shipping</span><span className="font-semibold">Free</span></div>
              <div className="flex justify-between text-lg font-bold"><span>Subtotal</span><span>${subtotal}</span></div>
              <button onClick={() => { setCheckout(true); track("InitiateCheckout", { value: subtotal, currency: "USD" }); }} className="btn-cta w-full">Check out securely</button>
              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4" strokeWidth={1.5} />{trust.trial.days}-day risk-free · {trust.warranty.years}-year warranty</p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

function Checkout({ total, onBack }: { total: number; onBack: () => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const err: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(String(f.get("email")))) err["email"] = "Please check your email address.";
    for (const k of ["name", "address", "city", "zip"]) if (!String(f.get(k) ?? "").trim()) err[k] = "We need this to ship your Pure Purr.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setState("loading");
    setTimeout(() => { setState("done"); track("Purchase", { value: total, currency: "USD" }); }, 900);
  };
  if (state === "done") return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-accent"><Check className="size-7" /></span>
      <p className="text-xl font-bold">Demo order received</p>
      <p className="text-sm text-muted-foreground">Payments aren't connected yet <span className="tag-replace">[REPLACE: connect payments]</span></p>
    </div>
  );
  const field = (name: string, label: string, auto: string, type = "text") => (
    <label className="block text-sm font-medium">
      {label}
      <input name={name} type={type} autoComplete={auto} className="mt-1 block h-12 w-full rounded-xl border border-input px-3 text-base" aria-invalid={!!errors[name]} />
      {errors[name] && <span className="mt-1 block text-xs text-destructive">{errors[name]}</span>}
    </label>
  );
  return (
    <form onSubmit={submit} className="flex flex-1 flex-col overflow-y-auto px-6 py-5" noValidate>
      <p className="eyebrow-pp mb-2 text-center text-muted-foreground">Express checkout</p>
      <div className="grid grid-cols-2 gap-2">
        {["Shop Pay", "Apple Pay", "Google Pay", "PayPal"].map((p) => <button type="button" key={p} className="h-12 rounded-xl border font-bold text-sm hover:bg-muted">{p}</button>)}
      </div>
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or pay with card<span className="h-px flex-1 bg-border" /></div>
      <div className="space-y-3">
        {field("email", "Email", "email", "email")}
        {field("name", "Full name", "name")}
        {field("address", "Address", "street-address")}
        <div className="grid grid-cols-2 gap-3">{field("city", "City", "address-level2")}{field("zip", "ZIP code", "postal-code")}</div>
      </div>
      <button className="btn-cta mt-6 w-full" disabled={state === "loading"}>
        {state === "loading" ? <Loader2 className="size-5 animate-spin" /> : <Lock className="size-4" />} Pay ${total}
      </button>
      <button type="button" onClick={onBack} className="mt-3 text-sm underline">Back to cart</button>
    </form>
  );
}
