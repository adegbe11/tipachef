"use client";

import { useEffect, useRef, useState } from "react";

const FEED_ITEMS = [
  { emoji: "🇬🇧", tipper: "James Whitmore",    chef: "Marco Esposito",   amount: "$8",  msg: "The lamb was transcendent.",      time: "2m ago"  },
  { emoji: "🇫🇷", tipper: "Claire Dubois",     chef: "Nikos Stavridis",  amount: "$25", msg: "Best pastry I've ever had.",      time: "5m ago"  },
  { emoji: "🇩🇪", tipper: "Thomas Brauer",     chef: "Mehmet Yilmaz",    amount: "$10", msg: "You made our anniversary.",       time: "8m ago"  },
  { emoji: "🇮🇹", tipper: "Luca Bianchi",      chef: "Sofia Ricci",      amount: "$50", msg: "A master at work. Thank you.",    time: "11m ago" },
  { emoji: "🇬🇷", tipper: "Katerina Alexiou",  chef: "Alessandro Ferri", amount: "$15", msg: "Every dish told a story.",        time: "14m ago" },
  { emoji: "🇦🇺", tipper: "William Fraser",    chef: "Eleni Papadaki",   amount: "$5",  msg: "The ferments were incredible.",   time: "17m ago" },
  { emoji: "🇫🇷", tipper: "Sylvie Moreau",     chef: "Pierre Leclerc",   amount: "$20", msg: "Michelin who? You're better.",   time: "23m ago" },
  { emoji: "🇪🇸", tipper: "Isabel Castillo",   chef: "Carlos Ibáñez",    amount: "$10", msg: "My grandmother would approve.",   time: "29m ago" },
];

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

export default function ActivityFeed() {
  const headRef  = useRef<HTMLHeadingElement>(null);
  useReveal(headRef as React.RefObject<HTMLElement>);
  const [items, setItems] = useState(FEED_ITEMS);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const last = prev[prev.length - 1];
        return [{ ...last, time: "just now" }, ...prev.slice(0, prev.length - 1)];
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 md:py-36 bg-charcoal/20 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left copy */}
        <div>
          <p className="eyebrow mb-4">Live activity</p>
          <h2 ref={headRef} className="reveal font-display text-ivory leading-tight mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300 }}>
            Right now, chefs are{" "}
            <span className="text-ember-gradient italic">being loved.</span>
          </h2>
          <p className="font-sans text-ivory/55 leading-relaxed font-light mb-8 max-w-md">
            Every few seconds, a diner sends gratitude directly to the person who made their meal.
            This is what recognition looks like in real time.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "2,400+",  label: "Chefs receiving tips"     },
              { value: "$47",     label: "Average tip amount"        },
              { value: "94%",     label: "Chefs who re-register"     },
              { value: "4.9 ★",   label: "Average app rating"        },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4">
                <p className="font-display text-ember text-2xl font-light mb-1">{stat.value}</p>
                <p className="font-sans text-ivory/40 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: live feed */}
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, transparent 70%, #1E1E1E 100%)" }} />

          <div className="space-y-3 max-h-[480px] overflow-hidden">
            {items.map((item, i) => (
              <div key={`${item.tipper}-${i}`}
                className={`glass rounded-2xl p-4 flex items-start gap-4 transition-all duration-500 ${
                  i === 0 ? "border-ember/25 bg-ember/[0.04]" : "border-white/5"
                }`}>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-lg flex-shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-sans text-ivory text-sm font-medium truncate">
                      {item.tipper} <span className="text-ivory/40 font-light">tipped</span> {item.chef}
                    </p>
                    <span className={`text-xs font-sans flex-shrink-0 ml-2 ${i === 0 ? "text-ember font-semibold" : "text-ivory/30"}`}>
                      {i === 0 ? "● " : ""}{item.time}
                    </span>
                  </div>
                  <p className="font-sans text-ivory/50 text-xs italic truncate">&ldquo;{item.msg}&rdquo;</p>
                </div>
                <div className="flex-shrink-0 glass rounded-lg px-2.5 py-1.5">
                  <span className={`text-sm font-sans font-semibold ${i === 0 ? "text-ember" : "text-ivory"}`}>{item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
