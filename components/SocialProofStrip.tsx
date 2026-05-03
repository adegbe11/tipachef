"use client";

const PROOF = [
  {
    quote: "Made £340 in tips last month. Never happened before.",
    name: "James K.",
    role: "Sous Chef, London",
    flag: "🇬🇧",
  },
  {
    quote: "A guest wrote me a paragraph. I cried in the walk-in.",
    name: "Sofia R.",
    role: "Head Chef, Milan",
    flag: "🇮🇹",
  },
  {
    quote: "Two chefs turned down other offers because of this app.",
    name: "Pierre L.",
    role: "Restaurant Director, Paris",
    flag: "🇫🇷",
  },
];

export default function SocialProofStrip() {
  return (
    <section className="py-16 md:py-20 border-y border-white/[0.06] bg-charcoal/25">
      <div className="content-container">
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
          {PROOF.map((p, i) => (
            <div
              key={i}
              className="bg-graphite md:bg-transparent px-8 py-6 flex flex-col gap-4"
            >
              <p
                className="font-display text-ivory/80 italic leading-snug"
                style={{ fontSize: "clamp(1rem, 1.4vw, 1.05rem)", fontWeight: 300 }}
              >
                &ldquo;{p.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2.5 mt-auto">
                <div className="w-7 h-7 rounded-full bg-ember/15 border border-ember/25 flex items-center justify-center text-sm flex-shrink-0">
                  {p.flag}
                </div>
                <div>
                  <p className="font-sans text-ivory/75 text-xs font-medium">{p.name}</p>
                  <p className="font-sans text-ivory/35 text-xs">{p.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
