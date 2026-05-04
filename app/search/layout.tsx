import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Chef to Tip — Tip a Chef",
  description:
    "Search for your favourite chef by name or restaurant and send them a direct tip in seconds. No app needed.",
  keywords: ["find a chef", "tip a chef near me", "chef search", "send chef a tip", "restaurant chef tip"],
  openGraph: {
    title: "Find a Chef to Tip — Tip a Chef",
    description: "Search for your favourite chef and tip them directly in seconds.",
    url: "https://tipachef.com/search",
    type: "website",
  },
  alternates: { canonical: "https://tipachef.com/search" },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
