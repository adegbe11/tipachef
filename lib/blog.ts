export const BLOG_AUTHOR = {
  name: "Collins Asein",
  title: "Founder, Tip a Chef",
  bio: "Collins Asein spent several summers working as a dishwasher in a professional restaurant kitchen, watching chefs give everything and hear nothing back. That experience is why he built Tip a Chef.",
  image: "/android-chrome-192x192.png",
  twitter: "https://twitter.com/tipachef",
};

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "callout"; text: string };

export interface BlogPost {
  slug: string;
  seoTitle: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  categoryLabel: string;
  date: string;
  readMinutes: number;
  featuredImage: { url: string; alt: string };
  intro: string;
  sections: {
    h2: string;
    blocks: ContentBlock[];
  }[];
  conclusion: string;
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
}
