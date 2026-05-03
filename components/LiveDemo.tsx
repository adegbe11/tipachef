"use client";

import { useState, useEffect, useRef } from "react";

const CHEFS = [
  { name: "Marco Esposito",  role: "Head Chef",   venue: "Osteria del Fuoco", emoji: "🇮🇹", cuisine: "Italian"      },
  { name: "Nikos Stavridis", role: "Pastry Chef", venue: "Kuzina",            emoji: "🇬🇷", cuisine: "Modern Greek" },
  { name: "Mehmet Yilmaz",   role: "Head Chef",   venue: "Mikla",             emoji: "🇹🇷", cuisine: "Turkish"      },
];

const AMOUNTS   = [3, 5, 10, 20];
const MESSAGES  = [
  "That lamb dish changed my life. Thank you.",
  "Best meal I've had in years. You're incredible.",
  "My partner proposed here. You made the night.",
  "The tasting menu was pure art. Thank you.",
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

export default function LiveDemo() {
  const headRef             = useRef<HTMLHeadingElement>(null);
  useReveal(headRef as React.RefObject<HTMLElement>);

  const [chefIdx,  setChefIdx]  = useState(0);
  const [amount,   setAmount]   = useState(5);
  const [custom,   setCustom]   = useState("");
  const [message,  setMessage]  = useState(MESSAGES[0]);
  const [sent,     setSent]     = useState(false);
  const [sending,  setSending]  = useState(false);

  const chef       = CHEFS[chefIdx];
  const finalAmt   = custom ? parseFloat(custom) || 0 : amount;

  function handleSend() {
    if (sending || sent) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section className="py-28 md:py-36 relative overflow-hidden bg-charcoal/20">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 30% 50%, #C9A96E 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left copy */}
        <div>
          <p className="eyebrow mb-4">What your fans see</p>
          <h2 ref={headRef} className="reveal font-display text-ivory leading-tight mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300 }}>
            Your profile. Their{" "}
            <span className="text-ember-gradient italic">gratitude. Your money.</span>
          </h2>
          <p className="font-sans text-ivory/55 leading-relaxed font-light mb-8 max-w-md">
            This is what a diner sees when they scan your QR code. Zero friction on their side means
            more tips in your pocket. No app, no account, no barrier between their appreciation and your earnings.
          </p>
          <ul className="space-y-4">
            {[
              "Works on any phone, any browser",
              "Apple Pay, Google Pay, any card",
              "You get paid within minutes",
              "Every tip includes a personal message",
            ].map((pt) => (
              <li key={pt} className="flex items-center gap-3 text-sm font-sans text-ivory/60">
                <span className="w-5 h-5 rounded-full bg-ember/20 border border-ember/40 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                {pt}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: interactive mockup */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm">
            <div className="glass rounded-3xl overflow-hidden shadow-2xl border border-white/10">

              {/* Chef selector tabs */}
              <div className="flex border-b border-white/5">
                {CHEFS.map((c, i) => (
                  <button key={c.name} onClick={() => { setChefIdx(i); setSent(false); }}
                    className={`flex-1 py-3 text-xs font-sans font-medium transition-all duration-200 ${
                      chefIdx === i ? "text-ember border-b border-ember bg-ember/5" : "text-ivory/35 hover:text-ivory/60"
                    }`}>
                    {c.emoji} {c.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Chef card */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-ember/20 border border-ember/30 flex items-center justify-center text-lg">
                    {chef.emoji}
                  </div>
                  <div>
                    <p className="font-sans text-ivory font-medium text-sm">{chef.name}</p>
                    <p className="font-sans text-ivory/40 text-xs">{chef.role} · {chef.venue}</p>
                    <p className="font-sans text-ember text-xs mt-0.5">{chef.cuisine}</p>
                  </div>
                  <div className="ml-auto glass rounded-xl px-2.5 py-1">
                    <span className="text-xs font-sans text-ivory/40">4.9 ★</span>
                  </div>
                </div>

                {/* Amount picker */}
                <p className="eyebrow text-ivory/30 mb-3" style={{ fontSize: "0.6rem" }}>Choose amount</p>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {AMOUNTS.map((a) => (
                    <button key={a} onClick={() => { setAmount(a); setCustom(""); setSent(false); }}
                      className={`press py-2.5 rounded-xl text-sm font-sans font-semibold transition-all duration-200 ${
                        amount === a && !custom
                          ? "bg-ember text-graphite shadow-lg shadow-ember/25"
                          : "glass text-ivory/60 hover:text-ivory hover:border-ember/20"
                      }`}>
                      ${a}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setSent(false); }}
                  className="w-full glass rounded-xl px-4 py-2.5 text-sm font-sans text-ivory placeholder:text-ivory/25 outline-none border border-transparent focus:border-ember/30 mb-4 transition-colors"
                />

                {/* Message */}
                <p className="eyebrow text-ivory/30 mb-2" style={{ fontSize: "0.6rem" }}>Leave a message</p>
                <div className="relative mb-5">
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full glass rounded-xl px-4 py-3 text-sm font-sans text-ivory/80 placeholder:text-ivory/25 outline-none border border-transparent focus:border-ember/30 resize-none transition-colors leading-relaxed"
                  />
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {MESSAGES.slice(0, 2).map((m) => (
                      <button key={m} onClick={() => setMessage(m)}
                        className="text-xs font-sans text-ivory/30 hover:text-ember transition-colors truncate max-w-[140px]">
                        &ldquo;{m.slice(0, 22)}&hellip;&rdquo;
                      </button>
                    ))}
                  </div>
                </div>

                {/* Send button */}
                {sent ? (
                  <div className="w-full py-3.5 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span className="text-sm font-sans font-semibold text-green-400">
                      ${finalAmt} sent to {chef.name.split(" ")[0]}!
                    </span>
                  </div>
                ) : (
                  <button onClick={handleSend}
                    className="press w-full py-3.5 rounded-2xl bg-ember text-graphite font-sans font-semibold text-sm tracking-wide hover:bg-ember-light transition-all duration-200 shadow-lg shadow-ember/25 flex items-center justify-center gap-2">
                    {sending ? (
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        Send ${finalAmt} tip
                      </>
                    )}
                  </button>
                )}

                <p className="text-center text-xs font-sans text-ivory/20 mt-3">
                  Powered by Stripe · 100% goes to the chef
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
