// Editorial attribution. Every guide page is attributed to the Tip a Chef
// editorial team — the Organization entity in JSON-LD — rather than to
// individual personas. schema.org fully supports Organization as an author,
// and Google explicitly accepts organizational authorship for informational
// content. When real, credited writers join the team, add them here with
// their genuine names, photos, and credentials.

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  sameAs: string[];
}

export const EDITORIAL_TEAM: Author = {
  slug: "editorial",
  name: "Tip a Chef Editorial Team",
  role: "Pricing & tipping research",
  bio: "We research private-chef pricing, hiring norms, and tipping etiquette across the markets we cover, drawing on published market rates and hospitality-industry sources. Every figure is presented as an editorial estimate, and every guide carries the date it was last reviewed.",
  credentials: [
    "Figures based on published market rates",
    "Every guide shows its last-reviewed date",
    "Estimates clearly labelled, never presented as live data",
  ],
  sameAs: [
    "https://twitter.com/tipachef",
    "https://www.linkedin.com/company/tipachef/",
  ],
};

export const AUTHORS: Author[] = [EDITORIAL_TEAM];

export const AUTHOR_BY_SLUG: Record<string, Author> = Object.fromEntries(
  AUTHORS.map((a) => [a.slug, a]),
);

// Every page is attributed to the editorial team. Signature kept for
// compatibility with existing call sites.
export function assignAuthor(_citySlug: string, _continent?: string): Author {
  return EDITORIAL_TEAM;
}

// Organization JSON-LD node for authorship. Uses the site-wide #organization
// @id so Google merges it with the Organization node already in the graph.
export function authorJsonLd(_author: Author): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": "https://tipachef.com/#organization",
    name: "Tip a Chef",
    url: "https://tipachef.com",
  };
}
