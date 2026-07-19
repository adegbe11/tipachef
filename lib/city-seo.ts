// City SEO layer for /private-chef/[city]. Only cities likely to be useful to
// searchers are indexable; the long tail stays noindex until real supply or
// editorial demand justifies promotion.

import type { AllCity } from "./all-cities";

export type CityTier = "S" | "A" | "B";

// Tier gates indexing + template depth:
//   S = metro (pop >= 1M)      → indexed, in sitemap, richest copy
//   A = major city (pop >= 100K) → indexed, in sitemap
//   B = town (pop >= 15K)      → noindex,follow, NOT in sitemap until promoted
export function cityTier(population: number): CityTier {
  if (population >= 1_000_000) return "S";
  if (population >= 100_000) return "A";
  return "B";
}

// Focus indexing on cities with real search demand. Curated cities and Tier
// S/A (population >= 100K) ask to be indexed; the Tier B long tail renders
// noindex,follow so it stays live and link-equity flows, but Google's limited
// crawl budget for a young domain concentrates on pages that can actually
// rank. (GSC confirmed: dumping all 34k pages just produced 34k "Discovered,
// currently not indexed". Refocusing helps the best pages get indexed faster.)
// Re-open the full tail by returning true here once the domain has authority.
export function shouldIndexCity(city: AllCity, curated: boolean): boolean {
  if (curated) return true;
  const t = cityTier(city.population);
  return t === "S" || t === "A";
}

export function robotsForCity(city: AllCity, curated: boolean): string {
  return shouldIndexCity(city, curated) ? "index,follow" : "noindex,follow";
}

// Cities the sitemap should list: indexable only (curated + Tier S/A). The
// noindex long tail is excluded so crawl budget is spent on pages that can
// rank now; those towns stay reachable via the nearby-city internal links.
export function getIndexableCitySlugs(cities: AllCity[]): string[] {
  return cities.filter((c) => shouldIndexCity(c, false)).map((c) => c.slug);
}
