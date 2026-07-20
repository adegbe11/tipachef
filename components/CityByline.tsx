// Byline that sits directly below the hero on every city page. Attributes the
// guide to the Tip a Chef editorial team plus a visible last-reviewed date so
// readers know the intel is maintained. The Organization JSON-LD half is wired
// in the page's graph.

import Link from "next/link";
import type { Author } from "@/lib/authors";
import Avatar from "@/components/Avatar";

interface Props {
  author: Author;
  reviewedISO: string;
  coversLabel: string; // e.g. "Paris, France"
}

export default function CityByline({ author, reviewedISO, coversLabel }: Props) {
  const reviewed = new Date(reviewedISO).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "14px 18px",
      background: "#ffffff",
      border: "1px solid #ececec",
      borderRadius: 16,
      marginBottom: 24,
    }}>
      <Avatar name={author.name} size={44} />
      <div>
        <p style={{ fontFamily: "-apple-system, system-ui", fontSize: 14, fontWeight: 500, color: "#1d1d1f", margin: 0, lineHeight: 1.3 }}>
          <span style={{ color: "#8a8a8a" }}>By the</span>{" "}
          <Link href="/team" style={{ color: "#111111", fontWeight: 700, textDecoration: "none" }}>{author.name}</Link>{" "}
          <span style={{ color: "#8a8a8a" }}>· {author.role}</span>
        </p>
        <p style={{ fontFamily: "-apple-system, system-ui", fontSize: 12, color: "#9a9a9a", margin: "4px 0 0", lineHeight: 1.3 }}>
          Reviewed <time dateTime={reviewedISO}>{reviewed}</time> · Covers {coversLabel}
        </p>
      </div>
    </div>
  );
}
