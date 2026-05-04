import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chef Tipping & Restaurant Industry Blog — Tip a Chef",
  description:
    "Expert guides on chef tipping, restaurant industry pay, and how diners can support the people behind their favourite meals. Written by Tip a Chef founder Collins Asein.",
  keywords: [
    "chef tipping blog",
    "restaurant industry",
    "how to tip a chef",
    "kitchen workers pay",
    "chef support guide",
  ],
  openGraph: {
    title: "Chef Tipping & Restaurant Industry Blog — Tip a Chef",
    description:
      "Guides on tipping, kitchen pay, and how to support the chefs behind your favourite food.",
    url: "https://tipachef.com/blog",
    type: "website",
  },
  alternates: { canonical: "https://tipachef.com/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
