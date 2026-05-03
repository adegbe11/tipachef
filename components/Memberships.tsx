"use client";

import { useEffect, useRef, useState } from "react";

const PLANS = [
  {
    name:    "Fan",
    price:   5,
    period:  "mo",
    color:   "border-white/8",
    perks: [
      "Access to chef's exclusive recipe feed",
      "Monthly recipe newsletter",
      "Supporter badge on profile",
    ],
  },
  {
    name:    "Foodie",
    price:   15,
    period:  "mo",
    color:   "border-ember/30",
    highlight: true,
    perks: [
      "Everything in Fan",
      "2 exclusive recipe PDFs per month",
      "Access to live cook-along sessions",
      "Early access to new menu drops",
    ],
  },
  {
    name:    "Patron",
    price:   25,
    period:  "mo",
    color:   "border-white/8",
    perks: [
      "Everything in Foodie",
      "Monthly 1-on-1 virtual session",
      "Name on chef's kitchen wall",
      "Exclusive behind-the-scenes content",
      "Priority event invitations",
    ],
  },
];

const EARNINGS = [
  { label: "This month",    value: "$1,840", sub: "from 73 supporters"       },
  { label: "Last month",    value: "$1,620", sub: "from 61 supporters"       },
  { label: "Total earned",  value: "$9,240", sub: "since joining Tip a Chef" },
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

export default function Memberships() {
  const headRef = useRef<HTMLHeadingElement>(null);
  useReveal(headRef as React.RefObject<HTMLElement>);
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-28 md:py-36 bg-charcoal/30 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)" }} />

      <div className="content-container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4">Memberships</p>
            <h2 ref={headRef} className="reveal fluid-display font-display text-ivory leading-tight mb-6"
              style={{ fontWeight: 300 }}>
              Turn fans into{" "}
              <span className="text-ember-gradient italic">monthly patrons.</span>
            </h2>
            <p className="font-sans text-ivory/55 leading-relaxed font-light mb-8 max-w-md">
              One-time tips are great. Monthly supporters are life-changing. Let your biggest fans back you every single month.
            </p>

            {/* Earnings card */}
            <div className="glass rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-ember/20 border border-ember/30 flex items-center justify-center text-base">
                  🇬🇧
                </div>
                <div>
                  <p className="font-sans text-ivory text-sm font-medium">Marco Esposito</p>
                  <p className="font-sans text-ivory/40 text-xs">Head Chef · The Meridian, London</p>
                </div>
                <div className="ml-auto glass rounded-lg px-2.5 py-1">
                  <span className="text-xs font-sans text-green-400 font-medium">● Live</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                {EARNINGS.map((e) => (
                  <div key={e.label} className="text-center p-3 rounded-xl bg-white/[0.03]">
                    <p className="font-display text-ember text-xl font-light mb-0.5">{e.value}</p>
                    <p className="font-sans text-ivory/30 text-xs leading-tight">{e.sub}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-ivory/30">73 active members</span>
                <span className="text-ember">↑ 20% vs last month</span>
              </div>
            </div>

            {/* Toggle */}
            <div className="flex items-center gap-3">
              <span className={`text-sm font-sans ${!annual ? "text-ivory" : "text-ivory/40"}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-11 h-6 rounded-full transition-all duration-300 ${annual ? "bg-ember" : "bg-white/10"}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${annual ? "left-6" : "left-1"}`} />
              </button>
              <span className={`text-sm font-sans ${annual ? "text-ivory" : "text-ivory/40"}`}>
                Annual
                <span className="ml-1.5 text-xs bg-ember/20 text-ember px-2 py-0.5 rounded-full font-medium">Save 20%</span>
              </span>
            </div>
          </div>

          {/* Right: pricing cards */}
          <div className="space-y-4">
            {PLANS.map((plan) => {
              const price = annual ? Math.round(plan.price * 12 * 0.8) : plan.price;
              const per   = annual ? "yr" : "mo";
              return (
                <div key={plan.name}
                  className={`reveal glass rounded-2xl p-6 border transition-all duration-300 hover:border-ember/30 ${
                    plan.highlight ? "border-ember/30 bg-ember/[0.04]" : plan.color
                  }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-sans text-ivory font-semibold">{plan.name}</h3>
                        {plan.highlight && (
                          <span className="text-xs bg-ember text-graphite px-2 py-0.5 rounded-full font-semibold">Popular</span>
                        )}
                      </div>
                      <p className="font-sans text-ivory/40 text-xs">{plan.perks.length} perks included</p>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-ivory text-3xl font-light">${price}</span>
                      <span className="text-xs font-sans text-ivory/40">/{per}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-5">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-xs font-sans text-ivory/55">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5"
                          strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <button className={`press w-full py-2.5 rounded-xl text-xs font-sans font-semibold tracking-wide transition-all duration-200 ${
                    plan.highlight
                      ? "bg-ember text-graphite shadow-lg shadow-ember/20 hover:bg-ember-light"
                      : "glass text-ivory/70 hover:text-ivory hover:border-ember/20"
                  }`}>
                    Subscribe as {plan.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
