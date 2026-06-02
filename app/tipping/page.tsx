import type { Metadata } from "next";
import Link from "next/link";
import LightNavbar from "@/components/LightNavbar";
import Footer from "@/components/Footer";
import {
  TIPPING_GUIDES,
  TIPPING_CATEGORIES,
  getTippingGuidesByCategory,
} from "@/lib/tipping-guides";

export const metadata: Metadata = {
  title: "Chef Tipping Guides | Do You Tip a Chef & How Much? | Tip a Chef",
  description:
    "Clear answers to every chef tipping question: do you tip a private chef, hibachi chef, sushi chef or personal chef, and how much. Plus country guides and why kitchen chefs often get nothing.",
  keywords: [
    "do you tip a chef", "how much to tip a chef", "do you tip a private chef",
    "how much to tip a hibachi chef", "do chefs get tips", "tip a chef",
  ],
  openGraph: {
    title: "Chef Tipping Guides | Do You Tip a Chef & How Much?",
    description: "Clear answers to every chef tipping question, plus how to tip the chef directly.",
    url: "https://tipachef.com/tipping",
    type: "website",
  },
  alternates: { canonical: "https://tipachef.com/tipping" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://tipachef.com" },
        { "@type": "ListItem", position: 2, name: "Tipping Guides", item: "https://tipachef.com/tipping" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: TIPPING_GUIDES.slice(0, 12).map((g) => ({
        "@type": "Question",
        name: g.question,
        acceptedAnswer: { "@type": "Answer", text: g.shortAnswer },
      })),
    },
  ],
};

export default function TippingHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        .tg-card { box-shadow: 0 1px 2px rgba(168,130,58,0.05); transition: box-shadow .25s ease, transform .25s ease, border-color .25s ease; }
        .tg-card:hover { box-shadow: 0 16px 40px rgba(168,130,58,0.15); transform: translateY(-3px); border-color: #e3d2a8; }
        .gold-text { background: linear-gradient(135deg,#D4B878 0%,#C9A96E 45%,#A8823C 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: #B8934A; }
      `}</style>
      <LightNavbar />
      <main style={{ background: "#FCFBF8", minHeight: "100vh", color: "#111111" }}>

        {/* Hero */}
        <section style={{ paddingTop: "128px", paddingBottom: "56px", textAlign: "center" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff7e8", border: "1px solid #f0e2c2", borderRadius: "100px", padding: "6px 16px", marginBottom: "22px" }}>
              <span style={{ color: "#C9A96E", fontSize: "12px", letterSpacing: "1px" }}>★★★★★</span>
              <span style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", fontWeight: 600, color: "#8a6a2f" }}>
                {TIPPING_GUIDES.length} answers, honestly written
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2.6rem, 6vw, 4.4rem)", fontWeight: 400, color: "#111111", lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "20px" }}>
              Do you tip a chef?{" "}
              <span className="gold-text" style={{ fontStyle: "italic" }}>And how much?</span>
            </h1>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "16px", color: "#666666", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>
              Straight answers to every chef tipping question, private, hibachi, sushi, personal, and more, plus the truth about whether kitchen chefs ever see your tip, and how to tip them directly.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section style={{ padding: "0 20px 90px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "52px" }}>
            {TIPPING_CATEGORIES.map((cat) => {
              const guides = getTippingGuidesByCategory(cat);
              if (!guides.length) return null;
              return (
                <div key={cat}>
                  <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 400, color: "#111111", letterSpacing: "-0.02em", marginBottom: "20px" }}>
                    {cat}
                  </h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "14px" }}>
                    {guides.map((g) => (
                      <Link key={g.slug} href={`/tipping/${g.slug}`} style={{ textDecoration: "none" }}>
                        <div className="tg-card" style={{ background: "#ffffff", border: "1px solid #ececec", borderRadius: "18px", padding: "20px 22px", height: "100%" }}>
                          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px", marginBottom: "8px" }}>
                            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14.5px", fontWeight: 700, color: "#111111", margin: 0, lineHeight: 1.35 }}>
                              {g.question}
                            </p>
                          </div>
                          <p className="gold-text" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", fontWeight: 500, margin: "0 0 8px" }}>
                            {g.amount}
                          </p>
                          <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12.5px", color: "#888888", margin: 0, lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } as React.CSSProperties}>
                            {g.amountLabel}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "0 20px 100px", textAlign: "center" }}>
          <div style={{ maxWidth: "620px", margin: "0 auto", background: "linear-gradient(135deg,#fdfaf3 0%,#faf5ea 100%)", border: "1px solid #ecdfc2", borderRadius: "28px", padding: "52px 40px" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)", fontWeight: 400, color: "#111111", letterSpacing: "-0.02em", marginBottom: "14px" }}>
              Tip the chef who cooked,{" "}
              <span className="gold-text" style={{ fontStyle: "italic" }}>directly.</span>
            </h2>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "15px", color: "#666666", marginBottom: "30px", lineHeight: 1.65 }}>
              No cash, no tip pool, no front-of-house split. Scan a chef&apos;s code and your tip goes straight to them.
            </p>
            <Link href="/search" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "linear-gradient(135deg,#D4B878 0%,#C9A96E 55%,#B8934A 100%)",
              color: "#1a1208", borderRadius: "100px", padding: "15px 36px",
              textDecoration: "none", fontFamily: "-apple-system, system-ui",
              fontSize: "15px", fontWeight: 700, boxShadow: "0 8px 30px rgba(201,169,110,0.35)",
            }}>
              Find a chef to tip →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
