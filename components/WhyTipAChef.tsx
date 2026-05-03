"use client";

import { useEffect, useRef } from "react";

const VS = [
  { feature: "100% tip goes to chef",         us: true,  bmac: false, patreon: false },
  { feature: "Restaurant QR integration",      us: true,  bmac: false, patreon: false },
  { feature: "Back-of-house kitchen tipping",  us: true,  bmac: false, patreon: false },
  { feature: "Instant payouts",                us: true,  bmac: true,  patreon: false },
  { feature: "Chef-specific profiles",         us: true,  bmac: false, patreon: false },
  { feature: "Monthly memberships",            us: true,  bmac: true,  patreon: true  },
  { feature: "Free to sign up",                us: true,  bmac: true,  patreon: false },
  { feature: "We never email your supporters", us: true,  bmac: true,  patreon: false },
  { feature: "Human customer support",         us: true,  bmac: true,  patreon: false },
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

function Check({ val }: { val: boolean }) {
  return val ? (
    <div className="w-6 h-6 rounded-full bg-ember/15 border border-ember/30 flex items-center justify-center mx-auto">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
  ) : (
    <div className="w-6 h-6 rounded-full bg-white/5 border border-white/8 flex items-center justify-center mx-auto">
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </div>
  );
}

export default function WhyTipAChef() {
  const headRef = useRef<HTMLHeadingElement>(null);
  useReveal(headRef as React.RefObject<HTMLElement>);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, #C9A96E 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto px-6">
        <p className="eyebrow mb-4">Why Tip a Chef</p>
        <h2
          ref={headRef}
          className="reveal font-display text-ivory leading-tight mb-10"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 300 }}
        >
          Built for kitchens.<br />
          <span className="text-ember-gradient italic">Not creators in general.</span>
        </h2>

        <div className="glass rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 font-sans text-ivory/35 text-xs font-normal tracking-wide w-1/2">Feature</th>
                  <th className="px-4 py-4 text-center">
                    <span className="font-sans text-ember text-xs font-semibold">Tip a Chef</span>
                  </th>
                  <th className="px-4 py-4 text-center">
                    <span className="font-sans text-ivory/35 text-xs">Buy Me a Coffee</span>
                  </th>
                  <th className="px-4 py-4 text-center">
                    <span className="font-sans text-ivory/35 text-xs">Patreon</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {VS.map((row, i) => (
                  <tr key={row.feature}
                    className={`border-b border-white/[0.04] transition-colors hover:bg-white/[0.015] ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                    <td className="px-6 py-3.5 font-sans text-ivory/65 text-sm">{row.feature}</td>
                    <td className="px-4 py-3.5 text-center"><Check val={row.us} /></td>
                    <td className="px-4 py-3.5 text-center"><Check val={row.bmac} /></td>
                    <td className="px-4 py-3.5 text-center"><Check val={row.patreon} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 text-center border-t border-white/5">
            <a href="#download" className="press inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ember text-graphite font-sans font-semibold text-sm tracking-wide hover:bg-ember-light transition-all duration-300 shadow-lg shadow-ember/25">
              Start free today
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
