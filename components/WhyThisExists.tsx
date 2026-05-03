"use client";

import { useEffect, useRef } from "react";

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add("visible"),
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

const TRUTHS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    heading: "They feed hundreds.",
    body: "A single chef shapes hundreds of meals a week. Almost none of them know his name.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    heading: "Appreciation stops at the pass.",
    body: "Tips go to servers. Compliments go to managers. The kitchen stays invisible.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    heading: "We built the bridge.",
    body: "A direct line from your gratitude to the hands that earned it. That's all this is.",
  },
];

export default function WhyThisExists() {
  const lineRef = useRef<HTMLDivElement>(null);
  useReveal(lineRef as React.RefObject<HTMLElement>);

  return (
    <section className="py-28 md:py-44 relative overflow-hidden bg-charcoal/30">

      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,169,110,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="content-container">

        {/* ── Manifesto block ────────────────────────────────── */}
        <div className="max-w-4xl mx-auto text-center mb-20 md:mb-28">
          <p className="eyebrow mb-8">Why this exists</p>

          {/* Staggered headline — typography IS the visual */}
          <div className="space-y-1 mb-10">
            <p
              className="font-display text-ivory/30 leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 4rem)", fontWeight: 300 }}
            >
              Behind every dish you&rsquo;ve ever loved,
            </p>
            <p
              className="font-display text-ivory leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 4rem)", fontWeight: 300 }}
            >
              someone gave everything.
            </p>
            <p
              className="font-display italic leading-tight"
              style={{
                fontSize: "clamp(1.8rem, 4.5vw, 4rem)",
                fontWeight: 300,
                background: "linear-gradient(135deg, #C9A96E 0%, #E8C97A 50%, #C9A96E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              They never heard your thanks.
            </p>
          </div>

          {/* Thin ember rule */}
          <div ref={lineRef} className="reveal flex items-center gap-4 justify-center mb-10">
            <div className="h-px flex-1 max-w-[80px] bg-ember/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-ember/40" />
            <div className="h-px flex-1 max-w-[80px] bg-ember/20" />
          </div>

          <p
            className="font-sans text-ivory/45 leading-relaxed font-light max-w-md mx-auto"
            style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)" }}
          >
            Chefs work behind the scenes. Appreciation rarely reaches them.
            We help you support the people who make your food memorable.
          </p>
        </div>

        {/* ── Three truths ───────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.05] rounded-2xl overflow-hidden">
          {TRUTHS.map((t) => (
            <div
              key={t.heading}
              className="bg-graphite group px-8 py-10 flex flex-col gap-5 hover:bg-charcoal/60 transition-colors duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-ember/10 border border-ember/20 flex items-center justify-center text-ember flex-shrink-0 group-hover:bg-ember/15 transition-colors duration-300">
                {t.icon}
              </div>
              <div>
                <p className="font-display text-ivory italic leading-snug mb-2" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)", fontWeight: 300 }}>
                  {t.heading}
                </p>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed font-light">
                  {t.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Closer ─────────────────────────────────────────── */}
        <p
          className="text-center font-display text-ivory/30 italic mt-14"
          style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", fontWeight: 300 }}
        >
          That&rsquo;s all Tip a Chef is. A thank-you that actually arrives.
        </p>

      </div>
    </section>
  );
}
