import { notFound }              from "next/navigation";
import type { Metadata }          from "next";
import Image                      from "next/image";
import Link                       from "next/link";
import { CUISINES, CHEF_CARDS }   from "@/lib/pseo-data";
import Navbar                     from "@/components/Navbar";
import Footer                     from "@/components/Footer";

/* ─── Static params ──────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return Object.keys(CUISINES).map((type) => ({ type }));
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: { type: string } }
): Promise<Metadata> {
  const data = CUISINES[params.type];
  if (!data) return {};
  return {
    title:       `Top ${data.name} Chefs to Support | Tip a Chef`,
    description: `Send a direct tip to ${data.name} chefs. Find a chef, send a personal message, support their craft directly with no middleman.`,
    openGraph: {
      title:       `Top ${data.name} Chefs | Tip a Chef`,
      description: `Direct tipping for ${data.name} chefs worldwide.`,
      url:         `https://tipachef.com/cuisine/${params.type}`,
      type:        "website",
    },
    alternates: { canonical: `https://tipachef.com/cuisine/${params.type}` },
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function CuisinePage({ params }: { params: { type: string } }) {
  const data = CUISINES[params.type];
  if (!data) notFound();

  const chefs = data.chefSlugs.map((s) => CHEF_CARDS[s]).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type":    "ItemList",
    name:       `${data.name} chefs on Tip a Chef`,
    url:        `https://tipachef.com/cuisine/${params.type}`,
    itemListElement: chefs.map((chef, i) => ({
      "@type":    "ListItem",
      position:   i + 1,
      url:        `https://tipachef.com/${chef.slug}`,
      name:       chef.name,
      description: `${chef.role} at ${chef.venue}`,
    })),
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
          <div className="content-container text-center">
            <Link
              href="/chefs"
              style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", color: "rgba(201,169,110,0.7)", letterSpacing: "0.05em", textDecoration: "none", marginBottom: "1.5rem", display: "inline-block" }}
            >
              ← All cuisines
            </Link>
            <p className="eyebrow mb-4 mt-4">{data.name} cuisine</p>
            <h1
              className="font-display text-ivory"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 400, lineHeight: 1.12, marginBottom: "1.5rem" }}
            >
              Support{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg,#C9A96E,#D4B878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {data.name} Chefs
              </em>
            </h1>
            <p style={{ color: "rgba(250,248,244,0.55)", fontSize: "1.05rem", maxWidth: "580px", margin: "0 auto", lineHeight: 1.8 }}>
              {data.intro}
            </p>
          </div>
        </section>

        {/* Chef grid */}
        {chefs.length > 0 ? (
          <section style={{ paddingBottom: "5rem" }}>
            <div className="content-container">
              <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {chefs.map((chef) => (
                  <Link key={chef.slug} href={`/${chef.slug}`} className="group block" style={{ textDecoration: "none" }}>
                    <div
                      style={{ position: "relative", borderRadius: "28px", overflow: "hidden", aspectRatio: "3/4", boxShadow: "0 24px 60px rgba(0,0,0,0.6),0 8px 24px rgba(0,0,0,0.4),0 0 0 1.5px rgba(255,255,255,0.07)", transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)" }}
                      className="group-hover:scale-[1.02]"
                    >
                      <Image src={chef.photo} alt={chef.name} fill style={{ objectFit: "cover", objectPosition: "center top", transition: "transform 0.6s ease" }} className="group-hover:scale-105" unoptimized />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0) 40%,rgba(0,0,0,0.85) 100%)" }} />
                      <div style={{ position: "absolute", top: "14px", left: "14px", display: "flex", alignItems: "center", gap: "6px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "20px", padding: "4px 10px 4px 6px" }}>
                        <span style={{ fontSize: "14px" }}>{chef.flag}</span>
                        <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "10px", color: "rgba(255,255,255,0.75)", fontWeight: 600, letterSpacing: "0.02em" }}>{chef.location}</span>
                      </div>
                      <div style={{ position: "absolute", bottom: "14px", left: "14px", right: "14px" }}>
                        <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontStyle: "italic", fontSize: "18px", fontWeight: 500, color: "#C9A96E", margin: "0 0 2px" }}>{chef.name}</p>
                        <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", color: "rgba(255,255,255,0.5)", margin: 0 }}>{chef.role} · {chef.venue}</p>
                      </div>
                    </div>
                    <div style={{ marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1.5px solid rgba(201,169,110,0.18)", borderRadius: "40px", padding: "10px 16px" }} className="group-hover:border-ember/40">
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "linear-gradient(135deg,#C9A96E,#D4B878)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="12" height="11" viewBox="0 0 14 12" fill="#1a1208"><path d="M7 11C7 11 0.5 7 0.5 3.5C0.5 1.8 1.8 0.5 3.5 0.5C5 0.5 6.2 1.4 7 2.5C7.8 1.4 9 0.5 10.5 0.5C12.2 0.5 13.5 1.8 13.5 3.5C13.5 7 7 11 7 11Z" /></svg>
                        </div>
                        <div>
                          <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "13px", fontWeight: 700, color: "rgba(250,248,244,0.88)", margin: 0 }}>{chef.tips}+ tips</p>
                          <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "10px", color: "rgba(250,248,244,0.3)", margin: 0 }}>received</p>
                        </div>
                      </div>
                      <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", fontWeight: 600, color: "#C9A96E", letterSpacing: "0.02em" }}>Tip now →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section style={{ paddingBottom: "5rem" }}>
            <div className="content-container text-center">
              <div style={{ maxWidth: "440px", margin: "0 auto", background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(201,169,110,0.15)", borderRadius: "24px", padding: "3rem 2rem" }}>
                <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontStyle: "italic", fontSize: "1.15rem", color: "rgba(250,248,244,0.6)", marginBottom: "2rem", lineHeight: 1.7 }}>
                  No {data.name} chefs have joined yet. Be the first.
                </p>
                <Link href="/signup" style={{ display: "inline-block", background: "linear-gradient(135deg,#C9A96E,#B8934A)", color: "#1a1208", fontFamily: "-apple-system,system-ui", fontWeight: 700, fontSize: "13px", letterSpacing: "0.04em", padding: "13px 32px", borderRadius: "40px", textDecoration: "none" }}>
                  Create your free profile
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Browse by city */}
        <section style={{ paddingBottom: "6rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "4rem" }}>
          <div className="content-container text-center">
            <p className="eyebrow mb-6">Also browse by city</p>
            <Link
              href="/chefs"
              style={{ fontFamily: "-apple-system,system-ui", fontSize: "13px", fontWeight: 600, color: "#C9A96E", letterSpacing: "0.03em", textDecoration: "none" }}
            >
              View all cities →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
