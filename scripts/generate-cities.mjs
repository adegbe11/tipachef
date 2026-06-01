// Regenerate lib/all-cities.ts from GeoNames open data.
//
// Usage (from project root):
//   mkdir -p .tmp && cd .tmp
//   curl -sLO https://download.geonames.org/export/dump/cities15000.zip && unzip -o cities15000.zip
//   curl -sLO https://download.geonames.org/export/dump/countryInfo.txt
//   curl -sLO https://download.geonames.org/export/dump/admin1CodesASCII.txt && mv admin1CodesASCII.txt admin1.txt
//   cd .. && node scripts/generate-cities.mjs
//
// Bump CITY_COUNT to widen coverage (cities15000 holds ~33,700 cities total).
import fs from "fs";

const TMP = "./.tmp";
const OUT = "./lib/all-cities.ts";
const CITY_COUNT = 40000; // take all valid cities in cities15000 (~33,700)

// ── Continent code → name ──────────────────────────────────────────
const CONTINENT = {
  AF: "Africa", AS: "Asia", EU: "Europe",
  NA: "North America", OC: "Oceania", SA: "South America", AN: "Antarctica",
};

// ── Currency code → symbol ─────────────────────────────────────────
const CURRENCY_SYMBOL = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥", INR: "₹", AUD: "A$",
  CAD: "CA$", CHF: "CHF", SEK: "kr", NOK: "kr", DKK: "kr", NZD: "NZ$",
  ZAR: "R", BRL: "R$", MXN: "$", AED: "AED", SAR: "SAR", QAR: "QAR",
  SGD: "S$", HKD: "HK$", THB: "฿", IDR: "Rp", MYR: "RM", PHP: "₱",
  KRW: "₩", TRY: "₺", PLN: "zł", CZK: "Kč", HUF: "Ft", RUB: "₽",
  AED_: "AED", ILS: "₪", EGP: "E£", NGN: "₦", KES: "KSh", GHS: "₵",
  MAD: "MAD", TWD: "NT$", VND: "₫", CLP: "$", COP: "$", ARS: "$",
  PEN: "S/", RON: "lei", BGN: "лв", HRK: "kn", ISK: "kr", UAH: "₴",
};

// ── Country cost tier → starting USD/person for a dinner event ──────
// Tiered roughly by cost of dining out. Default mid = 50.
const COUNTRY_PRICE = {
  CH: 95, NO: 90, IS: 88, US: 80, GB: 85, AE: 90, QA: 88, SG: 85,
  HK: 82, AU: 78, NZ: 72, CA: 72, IE: 75, DK: 80, SE: 72, FI: 72,
  NL: 75, BE: 72, FR: 78, DE: 72, AT: 72, LU: 85, MC: 110, IT: 65,
  ES: 62, PT: 55, GR: 55, JP: 75, KR: 60, IL: 70, BH: 75, KW: 78,
  SA: 70, OM: 65, CN: 55, TW: 55, MO: 70, MV: 95, BS: 90, KY: 95,
  BB: 80, TC: 95, VG: 90, AW: 75, CW: 70, BM: 100, BR: 45, MX: 50,
  AR: 45, CL: 50, UY: 50, CR: 55, PA: 55, CO: 40, PE: 40, EC: 38,
  ZA: 45, MA: 40, EG: 35, KE: 40, NG: 40, GH: 38, TZ: 40, MU: 60,
  SC: 75, TH: 50, ID: 45, MY: 45, PH: 42, VN: 40, IN: 35, LK: 35,
  TR: 45, PL: 45, CZ: 48, HU: 42, RO: 40, BG: 38, HR: 50, SI: 55,
  SK: 45, RS: 38, UA: 35, RU: 45, EE: 50, LV: 48, LT: 48, CY: 60,
  MT: 60, FJ: 55, PF: 90, NC: 80,
};

