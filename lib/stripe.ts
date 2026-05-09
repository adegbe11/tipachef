import Stripe from "stripe";

// Lazy singleton — only instantiated on first actual call (at runtime),
// not at module import time (which happens during the build).
let _stripe: Stripe | null = null;

function getInstance(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY environment variable is not configured.");
    _stripe = new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop: string | symbol) {
    return (getInstance() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
