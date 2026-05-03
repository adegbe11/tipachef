import Link from "next/link";

const BENEFITS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
    title:  "Earn directly from your audience",
    body:   "Every tip goes straight to you. No middleman, no monthly hold, no management cut.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title:  "Build a personal brand",
    body:   "Your profile travels with you. From restaurant to pop-up to private kitchen — you own it.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title:  "Live in minutes",
    body:   "Create your profile, get your QR code, start receiving tips — in under two minutes.",
  },
];

export default function ForChefs() {
  return (
    <section id="for-chefs" className="py-24 md:py-36">
      <div className="content-container">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="eyebrow mb-4">For chefs</p>
          <h2
            className="font-display text-ivory leading-tight mb-4"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
          >
            Built for the people<br />
            <span className="text-ember-gradient italic">behind every great meal.</span>
          </h2>
          <p className="font-sans text-ivory/45 text-sm leading-relaxed font-light">
            You put everything into the food. It's time the recognition caught up.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="flex flex-col gap-5 rounded-2xl bg-charcoal border border-white/[0.07] p-8 hover:border-white/[0.14] transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-ember/10 border border-ember/15 flex items-center justify-center text-ember flex-shrink-0">
                {b.icon}
              </div>
              <div>
                <p className="font-sans text-ivory font-semibold text-sm mb-2">{b.title}</p>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed font-light">{b.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/signup"
            className="press inline-flex items-center gap-2 px-9 py-4 rounded-full bg-ember text-graphite font-sans font-semibold text-sm tracking-wide hover:bg-ember-light transition-all duration-200 shadow-lg shadow-ember/25"
          >
            Join as a Chef
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <p className="font-sans text-ivory/25 text-xs mt-4">Free to join. No card required.</p>
        </div>

      </div>
    </section>
  );
}
