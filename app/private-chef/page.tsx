import type { Metadata } from "next";
import Link from "next/link";
import LightNavbar from "@/components/LightNavbar";
import Footer from "@/components/Footer";
import {
  LOCATIONS,
  getPopularLocations,
  getLocationsByContinent,
  CONTINENTS,
  type Location,
} from "@/lib/locations";

export const metadata: Metadata = {
  title: "Private Chef | Hire a Personal Chef Near You | Tip a Chef",
  description:
    "Find and hire a professional private chef near you. Browse verified private chefs in 200+ cities worldwide. Dinner parties, meal prep, events. Tips go directly to your chef.",
  keywords: [
    "private chef",
    "hire a private chef",
    "private chef near me",
    "personal chef",
    "how much does a private chef cost",
    "private chef for hire",
    "private chef dinner party",
    "private chef meal prep",
  ],
  openGraph: {
    title: "Private Chef | Hire a Personal Chef Near You | Tip a Chef",
    description: "Find and hire a professional private chef near you. 200+ cities worldwide.",
    url: "https://tipachef.com/private-chef",
    type: "website",
  },
  alternates: { canonical: "https://tipachef.com/private-chef" },
};

const continentEmoji: Record<string, string> = {
  "North America": "🌎",
  "Europe": "🌍",
  "Asia": "🌏",
  "Oceania": "🌏",
  "South America": "🌎",
  "Africa": "🌍",
  "Middle East": "🌍",
};

function LocationCard({ loc }: { loc: Location }) {
  return (
    <Link href={`/private-chef/${loc.slug}`} style={{ textDecoration: "none" }}>
      <div
        className="pc-card"
        style={{
          background: "#ffffff",
          border: "1px solid #ececec",
          borderRadius: "16px",
          padding: "18px 20px",
          cursor: "pointer",
          height: "100%",
        }}
      >
        <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 700, color: "#111111", margin: "0 0 3px" }}>
          {loc.name}
        </p>
        <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", color: "#9a9a9a", margin: "0 0 10px" }}>
          {loc.country}{loc.region ? ` · ${loc.region}` : ""}
        </p>
        <p className="gold-text" style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", margin: 0, fontWeight: 600 }}>
          From {loc.eventCost.split("–")[0]} / event
        </p>
      </div>
    </Link>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://tipachef.com" },
        { "@type": "ListItem", position: 2, name: "Private Chef", item: "https://tipachef.com/private-chef" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://tipachef.com/private-chef",
      name: "Private Chef | Hire a Personal Chef Near You",
      description: "Find and hire a professional private chef near you. Browse verified chefs in 200+ cities worldwide.",
      url: "https://tipachef.com/private-chef",
      isPartOf: { "@id": "https://tipachef.com/#website" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does a private chef cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Private chef costs vary by location and service. Dinner party events typically range from $300–$1,500 depending on location, menu, and guest count. Weekly meal prep services run $150–$600 per day. Full-time private chefs earn $40,000–$160,000 per year depending on location.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between a private chef and a personal chef?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A private chef typically works exclusively for one household full-time. A personal chef usually serves multiple clients, preparing meals for several families on different days. In common usage both terms are often interchangeable.",
          },
        },
        {
          "@type": "Question",
          name: "Do you tip a private chef?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Tipping a private chef is standard and appreciated. For events, 10–20% of the chef's fee is customary. With Tip a Chef you can tip your chef directly and instantly from your phone — no cash needed, no split with anyone else.",
          },
        },
        {
          "@type": "Question",
          name: "How do I hire a private chef?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Browse chef profiles on Tip a Chef, select your city or region, view chef profiles and menus, and contact the chef directly. Most chefs can accommodate booking requests within 1–2 weeks.",
          },
        },
      ],
    },
  ],
};

