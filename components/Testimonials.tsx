"use client";

import { useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    quote: "After fifteen years behind the pass, someone finally built something for us. I made more in tips last month than I have in my entire career.",
    name:  "Marco Esposito",
    role:  "Head Chef, Osteria del Fuoco, Rome",
  },
  {
    quote: "We've had two senior chefs tell us Tip a Chef is the reason they turned down other offers. That alone is worth more than anything.",
    name:  "Pierre Leclerc",
    role:  "Restaurant Director, Le Comptoir, Paris",
  },
  {
    quote: "The messages from diners hit different. One guest wrote three paragraphs about my lamb. I printed it and put it on my station.",
    name:  "Mehmet Yilmaz",
    role:  "Sous Chef, Mikla, Istanbul",
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

export default function Testimonials() {
  const headRef = useRef<HTMLHeadingElement>(null);
  useReveal(headRef as React.RefObject<HTMLElement>);

  return (
    <section className="py-24 md:py-36 relative overflow-hidden bg-charcoal/20">
      <div
        className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)" }}
      />

      <div className="content-container">
        <p className="eyebrow mb-4">What people say</p>
        <h2
          ref={headRef}
          className="reveal fluid-heading font-display text-ivory leading-tight mb-12"
          style={{ fontWeight: 300 }}
        >
          The craft finally{" "}
          <span className="text-ember-gradient italic">gets noticed.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card p-8 flex flex-col gap-6 hover:border-white/15 transition-colors duration-300">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#C9A96E">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <blockquote
                className="font-display text-ivory/85 italic leading-relaxed flex-1"
                style={{ fontSize: "clamp(1rem, 1.6vw, 1.05rem)", fontWeight: 300 }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.07]">
                <div className="w-9 h-9 rounded-full bg-ember/15 border border-ember/25 flex items-center justify-center flex-shrink-0">
                  <span className="font-sans text-ember text-sm font-semibold">{t.name[0]}</span>
                </div>
                <div>
                  <p className="font-sans text-ivory text-sm font-medium">{t.name}</p>
                  <p className="font-sans text-ivory/50 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
