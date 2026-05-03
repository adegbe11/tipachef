"use client";

import { useEffect, useRef } from "react";

const POINTS = [
  { label: "Zero cost to you",          body: "Free forever for restaurants. Chefs sign up themselves. You just display the QR." },
  { label: "No tip-pooling disputes",   body: "Every chef is tipped directly. You're completely out of the equation." },
  { label: "Staff retention",           body: "A tipped chef stays. Restaurants using Tip a Chef report measurably lower churn." },
  { label: "Branded QR experience",     body: "Custom pages with your logo and colours. Seamless for your guests." },
];

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add("visible"),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

export default function ForRestaurants() {
  const headRef = useRef<HTMLHeadingElement>(null);
  useReveal(headRef as React.RefObject<HTMLElement>);

  return (
    <section id="restaurants" className="py-20 md:py-28 bg-charcoal/30 relative overflow-hidden">
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl wide:max-w-[1400px] mx-auto px-4 xs:px-5 md:px-6 wide:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <p className="eyebrow mb-4">For restaurants</p>
            <h2
              ref={headRef}
              className="reveal fluid-heading font-display text-ivory leading-tight mb-5"
              style={{ fontWeight: 300 }}
            >
              Happier kitchens.<br />
              <span className="text-ember-gradient italic">Better restaurants.</span>
            </h2>
            <p className="font-sans text-ivory/55 leading-relaxed font-light mb-8 max-w-md text-sm">
              Set up in under 10 minutes. No hardware, no POS integration. Register your chefs, print the QRs, done.
            </p>

            <div className="space-y-0 mb-8">
              {POINTS.map((pt, i) => (
                <div key={pt.label} className={`flex gap-4 py-4 ${i < POINTS.length - 1 ? "border-b border-white/5" : ""}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-ivory text-sm font-medium mb-0.5">{pt.label}</p>
                    <p className="font-sans text-ivory/40 text-xs leading-relaxed">{pt.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="mailto:restaurants@tipachef.com"
              className="press inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-ember/40 text-ember font-sans font-medium text-sm tracking-wide hover:bg-ember/10 transition-all duration-300"
            >
              Partner with us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Right: quick facts */}
          <div className="glass rounded-3xl p-8">
            <p className="eyebrow text-ivory/30 mb-6">The numbers</p>

            <div className="space-y-0">
              {[
                { label: "Setup time",          value: "Under 10 min" },
                { label: "Cost to restaurant",  value: "Free forever" },
                { label: "Our cut",             value: "2.9% + processing" },
                { label: "Payout speed",         value: "Within minutes" },
                { label: "Devices supported",   value: "Any phone, any browser" },
              ].map((row, i, arr) => (
                <div key={row.label} className={`flex items-center justify-between py-4 ${i < arr.length - 1 ? "border-b border-white/5" : ""}`}>
                  <span className="font-sans text-ivory/50 text-sm">{row.label}</span>
                  <span className="font-sans text-ivory text-sm font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