function slugify(s) {
  return s
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Parse countryInfo ──────────────────────────────────────────────
const countryByIso = {};
for (const line of fs.readFileSync(`${TMP}/countryInfo.txt`, "utf8").split("\n")) {
  if (!line || line.startsWith("#")) continue;
  const f = line.split("\t");
  const iso = f[0];
  if (!iso) continue;
  countryByIso[iso] = {
    name: f[4],
    continent: CONTINENT[f[8]] || "",
    currency: f[10] || "USD",
  };
}

// ── Parse admin1 region names ──────────────────────────────────────
const regionByCode = {};
for (const line of fs.readFileSync(`${TMP}/admin1.txt`, "utf8").split("\n")) {
  if (!line) continue;
  const f = line.split("\t");
  regionByCode[f[0]] = f[1]; // "US.CA" -> "California"
}

// ── Parse cities ───────────────────────────────────────────────────
const rows = [];
for (const line of fs.readFileSync(`${TMP}/cities15000.txt`, "utf8").split("\n")) {
  if (!line) continue;
  const f = line.split("\t");
  const asciiname = f[2];
  const cc = f[8];
  const admin1 = f[10];
  const population = parseInt(f[14], 10) || 0;
  if (!asciiname || !cc) continue;
  const country = countryByIso[cc];
  if (!country) continue;
  rows.push({ asciiname, cc, admin1, population, country });
}

// Sort by population desc, take top N
rows.sort((a, b) => b.population - a.population);
const top = rows.slice(0, CITY_COUNT);

// ── Build entries with unique slugs ────────────────────────────────
const usedSlugs = new Set();
const entries = [];

for (const r of top) {
  const region = regionByCode[`${r.cc}.${r.admin1}`] || "";
  let slug = slugify(r.asciiname);
  if (!slug) continue;

  // Resolve collisions: append region, then country
  if (usedSlugs.has(slug)) {
    const withRegion = region ? `${slug}-${slugify(region)}` : "";
    if (withRegion && !usedSlugs.has(withRegion)) {
      slug = withRegion;
    } else {
      const withCountry = `${slug}-${slugify(r.country.name)}`;
      if (!usedSlugs.has(withCountry)) {
        slug = withCountry;
      } else {
        let i = 2;
        while (usedSlugs.has(`${slug}-${i}`)) i++;
        slug = `${slug}-${i}`;
      }
    }
  }
  usedSlugs.add(slug);

  const priceFrom = COUNTRY_PRICE[r.cc] || 50;
  const currencySymbol = CURRENCY_SYMBOL[r.country.currency] || "$";

  entries.push({
    name: r.asciiname,
    slug,
    country: r.country.name,
    countryCode: r.cc,
    continent: r.country.continent,
    region,
    currency: r.country.currency,
    currencySymbol,
    priceFrom,
    population: r.population,
  });
}

// ── Emit compact TS ────────────────────────────────────────────────
const lines = entries.map((e) => {
  const o = {
    n: e.name, s: e.slug, c: e.country, cc: e.countryCode,
    ct: e.continent, r: e.region, cur: e.currency, sym: e.currencySymbol,
    p: e.priceFrom, pop: e.population,
  };
  return `  ${JSON.stringify(o)},`;
}).join("\n");

const ts = `// AUTO-GENERATED — do not edit by hand.
// Source: GeoNames cities15000 (top ${CITY_COUNT} by population) + countryInfo + admin1.
// Powers programmatic SEO at /private-chef/[city] for ${entries.length} cities worldwide.
// Regenerate via .tmp/generate.mjs

export interface AllCity {
  name:          string;
  slug:          string;
  country:       string;
  countryCode:   string;
  continent:     string;
  region:        string;
  currency:      string;
  currencySymbol:string;
  priceFrom:     number; // USD/person starting dinner-event rate
  population:    number;
}

// Compact tuples decoded at module load to keep this file lean.
const RAW: Array<{n:string;s:string;c:string;cc:string;ct:string;r:string;cur:string;sym:string;p:number;pop:number}> = [
${lines}
];

export const ALL_CITIES: AllCity[] = RAW.map((o) => ({
  name: o.n, slug: o.s, country: o.c, countryCode: o.cc, continent: o.ct,
  region: o.r, currency: o.cur, currencySymbol: o.sym, priceFrom: o.p, population: o.pop,
}));

export const ALL_CITIES_BY_SLUG: Record<string, AllCity> = Object.fromEntries(
  ALL_CITIES.map((c) => [c.slug, c]),
);

export function getCity(slug: string): AllCity | undefined {
  return ALL_CITIES_BY_SLUG[slug];
}

export function getAllCitySlugs(): string[] {
  return ALL_CITIES.map((c) => c.slug);
}

// Top N cities by population — used to bound generateStaticParams so the
// build stays fast; the long tail renders on-demand via ISR (dynamicParams).
export function getTopCities(n: number): AllCity[] {
  return ALL_CITIES.slice(0, n);
}

// Other large cities in the same country, for internal linking.
export function getNearbyCities(slug: string, limit = 8): AllCity[] {
  const city = ALL_CITIES_BY_SLUG[slug];
  if (!city) return [];
  return ALL_CITIES
    .filter((c) => c.countryCode === city.countryCode && c.slug !== slug)
    .slice(0, limit);
}
`;

fs.writeFileSync(OUT, ts);
console.log(`Wrote ${entries.length} cities to ${OUT}`);
console.log(`File size: ${(ts.length / 1024 / 1024).toFixed(2)} MB`);

// Quick stats
const byCountry = {};
for (const e of entries) byCountry[e.country] = (byCountry[e.country] || 0) + 1;
const topCountries = Object.entries(byCountry).sort((a, b) => b[1] - a[1]).slice(0, 12);
console.log("Top countries:", topCountries.map(([c, n]) => `${c}:${n}`).join(", "));
console.log("Sample slugs:", entries.slice(0, 5).map((e) => e.slug).join(", "));
console.log("Total countries covered:", Object.keys(byCountry).length);
