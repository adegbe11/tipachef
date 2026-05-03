"use client";

import { useEffect, useRef } from "react";

const FEATURES = [
  { title: "Personal QR code",    body: "Download and display it anywhere. Diners scan and tip you directly." },
  { title: "Instant payouts",     body: "Money in your account within minutes. Link your bank once." },
  { title: "Earnings dashboard",  body: "Track tips by shift, week or venue. Always know what you're owed." },
  { title: "Diner messages",      body: "Every tip comes with a note. Read what your cooking means to people." },
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

export default function ForChefs() {
  const headRef = useRef<HTMLHeadingElement>(null);
  useReveal(headRef as React.RefObject<HTMLElement>);

  return (
    <section id="for-chefs" className="py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)" }}
      />

      <div className="content-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <p className="eyebrow mb-4">For chefs</p>
            <h2
              ref={headRef}
              className="reveal fluid-heading font-display text-ivory leading-tight mb-5"
              style={{ fontWeight: 300 }}
            >
              Front-of-house gets tipped.<br />
              <span className="text-ember-gradient italic">Now you do too.</span>
            </h2>
            <p className="font-sans text-ivory/55 leading-relaxed font-light mb-8 max-w-md text-sm">
              Set up in 2 minutes. Move between kitchens, pop-ups and events — your profile and QR travel with you.
            </p>

            <div className="space-y-0 mb-8">
              {FEATURES.map((f, i) => (
                <div key={f.title} className={`flex gap-4 py-4 ${i < FEATURES.length - 1 ? "border-b border-white/5" : ""}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-ember mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-ivory text-sm font-medium mb-0.5">{f.title}</p>
                    <p className="font-sans text-ivory/40 text-xs leading-relaxed">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#download"
              className="press inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ember text-graphite font-sans font-semibold text-sm tracking-wide hover:bg-ember-light transition-all duration-300"
            >
              Claim your chef profile
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Right: earnings mockup */}
          <div className="glass rounded-3xl p-8 relative overflow-hidden">
            <div
              className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)" }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-ember/20 border border-ember/30 flex items-center justify-center text-lg">
                  🇬🇧
                </div>
                <div>
                  <p className="font-sans text-ivory font-medium text-sm">Chef Marco Esposito</p>
                  <p className="font-sans text-ivory/40 text-xs">Head Chef · The Meridian, London</p>
                </div>
                <div className="ml-auto glass rounded-xl px-3 py-1.5">
                  <span className="text-ember text-xs font-sans font-medium">● Live</span>
                </div>
              </div>

              <div className="space-y-0 mb-6">
                {[
                  { label: "Tonight's service", amount: "$47" },
                  { label: "Saturday lunch",    amount: "$83" },
                  { label: "Friday dinner",     amount: "$62" },
                ].map((row, i, arr) => (
                  <div key={row.label} className={`flex items-center justify-between py-4 ${i < arr.length - 1 ? "border-b border-white/5" : ""}`}>
                    <span className="font-sans text-ivory/55 text-sm">{row.label}</span>
                    <span className="font-sans text-ivory text-sm font-medium">{row.amount}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                <span className="eyebrow text-ivory/30">This week</span>
                <span className="font-display text-ember text-2xl font-light">$192</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
