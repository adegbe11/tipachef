import { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase-server";
import { ALL_POSTS } from "@/lib/blog-index";
import { CITIES, CUISINES, TIP_GUIDES } from "@/lib/pseo-data";
import { WORLD_CITIES } from "@/lib/world-cities";
import { getAllLocationSlugs } from "@/lib/locations";
import { ALL_CITIES } from "@/lib/all-cities";
import { getIndexableCitySlugs } from "@/lib/city-seo";
import { AUTHORS } from "@/lib/authors";
import { getAllTippingSlugs } from "@/lib/tipping-guides";

// Fixed dates per content type — prevents Google ignoring lastModified
// when it sees every page stamped "today" on every deploy.
const LAUNCH          = new Date("2026-04-01"); // site launched
const PSEO_PUBLISHED  = new Date("2026-04-15"); // programmatic pages went live
const TERMS_UPDATED   = new Date("2026-05-01"); // last legal update

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://tipachef.com";

  // Static pages — use real meaningful dates, not new Date()
  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                     lastModified: LAUNCH,         changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/private-chef`,   lastModified: PSEO_PUBLISHED, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${base}/tipping`,        lastModified: PSEO_PUBLISHED, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/team`,           lastModified: LAUNCH,         changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/for-chefs`,      lastModified: LAUNCH,         changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/search`,         lastModified: LAUNCH,         changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/blog`,           lastModified: LAUNCH,         changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/chefs`,          lastModified: LAUNCH,         changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/tutorial`,       lastModified: LAUNCH,         changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/about`,          lastModified: LAUNCH,         changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`,        lastModified: LAUNCH,         changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/help`,           lastModified: LAUNCH,         changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/terms`,          lastModified: TERMS_UPDATED,  changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/privacy`,        lastModified: TERMS_UPDATED,  changeFrequency: "yearly",  priority: 0.3 },
  ];

  // ── Private-chef city pages.
  // Only INDEXABLE cities go in the sitemap: curated rich cities + Tier S/A
  // (population >= 100K) from the 33,747-city dataset. The long-tail towns
  // render noindex,follow and are deliberately excluded so we don't spend
  // crawl budget on thin pages — they stay reachable via nearby-city links.
  const richSlugs = new Set<string>(
    getAllLocationSlugs().concat(WORLD_CITIES.map((c) => c.slug)),
  );
  const indexableSlugs = new Set<string>(
    getIndexableCitySlugs(ALL_CITIES).concat(Array.from(richSlugs)),
  );
  const privateChefCityPages: MetadataRoute.Sitemap = Array.from(indexableSlugs).map((slug) => ({
    url: `${base}/private-chef/${slug}`,
    lastModified: PSEO_PUBLISHED,
    changeFrequency: "weekly" as const,
    priority: richSlugs.has(slug) ? 0.88 : 0.7,
  }));

  // Blog post pages — use actual post date (already correct)
  const blogPages: MetadataRoute.Sitemap = ALL_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic chef profile pages — use real DB updated_at
  let chefPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createServerClient();
    const { data: chefs } = await supabase
      .from("chefs")
      .select("slug, updated_at")
      .order("created_at", { ascending: false });

    if (chefs) {
      chefPages = chefs.map((chef) => ({
        url: `${base}/${chef.slug}`,
        lastModified: chef.updated_at ? new Date(chef.updated_at) : LAUNCH,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }));
    }
  } catch {
    // If DB is unavailable during build, skip chef pages
  }

  // Programmatic city pages — content is static, fixed date
  const cityPages: MetadataRoute.Sitemap = Object.values(CITIES).map((city) => ({
    url: `${base}/chefs/${city.slug}`,
    lastModified: PSEO_PUBLISHED,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Programmatic cuisine pages
  const cuisinePages: MetadataRoute.Sitemap = Object.values(CUISINES).map((cuisine) => ({
    url: `${base}/cuisine/${cuisine.slug}`,
    lastModified: PSEO_PUBLISHED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Programmatic tip guide pages
  const tipGuidePages: MetadataRoute.Sitemap = Object.values(TIP_GUIDES).map((guide) => ({
    url: `${base}/tip-guide/${guide.slug}`,
    lastModified: PSEO_PUBLISHED,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Programmatic cheap-private-chef city pages
  const cheapChefPages: MetadataRoute.Sitemap = WORLD_CITIES.map((city) => ({
    url: `${base}/cheap-private-chef/${city.slug}`,
    lastModified: PSEO_PUBLISHED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Programmatic birthday pages
  const birthdayChefPages: MetadataRoute.Sitemap = WORLD_CITIES.map((city) => ({
    url: `${base}/private-chef-for-birthday/${city.slug}`,
    lastModified: PSEO_PUBLISHED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Programmatic dinner party pages
  const dinnerPartyPages: MetadataRoute.Sitemap = WORLD_CITIES.map((city) => ({
    url: `${base}/private-chef-for-dinner-party/${city.slug}`,
    lastModified: PSEO_PUBLISHED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Programmatic personal-chef pages
  const personalChefPages: MetadataRoute.Sitemap = WORLD_CITIES.map((city) => ({
    url: `${base}/personal-chef/${city.slug}`,
    lastModified: PSEO_PUBLISHED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Programmatic private-chef-for-two pages
  const chefForTwoPages: MetadataRoute.Sitemap = WORLD_CITIES.map((city) => ({
    url: `${base}/private-chef-for-two/${city.slug}`,
    lastModified: PSEO_PUBLISHED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Author / E-E-A-T pages
  const authorPages: MetadataRoute.Sitemap = AUTHORS.map((a) => ({
    url: `${base}/team/${a.slug}`,
    lastModified: LAUNCH,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  // Tipping-guide cluster (do you tip / how much to tip a [type] chef)
  const tippingPages: MetadataRoute.Sitemap = getAllTippingSlugs().map((slug) => ({
    url: `${base}/tipping/${slug}`,
    lastModified: PSEO_PUBLISHED,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const all: MetadataRoute.Sitemap = [
    ...staticPages,
    ...authorPages,
    ...tippingPages,
    ...blogPages,
    ...chefPages,
    ...cityPages,
    ...cuisinePages,
    ...tipGuidePages,
    ...privateChefCityPages,
    ...cheapChefPages,
    ...birthdayChefPages,
    ...dinnerPartyPages,
    ...personalChefPages,
    ...chefForTwoPages,
  ];

  // Hard safety cap. Google drops sitemaps over 50,000 URLs silently; we want
  // a build-time failure instead so we know to shard into multiple sitemaps.
  if (all.length > 50000) {
    throw new Error(
      `Sitemap has ${all.length} URLs, over Google's 50,000 cap. Shard via generateSitemaps().`,
    );
  }

  return all;
}
