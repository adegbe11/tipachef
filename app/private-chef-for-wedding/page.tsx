import type { Metadata } from "next";
import Link from "next/link";
import LightNavbar from "@/components/LightNavbar";
import Footer from "@/components/Footer";
import CityByline from "@/components/CityByline";
import DirectAnswer from "@/components/DirectAnswer";
import { assignAuthor, authorJsonLd } from "@/lib/authors";
import { getCityChefStats } from "@/lib/city-seo";

export const metadata: Metadata = {
  title: "Private Chef for Your Wedding | Personal Wedding Catering | Tip a Chef",
  description:
    "Hire a private chef for your wedding instead of traditional catering. Bespoke menus, tasting dinners, and a chef who cooks on-site. See costs, what's included, and how to book. Tips go directly to your chef.",
  keywords: [
    "private chef for a wedding", "private chef wedding", "wedding catering",
    "wedding private chef", "hire a chef for wedding", "personal chef wedding",
    "private chef wedding cost", "do you tip the chef at a wedding",
  ],
  openGraph: {
    title: "Private Chef for Your Wedding | Personal Wedding Catering | Tip a Chef",
    description: "Hire a private chef for your wedding. Bespoke menus, tasting dinners, on-site cooking. See costs and book direct.",
    url: "https://tipachef.com/private-chef-for-wedding",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Chef for Your Wedding | Tip a Chef",
    description: "Hire a private chef for your wedding instead of traditional catering. See costs, menus, and how to book.",
  },
  alternates: { canonical: "https://tipachef.com/private-chef-for-wedding" },
};

