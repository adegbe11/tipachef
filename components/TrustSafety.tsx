const PILLARS = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: "Secure payments",
    body:  "Every transaction runs through Stripe — the same infrastructure trusted by Apple, Amazon, and millions of businesses worldwide.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: "Fully transparent",
    body:  "You see exactly where your money goes. 100% of every tip reaches the chef. No hidden fees, no surprise deductions.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: "Verified chef profiles",
    body:  "Every profile is reviewed before going live. Real names, real kitchens. You always know who you're tipping.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        <path d="M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
    title: "You control your tips",
    body:  "Choose the amount, add a message, tip who you want — when you want. No subscription, no commitment.",
  },
];

export default function TrustSafety() {
  return (
    <section className="py-24 md:py-36">
      <div className="content-container">

        {/* Header */}
        <div className="text-center max-w-lg mx-auto mb-14">
          <p className="eyebrow mb-4">Trust & safety</p>
          <h2
            className="font-display text-ivory leading-tight mb-4"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
          >
            Your money is safe.<br />
            <span className="text-ember-gradient italic">Your chefs are real.</span>
          </h2>
          <p className="font-sans text-ivory/45 text-sm leading-relaxed font-light">
            We built Tip a Chef on infrastructure that handles billions in payments. Trust isn't a feature — it's the foundation.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="flex gap-5 rounded-2xl bg-charcoal border border-white/[0.07] p-7 hover:border-white/[0.13] transition-colors duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-ember/10 border border-ember/15 flex items-center justify-center text-ember flex-shrink-0 mt-0.5">
                {p.icon}
              </div>
              <div>
                <p className="font-sans text-ivory font-semibold text-sm mb-1.5">{p.title}</p>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed font-light">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stripe trust badge */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-white/10" />
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ivory/30">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className="font-sans text-ivory/30 text-xs">Payments secured by Stripe</span>
          </div>
          <div className="h-px w-12 bg-white/10" />
        </div>

      </div>
    </section>
  );
}
