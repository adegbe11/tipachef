// Byline that sits directly below the hero on every city page. Gives the page
// a real, credentialed author (E-E-A-T "Experience") plus a visible
// last-reviewed date so readers know the intel is maintained. The Person
// JSON-LD half is wired in the page's graph.

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
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      marginBottom: 28,
    }}>
      <Avatar name={author.name} size={44} />
      <div>
        <p style={{ fontFamily: "-apple-system, system-ui", fontSize: 14, fontWeight: 500, color: "rgba(250,248,244,0.85)", margin: 0, lineHeight: 1.3 }}>
          <span style={{ color: "rgba(250,248,244,0.4)" }}>By</span>{" "}
          <Link href={`/team/${author.slug}`} style={{ color: "#FAF8F4", fontWeight: 700, textDecoration: "none" }}>{author.name}</Link>{" "}
          <span style={{ color: "rgba(250,248,244,0.4)" }}>· {author.role}</span>
        </p>
        <p style={{ fontFamily: "-apple-system, system-ui", fontSize: 12, color: "rgba(250,248,244,0.4)", margin: "4px 0 0", lineHeight: 1.3 }}>
          Reviewed <time dateTime={reviewedISO}>{reviewed}</time> · Covers {coversLabel}
        </p>
      </div>
    </div>
  );
}
