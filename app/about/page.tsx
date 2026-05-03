import type { Metadata } from "next";
import Link from "next/link";
import LightNavbar from "@/components/LightNavbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Tip a Chef — The Story Behind the Mission",
  description:
    "I spent several summers working in a hotel laundry section, right next to the kitchen. What I witnessed there is why Tip a Chef exists.",
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
      "I watched chefs give everything for every plate. Nobody ever thanked them. That stayed with me.",
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

            {/* Drop cap paragraph */}
            <p
              className="drop-cap font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              Several summers I worked as a dishwasher in a restaurant. My station was at the back of the kitchen, sink right there in the middle of everything. I was in the kitchen every service, every night.
            </p>

            <p
              className="font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              The heat in that kitchen was serious. You walked in at five and your body would adjust before your mind did. The chefs moved fast and they never stopped. I saw one burn his arm on the oven door and keep plating the dish. I saw another go into the cold storage, stay a minute, come back out and carry on. They were under pressure I had never seen anywhere else.
            </p>

            <p
              className="font-sans font-light leading-relaxed mb-8"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              No guest ever walked through to say anything. The compliments stayed at the front. A server would pass something on sometimes — "the couple on seven said the fish was incredible." The chef would hear it, nod, and call the next ticket. That was the whole exchange. The people who ate went home full and happy. The person who cooked went home and came back and did it again.
            </p>

            <p
              className="font-sans font-light leading-relaxed mb-12"
              style={{ color: "#333333", fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              I built Tip a Chef because of those summers. I knew what it looked like when someone gave everything and heard nothing back. I just wanted to fix the one part I could.
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
                { value: "100%",  label: "To the chef" },
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
