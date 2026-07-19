import type { Metadata } from "next";
import Link from "next/link";
import LightNavbar from "@/components/LightNavbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Tip a Chef — The Story Behind the Mission",
  description:
    "I started in kitchens in 2020 as a dishwasher at 19. Over four years across four restaurants I watched chefs with 20+ years of experience earn nothing from tips while front-of-house staff pocketed everything. This is why Tip a Chef exists.",
  keywords: [
    "about tip a chef",
    "chef tipping platform",
    "support kitchen workers",
    "direct tip chefs",
    "restaurant tipping app",
  ],
  openGraph: {
    title: "About Tip a Chef — The Story Behind the Mission",
    description:
      "From dishwasher in 2020 to building a QR tipping platform for chefs. Four years in kitchens, one question that wouldn't leave me alone.",
    url: "https://tipachef.com/about",
    type: "website",
  },
  alternates: { canonical: "https://tipachef.com/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <style>{`
        .drop-cap::first-letter {
          float: left;
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 5.2rem;
          font-weight: 300;
          line-height: 0.78;
          color: #C9A96E;
          margin-right: 0.1em;
          margin-top: 0.05em;
        }
        .founder-sig {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 2rem;
          font-style: italic;
          font-weight: 400;
          color: #111111;
          line-height: 1;
        }
      `}</style>

      <LightNavbar />

      <main>

        {/* ── Hero ── */}
        <section className="pt-36 pb-24 md:pt-48 md:pb-32">
          <div className="content-container max-w-3xl">

            <p
              className="font-sans text-xs font-medium uppercase tracking-widest mb-8"
              style={{ color: "#C9A96E" }}
            >
              About us
            </p>

            <h1
              className="font-display text-graphite leading-tight mb-8"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)", fontWeight: 300 }}
            >
              I believe every chef deserves to be{" "}
              <span style={{ color: "#C9A96E", fontStyle: "italic" }}>
                seen, thanked, and paid.
              </span>
            </h1>

            <p
              className="font-sans font-light leading-relaxed max-w-xl"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", color: "#555555" }}
            >
              My dream by 2028 is to help 1,000,000 chefs around the world receive direct tips from the people who love their food.
            </p>

          </div>
        </section>

        {/* ── Divider ── */}
        <div className="content-container max-w-3xl">
          <div style={{ height: "1px", background: "#f0f0f0" }} />
        </div>

        {/* ── Story ── */}
        <section className="py-20 md:py-32">
          <div className="content-container max-w-2xl">

            {/* Chapter label */}
            <p
              className="font-sans text-xs font-medium uppercase tracking-widest mb-10"
              style={{ color: "#C9A96E" }}
            >
              The Story So Far
            </p>

            {/* Drop cap opening */}
            <p
              className="drop-cap font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              It started in 2020 with a pair of rubber gloves and a sink that never stopped filling. I was 19, I needed money, and a hotel near me was hiring kitchen assistants. I had no idea what I was walking into.
            </p>

            <p
              className="font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              My job that first week was simple: wash everything. Pots, trays, insert pans, hotel pans with baked-on grease that hadn't fully cooled yet. Eight, sometimes ten hours a day. The kitchen ran on a Saturday night the way I imagine a flight deck runs. Everyone moving. Everyone shouting in a language that was half English and half something specific to that kitchen. I was completely lost and completely focused at the same time.
            </p>

            <p
              className="font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              The head chef was a man I will call Marcus. He had been cooking professionally for 22 years. I know because on his second week back from leave someone brought a cake and there was a card that said exactly that. Twenty-two years. He had spent more time in professional kitchens than some of the servers had been alive. He knew every technique, every supplier, every plate the restaurant had ever served. He ran that kitchen with the kind of calm authority that only comes from having survived every possible crisis twice.
            </p>

            <p
              className="font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              He earned roughly the same as the front-of-house staff who had been there six months.
            </p>

            <p
              className="font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              I went back to kitchens after that. Different place, different city, but same structure. Kitchen assistant, then commis prep, then general helper on busy nights. Over the next four years I worked in or around professional kitchens in four different restaurants. I scrubbed floors. I peeled vegetables at 6am. I ran plates. I watched. And the same thing was true in every single one: the people who made the food were invisible.
            </p>

            <p
              className="font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              The waiters got tips. The waiters smelled nice and came out at the end of their shift looking almost as fresh as when they arrived. They had conversations with the tables. They got thanked directly, looked in the eye, handed folded notes. In some restaurants the tips went into a shared pot and the kitchen got a small percentage. In most, they got nothing. In none of them did a guest ever walk to the pass and say "that was one of the best things I have ever eaten" directly to the person who cooked it.
            </p>

            <p
              className="font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              I kept thinking: why is there no mechanism for this? Your food arrives and it is extraordinary and there is no way to reach the person responsible. The waiter is the face. The chef is the ghost.
            </p>

            {/* Pull-out */}
            <div
              className="my-12 py-8 px-8"
              style={{
                borderLeft: "3px solid #C9A96E",
                background: "#fdfcfb",
              }}
            >
              <p
                className="font-display font-light leading-tight"
                style={{ color: "#222222", fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontStyle: "italic" }}
              >
                "Fourteen hours on your feet. Burns on your arms. The physical cost of every service written into your body. And at the end of the night, no way for a single person who ate your food to say thank you and mean it with money."
              </p>
            </div>

            <p
              className="font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              I kept that thought for a long time. Long enough that I eventually stopped waiting for someone else to build the solution.
            </p>

            <p
              className="font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              In early 2024 I started building. I had some experience with web development and I knew enough to be dangerous. I used Next.js for the frontend, Supabase for the database and auth, and Stripe Connect to handle payments. The core idea was dead simple: every chef gets a profile page and a QR code. A diner scans it, picks an amount, pays. The money goes directly to the chef's bank account. No app needed. No account needed. Just a phone and a scan.
            </p>

            <p
              className="font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              I built the first version in about six weeks. It was rough. The profile page barely had any styling. The Stripe integration worked but the error messages were terrible. The QR code generator was something I bolted on at the last minute. But it worked. A chef could sign up, connect their bank account, get a QR code, and receive a tip in under ten minutes. That was the whole thing.
            </p>

            <p
              className="font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              I spent the next three months improving it. The profile got a proper design. I added a Kitchen Secret feature: a personal message, recipe, or technique that tippers receive the moment their payment goes through. I added post and recipe sharing so chefs could build a following. I made the QR code downloadable. I added analytics. I went from a rough proof-of-concept to something I would actually want to hand to someone I respected.
            </p>

            <p
              className="font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              The thing that kept me going, every time I hit a wall, was Marcus. I don't know where he is now. I don't know if he's still cooking. But I kept thinking about that card. Twenty-two years. Twenty-two years of doing something with your hands that most people genuinely cannot do, and not a single mechanism existed for a customer to go directly to you and say: that meal changed my evening. Here is something for you.
            </p>

            <p
              className="font-sans font-light leading-relaxed mb-12"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              Tip a Chef is for Marcus. It is for every chef I worked next to and every chef I will never meet. It costs nothing to join. It takes two minutes to set up. And every tip goes directly to the person who earned it. That is the whole idea. That has always been the whole idea.
            </p>

            {/* Signature block */}
            <div className="mt-4">
              <div className="founder-sig mb-3">Collins Asein</div>
              <p
                className="font-sans font-light"
                style={{ fontSize: "0.8rem", color: "#aaaaaa", letterSpacing: "0.02em" }}
              >
                Founder, Tip a Chef
              </p>
            </div>

          </div>
        </section>

        {/* ── Pull quote ── */}
        <section style={{ background: "#fafafa", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
          <div className="py-20 md:py-28 content-container max-w-2xl text-center">
            <p
              className="font-display text-graphite leading-tight mb-5"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 300, fontStyle: "italic" }}
            >
              "This made me feel seen for the first time in 21 years of cooking."
            </p>
            <p
              className="font-sans uppercase tracking-widest"
              style={{ fontSize: "0.7rem", color: "#999999" }}
            >
              Dimitri K. · Head Chef, Athens
            </p>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-20 md:py-28">
          <div className="content-container max-w-3xl">

            <p
              className="font-sans text-xs font-medium uppercase tracking-widest mb-10"
              style={{ color: "#C9A96E" }}
            >
              What we stand for
            </p>

            <div className="space-y-0">
              {[
                {
                  title: "Chefs first, always.",
                  body: "Every product decision starts with one question: does this make a chef's life better? Tips go directly to them — not a pool, not management, not us.",
                },
                {
                  title: "Radical transparency.",
                  body: "You see exactly what you pay and exactly where it goes. We charge a small platform fee to keep the lights on — and we show it to you before every transaction.",
                },
                {
                  title: "Real humans only.",
                  body: "Every chef profile is reviewed before it goes live. No bots, no ghost accounts. When you tip, you're reaching a real person in a real kitchen.",
                },
                {
                  title: "Simplicity is respect.",
                  body: "A diner should tip in under ten seconds from any phone. A chef should be live in under two minutes. Complexity is a design failure.",
                },
              ].map((v, i, arr) => (
                <div
                  key={v.title}
                  className="py-8"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid #f0f0f0" : "none" }}
                >
                  <h3
                    className="font-display text-graphite mb-2"
                    style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)", fontWeight: 300 }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="font-sans font-light leading-relaxed max-w-lg"
                    style={{ color: "#666666", fontSize: "0.9rem" }}
                  >
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Numbers ── */}
        <section style={{ background: "#fafafa", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
          <div className="py-20 md:py-24 content-container max-w-3xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {[
                { value: "Every", label: "Country" },
                { value: "95%",   label: "To the chef before Stripe fees" },
                { value: "2 min", label: "To go live" },
                { value: "Free",  label: "To join" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="font-display text-graphite mb-1"
                    style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
                  >
                    {s.value}
                  </p>
                  <p
                    className="font-sans font-light"
                    style={{ fontSize: "0.8rem", color: "#999999" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 md:py-32">
          <div className="content-container max-w-3xl">
            <h2
              className="font-display text-graphite leading-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 300 }}
            >
              Ready to be part of it?
            </h2>
            <p
              className="font-sans font-light leading-relaxed mb-10 max-w-sm"
              style={{ color: "#666666", fontSize: "0.95rem" }}
            >
              Whether you cook for a living or eat out every week, there's a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="press inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-sans font-semibold text-sm tracking-wide transition-all duration-200"
                style={{ background: "#C9A96E", color: "#ffffff", boxShadow: "0 4px 20px rgba(201,169,110,0.3)" }}
              >
                Join as a Chef
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/search"
                className="press inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-sans font-semibold text-sm tracking-wide transition-all duration-200"
                style={{ border: "1.5px solid #e0e0e0", color: "#333333" }}
              >
                Tip a Chef
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
