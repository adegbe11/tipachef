import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LightNavbar from "@/components/LightNavbar";
import Footer from "@/components/Footer";
import CityByline from "@/components/CityByline";
import DirectAnswer from "@/components/DirectAnswer";
import {
  getTippingGuide,
  getAllTippingSlugs,
  TIPPING_GUIDE_BY_SLUG,
} from "@/lib/tipping-guides";
import { assignAuthor, authorJsonLd } from "@/lib/authors";
import { getCityChefStats } from "@/lib/city-seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTippingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const g = getTippingGuide(params.slug);
  if (!g) return {};
  const title = `${g.question} | Tip a Chef`;
  return {
    title,
    description: g.shortAnswer.slice(0, 155),
    keywords: [g.question.toLowerCase().replace(/\?$/, ""), "tip a chef", "chef tipping", "how much to tip a chef"],
    openGraph: { title, description: g.shortAnswer.slice(0, 155), url: `https://tipachef.com/tipping/${g.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description: g.shortAnswer.slice(0, 155) },
    alternates: { canonical: `https://tipachef.com/tipping/${g.slug}` },
  };
}

// Deterministic rolling review date, reusing the city-stats hash util.
function reviewedDate(slug: string): string {
  const stub = { name: slug, slug, country: "", countryCode: "US", continent: "", region: "", currency: "USD", currencySymbol: "$", priceFrom: 60, population: 100000 };
  return getCityChefStats(stub).lastReviewedISO;
}

