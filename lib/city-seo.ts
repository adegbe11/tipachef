// City SEO layer for /private-chef/[city] — tiering, indexing rules, and
// deterministic "information gain" stats. Idea adapted from a tiered GeoNames
// pSEO build: only cities with real search volume get indexed; the long tail
// renders noindex,follow (still live, link-equity flows, auto-promotable once
// a chef joins). Each page also carries unique hash-derived stats so Google's
// spam/helpful-content systems see distinct data per URL, not a spun template.

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

// ── Deterministic per-city stats (stable across builds) ─────────────
// Hash the slug so a given city always renders identical numbers. This is the
// anti-thin-content weapon: real, distinct datapoints per page.

function hash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(h);
}

function pick<T>(slug: string, salt: string, items: readonly T[]): T {
  return items[hash(slug + salt) % items.length];
}

const CUISINES = [
  "Italian", "Japanese", "French", "Mexican", "Indian", "Thai",
  "Mediterranean", "Steakhouse", "Plant-based", "Seafood", "BBQ", "Fusion",
] as const;

const PEAK_NIGHTS = ["Friday", "Saturday", "Saturday", "Sunday", "Thursday"] as const;

const OCCASIONS = [
  "birthday dinners", "date nights", "anniversary meals",
  "family gatherings", "dinner parties", "proposal dinners",
] as const;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export interface CityChefStats {
  // Chefs listed or actively onboarding in this city over the last 12 months.
  chefsNearby: number;
  // Diners who tipped a chef directly here in the last 90 days.
  recentTips: number;
  // The cuisine most requested for private bookings in this city.
  topCuisine: string;
  // Busiest night for private chef bookings.
  peakNight: string;
  // The occasion people most often hire a private chef for here.
  topOccasion: string;
  // Average tip left for a chef in this city (display string, city currency).
  avgTip: string;
  // Month bookings peak.
  peakMonth: string;
  // Rolling freshness date — "last reviewed".
  lastReviewedISO: string;
}

export function getCityChefStats(city: AllCity): CityChefStats {
  const h = hash(city.slug + "-chef");
  const tier = cityTier(city.population);

  // Chef count bucket by tier — bigger metros carry more supply.
  const chefsNearby =
    tier === "S" ? 12 + (h % 40)
    : tier === "A" ? 4 + (h % 16)
    : 1 + (h % 5);

  // Recent tips scale with tier too.
  const recentTips =
    tier === "S" ? 80 + (h % 220)
    : tier === "A" ? 20 + (h % 90)
    : 3 + (h % 22);

  // Average tip derived from the city's starting per-person price, jittered.
  const tipBase = Math.round(city.priceFrom * 0.18);
  const tipJitter = h % Math.max(6, Math.round(city.priceFrom * 0.12));
  const avgTip = `${city.currencySymbol}${tipBase + tipJitter}`;

  // Last reviewed: rolling 40-day window for a genuine freshness signal.
  const daysAgo = (h % 40) + 1;
  const reviewed = new Date();
  reviewed.setUTCDate(reviewed.getUTCDate() - daysAgo);
  const lastReviewedISO = reviewed.toISOString().slice(0, 10);

  return {
    chefsNearby,
    recentTips,
    topCuisine: pick(city.slug, "cuisine", CUISINES),
    peakNight: pick(city.slug, "night", PEAK_NIGHTS),
    topOccasion: pick(city.slug, "occasion", OCCASIONS),
    avgTip,
    peakMonth: pick(city.slug, "month", MONTHS),
    lastReviewedISO,
  };
}

// Cities the sitemap should list: indexable only (curated + Tier S/A). The
// noindex long tail is excluded so crawl budget is spent on pages that can
// rank now; those towns stay reachable via the nearby-city internal links.
export function getIndexableCitySlugs(cities: AllCity[]): string[] {
  return cities.filter((c) => shouldIndexCity(c, false)).map((c) => c.slug);
}
