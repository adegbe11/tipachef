import { notFound }                      from "next/navigation";
import type { Metadata }                  from "next";
import Image                              from "next/image";
import Link                               from "next/link";
import { CITIES, CHEF_CARDS, CityData }  from "@/lib/pseo-data";
import { createServerClient }             from "@/lib/supabase-server";
import Navbar                             from "@/components/Navbar";
import Footer                             from "@/components/Footer";

// Any city a chef registers from generates a page automatically
export const dynamicParams = true;
// Revalidate every hour so new chefs appear without a full redeploy
export const revalidate = 3600;

/* ─── Static params: pre-build the 15 known cities ──────────────────────── */
export async function generateStaticParams() {
  const known = Object.keys(CITIES).map((city) => ({ city }));
  // Also pull any cities already in the DB at build time
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("chefs")
      .select("city")
      .not("city", "is", null);
    const dbCities = (data ?? [])
      .map((r: { city: string }) => r.city)
      .filter(Boolean)
      .map((c: string) => ({ city: c }));
    return [...known, ...dbCities];
  } catch {
    return known;
  }
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: { city: string } }
): Promise<Metadata> {
  const citySlug  = params.city;
  const staticDat = CITIES[citySlug];
  const cityName  = staticDat?.name ?? toTitleCase(citySlug);
  const country   = staticDat?.country ?? "";
  return {
    title:       `Support ${cityName} Chefs Directly | Tip a Chef`,
    description: `Send a direct tip to chefs cooking in ${cityName}. No app, no middleman. Just a QR code, a phone, and thirty seconds.`,
    openGraph: {
      title:       `Support ${cityName} Chefs | Tip a Chef`,
      description: `Direct chef tipping in ${cityName}. Find a chef, send a tip, leave a message.`,
      url:         `https://tipachef.com/chefs/${citySlug}`,
      type:        "website",
    },
    alternates: { canonical: `https://tipachef.com/chefs/${citySlug}` },
  };
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function toTitleCase(slug: string) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

interface DbChef {
  slug: string;
  name: string | null;
  role: string | null;
  bio:  string | null;
  image_url: string | null;
  goal_current: number;
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default async function CityPage({ params }: { params: { city: string } }) {
  const citySlug  = params.city;
  const staticDat = CITIES[citySlug] as CityData | undefined;
  const cityName  = staticDat?.name ?? toTitleCase(citySlug);
  const flag      = staticDat?.flag ?? "🍴";
  const country   = staticDat?.country ?? "";
  const intro     = staticDat?.intro ?? `Discover chefs cooking in ${cityName} and send them a direct tip in thirty seconds.`;

  // ── Pull real chefs from Supabase for this city ──
  let dbChefs: DbChef[] = [];
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("chefs")
      .select("slug, name, role, bio, image_url, goal_current")
      .eq("city", citySlug)
      .limit(24);
    dbChefs = (data ?? []) as DbChef[];
  } catch { /* DB unavailable during build */ }

  // ── Merge: demo hardcoded chefs + real DB chefs ──
  const demoChefs = (staticDat?.chefSlugs ?? []).map((s) => CHEF_CARDS[s]).filter(Boolean);

  // Build unified card list
  type CardItem = { slug: string; name: string; photo: string; role: string; venue: string; location: string; flag: string; tips: string };
  const dbCards: CardItem[] = dbChefs.map((c) => ({
    slug:     c.slug,
    name:     c.name     ?? c.slug,
    photo:    c.image_url ?? "",
    role:     c.role     ?? "Chef",
    venue:    c.bio      ?? "",
    location: cityName,
    flag,
    tips:     String(c.goal_current ?? 0),
  }));

  // Deduplicate (demo chef slugs already included in db if they signed up)
  const demoSlugs = new Set(demoChefs.map((c) => c.slug));
  const merged    = [...demoChefs, ...dbCards.filter((c) => !demoSlugs.has(c.slug))];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type":    "ItemList",
    name:       `Chefs to support in ${cityName}`,
    url:        `https://tipachef.com/chefs/${citySlug}`,
    itemListElement: merged.map((chef, i) => ({
      "@type":     "ListItem",
      position:    i + 1,
      url:         `https://tipachef.com/${chef.slug}`,
      name:        chef.name,
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
              ← All cities
            </Link>
            <p className="eyebrow mb-4 mt-4">
              {flag}{country ? ` ${country}` : ""}
            </p>
            <h1
              className="font-display text-ivory"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 400, lineHeight: 1.12, marginBottom: "1.5rem" }}
            >
              Support{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg,#C9A96E,#D4B878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {cityName}
              </em>{" "}
              Chefs
            </h1>
            <p style={{ color: "rgba(250,248,244,0.55)", fontSize: "1.05rem", maxWidth: "580px", margin: "0 auto", lineHeight: 1.8 }}>
              {intro}
            </p>
          </div>
        </section>

        {/* Chef grid */}
        {merged.length > 0 ? (
          <section style={{ paddingBottom: "5rem" }}>
            <div className="content-container">
              <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {merged.map((chef) => (
                  <Link key={chef.slug} href={`/${chef.slug}`} className="group block" style={{ textDecoration: "none" }}>
                    <div
                      style={{ position: "relative", borderRadius: "28px", overflow: "hidden", aspectRatio: "3/4", boxShadow: "0 24px 60px rgba(0,0,0,0.6),0 8px 24px rgba(0,0,0,0.4),0 0 0 1.5px rgba(255,255,255,0.07)", transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)" }}
                      className="group-hover:scale-[1.02]"
                    >
                      {chef.photo ? (
                        <Image src={chef.photo} alt={chef.name} fill style={{ objectFit: "cover", objectPosition: "center top", transition: "transform 0.6s ease" }} className="group-hover:scale-105" unoptimized />
                      ) : (
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1a1208,#2a1f0f)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: "4rem" }}>👨‍🍳</span>
                        </div>
                      )}
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0) 40%,rgba(0,0,0,0.85) 100%)" }} />
                      <div style={{ position: "absolute", top: "14px", left: "14px", display: "flex", alignItems: "center", gap: "6px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "20px", padding: "4px 10px 4px 6px" }}>
                        <span style={{ fontSize: "14px" }}>{chef.flag}</span>
                        <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "10px", color: "rgba(255,255,255,0.75)", fontWeight: 600, letterSpacing: "0.02em" }}>{chef.location}</span>
                      </div>
                      <div style={{ position: "absolute", bottom: "14px", left: "14px", right: "14px" }}>
                        <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontStyle: "italic", fontSize: "18px", fontWeight: 500, color: "#C9A96E", margin: "0 0 2px" }}>{chef.name}</p>
                        <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", color: "rgba(255,255,255,0.5)", margin: 0 }}>{chef.role}{chef.venue ? ` · ${chef.venue}` : ""}</p>
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
                <p style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{flag}</p>
                <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontStyle: "italic", fontSize: "1.15rem", color: "rgba(250,248,244,0.6)", marginBottom: "2rem", lineHeight: 1.7 }}>
                  No chefs from {cityName} have joined yet. Be the first.
                </p>
                <Link
                  href="/signup"
                  style={{ display: "inline-block", background: "linear-gradient(135deg,#C9A96E,#B8934A)", color: "#1a1208", fontFamily: "-apple-system,system-ui", fontWeight: 700, fontSize: "13px", letterSpacing: "0.04em", padding: "13px 32px", borderRadius: "40px", textDecoration: "none" }}
                >
                  Claim your {cityName} profile
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* How it works */}
        <section style={{ paddingBottom: "6rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "4rem" }}>
          <div className="content-container" style={{ maxWidth: "680px" }}>
            <p className="eyebrow mb-8 text-center">How it works</p>
            <div style={{ display: "grid", gap: "2rem" }}>
              {[
                { n: "01", title: "Find the QR code", body: `Look for a Tip a Chef QR code at your table, on the menu, or at the pass in ${cityName} restaurants that have joined.` },
                { n: "02", title: "Scan and choose an amount", body: "Open your phone camera, scan, pick a tip amount and leave a personal message. Takes under thirty seconds." },
                { n: "03", title: "The chef receives it directly", body: "100% of your tip goes to the chef's personal account via Stripe. No restaurant cut. No waiting." },
              ].map((step) => (
                <div key={step.n} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(201,169,110,0.12)", border: "1.5px solid rgba(201,169,110,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", fontWeight: 700, color: "#C9A96E", letterSpacing: "0.05em" }}>{step.n}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: "1rem", color: "rgba(250,248,244,0.9)", margin: "0 0 6px", fontWeight: 500 }}>{step.title}</p>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.45)", margin: 0, lineHeight: 1.7 }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{ paddingBottom: "6rem" }}>
          <div className="content-container text-center">
            <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.95rem", color: "rgba(250,248,244,0.4)", marginBottom: "1.25rem" }}>
              Chef in {cityName}? Get your free profile.
            </p>
            <Link
              href="/signup"
              style={{ display: "inline-block", background: "linear-gradient(135deg,#C9A96E,#B8934A)", color: "#1a1208", fontFamily: "-apple-system,system-ui", fontWeight: 700, fontSize: "14px", letterSpacing: "0.04em", padding: "14px 36px", borderRadius: "40px", textDecoration: "none" }}
            >
              Create your free profile
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
