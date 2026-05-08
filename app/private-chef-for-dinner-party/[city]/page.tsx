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
    title:       `Private Chef for Dinner Party in ${cityName} | Tip a Chef`,
    description: `Hire a private chef for your dinner party in ${cityName}. From $${price}/person. Chef cooks in your home, tailored menu, grocery shopping and clean-up included.`,
    openGraph: {
      title:       `Private Chef for Dinner Party in ${cityName} | Tip a Chef`,
      description: `Dinner parties done properly. A chef, your home, from $${price}/person.`,
      url:         `https://tipachef.com/private-chef-for-dinner-party/${params.city}`,
      type:        "website",
    },
    alternates: { canonical: `https://tipachef.com/private-chef-for-dinner-party/${params.city}` },
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
    q: `How much does a private chef for a dinner party cost in ${cityName}?`,
    a: `In ${cityName}, hiring a private chef for a dinner party typically starts from $${priceFrom} per person. For a table of 8, that is around $${priceFrom * 8} including grocery shopping, cooking, and clean-up. Larger groups often bring the per-person cost down further.`,
  },
  {
    q: `Is a private chef dinner party cheaper than a restaurant in ${cityName}?`,
    a: `For groups of 6 or more, a private chef dinner party is often cheaper than a comparable restaurant once you factor in service charges, drinks markups, and transport. You also get better food, more personal service, and the comfort of your own space.`,
  },
  {
    q: "What does a private chef dinner party include?",
    a: "Most chefs include a tailored multi-course menu, grocery shopping, preparation, cooking, plating, and full kitchen clean-up. Table service is sometimes available as an add-on. Always confirm what is included when you book.",
  },
  {
    q: "How many guests can a private chef cook for?",
    a: "Most private chefs comfortably cater for groups of 4 to 16. For larger dinner parties, some chefs bring an assistant. Discuss guest numbers upfront so the chef can plan the logistics of your kitchen and service.",
  },
  {
    q: `How do I find and book a private chef for a dinner party in ${cityName}?`,
    a: `Browse available chefs on this page. Click a profile to see their style, sample menus, and reviews. Message the chef directly to confirm availability, agree the menu, and secure the date. No agency fees, no middleman.`,
  },
  {
    q: "Can the chef accommodate dietary requirements?",
    a: "Yes. One of the biggest advantages of a private chef is the ability to tailor every dish to your guests. Gluten-free, vegan, nut allergies, halal, kosher — communicate requirements when booking and the chef will build the menu around them.",
  },
];

export default async function PrivateChefDinnerPartyPage({ params }: { params: { city: string } }) {
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
        name:        `Private Chef for Dinner Party in ${cityName}`,
        description: `Hire a private chef for your dinner party in ${cityName} from $${priceFrom}/person.`,
        areaServed:  { "@type": "City", name: cityName },
        provider:    { "@type": "Organization", name: "Tip a Chef", url: "https://tipachef.com" },
        url:         `https://tipachef.com/private-chef-for-dinner-party/${citySlug}`,
        priceRange:  `$${priceFrom}+`,
        offers: { "@type": "Offer", price: priceFrom, priceCurrency: "USD", description: "Per person for dinner party" },
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
              Private Chef for a Dinner Party{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg,#C9A96E,#D4B878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                in {cityName}
              </em>
            </h1>
            <p style={{ color: "rgba(250,248,244,0.55)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
              A chef at your table, a menu built for your guests, and a kitchen left spotless. The easiest way to host a dinner party in {cityName}. From ${priceFrom} per person.
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              {[`From $${priceFrom}/person`, "Chef at your home", "Tailored menu", "Kitchen clean-up included"].map((badge) => (
                <span key={badge} style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", fontWeight: 600, color: "#C9A96E", background: "rgba(201,169,110,0.09)", border: "1.5px solid rgba(201,169,110,0.22)", borderRadius: "40px", padding: "6px 14px" }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* The case */}
        <section style={{ paddingBottom: "4rem" }}>
          <div className="content-container" style={{ maxWidth: "700px" }}>
            <div style={{ background: "rgba(201,169,110,0.06)", border: "1.5px solid rgba(201,169,110,0.18)", borderRadius: "20px", padding: "2rem" }}>
              <p className="font-display text-ivory" style={{ fontSize: "1.15rem", fontWeight: 400, fontStyle: "italic", marginBottom: "0.75rem" }}>
                The best hosts do not cook. They host.
              </p>
              <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.5)", margin: 0, lineHeight: 1.75 }}>
                When you are in the kitchen, you are not at the table. A private chef lets you be fully present with your guests from the moment they arrive. The food is better because it is someone&apos;s entire focus. The evening is better because yours is on the people around you.
              </p>
            </div>
          </div>
        </section>

        {/* Chefs or lead-gen */}
        {hasChefs ? (
          <section style={{ paddingBottom: "5rem" }}>
            <div className="content-container">
              <p className="eyebrow mb-8 text-center">Dinner party chefs in {cityName}</p>
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
                        <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", color: "rgba(255,255,255,0.5)", margin: 0 }}>{chef.role ?? "Private Chef"}</p>
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
                    We are vetting dinner party chefs in {cityName} right now. Join the waitlist and be first to know when one goes live.
                  </p>
                  <Link href="/signup" style={{ display: "inline-block", background: "linear-gradient(135deg,#C9A96E,#B8934A)", color: "#1a1208", fontFamily: "-apple-system,system-ui", fontWeight: 700, fontSize: "13px", letterSpacing: "0.04em", padding: "13px 32px", borderRadius: "40px", textDecoration: "none" }}>
                    Join the waitlist
                  </Link>
                </div>
                <div style={{ background: "rgba(201,169,110,0.06)", border: "1.5px solid rgba(201,169,110,0.2)", borderRadius: "20px", padding: "1.75rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <span style={{ fontSize: "2rem", flexShrink: 0 }}>👨‍🍳</span>
                  <div>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", fontWeight: 700, color: "rgba(250,248,244,0.85)", margin: "0 0 4px" }}>Do private dinner parties in {cityName}?</p>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.82rem", color: "rgba(250,248,244,0.4)", margin: "0 0 10px", lineHeight: 1.6 }}>Create a free profile and appear here when hosts search for a dinner party chef in your city.</p>
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
              <Link href={`/private-chef-for-birthday/${citySlug}`} style={{ fontFamily: "-apple-system,system-ui", fontSize: "13px", fontWeight: 600, color: "#C9A96E", textDecoration: "none" }}>
                Private chef for birthday →
              </Link>
              <Link href={`/cheap-private-chef/${citySlug}`} style={{ fontFamily: "-apple-system,system-ui", fontSize: "13px", fontWeight: 600, color: "#C9A96E", textDecoration: "none" }}>
                Affordable options →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
