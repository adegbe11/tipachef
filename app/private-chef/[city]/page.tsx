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

/* ─── Static params: pre-build all known cities ──────────────────────────── */
export function generateStaticParams() {
  return WORLD_CITIES.map((c) => ({ city: c.slug }));
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: { city: string } }
): Promise<Metadata> {
  const data     = WORLD_CITIES_BY_SLUG[params.city];
  const cityName = data?.name ?? toTitleCase(params.city);
  const country  = data?.country ?? "";
  const suffix   = country ? `, ${country}` : "";
  return {
    title:       `Rent a Private Chef in ${cityName} | Tip a Chef`,
    description: `Find and book private chefs in ${cityName}${suffix} for dinner parties, events, and special occasions. Browse real chefs, view menus, and tip directly.`,
    openGraph: {
      title:       `Private Chef in ${cityName} | Tip a Chef`,
      description: `Book a private chef in ${cityName} for your next event. Direct booking, no middleman.`,
      url:         `https://tipachef.com/private-chef/${params.city}`,
      type:        "website",
    },
    alternates: { canonical: `https://tipachef.com/private-chef/${params.city}` },
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
    q: `How much does a private chef cost in ${cityName}?`,
    a: `Private chef rates in ${cityName} typically start from $${priceFrom} per person for a dinner party menu. Prices vary depending on the number of guests, menu complexity, and the chef's experience level. Most chefs include grocery shopping, cooking, and kitchen clean-up in their rate.`,
  },
  {
    q: `What does a private chef in ${cityName} actually do?`,
    a: "A private chef handles everything: planning the menu with you, sourcing ingredients, cooking in your kitchen, plating the food, and leaving your kitchen clean. You simply enjoy the meal. Most private chefs in our network also send their personalised QR code so guests can tip them directly after the event.",
  },
  {
    q: `How do I find a reliable private chef in ${cityName}?`,
    a: `Browse the chef profiles on this page. Every chef in our ${cityName} network has a verified profile, reviews from previous clients, and a direct contact method. You can also search by cuisine type to find the right fit for your event.`,
  },
  {
    q: "Do I need to provide the kitchen equipment?",
    a: "Most private chefs work with whatever is available in your kitchen. When booking, they will confirm what they need. For larger events, some chefs bring their own equipment. This is always confirmed before the booking is finalised.",
  },
  {
    q: "Can I tip the chef after a private dinner?",
    a: "Yes, and it is the best way to show genuine appreciation. Every chef in our network has a Tip a Chef profile. After your dinner, you can scan their QR code and send a direct tip with a personal message. 100% of the tip goes to the chef.",
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default async function PrivateChefCityPage({ params }: { params: { city: string } }) {
  const citySlug = params.city;
  const data     = WORLD_CITIES_BY_SLUG[citySlug];

  if (!data && !citySlug.match(/^[a-z0-9-]+$/)) notFound();

  const cityName  = data?.name     ?? toTitleCase(citySlug);
  const country   = data?.country  ?? "";
  const flag      = data ? countryFlag(data.countryCode) : "🍴";
  const priceFrom = data?.priceFrom ?? 60;

  // Pull real chefs from Supabase
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
        "@type":       "Service",
        name:          `Private Chef Hire in ${cityName}`,
        description:   `Find and book private chefs in ${cityName} for dinner parties, events and special occasions.`,
        areaServed:    { "@type": "City", name: cityName, containedInPlace: { "@type": "Country", name: country } },
        provider:      { "@type": "Organization", name: "Tip a Chef", url: "https://tipachef.com" },
        url:           `https://tipachef.com/private-chef/${citySlug}`,
        priceRange:    `$${priceFrom}+`,
      },
      {
        "@type":            "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type":          "Question",
          name:             f.q,
          acceptedAnswer:   { "@type": "Answer", text: f.a },
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
              Rent a Private Chef in{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg,#C9A96E,#D4B878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {cityName}
              </em>
            </h1>
            <p style={{ color: "rgba(250,248,244,0.55)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
              Find and book top-rated culinary talent in {cityName} for your next dinner party, special occasion, or private event. Browse real chefs, view their profiles, and tip them directly after.
            </p>
            {/* Price badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(201,169,110,0.09)", border: "1.5px solid rgba(201,169,110,0.25)", borderRadius: "40px", padding: "8px 20px" }}>
              <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "13px", fontWeight: 700, color: "#C9A96E" }}>From ${priceFrom}/person</span>
              <span style={{ color: "rgba(250,248,244,0.3)", fontSize: "12px" }}>· Includes prep and clean-up</span>
            </div>
          </div>
        </section>

        {/* Chefs or Lead-gen */}
        {hasChefs ? (
          <section style={{ paddingBottom: "5rem" }}>
            <div className="content-container">
              <p className="eyebrow mb-8 text-center">Available chefs in {cityName}</p>
              <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {chefs.map((chef) => (
                  <Link key={chef.slug} href={`/${chef.slug}`} className="group block" style={{ textDecoration: "none" }}>
                    <div style={{ position: "relative", borderRadius: "28px", overflow: "hidden", aspectRatio: "3/4", boxShadow: "0 24px 60px rgba(0,0,0,0.6),0 8px 24px rgba(0,0,0,0.4),0 0 0 1.5px rgba(255,255,255,0.07)", transition: "transform 0.35s ease" }} className="group-hover:scale-[1.02]">
                      {chef.image_url ? (
                        <Image src={chef.image_url} alt={chef.name ?? ""} fill style={{ objectFit: "cover", objectPosition: "center top" }} unoptimized />
                      ) : (
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1a1208,#2a1f0f)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: "4rem" }}>👨‍🍳</span></div>
                      )}
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0) 40%,rgba(0,0,0,0.88) 100%)" }} />
                      <div style={{ position: "absolute", bottom: "14px", left: "14px", right: "14px" }}>
                        <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "18px", fontWeight: 500, color: "#C9A96E", margin: "0 0 2px" }}>{chef.name ?? chef.slug}</p>
                        <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", color: "rgba(255,255,255,0.5)", margin: 0 }}>{chef.role ?? "Chef"}{chef.bio ? ` · ${chef.bio}` : ""}</p>
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
          /* ── Lead-gen state ── */
          <section style={{ paddingBottom: "5rem" }}>
            <div className="content-container">
              <div style={{ maxWidth: "580px", margin: "0 auto", display: "grid", gap: "16px" }}>
                {/* Waitlist card */}
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(201,169,110,0.15)", borderRadius: "24px", padding: "2.5rem", textAlign: "center" }}>
                  <p style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{flag}</p>
                  <p className="font-display text-ivory" style={{ fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", marginBottom: "0.75rem" }}>
                    We are growing in {cityName}.
                  </p>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.45)", marginBottom: "2rem", lineHeight: 1.7 }}>
                    We are currently vetting chefs in {cityName}. Join the waitlist and we will notify you the moment a chef in your city goes live.
                  </p>
                  <Link href="/signup" style={{ display: "inline-block", background: "linear-gradient(135deg,#C9A96E,#B8934A)", color: "#1a1208", fontFamily: "-apple-system,system-ui", fontWeight: 700, fontSize: "13px", letterSpacing: "0.04em", padding: "13px 32px", borderRadius: "40px", textDecoration: "none", marginBottom: "12px" }}>
                    Join the waitlist
                  </Link>
                </div>
                {/* Chef apply card */}
                <div style={{ background: "rgba(201,169,110,0.06)", border: "1.5px solid rgba(201,169,110,0.2)", borderRadius: "20px", padding: "1.75rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <span style={{ fontSize: "2rem", flexShrink: 0 }}>👨‍🍳</span>
                  <div>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", fontWeight: 700, color: "rgba(250,248,244,0.85)", margin: "0 0 4px" }}>Chef in {cityName}?</p>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.82rem", color: "rgba(250,248,244,0.4)", margin: "0 0 12px", lineHeight: 1.6 }}>Create your free profile and start receiving direct tips and private booking enquiries today.</p>
                    <Link href="/signup" style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", fontWeight: 600, color: "#C9A96E", textDecoration: "none", letterSpacing: "0.03em" }}>
                      Apply to cook in {cityName} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How it works */}
        <section style={{ paddingBottom: "5rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "4rem" }}>
          <div className="content-container" style={{ maxWidth: "700px" }}>
            <p className="eyebrow mb-8 text-center">How private chef hire works</p>
            <div style={{ display: "grid", gap: "2rem" }}>
              {[
                { n: "01", title: "Browse and choose a chef", body: `Browse chefs in ${cityName} by cuisine, style, and availability. Every profile includes photos, a bio, and previous client notes.` },
                { n: "02", title: "Agree your menu and date", body: "Contact your chosen chef directly. Discuss the menu, dietary requirements, and logistics. No middleman, no agency fees." },
                { n: "03", title: "Enjoy your event", body: "Your chef arrives, sets up, cooks, serves, and cleans up. You sit down and experience restaurant-quality food in your own space." },
                { n: "04", title: "Tip them directly", body: "After the event, scan the chef's QR code to send a direct tip and a personal message. 100% goes to them, instantly." },
              ].map((step) => (
                <div key={step.n} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(201,169,110,0.12)", border: "1.5px solid rgba(201,169,110,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", fontWeight: 700, color: "#C9A96E", letterSpacing: "0.05em" }}>{step.n}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "Georgia,serif", fontSize: "1rem", color: "rgba(250,248,244,0.9)", margin: "0 0 6px", fontWeight: 500 }}>{step.title}</p>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.45)", margin: 0, lineHeight: 1.7 }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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

        {/* Also see cheap version */}
        <section style={{ paddingBottom: "5rem" }}>
          <div className="content-container text-center">
            <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.35)", marginBottom: "1rem" }}>Looking for a more affordable option?</p>
            <Link
              href={`/cheap-private-chef/${citySlug}`}
              style={{ fontFamily: "-apple-system,system-ui", fontSize: "13px", fontWeight: 600, color: "#C9A96E", textDecoration: "none", letterSpacing: "0.03em" }}
            >
              View cheap private chefs in {cityName} →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