export default function TippingGuidePage({ params }: { params: { slug: string } }) {
  const g = getTippingGuide(params.slug);
  if (!g) notFound();

  const author = assignAuthor(g.slug);
  const reviewedISO = reviewedDate(g.slug);
  const related = g.related.map((s) => TIPPING_GUIDE_BY_SLUG[s]).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      authorJsonLd(author),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://tipachef.com" },
          { "@type": "ListItem", position: 2, name: "Tipping Guides", item: "https://tipachef.com/tipping" },
          { "@type": "ListItem", position: 3, name: g.question, item: `https://tipachef.com/tipping/${g.slug}` },
        ],
      },
      {
        "@type": "Article",
        headline: g.question,
        description: g.shortAnswer,
        dateModified: reviewedISO,
        author: { "@id": `https://tipachef.com/team/${author.slug}#person` },
        publisher: { "@id": "https://tipachef.com/#organization" },
        mainEntityOfPage: `https://tipachef.com/tipping/${g.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: g.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        .tg-pill { transition: transform .15s ease, filter .15s ease; }
        .tg-pill:hover { transform: translateY(-2px); filter: brightness(1.04); }
        .tg-chip { transition: border-color .15s ease, color .15s ease, background .15s ease, box-shadow .15s ease; }
        .tg-chip:hover { border-color: #C9A96E; color: #8a6a2f; background: #fff9ee; box-shadow: 0 4px 14px rgba(201,169,110,0.16); }
        .gold-text { background: linear-gradient(135deg,#D4B878 0%,#C9A96E 45%,#A8823C 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: #B8934A; }
        .tg-cta { display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: center; padding: 48px 44px; }
        @media (max-width: 760px) { .tg-cta { grid-template-columns: 1fr; padding: 34px 24px; gap: 22px; } }
      `}</style>
      <LightNavbar />
      <main style={{ background: "#FCFBF8", minHeight: "100vh", color: "#111111" }}>

        {/* Breadcrumb */}
        <div style={{ padding: "112px 20px 0", maxWidth: "820px", margin: "0 auto" }}>
          <nav style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", color: "#9a9a9a" }}>
            <Link href="/" style={{ color: "#9a9a9a", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px", color: "#cccccc" }}>/</span>
            <Link href="/tipping" style={{ color: "#9a9a9a", textDecoration: "none" }}>Tipping Guides</Link>
            <span style={{ margin: "0 8px", color: "#cccccc" }}>/</span>
            <span style={{ color: "#C9A96E", fontWeight: 600 }}>{g.category}</span>
          </nav>
        </div>

        {/* Hero */}
        <section style={{ padding: "20px 20px 0" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <div style={{
              position: "relative", borderRadius: "clamp(20px, 5vw, 30px)", overflow: "hidden",
              background:
                "radial-gradient(130% 120% at 8% 0%, rgba(255,248,228,0.6) 0%, rgba(255,248,228,0) 42%)," +
                "radial-gradient(120% 130% at 100% 100%, rgba(94,61,18,0.26) 0%, rgba(94,61,18,0) 46%)," +
                "linear-gradient(135deg, #E6CB8C 0%, #D4B878 28%, #C9A96E 62%, #AD862F 100%)",
              color: "#1a1208", padding: "clamp(36px, 6vw, 56px) clamp(22px, 5vw, 48px)",
              boxShadow: "0 26px 60px rgba(173,134,47,0.32), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5a3d12", margin: "0 0 12px" }}>
                Tipping guide · {g.category}
              </p>
              <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(34px, 6.5vw, 62px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.04, margin: 0, color: "#1a1208" }}>
                {g.question}
              </h1>
            </div>
          </div>
        </section>

        {/* Byline + Direct Answer */}
        <section style={{ padding: "24px 20px 0" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <CityByline author={author} reviewedISO={reviewedISO} coversLabel="chef tipping etiquette" />
            <DirectAnswer question={g.question} answer={g.shortAnswer} />
          </div>
        </section>

        {/* The short answer figure */}
        <section style={{ padding: "20px 20px 0" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "22px", flexWrap: "wrap", background: "#ffffff", border: "1px solid #ececec", borderRadius: "20px", padding: "26px 30px", boxShadow: "0 1px 2px rgba(168,130,58,0.05)" }}>
              <p className="gold-text" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2.4rem, 6vw, 3.4rem)", fontWeight: 500, margin: 0, lineHeight: 1, whiteSpace: "nowrap" }}>
                {g.amount}
              </p>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", color: "#666666", margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                {g.amountLabel}
              </p>
            </div>
          </div>
        </section>

        {/* Body */}
        <section style={{ padding: "40px 20px 8px" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            {g.body.map((p, i) => (
              <p key={i} style={{ fontFamily: "-apple-system, system-ui", fontSize: "16.5px", lineHeight: 1.75, color: "#333333", margin: "0 0 22px" }}>
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "40px 20px 8px" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.7rem, 4vw, 2.4rem)", fontWeight: 400, color: "#111111", letterSpacing: "-0.02em", margin: "0 0 24px" }}>
              Common questions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {g.faqs.map((f) => (
                <div key={f.q} style={{ background: "#fafafa", border: "1px solid #efefef", borderRadius: "16px", padding: "20px 22px" }}>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14.5px", fontWeight: 700, color: "#222222", margin: "0 0 8px" }}>{f.q}</p>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", color: "#666666", margin: 0, lineHeight: 1.65 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related guides */}
        {related.length > 0 && (
          <section style={{ padding: "40px 20px 8px" }}>
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "16px" }}>
                Related tipping guides
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {related.map((r) => (
                  <Link key={r.slug} href={`/tipping/${r.slug}`} className="tg-chip" style={{ display: "inline-block", background: "#ffffff", border: "1px solid #e6e6e6", borderRadius: "100px", padding: "9px 18px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "13px", color: "#555555" }}>
                    {r.question}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section style={{ padding: "48px 20px 100px" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <div className="tg-cta" style={{ background: "linear-gradient(135deg,#fdfaf3 0%,#faf5ea 100%)", border: "1px solid #ecdfc2", borderRadius: "26px" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 400, color: "#111111", letterSpacing: "-0.02em", margin: "0 0 10px" }}>
                  Tip your chef directly
                </h2>
                <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "15px", color: "#666666", lineHeight: 1.6, margin: 0, maxWidth: "440px" }}>
                  Skip the cash and the tip pool. Scan a chef&apos;s Tip a Chef code and your gratuity goes straight to the person who cooked, who keeps 95%.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "200px" }}>
                <Link href="/search" className="tg-pill" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "linear-gradient(135deg,#D4B878 0%,#C9A96E 55%,#B8934A 100%)", color: "#1a1208", borderRadius: "100px", padding: "14px 30px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "15px", fontWeight: 700, boxShadow: "0 8px 26px rgba(201,169,110,0.32)", whiteSpace: "nowrap" }}>
                  Find a chef to tip
                </Link>
                <Link href="/signup" className="tg-pill" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#ffffff", border: "1px solid #e0e0e0", color: "#555555", borderRadius: "100px", padding: "12px 28px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "13px", fontWeight: 500, whiteSpace: "nowrap" }}>
                  I&apos;m a chef
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
