"use client";

import { useEffect, useRef } from "react";

const TOP_CHEFS = [
  { rank: 1,  name: "Marco Esposito",  restaurant: "Osteria del Fuoco, Rome",    earned: "$4,820", flag: "🇮🇹", tips: 312 },
  { rank: 2,  name: "Nikos Stavridis", restaurant: "Kuzina, Athens",             earned: "$3,940", flag: "🇬🇷", tips: 271 },
  { rank: 3,  name: "Pierre Leclerc",  restaurant: "Le Comptoir, Paris",         earned: "$3,105", flag: "🇫🇷", tips: 198 },
  { rank: 4,  name: "Sofia Ricci",     restaurant: "Trattoria Ricci, London",    earned: "$2,740", flag: "🇮🇹", tips: 184 },
  { rank: 5,  name: "Mehmet Yilmaz",   restaurant: "Mikla, Istanbul",            earned: "$2,310", flag: "🇹🇷", tips: 156 },
];

const MESSAGES = [
  { name: "James Whitmore",   amount: 10, message: "That lamb was the best thing I've ever eaten. You're a legend.",      chef: "Marco Esposito"  },
  { name: "Claire Dubois",    amount: 5,  message: "The herb crust on the cod — absolutely stunning.",                     chef: "Pierre Leclerc"  },
  { name: "Luca Bianchi",     amount: 25, message: "Three years at this table. Every visit is worth the flight.",          chef: "Marco Esposito"  },
  { name: "Thomas Brauer",    amount: 3,  message: "My kids won't stop talking about your pasta. Life-changing.",          chef: "Sofia Ricci"     },
  { name: "Katerina Alexiou", amount: 10, message: "The tasting menu was transcendent. Thank you.",                        chef: "Nikos Stavridis" },
  { name: "Isabel Castillo",  amount: 5,  message: "Flew from Madrid just for your kitchen. Would do it again tomorrow.",  chef: "Mehmet Yilmaz"   },
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

export default function WallOfLove() {
  const headRef = useRef<HTMLHeadingElement>(null);
  useReveal(headRef as React.RefObject<HTMLElement>);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-charcoal/20">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)" }} />

      <div className="max-w-7xl wide:max-w-[1400px] mx-auto px-4 xs:px-5 md:px-6 wide:px-8">
        <p className="eyebrow mb-4">Wall of love</p>
        <h2
          ref={headRef}
          className="reveal fluid-heading font-display text-ivory leading-tight mb-12"
          style={{ fontWeight: 300 }}
        >
          Real tips.{" "}
          <span className="text-ember-gradient italic">Real kitchens.</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Leaderboard */}
          <div>
            <p className="font-sans text-ivory/40 text-xs tracking-widest uppercase mb-4">Top earning chefs this month</p>
            <div className="glass rounded-3xl overflow-hidden">
              {TOP_CHEFS.map((c, i) => (
                <div
                  key={c.name}
                  className="flex items-center gap-4 px-4 sm:px-5 py-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <span
                    className="font-display text-sm w-6 text-center flex-shrink-0"
                    style={{ color: i === 0 ? "#C9A96E" : "rgba(255,255,255,0.25)" }}
                  >
                    {i === 0 ? "🏆" : `#${c.rank}`}
                  </span>
                  <span className="text-xl flex-shrink-0">{c.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-ivory text-sm font-medium">{c.name}</p>
                    <p className="font-sans text-ivory/35 text-xs truncate">{c.restaurant}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-sans text-sm font-semibold" style={{ color: "#C9A96E" }}>{c.earned}</p>
                    <p className="font-sans text-ivory/25 text-xs">{c.tips} tips</p>
                  </div>
                </div>
              ))}
              <div className="px-5 py-3 text-center border-t border-white/5">
                <p className="font-sans text-ivory/25 text-xs">Updated hourly · Join 2,400+ chefs earning</p>
              </div>
            </div>
          </div>

          {/* Message feed */}
          <div>
            <p className="font-sans text-ivory/40 text-xs tracking-widest uppercase mb-4">Latest diner messages</p>
            <div className="space-y-3">
              {MESSAGES.map((m) => (
                <div key={m.name + m.message} className="glass rounded-2xl px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-ember/15 border border-ember/20 flex items-center justify-center text-xs font-bold text-ember flex-shrink-0">
                      {m.name[0]}
                    </div>
                    <p className="font-sans text-ivory/70 text-xs font-medium">{m.name}</p>
                    <span className="font-sans text-ember text-xs font-semibold ml-auto">${m.amount}</span>
                    <span className="font-sans text-ivory/20 text-xs">to {m.chef}</span>
                  </div>
                  <p className="font-sans text-ivory/50 text-sm italic leading-relaxed">&ldquo;{m.message}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
