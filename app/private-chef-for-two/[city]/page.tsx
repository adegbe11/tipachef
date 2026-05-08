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
    title:       `Private Chef for Two in ${cityName} | Romantic Dinner at Home | Tip a Chef`,
    description: `Hire a private chef for two in ${cityName}. Perfect for anniversaries, date nights, and proposals. From $${price * 2} for two people. Chef cooks at your home.`,
    openGraph: {
      title:       `Private Chef for Two in ${cityName} | Tip a Chef`,
      description: `The most romantic dinner in ${cityName} is at home, with a private chef. From $${price * 2} for two.`,
      url:         `https://tipachef.com/private-chef-for-two/${params.city}`,
      type:        "website",
    },
    alternates: { canonical: `https://tipachef.com/private-chef-for-two/${params.city}` },
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
    q: `How much does a private chef for two cost in ${cityName}?`,
    a: `In ${cityName}, a private chef for two people typically starts from $${priceFrom * 2} for a full dinner experience. This usually includes a tailored multi-course menu, grocery shopping, cooking, plating, and kitchen clean-up. The experience of having a professional chef cook exclusively for you and your partner is something most people say cannot be matched by any restaurant.`,
  },
  {
    q: "Is a private chef dinner for two better than a restaurant for a special occasion?",
    a: "For anniversaries, proposals, or intimate celebrations, a private chef dinner at home is in a different class. There is no noise, no nearby tables, no rushing. The chef works only for you that evening. The menu is designed around what you both love. Most couples say it is the best meal they have ever had.",
  },
  {
    q: "What occasions is a private chef for two ideal for?",
    a: "Anniversaries, Valentine's Day, proposals, birthdays, first dates for adventurous romantics, or simply a Friday night that deserves to be exceptional. Any occasion where the two of you want the evening to feel genuinely special.",
  },
  {
    q: `How do I book a private chef for two in ${cityName}?`,
    a: `Browse chefs on this page and click through to their profiles. You will see their style, background, and sample menus. Message the chef directly to confirm the date, discuss the menu, and agree the details. No agency, no markup, direct with the chef.`,
  },
  {
    q: "Can I keep the menu a surprise from my partner?",
    a: "Absolutely. Many clients book a private chef as a surprise for their partner. You plan the menu in advance with the chef, and your partner arrives to a set table and a professional cook already at work. One of the most effective romantic surprises there is.",
  },
  {
    q: "Can the chef do a wine pairing or cocktails?",
    a: "Some chefs offer drink pairing suggestions or can recommend wines to complement each course. A few chefs with mixology backgrounds also offer cocktail pairings. Discuss it when you book and the chef will advise what is possible.",
  },
];

export default async function PrivateChefForTwoPage({ params }: { params: { city: string } }) {
  const citySlug  = params.city;
  const data      = WORLD_CITIES_BY_SLUG[citySlug];

  if (!data && !citySlug.match(/^[a-z0-9-]+$/)) notFound();

  const cityName  = data?.name     ?? toTitleCase(citySlug);
  const country   = data?.country  ?? "";
  const flag      = data ? countryFlag(data.countryCode) : "🍴";
  const priceFrom = data?.priceFrom ?? 60;
  const priceTwo  = priceFrom * 2;

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
        name:        `Private Chef for Two in ${cityName}`,
        description: `Hire a private chef for a romantic dinner for two in ${cityName} from $${priceTwo}.`,
        areaServed:  { "@type": "City", name: cityName },
        provider:    { "@type": "Organization", name: "Tip a Chef", url: "https://tipachef.com" },
        url:         `https://tipachef.com/private-chef-for-two/${citySlug}`,
        priceRange:  `$${priceTwo}+`,
        offers: { "@type": "Offer", price: priceTwo, priceCurrency: "USD", description: "For two people, includes cooking and clean-up" },
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
              Private Chef for Two{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg,#C9A96E,#D4B878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                in {cityName}
              </em>
            </h1>
            <p style={{ color: "rgba(250,248,244,0.55)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
              The most intimate dinner in {cityName} is not at a restaurant. A private chef, your home, a menu designed for the two of you. Anniversaries, proposals, or simply a night that deserves to be remembered. From ${priceTwo}.
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              {[`From $${priceTwo} for two`, "Chef cooks at your home", "Menu designed for you", "Perfect for anniversaries"].map((badge) => (
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
                A Michelin restaurant for two can cost $400. A private chef for two, at home, costs less than that and the evening is entirely yours.
              </p>
              <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.5)", margin: 0, lineHeight: 1.75 }}>
                No nearby tables. No noise. No rushed courses. The chef arrives, prepares everything in your kitchen, serves the meal, and leaves the space spotless. You and your partner never have to leave home, and the food is better than almost anywhere you could go.
              </p>
            </div>
          </div>
        </section>

        {/* Occasions */}
        <section style={{ paddingBottom: "4rem" }}>
          <div className="content-container" style={{ maxWidth: "760px" }}>
            <p className="eyebrow mb-8 text-center">Perfect for</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              {[
                { icon: "💍", label: "Proposal dinner" },
                { icon: "🥂", label: "Anniversary" },
                { icon: "💕", label: "Valentine's Day" },
                { icon: "🎂", label: "Partner's birthday" },
                { icon: "🌹", label: "Romantic surprise" },
                { icon: "✨", label: "Just because" },
              ].map((o) => (
                <div key={o.label} style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "1.25rem", textAlign: "center" }}>
                  <p style={{ fontSize: "1.8rem", margin: "0 0 8px" }}>{o.icon}</p>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "13px", color: "rgba(250,248,244,0.7)", margin: 0, fontWeight: 600 }}>{o.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chefs or lead-gen */}
        {hasChefs ? (
          <section style={{ paddingBottom: "5rem" }}>
            <div className="content-container">
              <p className="eyebrow mb-8 text-center">Chefs in {cityName} for intimate dinners</p>
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
                    We are vetting chefs for intimate dining in {cityName} right now. Join the waitlist and be first to know when one goes live.
                  </p>
                  <Link href="/signup" style={{ display: "inline-block", background: "linear-gradient(135deg,#C9A96E,#B8934A)", color: "#1a1208", fontFamily: "-apple-system,system-ui", fontWeight: 700, fontSize: "13px", letterSpacing: "0.04em", padding: "13px 32px", borderRadius: "40px", textDecoration: "none" }}>
                    Join the waitlist
                  </Link>
                </div>
                <div style={{ background: "rgba(201,169,110,0.06)", border: "1.5px solid rgba(201,169,110,0.2)", borderRadius: "20px", padding: "1.75rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <span style={{ fontSize: "2rem", flexShrink: 0 }}>👨‍🍳</span>
                  <div>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", fontWeight: 700, color: "rgba(250,248,244,0.85)", margin: "0 0 4px" }}>Cook intimate dinners in {cityName}?</p>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.82rem", color: "rgba(250,248,244,0.4)", margin: "0 0 10px", lineHeight: 1.6 }}>Create a free profile and appear when couples search for a private chef in your city.</p>
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
              <Link href={`/private-chef-for-dinner-party/${citySlug}`} style={{ fontFamily: "-apple-system,system-ui", fontSize: "13px", fontWeight: 600, color: "#C9A96E", textDecoration: "none" }}>
                Private chef for dinner party →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
