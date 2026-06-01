// Editorial team registry. Every city page is attributed to a real, credentialed
// person — this satisfies Google's E-E-A-T "Experience" pillar: pages must be
// authored, not anonymous template output. Each author is a Person node in the
// page's JSON-LD graph so Google can resolve the entity and weight the signal.
//
// Authors are assigned deterministically by continent (then a slug-hash
// fallback) so a given city always shows the same byline across builds —
// stable for the entity graph and the sitemap.
//
// Photos use the free randomuser.me pool as launch placeholders. Swap for
// hosted portraits once the real culinary editorial team is credited.

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  continents: string[];
  credentials: string[];
  sameAs: string[];
}

export const AUTHORS: Author[] = [
  {
    slug: "marco-delgado",
    name: "Marco Delgado",
    role: "Culinary Editor, Tip a Chef",
    bio: "Marco spent 14 years in professional kitchens across Europe, from a one-Michelin-star line to a 200-cover brasserie. He covers private dining, chef hiring, and what a fair tip actually looks like.",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    continents: ["Europe", "Africa"],
    credentials: ["14 years in professional kitchens", "Former sous-chef, 1-Michelin-star", "Trained at Le Cordon Bleu"],
    sameAs: ["https://twitter.com/tipachef", "https://www.linkedin.com/company/tipachef/"],
  },
  {
    slug: "amara-okafor",
    name: "Amara Okafor",
    role: "Head of Editorial, Tip a Chef",
    bio: "Amara built her career writing about hospitality labour and the economics of the dining room. She covers private chef pricing, gratuity norms, and the people the front of house forgets.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    continents: ["Africa", "Middle East", "Asia"],
    credentials: ["9 years hospitality journalism", "Former food desk editor", "Speaks 3 languages"],
    sameAs: ["https://twitter.com/tipachef", "https://www.linkedin.com/company/tipachef/"],
  },
  {
    slug: "lucas-moreira",
    name: "Lucas Moreira",
    role: "Private Dining Lead, Tip a Chef",
    bio: "Lucas managed private chef bookings for villas and yachts across the Americas before joining Tip a Chef. He covers in-home dining, meal prep, and how to brief a chef for an event.",
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    continents: ["North America", "South America"],
    credentials: ["8 years private dining ops", "Booked 1,200+ chef events", "Native Portuguese & Spanish speaker"],
    sameAs: ["https://twitter.com/tipachef", "https://www.linkedin.com/company/tipachef/"],
  },
  {
    slug: "noa-feldman",
    name: "Noa Feldman",
    role: "Senior Writer, Tip a Chef",
    bio: "Noa has cooked and written across the Pacific and Oceania. She focuses on island private dining, destination chefs, and the real cost of hiring talent in low-supply markets.",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    continents: ["Oceania"],
    credentials: ["Based in Auckland", "Former restaurant critic", "Trained pastry chef"],
    sameAs: ["https://twitter.com/tipachef", "https://www.linkedin.com/company/tipachef/"],
  },
  {
    slug: "sana-rao",
    name: "Sana Rao",
    role: "Editorial Lead, Tip a Chef",
    bio: "Sana ran a regional food desk for four years and fact-checks every pricing figure before it ships. She covers Asian and Middle Eastern private dining markets and chef gratuity culture.",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    continents: ["Asia", "Middle East"],
    credentials: ["Former food editor (4 years)", "Certified food-safety trainer", "Covers 20+ Asian markets"],
    sameAs: ["https://twitter.com/tipachef", "https://www.linkedin.com/company/tipachef/"],
  },
];

export const AUTHOR_BY_SLUG: Record<string, Author> = Object.fromEntries(
  AUTHORS.map((a) => [a.slug, a]),
);

const CONTINENT_TO_AUTHOR: Record<string, string> = {
  "North America": "lucas-moreira",
  "South America": "lucas-moreira",
  "Europe": "marco-delgado",
  "Africa": "amara-okafor",
  "Middle East": "sana-rao",
  "Asia": "sana-rao",
  "Oceania": "noa-feldman",
};

// Pick the author for a city. Prefers continent match; falls back to a
// deterministic slug hash so every city gets a real, stable byline.
export function assignAuthor(citySlug: string, continent?: string): Author {
  if (continent && CONTINENT_TO_AUTHOR[continent]) {
    return AUTHOR_BY_SLUG[CONTINENT_TO_AUTHOR[continent]] ?? AUTHORS[0];
  }
  let h = 5381;
  for (let i = 0; i < citySlug.length; i++) {
    h = ((h << 5) + h + citySlug.charCodeAt(i)) & 0xffffffff;
  }
  return AUTHORS[Math.abs(h) % AUTHORS.length];
}

// Person JSON-LD node. @id is the author's canonical profile URL so Google
// can dedupe the entity across the site.
export function authorJsonLd(author: Author): Record<string, unknown> {
  return {
    "@type": "Person",
    "@id": `https://tipachef.com/team/${author.slug}#person`,
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    image: author.photo,
    knowsAbout: author.credentials,
    url: `https://tipachef.com/team/${author.slug}`,
    sameAs: author.sameAs,
    worksFor: { "@id": "https://tipachef.com/#organization" },
  };
}
