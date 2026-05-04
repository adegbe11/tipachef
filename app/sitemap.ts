import { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://tipachef.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: base,              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/search`,  lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/help`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  // Dynamic chef profile pages
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
        lastModified: chef.updated_at ? new Date(chef.updated_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }));
    }
  } catch {
    // If DB is unavailable during build, just skip chef pages
  }

  return [...staticPages, ...chefPages];
}
