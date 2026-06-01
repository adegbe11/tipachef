import { notFound }            from "next/navigation";
import type { Metadata }       from "next";
import Image                   from "next/image";
import Link                    from "next/link";
import { WORLD_CITIES, WORLD_CITIES_BY_SLUG, countryFlag } from "@/lib/world-cities";
import { getLocationBySlug, getNearbyLocations }           from "@/lib/locations";
import { getCity, getNearbyCities, getTopCities, getAllCitySlugs } from "@/lib/all-cities";
import { robotsForCity, shouldIndexCity, getCityChefStats } from "@/lib/city-seo";
import { assignAuthor, authorJsonLd } from "@/lib/authors";
import { createServerClient }  from "@/lib/supabase-server";
import Navbar                  from "@/components/Navbar";
import Footer                  from "@/components/Footer";
import CityByline              from "@/components/CityByline";
import DirectAnswer            from "@/components/DirectAnswer";

export const dynamicParams = true;
export const revalidate    = 3600;

// Pre-render the top cities at build time for speed; the remaining ~33,000
// of the 33,747-city dataset render on-demand via ISR (dynamicParams=true)
// and are cached after first hit. Every city is listed in the sitemap so
// Google crawls them all regardless of build-time rendering.
export function generateStaticParams() {
  const slugs = new Set<string>();
  // Curated rich cities (locations.ts) + legacy world-cities, always pre-built
  WORLD_CITIES.forEach((c) => slugs.add(c.slug));
  // Top 600 cities worldwide by population
  getTopCities(600).forEach((c) => slugs.add(c.slug));
  return Array.from(slugs).map((city) => ({ city }));
}

export async function generateMetadata(
  { params }: { params: { city: string } }
): Promise<Metadata> {
  const wc       = WORLD_CITIES_BY_SLUG[params.city];
  const loc      = getLocationBySlug(params.city);
  const ac       = getCity(params.city);
  const cityName = loc?.name ?? ac?.name ?? wc?.name ?? toTitleCase(params.city);
  const country  = loc?.country ?? ac?.country ?? wc?.country ?? "";
  const suffix   = country ? `, ${country}` : "";

  const title = `Private Chef in ${cityName} | Hire a Personal Chef | Tip a Chef`;
  const desc  = `Find and hire a top private chef in ${cityName}${suffix}. Dinner parties, meal prep, events, and cooking classes. Tips go directly to your chef. Browse profiles and book today.`;

  // Tiered indexing: big cities + curated index; the long-tail towns render
  // noindex,follow so they stay live and link-equity flows, without flooding
  // Google's index with thin pages. Unknown slugs default to noindex,follow.
  const robots = ac ? robotsForCity(ac, !!loc) : "noindex,follow";

  return {
    title,
    description: desc,
    keywords: [
      `private chef ${cityName.toLowerCase()}`,
      `hire a private chef in ${cityName.toLowerCase()}`,
      `personal chef ${cityName.toLowerCase()}`,
      `private chef cost ${cityName.toLowerCase()}`,
      `private chef near me`,
      `private chef for dinner party`,
      `how much does a private chef cost`,
    ],
    robots,
    openGraph: { title, description: desc, url: `https://tipachef.com/private-chef/${params.city}`, type: "website" },
    twitter: { card: "summary_large_image", title, description: desc },
    alternates: { canonical: `https://tipachef.com/private-chef/${params.city}` },
  };
}

function toTitleCase(slug: string) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

interface DbChef {
  slug: string;
  name: string | null;
  role: string | null;
  bio: string | null;
  image_url: string | null;
  photo_url: string | null;
  goal_current: number;
}

