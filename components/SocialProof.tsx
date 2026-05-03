import Link from "next/link";

const STATS = [
  { value: "312",    label: "Chefs now earning"    },
  { value: "4,800+", label: "Tips sent to kitchens" },
  { value: "4.9",    label: "Average chef rating"   },
];

const QUOTES = [
  {
    quote: "After fifteen years behind the pass, someone finally built something for us.",
    name:  "Marco E.",
    role:  "Head Chef · Rome",
    flag:  "🇮🇹",
  },
  {
    quote: "One guest wrote three paragraphs about my lamb dish. I printed it and pinned it to my station.",
    name:  "Mehmet Y.",
    role:  "Head Chef · Istanbul",
    flag:  "🇹🇷",
  },
  {
    quote: "Two of our senior chefs turned down other offers because of this platform.",
    name:  "Pierre L.",
    role:  "Restaurant Director · Paris",
    flag:  "🇫🇷",
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 md:py-36 bg-charcoal/30">
      <div className="content-container">

        {/* ── Hero quote ───────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="eyebrow mb-8">What chefs say</p>

          <blockquote
            className="font-display italic text-ivory leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)", fontWeight: 300 }}
          >
            &ldquo;This made me feel seen<br />
            for the first time.&rdquo;
          </blockquote>

          <div className="flex items-center justify-center gap-2.5">
            <div className="h-px w-8 bg-ember/30" />
            <span className="font-sans text-ivory/40 text-sm">
              James K. · Sous Chef, London 🇬🇧
            </span>
            <div className="h-px w-8 bg-ember/30" />
          </div>
        </div>

        {/* ── Stats row ────────────────────────────────────── */}
        <div className="grid grid-cols-3 border border-white/[0.07] rounded-2xl overflow-hidden mb-16">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center text-center py-8 px-4 ${i < STATS.length - 1 ? "border-r border-white/[0.07]" : ""}`}
            >
              <span
                className="font-display text-ember leading-none mb-2"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
              >
                {s.value}
              </span>
              <span className="font-sans text-ivory/35 text-xs tracking-wide">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Testimonial tiles ────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-4">
          {QUOTES.map((q) => (
            <div
              key={q.name}
              className="flex flex-col gap-5 rounded-2xl bg-charcoal border border-white/[0.07] p-7 hover:border-white/[0.13] transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#C9A96E">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="font-display italic text-ivory/75 leading-snug flex-1"
                style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)", fontWeight: 300 }}
              >
                &ldquo;{q.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.07]">
                <div className="w-8 h-8 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center text-sm flex-shrink-0">
                  {q.flag}
                </div>
                <div>
                  <p className="font-sans text-ivory text-sm font-medium">{q.name}</p>
                  <p className="font-sans text-ivory/35 text-xs mt-0.5">{q.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Closer ───────────────────────────────────────── */}
        <div className="text-center mt-14">
          <Link
            href="/signup"
            className="press inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ember text-graphite font-sans font-semibold text-sm tracking-wide hover:bg-ember-light transition-all duration-200 shadow-lg shadow-ember/20"
          >
            Create your profile
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
