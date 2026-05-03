"use client";

import { useEffect, useRef } from "react";

const TIERS = [
  {
    emoji: "🧂",
    label: "A pinch of sea salt",
    amount: "$3",
    perks: ["A warm thank-you message", "Name on the supporter wall"],
    highlight: false,
  },
  {
    emoji: "🌿",
    label: "A bunch of fresh herbs",
    amount: "$5",
    perks: ["Everything above", "Access to exclusive recipe PDF", "Behind-the-scenes kitchen photo"],
    highlight: true,
  },
  {
    emoji: "🍷",
    label: "A glass of good wine",
    amount: "$10",
    perks: ["Everything above", "Monthly cook-along video", "Early access to new recipes"],
    highlight: false,
  },
  {
    emoji: "🥩",
    label: "Tonight's wagyu cut",
    amount: "$25",
    perks: ["Everything above", "Personalised shoutout video", "1-on-1 technique Q&A (monthly)"],
    highlight: false,
  },
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

export default function TipTiers() {
  const headRef = useRef<HTMLHeadingElement>(null);
  useReveal(headRef as React.RefObject<HTMLElement>);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, #C9A96E 0%, transparent 70%)" }} />

      <div className="max-w-7xl wide:max-w-[1400px] mx-auto px-4 xs:px-5 md:px-6 wide:px-8">
        <p className="eyebrow mb-4">Tip tiers</p>
        <h2
          ref={headRef}
          className="reveal fluid-heading font-display text-ivory leading-tight mb-4"
          style={{ fontWeight: 300 }}
        >
          Give diners a reason to{" "}
          <span className="text-ember-gradient italic">tip more.</span>
        </h2>
        <p className="font-sans text-ivory/45 text-base mb-12 max-w-xl">
          Set custom perks for each tip level. A recipe PDF, a cook-along invite, a personal shoutout — turn a one-time tip into a real relationship.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIERS.map((t) => (
            <div
              key={t.amount}
              className="relative rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300"
              style={{
                background: t.highlight ? "linear-gradient(135deg, rgba(201,169,110,0.08) 0%, rgba(201,169,110,0.04) 100%)" : "rgba(255,255,255,0.03)",
                border: t.highlight ? "1px solid rgba(201,169,110,0.35)" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-sans font-semibold px-3 py-1 rounded-full"
                    style={{ background: "#C9A96E", color: "#111" }}>
                    Most popular
                  </span>
                </div>
              )}

              <span className="text-3xl">{t.emoji}</span>

              <div>
                <p className="font-display text-ember text-3xl font-light">{t.amount}</p>
                <p className="font-sans text-ivory/50 text-xs mt-1">{t.label}</p>
              </div>

              <ul className="space-y-2 flex-1">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span className="font-sans text-ivory/60 text-xs leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center font-sans text-ivory/30 text-sm mt-8">
          You set the perks. Diners choose what feels right. 100% goes to you.
        </p>
      </div>
    </section>
  );
}
