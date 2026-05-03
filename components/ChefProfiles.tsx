"use client";

import Link from "next/link";

const CHEFS = [
  {
    slug:    "marco-esposito",
    emoji:   "🇮🇹",
    name:    "Marco Esposito",
    role:    "Head Chef",
    venue:   "Osteria del Fuoco · Rome",
    story:   "Every pasta I make is a love letter to my grandmother.",
  },
  {
    slug:    "nikos-stavridis",
    emoji:   "🇬🇷",
    name:    "Nikos Stavridis",
    role:    "Pastry Chef",
    venue:   "Kuzina · Athens",
    story:   "I put the Aegean sea into every dessert I create.",
  },
  {
    slug:    "sofia-reyes",
    emoji:   "🇲🇽",
    name:    "Sofia Reyes",
    role:    "Executive Chef",
    venue:   "Casa Humo · Mexico City",
    story:   "Spice is the language I grew up speaking at home.",
  },
  {
    slug:    "dimitri-kostas",
    emoji:   "🇬🇷",
    name:    "Dimitri Kostas",
    role:    "Head Chef",
    venue:   "Kuzina · Athens",
    story:   "Every dish I make carries a piece of the Aegean.",
  },
  {
    slug:    "mehmet-yilmaz",
    emoji:   "🇹🇷",
    name:    "Mehmet Yilmaz",
    role:    "Head Chef",
    venue:   "Mikla · Istanbul",
    story:   "My kitchen carries the smell of my mother's home.",
  },
  {
    slug:    "lena-fischer",
    emoji:   "🇩🇪",
    name:    "Lena Fischer",
    role:    "Sous Chef",
    venue:   "Facil · Berlin",
    story:   "Precision is just another word for care on the plate.",
  },
];

export default function ChefProfiles() {
  return (
    <section className="py-24 md:py-36">
      <div className="content-container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-12">
          <div>
            <p className="eyebrow mb-3">Chef profiles</p>
            <h2
              className="font-display text-ivory leading-tight"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
            >
              Real chefs.{" "}
              <span className="text-ember-gradient italic">Real gratitude.</span>
            </h2>
          </div>
          <Link
            href="/search"
            className="press inline-flex items-center gap-2 text-sm font-sans font-medium text-ivory/40 hover:text-ember transition-colors duration-200 flex-shrink-0 mb-1"
          >
            Browse all chefs
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHEFS.map((chef) => (
            <div
              key={chef.slug}
              className="group flex flex-col rounded-2xl bg-charcoal border border-white/[0.07] hover:border-white/[0.14] transition-colors duration-300 overflow-hidden"
            >
              {/* Visual top — emoji floats in clean space */}
              <div className="flex items-center justify-center pt-10 pb-6">
                <span style={{ fontSize: "3.5rem", lineHeight: 1 }}>{chef.emoji}</span>
              </div>

              {/* Thin separator */}
              <div className="mx-6 h-px bg-white/[0.06]" />

              {/* Info */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                <div>
                  <p className="font-sans text-ivory font-semibold text-sm">{chef.name}</p>
                  <p className="font-sans text-ivory/35 text-xs mt-1">{chef.role} · {chef.venue}</p>
                </div>

                <p
                  className="font-display text-ivory/55 italic leading-snug flex-1"
                  style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)", fontWeight: 300 }}
                >
                  &ldquo;{chef.story}&rdquo;
                </p>

                <Link
                  href={`/tip/${chef.slug}`}
                  className="press w-full py-3 rounded-xl bg-ember text-graphite font-sans font-semibold text-sm text-center hover:bg-ember-light transition-colors duration-200"
                >
                  Tip {chef.name.split(" ")[0]}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center font-sans text-ivory/25 text-sm mt-10">
          Hundreds of chefs. One tap away.{" "}
          <Link href="/search" className="text-ivory/40 hover:text-ember transition-colors underline underline-offset-2">
            Find one near you →
          </Link>
        </p>

      </div>
    </section>
  );
}
