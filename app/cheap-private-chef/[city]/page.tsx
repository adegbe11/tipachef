import { notFound }                          from "next/navigation";
import type { Metadata }                      from "next";
import Image                                  from "next/image";
import Link                                   from "next/link";
import { WORLD_CITIES, WORLD_CITIES_BY_SLUG, countryFlag } from "@/lib/world-cities";
import { createServerClient }                 from "@/lib/supabase-server";
import Navbar                                 from "@/components/Navbar";
import Footer                                 from "@/components/Footer";

export const dynamicParams = true;
export const revalidate    = 3600;

/* ─── Static params ──────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return WORLD_CITIES.map((c) => ({ city: c.slug }));
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: { city: string } }
): Promise<Metadata> {
  const data     = WORLD_CITIES_BY_SLUG[params.city];
  const cityName = data?.name ?? toTitleCase(params.city);
  const price    = data?.priceFrom ?? 60;
  return {
    title:       `Cheap Private Chef in ${cityName} | From $${price}/person | Tip a Chef`,
    description: `Affordable private chef hire in ${cityName} starting from $${price} per person. Real chefs, no agency fees, direct booking. Perfect for dinner parties and casual events.`,
    openGraph: {
      title:       `Cheap Private Chef in ${cityName} | Tip a Chef`,
      description: `Affordable private dining in ${cityName} from $${price}/person. Book a chef directly.`,
      url:         `https://tipachef.com/cheap-private-chef/${params.city}`,
      type:        "website",
    },
    alternates: { canonical: `https://tipachef.com/cheap-private-chef/${params.city}` },
  };
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function toTitleCase(slug: string) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

interface DbChef {
  slug: string; name: string | null; role: string | null;
  bio: string | null; image_url: string | null; goal_current: number;
}

const FAQS = (cityName: string, priceFrom: number) => [
  {
    q: `How cheap can a private chef be in ${cityName}?`,
    a: `Affordable private chefs in ${cityName} typically start from $${priceFrom} per person for a simple dinner party menu. This usually includes grocery shopping, cooking, and kitchen clean-up. For groups of 8 or more, the per-person cost often comes down further.`,
  },
  {
    q: `Is hiring a cheap private chef in ${cityName} worth it?`,
    a: `For a dinner party of 6 or more people, a private chef often works out cheaper than a restaurant once you factor in the cost of drinks, service charges, and transport. You get better food, in your own space, at a table you control. For most people who try it once, it becomes their default for special occasions.`,
  },
  {
    q: `What is included in a cheap private chef hire in ${cityName}?`,
    a: "Most private chefs in our network include menu planning, grocery shopping, cooking, plating, and kitchen clean-up in their base rate. Service of the meal is sometimes extra depending on the chef. Always confirm inclusions when booking.",
  },
  {
    q: `How is this different from a catering company in ${cityName}?`,
    a: "A private chef from Tip a Chef is an individual professional, not an agency. You are booking a specific person with a specific style. There is no agency markup, no minimum spend, and no corporate catering vibe. You deal directly with the chef and the result feels personal because it is.",
  },
  {
    q: "Can I tip a private chef after the event?",
    a: "Yes, and most clients do. Every chef in our network has a Tip a Chef profile. After your dinner, scan their QR code and send a direct tip with a personal note. 100% reaches the chef immediately. It is the best way to say thank you.",
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default async function CheapPrivateChefPage({ params }: { params: { city: string } }) {
  const citySlug = params.city;
  const data     = WORLD_CITIES_BY_SLUG[citySlug];

  if (!data && !citySlug.match(/^[a-z0-9-]+$/)) notFound();

  const cityName  = data?.name     ?? toTitleCase(citySlug);
  const country   = data?.country  ?? "";
  const flag      = data ? countryFlag(data.countryCode) : "🍴";
  const priceFrom = data?.priceFrom ?? 60;
  const cheapFrom = Math.round(priceFrom * 0.65); // ~35% lower entry point

  let chefs: DbChef[] = [];
  try {
    const supabase = createServerClient();
    const { data: rows } = await supabase
      .from("chefs")
      .select("slug, name, role, bio, image_url, goal_current")
      .eq("city", citySlug)
      .limit(18);
    chefs = (rows ?? []) as DbChef[];
  } catch { /* build-time fallback */ }

  const faqs     = FAQS(cityName, cheapFrom);
  const hasChefs = chefs.length > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":     "Service",
        name:        `Affordable Private Chef Hire in ${cityName}`,
        description: `Budget-friendly private chef hire in ${cityName} starting from $${cheapFrom}/person.`,
        areaServed:  { "@type": "City", name: cityName },
        provider:    { "@type": "Organization", name: "Tip a Chef", url: "https://tipachef.com" },
        url:         `https://tipachef.com/cheap-private-chef/${citySlug}`,
        priceRange:  `$${cheapFrom}+`,
        offers: {
          "@type":    "Offer",
          price:      cheapFrom,
          priceCurrency: "USD",
          description: "Per person, includes cooking and clean-up",
        },
      },
      {
        "@type":    "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name:    f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main style={{ background: "#0a0908", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ paddingTop: "7rem", paddingBottom: "4rem" }}>
          <div className="content-container text-center">
            <p className="eyebrow mb-4">{flag} {country}</p>
            <h1 className="font-display text-ivory" style={{ fontSize: "clamp(2.2rem, 4.8vw, 3.8rem)", fontWeight: 400, lineHeight: 1.12, marginBottom: "1.25rem" }}>
              Cheap Private Chef{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg,#C9A96E,#D4B878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                in {cityName}
              </em>
            </h1>
            <p style={{ color: "rgba(250,248,244,0.55)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
              Affordable private dining in {cityName} that does not compromise on quality. Real chefs, no agency fees, direct booking. Starting from ${cheapFrom} per person.
            </p>
            {/* Value badges */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              {[`From $${cheapFrom}/person`, "No agency fees", "Direct booking", "Includes clean-up"].map((badge) => (
                <span key={badge} style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", fontWeight: 600, color: "#C9A96E", background: "rgba(201,169,110,0.09)", border: "1.5px solid rgba(201,169,110,0.22)", borderRadius: "40px", padding: "6px 14px" }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Why it is cheaper than you think */}
        <section style={{ paddingBottom: "4rem" }}>
          <div className="content-container" style={{ maxWidth: "700px" }}>
            <div style={{ background: "rgba(201,169,110,0.06)", border: "1.5px solid rgba(201,169,110,0.18)", borderRadius: "20px", padding: "2rem" }}>
              <p className="font-display text-ivory" style={{ fontSize: "1.15rem", fontWeight: 400, fontStyle: "italic", marginBottom: "0.75rem" }}>
                A private chef is often cheaper than a restaurant.
              </p>
              <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.5)", margin: 0, lineHeight: 1.75 }}>
                For a group of 8 at a restaurant in {cityName}, you are paying for food, drinks, a service charge, and the venue. A private chef for that same group, at ${cheapFrom} per head, comes to ${cheapFrom * 8}. No drinks markup, no waiting, no noise. Most people who try it once never go back to booking restaurants for group dinners.
              </p>
            </div>
          </div>
        </section>

        {/* Chefs or lead-gen */}
        {hasChefs ? (
          <section style={{ paddingBottom: "5rem" }}>
            <div className="content-container">
              <p className="eyebrow mb-8 text-center">Chefs available in {cityName}</p>
              <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {chefs.map((chef) => (
                  <Link key={chef.slug} href={`/${chef.slug}`} className="group block" style={{ textDecoration: "none" }}>
                    <div style={{ position: "relative", borderRadius: "28px", overflow: "hidden", aspectRatio: "3/4", boxShadow: "0 24px 60px rgba(0,0,0,0.6),0 0 0 1.5px rgba(255,255,255,0.07)", transition: "transform 0.35s ease" }} className="group-hover:scale-[1.02]">
                      {chef.image_url ? (
                        <Image src={chef.image_url} alt={chef.name ?? ""} fill style={{ objectFit: "cover", objectPosition: "center top" }} unoptimized />
                      ) : (
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1a1208,#2a1f0f)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: "4rem" }}>👨‍🍳</span></div>
                      )}
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0) 40%,rgba(0,0,0,0.88) 100%)" }} />
                      <div style={{ position: "absolute", bottom: "14px", left: "14px", right: "14px" }}>
                        <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "18px", fontWeight: 500, color: "#C9A96E", margin: "0 0 2px" }}>{chef.name ?? chef.slug}</p>
                        <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", color: "rgba(255,255,255,0.5)", margin: 0 }}>{chef.role ?? "Chef"}</p>
                      </div>
                    </div>
                    <div style={{ marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(201,169,110,0.18)", borderRadius: "40px", padding: "10px 16px" }}>
                      <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", color: "rgba(250,248,244,0.6)" }}>View profile</span>
                      <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", fontWeight: 600, color: "#C9A96E" }}>Book now →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section style={{ paddingBottom: "5rem" }}>
            <div className="content-container">
              <div style={{ maxWidth: "560px", margin: "0 auto", display: "grid", gap: "16px" }}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(201,169,110,0.15)", borderRadius: "24px", padding: "2.5rem", textAlign: "center" }}>
                  <p style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{flag}</p>
                  <p className="font-display text-ivory" style={{ fontSize: "1.2rem", fontWeight: 400, fontStyle: "italic", marginBottom: "0.75rem" }}>
                    Growing in {cityName}.
                  </p>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.88rem", color: "rgba(250,248,244,0.45)", marginBottom: "2rem", lineHeight: 1.7 }}>
                    We are vetting affordable private chefs in {cityName} right now. Join the waitlist and be the first to know when one goes live.
                  </p>
                  <Link href="/signup" style={{ display: "inline-block", background: "linear-gradient(135deg,#C9A96E,#B8934A)", color: "#1a1208", fontFamily: "-apple-system,system-ui", fontWeight: 700, fontSize: "13px", letterSpacing: "0.04em", padding: "13px 32px", borderRadius: "40px", textDecoration: "none" }}>
                    Join the waitlist
                  </Link>
                </div>
                <div style={{ background: "rgba(201,169,110,0.06)", border: "1.5px solid rgba(201,169,110,0.2)", borderRadius: "20px", padding: "1.75rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <span style={{ fontSize: "2rem", flexShrink: 0 }}>👨‍🍳</span>
                  <div>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", fontWeight: 700, color: "rgba(250,248,244,0.85)", margin: "0 0 4px" }}>Offer affordable private dining in {cityName}?</p>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.82rem", color: "rgba(250,248,244,0.4)", margin: "0 0 10px", lineHeight: 1.6 }}>Create your free profile and appear on this page when clients search for a private chef in your city.</p>
                    <Link href="/signup" style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", fontWeight: 600, color: "#C9A96E", textDecoration: "none" }}>
                      Create your free profile →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section style={{ paddingBottom: "5rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "4rem" }}>
          <div className="content-container" style={{ maxWidth: "700px" }}>
            <p className="eyebrow mb-8 text-center">Frequently asked questions</p>
            <div style={{ display: "grid", gap: "1.5rem" }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "1.5rem" }}>
                  <p style={{ fontFamily: "Georgia,serif", fontSize: "1rem", color: "rgba(250,248,244,0.9)", margin: "0 0 10px", fontWeight: 500 }}>{faq.q}</p>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.5)", margin: 0, lineHeight: 1.75 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-link to premium */}
        <section style={{ paddingBottom: "6rem" }}>
          <div className="content-container text-center">
            <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.35)", marginBottom: "1rem" }}>Looking for a premium experience?</p>
            <Link href={`/private-chef/${citySlug}`} style={{ fontFamily: "-apple-system,system-ui", fontSize: "13px", fontWeight: 600, color: "#C9A96E", textDecoration: "none", letterSpacing: "0.03em" }}>
              View all private chefs in {cityName} →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
