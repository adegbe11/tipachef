"use client";

import { useEffect, useRef, useState } from "react";

const CHEFS = [
  { rank: 1,  name: "Marcus T.",    emoji: "🇬🇧", cuisine: "Modern British",   venue: "The Meridian, London",    earned: "$4,210", members: 168, badge: "🏆" },
  { rank: 2,  name: "Yuki N.",      emoji: "🇯🇵", cuisine: "Japanese Pastry",  venue: "Sora, Tokyo",             earned: "$3,840", members: 154, badge: "🥈" },
  { rank: 3,  name: "Sofia M.",     emoji: "🇮🇹", cuisine: "Italian",          venue: "Osteria Blu, Rome",       earned: "$3,190", members: 127, badge: "🥉" },
  { rank: 4,  name: "Kwame O.",     emoji: "🇬🇭", cuisine: "West African",     venue: "Accra Kitchen, NYC",      earned: "$2,780", members: 111, badge: null  },
  { rank: 5,  name: "Dominic A.",   emoji: "🇮🇪", cuisine: "New Irish",        venue: "Firefly Kitchen, Dublin", earned: "$2,410", members: 97,  badge: null  },
  { rank: 6,  name: "Elena R.",     emoji: "🇦🇺", cuisine: "Modern Australian", venue: "Forage, Melbourne",      earned: "$2,190", members: 88,  badge: null  },
];

const FILTERS = ["This month", "All time", "Rising stars"];

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add("visible"),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

export default function Leaderboard() {
  const headRef = useRef<HTMLHeadingElement>(null);
  useReveal(headRef as React.RefObject<HTMLElement>);
  const [filter, setFilter] = useState(0);

  return (
    <section className="py-28 md:py-36 bg-charcoal/30 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Wall of fame</p>
            <h2 ref={headRef} className="reveal font-display text-ivory leading-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300 }}>
              The most loved{" "}
              <span className="text-ember-gradient italic">chefs this month.</span>
            </h2>
          </div>
          <div className="flex gap-2">
            {FILTERS.map((f, i) => (
              <button key={f} onClick={() => setFilter(i)}
                className={`press text-xs font-sans font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                  filter === i ? "bg-ember text-graphite" : "glass text-ivory/50 hover:text-ivory"
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 podium */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {CHEFS.slice(0, 3).map((chef) => (
            <div key={chef.name}
              className={`reveal glass rounded-2xl p-6 hover:border-ember/20 transition-all duration-300 group relative overflow-hidden ${
                chef.rank === 1 ? "border-ember/30 bg-ember/[0.04]" : ""
              }`}>
              {chef.rank === 1 && (
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none"
                  style={{ background: "radial-gradient(circle at top right, #C9A96E 0%, transparent 70%)" }} />
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="text-2xl">{chef.badge || `#${chef.rank}`}</div>
                <div className="glass rounded-lg px-2.5 py-1">
                  <span className="font-display text-ember text-lg font-light">{chef.earned}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-ember/15 border border-ember/25 flex items-center justify-center text-xl">
                  {chef.emoji}
                </div>
                <div>
                  <p className="font-sans text-ivory font-medium text-sm">{chef.name}</p>
                  <p className="font-sans text-ivory/40 text-xs">{chef.venue}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="font-sans text-ivory/40 text-xs">{chef.cuisine}</span>
                <span className="font-sans text-ember text-xs font-medium">{chef.members} members</span>
              </div>
            </div>
          ))}
        </div>

        {/* Rest of the list */}
        <div className="glass rounded-2xl overflow-hidden mb-8">
          {CHEFS.slice(3).map((chef, i) => (
            <div key={chef.name}
              className={`flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer group ${
                i < CHEFS.slice(3).length - 1 ? "border-b border-white/5" : ""
              }`}>
              <span className="font-sans text-ivory/25 text-sm w-6 text-center flex-shrink-0">#{chef.rank}</span>
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-lg flex-shrink-0">
                {chef.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-ivory text-sm font-medium group-hover:text-ember transition-colors duration-200 truncate">{chef.name}</p>
                <p className="font-sans text-ivory/35 text-xs truncate">{chef.cuisine} · {chef.venue}</p>
              </div>
              <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
                <span className="font-sans text-ivory/40 text-xs">{chef.members} members</span>
                <span className="font-display text-ivory text-lg font-light">{chef.earned}</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                className="text-ivory/20 group-hover:text-ember transition-colors flex-shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-sans text-ivory/40 text-sm mb-4 font-light">
            Ready to be on this list?
          </p>
          <a href="#for-chefs"
            className="press inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-ember/40 text-ember font-sans font-medium text-sm tracking-wide hover:bg-ember/10 transition-all duration-300">
            Claim your free chef profile
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