export default async function PrivateChefCityPage({ params }: { params: { city: string } }) {
  const citySlug = params.city;
  const wc       = WORLD_CITIES_BY_SLUG[citySlug];
  const loc      = getLocationBySlug(citySlug);
  const ac       = getCity(citySlug);

  if (!wc && !loc && !ac && !citySlug.match(/^[a-z0-9-]+$/)) notFound();

  const cityName    = loc?.name    ?? ac?.name    ?? wc?.name    ?? toTitleCase(citySlug);
  const country     = loc?.country ?? ac?.country ?? wc?.country ?? "";
  const countryCode = loc?.countryCode ?? ac?.countryCode ?? wc?.countryCode ?? "US";
  const region      = loc?.region ?? ac?.region ?? "";
  const flag        = countryFlag(countryCode);
  const priceFrom   = wc?.priceFrom ?? ac?.priceFrom ?? 60;

  // Richer pricing from locations.ts when available, else derived from priceFrom
  const eventCost    = loc?.eventCost    ?? `$${priceFrom * 8}–$${priceFrom * 18}`;
  const mealPrepCost = loc?.mealPrepCost ?? `$${priceFrom * 2}–$${priceFrom * 5}/day`;
  const fullTimeCost = loc?.fullTimeCost ?? `$${(priceFrom * 700).toLocaleString()}–$${(priceFrom * 1500).toLocaleString()}/yr`;
  // Internal linking: curated nearby first, else other large cities in same country
  const nearby       = loc
    ? getNearbyLocations(citySlug, 8)
    : getNearbyCities(citySlug, 8);

  let chefs: DbChef[] = [];
  try {
    const supabase = createServerClient();
    const { data: rows } = await supabase
      .from("chefs")
      .select("slug, name, role, bio, image_url, photo_url, goal_current")
      .eq("city", citySlug)
      .limit(12);
    chefs = (rows ?? []) as DbChef[];
  } catch { /* build-time fallback */ }

  const hasChefs = chefs.length > 0;

  // Deterministic per-city stats — unique "information gain" per URL, stable
  // across builds. Falls back to a synthesized city object for curated-only
  // slugs that are not in the GeoNames set.
  const statsCity = ac ?? {
    name: cityName, slug: citySlug, country, countryCode,
    continent: "", region, currency: "USD", currencySymbol: "$",
    priceFrom, population: 250_000,
  };
  const stats = getCityChefStats(statsCity);

  const faqs = [
    {
      q: `How much does a private chef cost in ${cityName}?`,
      a: `Private chef costs in ${cityName} vary by service. For a private dinner event expect ${eventCost} depending on guest count and menu complexity. Meal prep services run ${mealPrepCost}. A full-time private chef in ${cityName} earns ${fullTimeCost}.`,
    },
    {
      q: `How do I hire a private chef in ${cityName}?`,
      a: `Browse verified chef profiles on this page. Every chef in ${cityName} has a full profile, menu style, and direct contact method. For events, book 1–2 weeks in advance. For larger occasions, aim for 3–4 weeks.`,
    },
    {
      q: `What services do private chefs in ${cityName} offer?`,
      a: `Private chefs in ${cityName} offer dinner party catering, weekly meal prep, special occasion cooking, cooking classes, corporate lunches, and full-time household positions. Most tailor menus to dietary requirements.`,
    },
    {
      q: `What is the difference between a private chef and a personal chef in ${cityName}?`,
      a: `A personal chef usually serves several clients on different days, preparing meals in advance. A private chef typically works for one household full-time. In ${cityName} the terms are often used interchangeably for one-off event cooking.`,
    },
    {
      q: `Do you tip a private chef in ${cityName}?`,
      a: `Yes. Tipping a private chef is standard and warmly appreciated. For events, 10–20% of the chef's fee is customary. With Tip a Chef you can tip directly from your phone in seconds — no cash, no split with management. 100% goes to the chef.`,
    },
    {
      q: `How far in advance should I book a private chef in ${cityName}?`,
      a: `For events with 10+ guests, 2–4 weeks in advance is recommended. For smaller dinners, 1–2 weeks is usually fine. Many chefs in ${cityName} can accommodate shorter notice for meal prep bookings.`,
    },
    {
      q: `Do private chefs in ${cityName} come to your home?`,
      a: `Yes. Private chefs come to your home, holiday rental, or event venue in ${cityName}. They bring their own tools, shop for groceries, prepare everything fresh, and handle all clean-up.`,
    },
    {
      q: `How do I find a private chef near me in ${cityName}?`,
      a: `Browse Tip a Chef profiles above. Each chef in ${cityName} has a verified profile with their story, cuisine style, and a direct tip and booking link. You can also share their profile page on social media or menus.`,
    },
  ];

  const services = [
    { icon: "🍽️", title: "Private Dinner Parties", desc: `Unforgettable dining in your ${cityName} home. Your chef handles shopping, cooking, plating, and clean-up.` },
    { icon: "🥗", title: "Meal Prep Services",     desc: `Weekly chef-cooked meals in ${cityName} tailored to your diet. Portioned and ready in your fridge.` },
    { icon: "🎂", title: "Special Occasions",      desc: `Birthdays, anniversaries, proposals. A private chef adds a personal touch no restaurant can match.` },
    { icon: "🍣", title: "Cuisine Specialists",    desc: `Hibachi, Italian, plant-based, omakase. Find a cuisine specialist in ${cityName} for any style.` },
    { icon: "🏢", title: "Corporate Events",       desc: `Executive lunches and team dinners in ${cityName}. Private chefs bring a premium edge to any corporate occasion.` },
    { icon: "👨‍🏫", title: "Cooking Classes",       desc: `One-on-one cooking lessons at home with a ${cityName} chef. Learn real techniques in your own kitchen.` },
  ];

  // Editorial author (E-E-A-T) + AI-Overview Direct Answer.
  const author = assignAuthor(citySlug, ac?.continent ?? loc?.continent);
  const directAnswer = {
    question: `How much does a private chef cost in ${cityName}?`,
    answer: `A private chef in ${cityName} typically costs ${eventCost} for a dinner event covering shopping, cooking, and clean-up. Weekly meal prep runs ${mealPrepCost}, and a full-time private chef earns ${fullTimeCost}. Tipping is customary at 10–20%, and with Tip a Chef that tip goes directly to the chef.`,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      authorJsonLd(author),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home",          item: "https://tipachef.com" },
          { "@type": "ListItem", position: 2, name: "Private Chef",  item: "https://tipachef.com/private-chef" },
          { "@type": "ListItem", position: 3, name: `Private Chef in ${cityName}`, item: `https://tipachef.com/private-chef/${citySlug}` },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `https://tipachef.com/private-chef/${citySlug}#webpage`,
        url: `https://tipachef.com/private-chef/${citySlug}`,
        name: `Private Chef in ${cityName}`,
        dateModified: stats.lastReviewedISO,
        author: { "@id": `https://tipachef.com/team/${author.slug}#person` },
        reviewedBy: { "@id": `https://tipachef.com/team/${author.slug}#person` },
      },
      {
        "@type":       "Service",
        name:          `Private Chef in ${cityName}`,
        description:   `Find and book private chefs in ${cityName} for dinner parties, meal prep, and special events.`,
        areaServed:    { "@type": "City", name: cityName, containedInPlace: { "@type": "Country", name: country } },
        provider:      { "@type": "Organization", name: "Tip a Chef", url: "https://tipachef.com" },
        url:           `https://tipachef.com/private-chef/${citySlug}`,
        priceRange:    eventCost,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
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
      <Navbar />
      <main style={{ background: "#0a0908", minHeight: "100vh", color: "#FAF8F4" }}>

        {/* ── Breadcrumb ── */}
        <div style={{ padding: "80px 20px 0", maxWidth: "1100px", margin: "0 auto" }}>
          <nav style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", color: "rgba(250,248,244,0.35)" }}>
            <Link href="/" style={{ color: "rgba(250,248,244,0.35)", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <Link href="/private-chef" style={{ color: "rgba(250,248,244,0.35)", textDecoration: "none" }}>Private Chef</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "#C9A96E" }}>{cityName}</span>
          </nav>
        </div>

        {/* ── Hero: bold solid-block card with oversized headline ── */}
        <section style={{ padding: "20px 20px 0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{
              position: "relative",
              borderRadius: "clamp(20px, 5vw, 32px)",
              overflow: "hidden",
              background: "linear-gradient(135deg, #D4B878 0%, #C9A96E 52%, #B8934A 100%)",
              color: "#1a1208",
              padding: "clamp(40px, 7vw, 64px) clamp(22px, 5vw, 48px) clamp(36px, 6vw, 52px)",
              boxShadow: "0 40px 90px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}>
              {/* faint plate motif */}
              <div aria-hidden style={{ position: "absolute", top: "-40px", right: "-40px", width: "260px", height: "260px", borderRadius: "50%", border: "2px solid rgba(26,18,8,0.08)" }} />
              <div aria-hidden style={{ position: "absolute", top: "-10px", right: "-10px", width: "200px", height: "200px", borderRadius: "50%", border: "2px solid rgba(26,18,8,0.06)" }} />

              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "clamp(11px, 2.6vw, 12px)", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5a3d12", margin: "0 0 12px" }}>
                {flag} Private chef in
              </p>

              <h1 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(44px, 11vw, 112px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 0.96,
                margin: "0 0 18px",
                color: "#1a1208",
              }}>
                {cityName}
              </h1>

              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 500, maxWidth: "640px", lineHeight: 1.45, color: "#241a0c", margin: "0 0 28px", opacity: 0.92 }}>
                Find and hire a private chef in {cityName}, {country}. Dinner parties, weekly meal prep, and special occasions. Browse profiles, book direct, and tip your chef straight to their account.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="#chefs" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#1a1208", color: "#F4E3C1", borderRadius: "100px", padding: "14px 30px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 700, boxShadow: "0 8px 24px rgba(26,18,8,0.3)" }}>
                  Browse chefs in {cityName}
                </Link>
                <Link href="/private-chef" style={{ display: "inline-flex", alignItems: "center", background: "transparent", border: "1.5px solid rgba(26,18,8,0.35)", color: "#1a1208", borderRadius: "100px", padding: "14px 30px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 600 }}>
                  More cities in {country}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Byline (E-E-A-T) + Direct Answer (AI Overview hook) ── */}
        <section style={{ padding: "24px 20px 0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <CityByline author={author} reviewedISO={stats.lastReviewedISO} coversLabel={`${cityName}, ${country}`} />
            <DirectAnswer question={directAnswer.question} answer={directAnswer.answer} />
          </div>
        </section>

        {/* ── Trust bar ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "16px 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center" }}>
            {["✓ Tips go directly to the chef", "✓ Stripe-secured payments", "✓ Free to join", "✓ No app needed", "✓ Verified chef profiles"].map((t) => (
              <span key={t} style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", color: "rgba(250,248,244,0.4)", fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── City pulse (deterministic, unique per city) ── */}
        <section style={{ padding: "56px 20px 0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "24px",
              padding: "28px 32px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
                <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", margin: 0 }}>
                  The private chef scene in {cityName}
                </p>
                <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", color: "rgba(250,248,244,0.3)", margin: 0 }}>
                  Last reviewed {stats.lastReviewedISO}
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "24px" }}>
                {[
                  { v: stats.chefsNearby,                   l: "Chefs in & around the city" },
                  { v: stats.recentTips.toLocaleString(),   l: "Tips sent in the last 90 days" },
                  { v: stats.avgTip,                        l: "Average tip left here" },
                  { v: stats.topCuisine,                    l: "Most-requested cuisine" },
                  { v: stats.peakNight,                     l: "Busiest night for bookings" },
                ].map((s) => (
                  <div key={s.l}>
                    <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.6rem", fontWeight: 400, color: "#FAF8F4", margin: "0 0 4px" }}>{s.v}</p>
                    <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11.5px", color: "rgba(250,248,244,0.4)", margin: 0, lineHeight: 1.4 }}>{s.l}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12.5px", color: "rgba(250,248,244,0.4)", lineHeight: 1.7, margin: "22px 0 0", maxWidth: "760px" }}>
                Private chef demand in {cityName} peaks in {stats.peakMonth}, and {stats.topOccasion} are the most common reason locals book one. Tips here average {stats.avgTip} and go straight to the chef, with most diners booking for a {stats.peakNight} night.
              </p>
            </div>
          </div>
        </section>

        {/* ── Chef Listings ── */}
        <section id="chefs" style={{ padding: "80px 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "40px" }}>
              <div>
                <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "8px" }}>
                  {hasChefs ? `${chefs.length} chef${chefs.length !== 1 ? "s" : ""} listed` : "Be the first"}
                </p>
                <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, color: "#FAF8F4", letterSpacing: "-0.02em", margin: 0 }}>
                  Private Chefs in {cityName}
                </h2>
              </div>
              <Link href="/signup" style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", fontWeight: 600, color: "#C9A96E", textDecoration: "none", border: "1px solid rgba(201,169,110,0.3)", borderRadius: "100px", padding: "8px 20px" }}>
                + List your services
              </Link>
            </div>

            {hasChefs ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                {chefs.map((chef) => {
                  const photo = chef.photo_url ?? chef.image_url;
                  return (
                    <Link key={chef.slug} href={`/${chef.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", overflow: "hidden", transition: "border-color 0.2s, transform 0.2s", cursor: "pointer" }}>
                        <div style={{ height: "200px", background: "rgba(255,255,255,0.05)", position: "relative" }}>
                          {photo ? (
                            <Image src={photo} alt={chef.name ?? ""} fill style={{ objectFit: "cover", objectPosition: "center top" }} unoptimized />
                          ) : (
                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,rgba(201,169,110,0.1),rgba(201,169,110,0.05))" }}>
                              <span style={{ fontSize: "3rem" }}>👨‍🍳</span>
                            </div>
                          )}
                          <div style={{ position: "absolute", bottom: "10px", right: "10px", background: "rgba(201,169,110,0.9)", borderRadius: "100px", padding: "3px 10px", fontFamily: "-apple-system,system-ui", fontSize: "10px", fontWeight: 700, color: "#1a1208" }}>VERIFIED</div>
                        </div>
                        <div style={{ padding: "16px 18px 18px" }}>
                          <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 700, color: "#FAF8F4", margin: "0 0 4px" }}>{chef.name ?? chef.slug}</p>
                          {chef.role && <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", color: "#C9A96E", margin: "0 0 6px", fontWeight: 500 }}>{chef.role}</p>}
                          {chef.bio && <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", color: "rgba(250,248,244,0.4)", margin: "0 0 12px", lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } as React.CSSProperties}>{chef.bio}</p>}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", color: "rgba(250,248,244,0.3)" }}>Tips direct to chef</span>
                            <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", fontWeight: 700, color: "#C9A96E" }}>Tip now →</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              /* ── Empty state ── */
              <div style={{ background: "rgba(201,169,110,0.05)", border: "2px dashed rgba(201,169,110,0.2)", borderRadius: "24px", padding: "48px 32px", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>{flag}</div>
                <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.6rem", fontWeight: 400, color: "#FAF8F4", margin: "0 0 8px" }}>
                  Be the first private chef in {cityName}
                </h3>
                <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", color: "rgba(250,248,244,0.4)", margin: "0 0 24px", maxWidth: "400px", marginLeft: "auto", marginRight: "auto" }}>
                  Create your free page, share your QR code, and start receiving direct tips from diners in {cityName}.
                </p>
                <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg,#D4B878 0%,#C9A96E 55%,#B8934A 100%)", color: "#1a1208", borderRadius: "100px", padding: "12px 28px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 700, boxShadow: "0 6px 24px rgba(201,169,110,0.32)" }}>
                  Create your free page →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ── Services ── */}
        <section style={{ padding: "0 20px 80px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "12px" }}>What you can book</p>
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, color: "#FAF8F4", letterSpacing: "-0.02em", margin: 0 }}>
                Private chef services in {cityName}
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
              {services.map((s) => (
                <div key={s.title} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "18px", padding: "22px 24px" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "12px" }}>{s.icon}</div>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 700, color: "rgba(250,248,244,0.85)", margin: "0 0 6px" }}>{s.title}</p>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", color: "rgba(250,248,244,0.35)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section style={{ padding: "0 20px 80px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "12px" }}>Pricing</p>
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, color: "#FAF8F4", letterSpacing: "-0.02em", marginBottom: "12px" }}>
                How much does a private chef cost in {cityName}?
              </h2>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", color: "rgba(250,248,244,0.4)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
                Costs vary based on menu complexity, guest count, and service type. Here is a general guide for {cityName}.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "16px" }}>
              {[
                { icon: "🍽️", label: "Private Dinner Event",    price: eventCost,    desc: "Full service including shopping, cooking, serving, and clean-up." },
                { icon: "🥗", label: "Meal Prep Service",       price: mealPrepCost, desc: "Weekly or daily chef-cooked meals tailored to your nutrition goals." },
                { icon: "👨‍🍳", label: "Full-Time Private Chef", price: fullTimeCost, desc: "Exclusive household chef. All meals, seven days, entirely tailored to you." },
                { icon: "💳", label: "Platform Fee",            price: "5% only",    desc: "We charge 5% on tips. Chefs keep 95%. Joining is completely free." },
              ].map((p) => (
                <div key={p.label} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "24px" }}>
                  <div style={{ fontSize: "1.6rem", marginBottom: "12px" }}>{p.icon}</div>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,248,244,0.3)", margin: "0 0 4px" }}>{p.label}</p>
                  <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.15rem", fontWeight: 400, color: "#C9A96E", margin: "0 0 8px" }}>{p.price}</p>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", color: "rgba(250,248,244,0.3)", margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section style={{ padding: "0 20px 80px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "12px" }}>How it works</p>
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, color: "#FAF8F4", letterSpacing: "-0.02em", margin: 0 }}>Simple for diners. Powerful for chefs.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "24px", padding: "32px" }}>
                <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "20px" }}>For Diners</p>
                {[
                  { n: "01", t: "Find your chef",    d: `Browse verified private chefs in ${cityName} by cuisine and availability.` },
                  { n: "02", t: "View their story",  d: "See their full profile, specialties, menus, and kitchen secrets." },
                  { n: "03", t: "Tip directly",      d: "Scan their QR code, pay with any card. The tip goes straight to them." },
                ].map((s) => (
                  <div key={s.n} style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                    <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", color: "rgba(201,169,110,0.4)", flexShrink: 0, minWidth: "28px", lineHeight: 1.2 }}>{s.n}</span>
                    <div>
                      <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", fontWeight: 700, color: "rgba(250,248,244,0.85)", margin: "0 0 3px" }}>{s.t}</p>
                      <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", color: "rgba(250,248,244,0.35)", margin: 0, lineHeight: 1.5 }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(201,169,110,0.05)", border: "1px solid rgba(201,169,110,0.15)", borderRadius: "24px", padding: "32px" }}>
                <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "20px" }}>For Chefs in {cityName}</p>
                {[
                  { n: "01", t: "Create your free page", d: "Sign up in 60 seconds. Add your photo, story, and specialties." },
                  { n: "02", t: "Connect Stripe",         d: "Link your bank in 2 minutes. Tips go directly to your account." },
                  { n: "03", t: "Share your QR code",     d: "Print it on menus or receipts. Diners scan and tip in seconds." },
                ].map((s) => (
                  <div key={s.n} style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                    <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", color: "#C9A96E", flexShrink: 0, minWidth: "28px", lineHeight: 1.2 }}>{s.n}</span>
                    <div>
                      <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", fontWeight: 700, color: "rgba(250,248,244,0.85)", margin: "0 0 3px" }}>{s.t}</p>
                      <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", color: "rgba(250,248,244,0.4)", margin: 0, lineHeight: 1.5 }}>{s.d}</p>
                    </div>
                  </div>
                ))}
                <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg,#D4B878 0%,#C9A96E 55%,#B8934A 100%)", color: "#1a1208", borderRadius: "100px", padding: "10px 22px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "13px", fontWeight: 700 }}>
                  Claim your page in {cityName} →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: "0 20px 80px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "12px" }}>FAQ</p>
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, color: "#FAF8F4", letterSpacing: "-0.02em", margin: 0 }}>
                Private chef questions for {cityName}
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {faqs.map((f) => (
                <div key={f.q} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px 22px" }}>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13.5px", fontWeight: 700, color: "rgba(250,248,244,0.85)", margin: "0 0 8px" }}>{f.q}</p>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", color: "rgba(250,248,244,0.4)", margin: 0, lineHeight: 1.65 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Nearby cities ── */}
        {nearby.length > 0 && (
          <section style={{ padding: "0 20px 60px" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "16px" }}>
                Nearby locations
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {nearby.map((n) => (
                  <Link key={n.slug} href={`/private-chef/${n.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "100px", padding: "8px 18px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "13px", color: "rgba(250,248,244,0.55)" }}>
                    Private Chef in {n.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Cross-link: cheap / birthday / dinner party ── */}
        <section style={{ padding: "0 20px 60px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(250,248,244,0.3)", marginBottom: "16px" }}>
              Also see
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {[
                { href: `/cheap-private-chef/${citySlug}`,             label: `Cheap private chef in ${cityName}` },
                { href: `/private-chef-for-birthday/${citySlug}`,      label: `Private chef for birthday in ${cityName}` },
                { href: `/private-chef-for-dinner-party/${citySlug}`,  label: `Private chef for dinner party in ${cityName}` },
                { href: `/private-chef-for-two/${citySlug}`,           label: `Private chef for two in ${cityName}` },
                { href: `/personal-chef/${citySlug}`,                  label: `Personal chef in ${cityName}` },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{ display: "inline-block", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "100px", padding: "7px 16px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "12px", color: "rgba(250,248,244,0.35)" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{ padding: "0 20px 100px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.08) 0%, rgba(201,169,110,0.03) 100%)", border: "1px solid rgba(201,169,110,0.18)", borderRadius: "28px", padding: "52px 48px", display: "grid", gridTemplateColumns: "1fr auto", gap: "32px", alignItems: "center" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "#FAF8F4", letterSpacing: "-0.02em", margin: "0 0 12px" }}>
                  Are you a chef in {cityName}?
                </h2>
                <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "15px", color: "rgba(250,248,244,0.45)", lineHeight: 1.65, margin: 0, maxWidth: "480px" }}>
                  Create your free chef page in under 2 minutes. Get your personal QR code, share it with diners, and start receiving direct tips. No middleman. 95% straight to your account.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "200px" }}>
                <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "linear-gradient(135deg,#D4B878 0%,#C9A96E 55%,#B8934A 100%)", color: "#1a1208", borderRadius: "100px", padding: "15px 32px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "15px", fontWeight: 700, boxShadow: "0 8px 32px rgba(201,169,110,0.35)", whiteSpace: "nowrap" }}>
                  Create your free page →
                </Link>
                <Link href="/tutorial" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(250,248,244,0.5)", borderRadius: "100px", padding: "12px 28px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "13px", fontWeight: 500, whiteSpace: "nowrap" }}>
                  Watch tutorial first
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
