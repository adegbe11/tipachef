import { notFound }    from "next/navigation";
import type { Metadata } from "next";
import Image             from "next/image";
import Link              from "next/link";
import { WORLD_CITIES, WORLD_CITIES_BY_SLUG, countryFlag } from "@/lib/world-cities";
import { createServerClient } from "@/lib/supabase-server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamicParams = true;
export const revalidate    = 3600;

export function generateStaticParams() {
  return WORLD_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata(
  { params }: { params: { city: string } }
): Promise<Metadata> {
  const data     = WORLD_CITIES_BY_SLUG[params.city];
  const cityName = data?.name ?? toTitleCase(params.city);
  const price    = data?.priceFrom ?? 60;
  return {
    title:       `Personal Chef in ${cityName} | Hire a Personal Chef | Tip a Chef`,
    description: `Find a personal chef in ${cityName}. From $${price}/session. Meal prep, weekly cooking, private dining, and special occasions. Direct booking, no agency fees.`,
    openGraph: {
      title:       `Personal Chef in ${cityName} | Tip a Chef`,
      description: `Hire a personal chef in ${cityName}. Meal prep to private dining, from $${price}/session.`,
      url:         `https://tipachef.com/personal-chef/${params.city}`,
      type:        "website",
    },
    alternates: { canonical: `https://tipachef.com/personal-chef/${params.city}` },
  };
}

function toTitleCase(slug: string) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

interface DbChef {
  slug: string; name: string | null; role: string | null;
  bio: string | null; image_url: string | null; goal_current: number;
}

const FAQS = (cityName: string, priceFrom: number) => [
  {
    q: `How much does a personal chef cost in ${cityName}?`,
    a: `In ${cityName}, a personal chef typically charges from $${priceFrom} per session for a single event. Weekly meal prep services are usually priced by the number of meals or hours. Many clients find it cheaper than they expected once they factor in the time saved and the reduction in food waste from poor meal planning.`,
  },
  {
    q: "What is the difference between a personal chef and a private chef?",
    a: "The terms are often used interchangeably, but a personal chef usually works for one household on an ongoing basis, while a private chef is hired for individual events. On Tip a Chef, you can find both, whether you want someone weekly or just for a one-off occasion.",
  },
  {
    q: `What services does a personal chef in ${cityName} provide?`,
    a: "Personal chefs typically offer weekly meal prep (batch cooking portioned meals for the week), private dinner party cooking, special occasion menus, and sometimes nutrition-focused cooking plans. The service is shaped entirely around what you need.",
  },
  {
    q: "Is hiring a personal chef worth it?",
    a: "For busy professionals, families with complex dietary needs, or anyone who wants restaurant-quality food at home without the planning, a personal chef pays for itself quickly in time saved and food that actually gets eaten. Most clients who try it for a month do not go back.",
  },
  {
    q: `How do I hire a personal chef in ${cityName}?`,
    a: `Browse the chefs on this page and click through to their profiles. Each chef lists their specialties, experience, and style. Message them directly to discuss your needs, frequency, and budget. No agency in the middle, no inflated fees.`,
  },
  {
    q: "Can a personal chef work around my dietary requirements?",
    a: "Yes, that is one of the main reasons people hire a personal chef. Whether you follow a specific diet (keto, vegan, low-FODMAP, halal, kosher) or have allergies, a personal chef builds every meal around your requirements from the start.",
  },
];

export default async function PersonalChefPage({ params }: { params: { city: string } }) {
  const citySlug = params.city;
  const data     = WORLD_CITIES_BY_SLUG[citySlug];

  if (!data && !citySlug.match(/^[a-z0-9-]+$/)) notFound();

  const cityName  = data?.name     ?? toTitleCase(citySlug);
  const country   = data?.country  ?? "";
  const flag      = data ? countryFlag(data.countryCode) : "🍴";
  const priceFrom = data?.priceFrom ?? 60;

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

  const faqs     = FAQS(cityName, priceFrom);
  const hasChefs = chefs.length > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":     "Service",
        name:        `Personal Chef in ${cityName}`,
        description: `Hire a personal chef in ${cityName} for meal prep, private dining, or weekly cooking services.`,
        areaServed:  { "@type": "City", name: cityName },
        provider:    { "@type": "Organization", name: "Tip a Chef", url: "https://tipachef.com" },
        url:         `https://tipachef.com/personal-chef/${citySlug}`,
        priceRange:  `$${priceFrom}+`,
        offers: { "@type": "Offer", price: priceFrom, priceCurrency: "USD", description: "Per session, includes cooking and clean-up" },
      },
      {
        "@type":    "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question", name: f.q,
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
              Personal Chef{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg,#C9A96E,#D4B878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                in {cityName}
              </em>
            </h1>
            <p style={{ color: "rgba(250,248,244,0.55)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
              From weekly meal prep to private dining and special occasions. A personal chef in {cityName} cooks around your schedule, your diet, and your taste. Direct booking from ${priceFrom}/session.
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              {["Weekly meal prep", "Private dining", "Diet-specific menus", "Direct booking"].map((badge) => (
                <span key={badge} style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", fontWeight: 600, color: "#C9A96E", background: "rgba(201,169,110,0.09)", border: "1.5px solid rgba(201,169,110,0.22)", borderRadius: "40px", padding: "6px 14px" }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Services breakdown */}
        <section style={{ paddingBottom: "4rem" }}>
          <div className="content-container" style={{ maxWidth: "760px" }}>
            <p className="eyebrow mb-8 text-center">What a personal chef can do for you</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
              {[
                { icon: "🥘", title: "Weekly meal prep", body: "Batch cooking portioned meals for the week. Groceries sourced, everything labelled, fridge and freezer stocked." },
                { icon: "🍽️", title: "Private dinner parties", body: "Chef cooks a multi-course menu at your home for your guests. Shopping, cooking, plating, and clean-up." },
                { icon: "🎂", title: "Special occasions", body: "Birthdays, anniversaries, proposals, family gatherings. A menu designed specifically for the moment." },
                { icon: "🥗", title: "Dietary-specific cooking", body: "Keto, vegan, gluten-free, low-FODMAP, halal, kosher. Every meal built around your requirements." },
              ].map((s) => (
                <div key={s.title} style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: "18px", padding: "1.5rem" }}>
                  <p style={{ fontSize: "1.6rem", marginBottom: "0.6rem" }}>{s.icon}</p>
                  <p style={{ fontFamily: "Georgia,serif", fontSize: "0.95rem", color: "rgba(250,248,244,0.88)", margin: "0 0 8px", fontWeight: 500 }}>{s.title}</p>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.85rem", color: "rgba(250,248,244,0.4)", margin: 0, lineHeight: 1.7 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chefs or lead-gen */}
        {hasChefs ? (
          <section style={{ paddingBottom: "5rem" }}>
            <div className="content-container">
              <p className="eyebrow mb-8 text-center">Personal chefs in {cityName}</p>
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
                        <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", color: "rgba(255,255,255,0.5)", margin: 0 }}>{chef.role ?? "Personal Chef"}</p>
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
                  <p className="font-display text-ivory" style={{ fontSize: "1.2rem", fontWeight: 400, fontStyle: "italic", marginBottom: "0.75rem" }}>Growing in {cityName}.</p>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.88rem", color: "rgba(250,248,244,0.45)", marginBottom: "2rem", lineHeight: 1.7 }}>
                    We are vetting personal chefs in {cityName} right now. Join the waitlist to be first to know when one goes live.
                  </p>
                  <Link href="/signup" style={{ display: "inline-block", background: "linear-gradient(135deg,#C9A96E,#B8934A)", color: "#1a1208", fontFamily: "-apple-system,system-ui", fontWeight: 700, fontSize: "13px", letterSpacing: "0.04em", padding: "13px 32px", borderRadius: "40px", textDecoration: "none" }}>
                    Join the waitlist
                  </Link>
                </div>
                <div style={{ background: "rgba(201,169,110,0.06)", border: "1.5px solid rgba(201,169,110,0.2)", borderRadius: "20px", padding: "1.75rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <span style={{ fontSize: "2rem", flexShrink: 0 }}>👨‍🍳</span>
                  <div>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", fontWeight: 700, color: "rgba(250,248,244,0.85)", margin: "0 0 4px" }}>Work as a personal chef in {cityName}?</p>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.82rem", color: "rgba(250,248,244,0.4)", margin: "0 0 10px", lineHeight: 1.6 }}>Create your free profile and appear when clients search for a personal chef in your city.</p>
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

        {/* Cross-links */}
        <section style={{ paddingBottom: "6rem" }}>
          <div className="content-container text-center">
            <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.35)", marginBottom: "1rem" }}>Explore more options in {cityName}</p>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href={`/private-chef/${citySlug}`} style={{ fontFamily: "-apple-system,system-ui", fontSize: "13px", fontWeight: 600, color: "#C9A96E", textDecoration: "none" }}>
                All private chefs in {cityName} →
              </Link>
              <Link href={`/cheap-private-chef/${citySlug}`} style={{ fontFamily: "-apple-system,system-ui", fontSize: "13px", fontWeight: 600, color: "#C9A96E", textDecoration: "none" }}>
                Affordable chefs →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
