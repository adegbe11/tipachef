import { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase-server";
import { ALL_POSTS } from "@/lib/blog-index";
import { CITIES, CUISINES, TIP_GUIDES } from "@/lib/pseo-data";
import { WORLD_CITIES } from "@/lib/world-cities";

// Fixed dates per content type — prevents Google ignoring lastModified
// when it sees every page stamped "today" on every deploy.
const LAUNCH          = new Date("2026-04-01"); // site launched
const PSEO_PUBLISHED  = new Date("2026-04-15"); // programmatic pages went live
const TERMS_UPDATED   = new Date("2026-05-01"); // last legal update

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://tipachef.com";

  // Static pages — use real meaningful dates, not new Date()
  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                  lastModified: LAUNCH,         changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/for-chefs`,   lastModified: LAUNCH,         changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/search`,      lastModified: LAUNCH,         changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/blog`,        lastModified: LAUNCH,         changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/chefs`,       lastModified: LAUNCH,         changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/about`,       lastModified: LAUNCH,         changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`,     lastModified: LAUNCH,         changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/help`,        lastModified: LAUNCH,         changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/terms`,       lastModified: TERMS_UPDATED,  changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/privacy`,     lastModified: TERMS_UPDATED,  changeFrequency: "yearly",  priority: 0.3 },
  ];

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

  // Programmatic private-chef city pages (~160 cities)
  const privateChefPages: MetadataRoute.Sitemap = WORLD_CITIES.map((city) => ({
    url: `${base}/private-chef/${city.slug}`,
    lastModified: PSEO_PUBLISHED,
    changeFrequency: "monthly" as const,
    priority: 0.85,
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

  return [
    ...staticPages,
    ...blogPages,
    ...chefPages,
    ...cityPages,
    ...cuisinePages,
    ...tipGuidePages,
    ...privateChefPages,
    ...cheapChefPages,
    ...birthdayChefPages,
    ...dinnerPartyPages,
    ...personalChefPages,
    ...chefForTwoPages,
  ];
}