export default function PrivateChefHubPage() {
  const popular = getPopularLocations();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        .pc-card { box-shadow: 0 1px 2px rgba(168,130,58,0.05); transition: box-shadow .25s ease, transform .25s ease, border-color .25s ease; }
        .pc-card:hover { box-shadow: 0 18px 44px rgba(168,130,58,0.16); transform: translateY(-3px); border-color: #e3d2a8; }
        .pc-chip { transition: border-color .15s ease, color .15s ease, background .15s ease, box-shadow .15s ease; }
        .pc-chip:hover { border-color: #C9A96E; color: #8a6a2f; background: #fff9ee; box-shadow: 0 4px 14px rgba(201,169,110,0.16); }
        .pc-pill { transition: transform .15s ease, filter .15s ease; }
        .pc-pill:hover { transform: translateY(-2px); filter: brightness(1.04); }
        .gold-text { background: linear-gradient(135deg,#D4B878 0%,#C9A96E 45%,#A8823C 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: #B8934A; }
      `}</style>
      <LightNavbar />
      <main style={{ background: "#FCFBF8", minHeight: "100vh", color: "#111111" }}>

        {/* ── Hero ── */}
        <section style={{ paddingTop: "128px", paddingBottom: "64px", textAlign: "center" }}>
          <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 20px" }}>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff7e8", border: "1px solid #f0e2c2", borderRadius: "100px", padding: "6px 16px", marginBottom: "22px" }}>
              <span style={{ color: "#C9A96E", fontSize: "12px", letterSpacing: "1px" }}>★★★★★</span>
              <span style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", fontWeight: 600, color: "#8a6a2f" }}>
                {LOCATIONS.length}+ cities worldwide
              </span>
            </div>

            <h1 style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.8rem, 6.5vw, 4.8rem)",
              fontWeight: 400,
              color: "#111111",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              marginBottom: "20px",
            }}>
              Find a{" "}
              <span className="gold-text" style={{ fontStyle: "italic" }}>Private Chef</span>
              <br />Near You
            </h1>

            <p style={{
              fontFamily: "-apple-system, system-ui",
              fontSize: "16px",
              color: "#666666",
              lineHeight: 1.7,
              maxWidth: "540px",
              margin: "0 auto 36px",
            }}>
              Browse verified private chefs in hundreds of cities across the world. Dinner parties, weekly meal prep, special occasions, and more. Every tip goes directly to your chef.
            </p>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="#browse" className="pc-pill" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "linear-gradient(135deg,#D4B878 0%,#C9A96E 55%,#B8934A 100%)",
                color: "#1a1208", borderRadius: "100px", padding: "14px 30px",
                textDecoration: "none", fontFamily: "-apple-system, system-ui",
                fontSize: "14px", fontWeight: 700, boxShadow: "0 8px 26px rgba(201,169,110,0.34)",
              }}>
                Browse by city ↓
              </Link>
              <Link href="/signup" className="pc-pill" style={{
                display: "inline-flex", alignItems: "center",
                background: "#ffffff", border: "1px solid #e0e0e0", color: "#444444",
                borderRadius: "100px", padding: "14px 30px", textDecoration: "none",
                fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 600,
              }}>
                I&apos;m a chef — list my services
              </Link>
            </div>
          </div>
        </section>

        {/* ── What is a private chef ── */}
        <section style={{ padding: "0 20px 80px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { q: "What is a private chef?", a: "A private chef is a professional cook who prepares meals exclusively for you, in your home, holiday villa, or event venue. They handle shopping, cooking, and clean-up." },
                { q: "What does a private chef cost?", a: "Dinner party events typically range from $300–$1,500 depending on location and menu. Meal prep services run $150–$600/day. Full-time chefs earn $40k–$160k/year." },
                { q: "How do I hire a private chef?", a: "Browse Tip a Chef profiles by city, view menus and specialties, and contact your chef directly. Most are available within 1–2 weeks for events." },
                { q: "Should you tip a private chef?", a: "Yes. Tipping a private chef is standard practice. 10–20% for events. With Tip a Chef, you tip directly, instantly, from your phone, no cash needed." },
              ].map((item) => (
                <div key={item.q} className="pc-card" style={{ background: "#ffffff", border: "1px solid #ececec", borderRadius: "20px", padding: "24px 26px" }}>
                  <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.2rem", fontWeight: 500, color: "#111111", margin: "0 0 8px" }}>
                    {item.q}
                  </p>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", color: "#777777", margin: 0, lineHeight: 1.65 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Popular cities ── */}
        <section id="browse" style={{ padding: "72px 20px", background: "#F7F3EA", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "10px" }}>
              Popular locations
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, color: "#111111", letterSpacing: "-0.02em", marginBottom: "36px" }}>
              Top cities for private chefs
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
              {popular.map((loc) => <LocationCard key={loc.slug} loc={loc} />)}
            </div>
          </div>
        </section>

        {/* ── Browse by continent ── */}
        <section style={{ padding: "72px 20px 80px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "10px" }}>
              Browse by region
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, color: "#111111", letterSpacing: "-0.02em", marginBottom: "48px" }}>
              Private chefs worldwide
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
              {CONTINENTS.map((continent) => {
                const locs = getLocationsByContinent(continent);
                if (!locs.length) return null;
                return (
                  <div key={continent}>
                    <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", fontWeight: 600, color: "#444444", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span>{continentEmoji[continent]}</span>
                      {continent}
                      <span style={{ color: "#bbbbbb", fontWeight: 400, fontSize: "12px" }}>· {locs.length} cities</span>
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {locs.map((loc) => (
                        <Link
                          key={loc.slug}
                          href={`/private-chef/${loc.slug}`}
                          className="pc-chip"
                          style={{
                            display: "inline-block",
                            background: "#ffffff",
                            border: "1px solid #e6e6e6",
                            borderRadius: "100px",
                            padding: "8px 16px",
                            textDecoration: "none",
                            fontFamily: "-apple-system, system-ui",
                            fontSize: "13px",
                            color: "#555555",
                          }}
                        >
                          {loc.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Are you a chef CTA ── */}
        <section style={{ padding: "0 20px 100px", textAlign: "center" }}>
          <div style={{ maxWidth: "620px", margin: "0 auto", background: "linear-gradient(135deg,#fdfaf3 0%,#faf5ea 100%)", border: "1px solid #ecdfc2", borderRadius: "28px", padding: "56px 40px" }}>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "16px" }}>
              For chefs
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 400, color: "#111111", letterSpacing: "-0.02em", marginBottom: "16px" }}>
              Claim your city.
              <br />
              <span className="gold-text" style={{ fontStyle: "italic" }}>Get tipped directly.</span>
            </h2>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "15px", color: "#666666", marginBottom: "32px", lineHeight: 1.65 }}>
              Create your free page in under 2 minutes. Get your personal QR code. Receive tips directly from every diner who loves your food.
            </p>
            <Link href="/signup" className="pc-pill" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "linear-gradient(135deg,#D4B878 0%,#C9A96E 55%,#B8934A 100%)",
              color: "#1a1208", borderRadius: "100px", padding: "15px 36px",
              textDecoration: "none", fontFamily: "-apple-system, system-ui",
              fontSize: "15px", fontWeight: 700, boxShadow: "0 8px 30px rgba(201,169,110,0.35)",
            }}>
              Create your free page →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