const FAQS = [
  {
    q: "How much does a private chef cost for a wedding?",
    a: "A private chef for a wedding typically costs $75–$250 per guest depending on the menu, course count, and location. Smaller weddings of 20–40 guests often run $100–$200 per head for a multi-course plated dinner, including shopping, prep, on-site cooking, and service. Always confirm whether staffing, rentals, and a service charge are included.",
  },
  {
    q: "Is a private chef cheaper than wedding catering?",
    a: "For small to mid-size weddings, a private chef is often more affordable and more personal than a full catering company, because you skip the catering-hall markup and large-team overhead. For very large weddings of 150+ guests, a catering company with its own kitchen brigade may be more practical.",
  },
  {
    q: "What does a private chef do for a wedding?",
    a: "A private wedding chef plans a bespoke menu with you, often runs a tasting dinner beforehand, shops for ingredients, and cooks fresh on-site on the day. Many bring a small team for plating and service, handle dietary requirements, and clean up afterwards. You get a restaurant-quality meal tailored entirely to you.",
  },
  {
    q: "How far in advance should I book a wedding chef?",
    a: "Book a private wedding chef 3–6 months in advance, and longer for peak season (late spring through early autumn). This leaves time for a tasting, menu refinement, and confirming guest numbers and dietary needs.",
  },
  {
    q: "Do you tip the chef at a wedding?",
    a: "Yes, tipping the wedding chef and kitchen team is customary unless a service charge is already in the contract. A common approach is $50–$200 for the head chef plus a tip for the team, or 10–20% of the catering cost. See our full guide on tipping the chef at a wedding.",
  },
  {
    q: "Can a private chef handle dietary restrictions at a wedding?",
    a: "Yes. One of the biggest advantages of a private chef is flexibility. They can build vegetarian, vegan, gluten-free, halal, kosher, or allergy-safe options into the menu and prepare guest meals individually, which is far harder for a large catering operation.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://tipachef.com" },
        { "@type": "ListItem", position: 2, name: "Private Chef", item: "https://tipachef.com/private-chef" },
        { "@type": "ListItem", position: 3, name: "Wedding", item: "https://tipachef.com/private-chef-for-wedding" },
      ],
    },
    {
      "@type": "Service",
      name: "Private Chef for Weddings",
      description: "Hire a private chef for your wedding. Bespoke menus, tasting dinners, and on-site cooking.",
      serviceType: "Wedding catering by a private chef",
      provider: { "@type": "Organization", name: "Tip a Chef", url: "https://tipachef.com" },
      url: "https://tipachef.com/private-chef-for-wedding",
      areaServed: "Worldwide",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function WeddingChefPage() {
  const author = assignAuthor("private-chef-for-wedding", "Europe");
  const reviewedISO = getCityChefStats({
    name: "wedding", slug: "private-chef-for-wedding", country: "", countryCode: "US",
    continent: "", region: "", currency: "USD", currencySymbol: "$", priceFrom: 120, population: 500000,
  }).lastReviewedISO;

  const directAnswer = {
    question: "How much does a private chef cost for a wedding?",
    answer:
      "A private chef for a wedding typically costs $75–$250 per guest depending on the menu, number of courses, guest count, and location. A multi-course plated dinner for an intimate wedding usually lands around $100–$200 per head, covering menu planning, a tasting, shopping, on-site cooking, and service. Tips go directly to the chef.",
  };

  const fullJsonLd = { ...jsonLd, "@graph": [authorJsonLd(author), ...jsonLd["@graph"]] };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fullJsonLd) }} />
      <style>{`
        .wc-card { box-shadow: 0 1px 2px rgba(168,130,58,0.05); transition: box-shadow .25s ease, transform .25s ease, border-color .25s ease; }
        .wc-card:hover { box-shadow: 0 18px 44px rgba(168,130,58,0.16); transform: translateY(-3px); border-color: #e3d2a8; }
        .wc-chip { transition: border-color .15s ease, color .15s ease, background .15s ease, box-shadow .15s ease; }
        .wc-chip:hover { border-color: #C9A96E; color: #8a6a2f; background: #fff9ee; box-shadow: 0 4px 14px rgba(201,169,110,0.16); }
        .wc-pill { transition: transform .15s ease, filter .15s ease; }
        .wc-pill:hover { transform: translateY(-2px); filter: brightness(1.04); }
        .gold-text { background: linear-gradient(135deg,#D4B878 0%,#C9A96E 45%,#A8823C 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: #B8934A; }
      `}</style>
      <LightNavbar />
      <main style={{ background: "#FCFBF8", minHeight: "100vh", color: "#111111" }}>

        {/* Breadcrumb */}
        <div style={{ padding: "112px 20px 0", maxWidth: "1000px", margin: "0 auto" }}>
          <nav style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", color: "#9a9a9a" }}>
            <Link href="/" style={{ color: "#9a9a9a", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px", color: "#cccccc" }}>/</span>
            <Link href="/private-chef" style={{ color: "#9a9a9a", textDecoration: "none" }}>Private Chef</Link>
            <span style={{ margin: "0 8px", color: "#cccccc" }}>/</span>
            <span style={{ color: "#C9A96E", fontWeight: 600 }}>Wedding</span>
          </nav>
        </div>

        {/* Hero */}
        <section style={{ padding: "20px 20px 0" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{
              position: "relative", borderRadius: "clamp(20px, 5vw, 32px)", overflow: "hidden",
              background:
                "radial-gradient(130% 120% at 8% 0%, rgba(255,248,228,0.62) 0%, rgba(255,248,228,0) 42%)," +
                "radial-gradient(120% 130% at 100% 100%, rgba(94,61,18,0.26) 0%, rgba(94,61,18,0) 46%)," +
                "linear-gradient(135deg, #E6CB8C 0%, #D4B878 28%, #C9A96E 62%, #AD862F 100%)",
              color: "#1a1208", padding: "clamp(40px, 7vw, 64px) clamp(22px, 5vw, 52px)",
              boxShadow: "0 30px 70px rgba(173,134,47,0.34), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(26,18,8,0.14)", borderRadius: "100px", padding: "6px 14px", marginBottom: "18px" }}>
                <span style={{ color: "#3a2810", fontSize: "12px", letterSpacing: "1px" }}>★★★★★</span>
                <span style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", fontWeight: 600, color: "#3a2810" }}>Tailored to your day, not a banquet menu</span>
              </div>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5a3d12", margin: "0 0 10px" }}>
                Wedding catering, reinvented
              </p>
              <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(40px, 8vw, 84px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 0.98, margin: "0 0 18px", color: "#1a1208" }}>
                A private chef<br />for your wedding
              </h1>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 500, maxWidth: "620px", lineHeight: 1.45, color: "#2a1d0c", margin: "0 0 28px", opacity: 0.94 }}>
                Skip the catering-hall menu. A private chef plans a bespoke menu with you, cooks it fresh on-site, and makes your wedding dinner taste like the best restaurant you have ever been to. And the tip goes straight to the chef.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/search" className="wc-pill" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#1a1208", color: "#F4E3C1", borderRadius: "100px", padding: "15px 32px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 700, boxShadow: "0 10px 28px rgba(26,18,8,0.3)" }}>
                  Find a wedding chef
                </Link>
                <Link href="/private-chef" className="wc-pill" style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.45)", border: "1.5px solid rgba(26,18,8,0.28)", color: "#1a1208", borderRadius: "100px", padding: "15px 32px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 600 }}>
                  Browse all private chefs
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Byline + Direct Answer */}
        <section style={{ padding: "24px 20px 0" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <CityByline author={author} reviewedISO={reviewedISO} coversLabel="private chefs for weddings" />
            <DirectAnswer question={directAnswer.question} answer={directAnswer.answer} />
          </div>
        </section>

        {/* Private chef vs traditional catering */}
        <section style={{ padding: "56px 20px 0" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "12px" }}>
              Why a private chef
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, color: "#111111", letterSpacing: "-0.02em", margin: "0 0 32px" }}>
              Private chef vs traditional wedding catering
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "16px" }}>
              {[
                { icon: "🍽️", t: "A menu that is actually yours", d: "You design the menu together, not pick from three banquet set menus. Tasting dinner included by most chefs." },
                { icon: "👨‍🍳", t: "Cooked fresh on-site", d: "No reheated trays from a central kitchen. Your chef cooks on the day, so the food arrives at its best." },
                { icon: "💷", t: "Often better value", d: "For small to mid-size weddings you skip the catering-hall markup and large-team overhead." },
                { icon: "🌱", t: "Every diet handled", d: "Vegan, gluten-free, halal, kosher, allergies, prepared individually. Far easier than a mass catering line." },
                { icon: "🤝", t: "One person who cares", d: "You deal directly with the chef cooking your food, not a sales team and a separate kitchen." },
                { icon: "💛", t: "Tips reach the chef", d: "With Tip a Chef, your gratuity goes straight to the chef and their team, not into a pool." },
              ].map((c) => (
                <div key={c.t} className="wc-card" style={{ background: "#ffffff", border: "1px solid #ececec", borderRadius: "18px", padding: "22px 24px" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "12px" }}>{c.icon}</div>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 700, color: "#222222", margin: "0 0 6px" }}>{c.t}</p>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", color: "#777777", margin: 0, lineHeight: 1.6 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section style={{ padding: "72px 20px", marginTop: "56px", background: "#F7F3EA", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "44px" }}>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "12px" }}>Pricing</p>
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, color: "#111111", letterSpacing: "-0.02em", marginBottom: "12px" }}>
                What a wedding chef costs
              </h2>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", color: "#888888", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
                A guide. Final cost depends on guest count, menu, courses, staffing, and location.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: "16px" }}>
              {[
                { label: "Intimate (10–30 guests)", price: "$100–$200 / guest", desc: "Multi-course plated dinner, tasting, shopping, on-site cooking, and clean-up." },
                { label: "Mid-size (30–80 guests)", price: "$85–$175 / guest", desc: "Chef plus a small service team. Plated or family-style, fully bespoke menu." },
                { label: "Large (80–150 guests)", price: "$75–$150 / guest", desc: "Chef-led kitchen team. Buffet, stations, or plated. Compare against a catering company." },
              ].map((p) => (
                <div key={p.label} className="wc-card" style={{ background: "#ffffff", border: "1px solid #ececec", borderRadius: "20px", padding: "24px" }}>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#aaaaaa", margin: "0 0 6px" }}>{p.label}</p>
                  <p className="gold-text" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.5rem", fontWeight: 500, margin: "0 0 10px" }}>{p.price}</p>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12.5px", color: "#888888", margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", color: "#888888", lineHeight: 1.7, margin: "24px auto 0", maxWidth: "620px", textAlign: "center" }}>
              Tipping the chef and team is customary on top, usually $50–$200 for the head chef or 10–20% of the food cost.{" "}
              <Link href="/tipping/do-you-tip-the-chef-at-a-wedding" className="gold-text" style={{ textDecoration: "none", fontWeight: 600 }}>See the wedding tipping guide →</Link>
            </p>
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: "72px 20px 0" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "44px" }}>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "12px" }}>How it works</p>
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, color: "#111111", letterSpacing: "-0.02em", margin: 0 }}>
                From first message to first dance
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { n: "01", t: "Find your chef", d: "Browse chef profiles, see their style and menus, and reach out 3–6 months before the day." },
                { n: "02", t: "Design the menu", d: "Build a bespoke menu together. Most chefs offer a tasting so you taste the day before you book it." },
                { n: "03", t: "They cook on-site", d: "The chef shops, preps, and cooks fresh at your venue, with a small team for plating and service." },
                { n: "04", t: "Tip them directly", d: "Loved it? Tip the chef and team straight from your phone. Every penny reaches them." },
              ].map((s) => (
                <div key={s.n} className="wc-card" style={{ display: "flex", gap: "18px", alignItems: "flex-start", background: "#ffffff", border: "1px solid #ececec", borderRadius: "18px", padding: "20px 22px" }}>
                  <span className="gold-text" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.6rem", fontWeight: 500, lineHeight: 1, flexShrink: 0, minWidth: "34px" }}>{s.n}</span>
                  <div>
                    <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 700, color: "#222222", margin: "0 0 4px" }}>{s.t}</p>
                    <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", color: "#777777", margin: 0, lineHeight: 1.6 }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "72px 20px 0" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "12px" }}>FAQ</p>
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, color: "#111111", letterSpacing: "-0.02em", margin: 0 }}>
                Wedding chef questions
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {FAQS.map((f) => (
                <div key={f.q} style={{ background: "#ffffff", border: "1px solid #efefef", borderRadius: "16px", padding: "20px 22px" }}>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 700, color: "#222222", margin: "0 0 8px" }}>{f.q}</p>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13.5px", color: "#666666", margin: 0, lineHeight: 1.65 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "72px 20px 100px" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center", background: "linear-gradient(135deg,#fdfaf3 0%,#faf5ea 100%)", border: "1px solid #ecdfc2", borderRadius: "28px", padding: "56px 40px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.9rem, 4.5vw, 3rem)", fontWeight: 400, color: "#111111", letterSpacing: "-0.02em", marginBottom: "14px" }}>
              Find your{" "}
              <span className="gold-text" style={{ fontStyle: "italic" }}>wedding chef</span>
            </h2>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "15px", color: "#666666", marginBottom: "30px", lineHeight: 1.65, maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
              Browse private chefs, design a menu that is truly yours, and give your guests a meal they will remember longer than the speeches.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/search" className="wc-pill" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg,#D4B878 0%,#C9A96E 55%,#B8934A 100%)", color: "#1a1208", borderRadius: "100px", padding: "15px 36px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "15px", fontWeight: 700, boxShadow: "0 8px 30px rgba(201,169,110,0.35)" }}>
                Find a wedding chef →
              </Link>
              <Link href="/signup" className="wc-pill" style={{ display: "inline-flex", alignItems: "center", background: "#ffffff", border: "1px solid #e0e0e0", color: "#555555", borderRadius: "100px", padding: "15px 32px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 600 }}>
                I&apos;m a chef
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
