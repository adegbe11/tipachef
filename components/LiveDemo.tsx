"use client";

import Link from "next/link";

const TIP_ITEMS = [
  { emoji: "🧂", label: "A pinch of salt",  amount: 3  },
  { emoji: "🌿", label: "Fresh herbs",       amount: 5  },
  { emoji: "🍷", label: "Glass of wine",     amount: 10 },
];

export default function LiveDemo() {
  return (
    <section className="py-28 md:py-40 bg-charcoal/20">
      <div className="content-container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left copy */}
        <div>
          <p className="eyebrow mb-5">Your page</p>
          <h2
            className="font-display text-ivory leading-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 300 }}
          >
            Your name.<br />
            Your story.<br />
            <span className="text-ember-gradient italic">Your link.</span>
          </h2>
          <p className="font-sans text-ivory/45 text-sm leading-relaxed font-light mb-8 max-w-sm">
            Build your chef profile in 2 minutes. Add your photo, cuisine, and story.
            Share it everywhere. Your page lives at tipachef.com/yourname.
          </p>
          <Link
            href="/search"
            className="font-sans text-ember text-sm hover:text-ember-light transition-colors"
          >
            See an example page →
          </Link>
        </div>

        {/* Right: phone mockup */}
        <div className="flex justify-center lg:justify-end">
          <div
            className="w-64 rounded-[2.4rem] overflow-hidden shadow-2xl border border-white/10"
            style={{ background: "#1a1612" }}
          >
            {/* Phone top bar */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-16 h-1.5 rounded-full bg-white/10" />
            </div>

            {/* Hero image placeholder */}
            <div
              className="mx-4 rounded-2xl mb-4 flex items-center justify-center"
              style={{ height: "100px", background: "#2a2218" }}
            >
              <span style={{ fontSize: "2.5rem" }}>👨‍🍳</span>
            </div>

            <div className="px-4 pb-6">
              {/* Chef name */}
              <p
                className="font-display italic mb-0.5"
                style={{ fontSize: "1.15rem", fontWeight: 400, color: "#C9A96E" }}
              >
                Marco Esposito
              </p>
              <p className="font-sans text-ivory/35 mb-4" style={{ fontSize: "0.72rem" }}>
                Italian · Rome · tipachef.com/marco
              </p>

              {/* Tip items */}
              <div className="space-y-2 mb-4">
                {TIP_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5"
                    style={{ background: "#2a2218", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span className="font-sans text-ivory/70 text-xs flex items-center gap-2">
                      <span>{item.emoji}</span> {item.label}
                    </span>
                    <span className="font-sans text-ivory/50 text-xs">${item.amount}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className="w-full py-3 rounded-2xl font-sans font-semibold text-sm text-graphite"
                style={{ background: "#C9A96E" }}
              >
                Send a tip
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
