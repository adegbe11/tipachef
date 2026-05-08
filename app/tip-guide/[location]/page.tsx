import { notFound }           from "next/navigation";
import type { Metadata }       from "next";
import Link                    from "next/link";
import { TIP_GUIDES, CITIES }  from "@/lib/pseo-data";
import Navbar                  from "@/components/Navbar";
import Footer                  from "@/components/Footer";

/* ─── Static params ──────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return Object.keys(TIP_GUIDES).map((location) => ({ location }));
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: { location: string } }
): Promise<Metadata> {
  const data = TIP_GUIDES[params.location];
  if (!data) return {};
  return {
    title:       `How to Tip a Chef in ${data.name} | Tip a Chef`,
    description: `Everything you need to know about tipping chefs in ${data.name}. How much to tip, where the money goes, and how to send a direct tip to the person who cooked your meal.`,
    openGraph: {
      title:       `Tipping Chefs in ${data.name} | Tip a Chef`,
      description: `How chef tipping works in ${data.name} and how to do it directly.`,
      url:         `https://tipachef.com/tip-guide/${params.location}`,
      type:        "article",
    },
    alternates: { canonical: `https://tipachef.com/tip-guide/${params.location}` },
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function TipGuidePage({ params }: { params: { location: string } }) {
  const data = TIP_GUIDES[params.location];
  if (!data) notFound();

  const linkedCities = data.cityLinks
    .map((slug) => CITIES[slug])
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type":    "Article",
    headline:   `How to Tip a Chef in ${data.name}`,
    description: `Tipping guide for chefs in ${data.name}. Direct tipping via Tip a Chef.`,
    url:         `https://tipachef.com/tip-guide/${params.location}`,
    publisher: {
      "@type": "Organization",
      name:    "Tip a Chef",
      url:     "https://tipachef.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main style={{ background: "#0a0908", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ paddingTop: "7rem", paddingBottom: "4rem" }}>
          <div className="content-container" style={{ maxWidth: "740px" }}>
            <p className="eyebrow mb-4">{data.flag} Tipping guide</p>
            <h1
              className="font-display text-ivory"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 400, lineHeight: 1.15, marginBottom: "1.5rem" }}
            >
              How to Tip a Chef in{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg,#C9A96E,#D4B878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {data.name}
              </em>
            </h1>

            {/* Norm callout */}
            <div style={{ background: "rgba(201,169,110,0.08)", border: "1.5px solid rgba(201,169,110,0.25)", borderRadius: "16px", padding: "1.25rem 1.5rem", marginBottom: "3rem" }}>
              <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(201,169,110,0.9)", margin: 0, lineHeight: 1.6 }}>
                <strong style={{ color: "#C9A96E" }}>Standard norm:</strong> {data.norm}
              </p>
            </div>
          </div>
        </section>

        {/* Content sections */}
        <section style={{ paddingBottom: "5rem" }}>
          <div className="content-container" style={{ maxWidth: "740px" }}>
            <div style={{ display: "grid", gap: "3rem" }}>
              {data.sections.map((section, i) => (
                <div key={i}>
                  <h2
                    className="font-display text-ivory"
                    style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 400, marginBottom: "1rem", lineHeight: 1.25 }}
                  >
                    {section.h2}
                  </h2>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "1rem", color: "rgba(250,248,244,0.6)", lineHeight: 1.85, margin: 0 }}>
                    {section.p}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA box */}
        <section style={{ paddingBottom: "5rem" }}>
          <div className="content-container" style={{ maxWidth: "740px" }}>
            <div style={{ background: "rgba(201,169,110,0.07)", border: "1.5px solid rgba(201,169,110,0.2)", borderRadius: "20px", padding: "2.5rem", textAlign: "center" }}>
              <p
                className="font-display text-ivory"
                style={{ fontSize: "1.4rem", fontWeight: 400, marginBottom: "0.75rem", fontStyle: "italic" }}
              >
                Ready to tip a chef directly?
              </p>
              <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.5)", marginBottom: "1.75rem", lineHeight: 1.7 }}>
                Find a chef with a Tip a Chef profile or scan a QR code at your next restaurant in {data.name}.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                  href="/search"
                  style={{ display: "inline-block", background: "linear-gradient(135deg,#C9A96E,#B8934A)", color: "#1a1208", fontFamily: "-apple-system,system-ui", fontWeight: 700, fontSize: "13px", letterSpacing: "0.04em", padding: "13px 28px", borderRadius: "40px", textDecoration: "none" }}
                >
                  Find a chef
                </Link>
                <Link
                  href="/signup"
                  style={{ display: "inline-block", background: "transparent", color: "#C9A96E", fontFamily: "-apple-system,system-ui", fontWeight: 600, fontSize: "13px", letterSpacing: "0.03em", padding: "13px 28px", borderRadius: "40px", textDecoration: "none", border: "1.5px solid rgba(201,169,110,0.4)" }}
                >
                  I am a chef
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related cities */}
        {linkedCities.length > 0 && (
          <section style={{ paddingBottom: "6rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "4rem" }}>
            <div className="content-container" style={{ maxWidth: "740px" }}>
              <p className="eyebrow mb-6">Chefs by city</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {linkedCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/chefs/${city.slug}`}
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.035)", border: "1.5px solid rgba(201,169,110,0.14)", borderRadius: "40px", padding: "9px 18px", textDecoration: "none", fontFamily: "-apple-system,system-ui", fontSize: "13px", fontWeight: 600, color: "rgba(250,248,244,0.7)", letterSpacing: "0.02em" }}
                  >
                    <span>{city.flag}</span>
                    <span>{city.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
