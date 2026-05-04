import Link from "next/link";

const BENEFITS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Support independent chefs",
    body:  "Your tip reaches the exact person who made your meal — not a tip pool, not a manager.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
    title: "Discover new talent",
    body:  "Browse chefs by city, cuisine, and restaurant. Find someone worth following before they're famous.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Feel connected to the food you love",
    body:  "Leave a message with your tip. Tell them what the meal meant. Chefs read every single one.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: "Small gesture, real impact",
    body:  "A $5 tip takes ten seconds. For a chef, it's recognition that can carry them through the whole week.",
  },
];

export default function ForRestaurants() {
  return (
    <section id="restaurants" className="py-24 md:py-36 bg-charcoal/30">
      <div className="content-container">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="eyebrow mb-4">For supporters</p>
          <h2
            className="font-display text-ivory leading-tight mb-4"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
          >
            Your appreciation<br />
            <span className="text-ember-gradient italic">finally has somewhere to go.</span>
          </h2>
          <p className="font-sans text-ivory/45 text-sm leading-relaxed font-light">
            You already know when a meal is exceptional. Now you can do something about it.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-14">
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
            href="/search"
            className="press inline-flex items-center gap-2 px-9 py-4 rounded-full bg-ember text-graphite font-sans font-semibold text-sm tracking-wide hover:bg-ember-light transition-all duration-200 shadow-lg shadow-ember/25"
          >
            Start Tipping
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <p className="font-sans text-ivory/25 text-xs mt-4">No account needed. Scan and tip in seconds.</p>
        </div>

      </div>
    </section>
  );
}
