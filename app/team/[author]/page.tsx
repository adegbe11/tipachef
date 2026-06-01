import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AUTHORS, AUTHOR_BY_SLUG, authorJsonLd } from "@/lib/authors";
import Avatar from "@/components/Avatar";

export const dynamicParams = false;

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ author: a.slug }));
}

export async function generateMetadata(
  { params }: { params: { author: string } }
): Promise<Metadata> {
  const author = AUTHOR_BY_SLUG[params.author];
  if (!author) return {};
  const title = `${author.name} — ${author.role} | Tip a Chef`;
  return {
    title,
    description: author.bio,
    openGraph: { title, description: author.bio, url: `https://tipachef.com/team/${author.slug}`, type: "profile", images: [author.photo] },
    alternates: { canonical: `https://tipachef.com/team/${author.slug}` },
  };
}

export default function AuthorPage({ params }: { params: { author: string } }) {
  const author = AUTHOR_BY_SLUG[params.author];
  if (!author) notFound();

  const jsonLd = { "@context": "https://schema.org", ...authorJsonLd(author) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main style={{ background: "#0a0908", minHeight: "100vh", color: "#FAF8F4" }}>
        <section style={{ padding: "100px 20px 60px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>

            <nav style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", color: "rgba(250,248,244,0.35)", marginBottom: "32px" }}>
              <Link href="/" style={{ color: "rgba(250,248,244,0.35)", textDecoration: "none" }}>Home</Link>
              <span style={{ margin: "0 8px" }}>›</span>
              <Link href="/team" style={{ color: "rgba(250,248,244,0.35)", textDecoration: "none" }}>Team</Link>
              <span style={{ margin: "0 8px" }}>›</span>
              <span style={{ color: "#C9A96E" }}>{author.name}</span>
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
              <Avatar name={author.name} size={88} />
              <div>
                <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "#FAF8F4", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                  {author.name}
                </h1>
                <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 600, color: "#C9A96E", margin: 0 }}>{author.role}</p>
              </div>
            </div>

            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "16px", color: "rgba(250,248,244,0.6)", lineHeight: 1.75, marginBottom: "32px" }}>
              {author.bio}
            </p>

            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "14px" }}>
              Credentials
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {author.credentials.map((c) => (
                <li key={c} style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", color: "rgba(250,248,244,0.65)", display: "flex", gap: "10px" }}>
                  <span style={{ color: "#C9A96E" }}>✓</span> {c}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {author.sameAs.map((url) => (
                <a key={url} href={url} rel="nofollow noopener" target="_blank" style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", color: "rgba(250,248,244,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "100px", padding: "8px 18px", textDecoration: "none" }}>
                  {url.includes("twitter") ? "Twitter / X" : url.includes("linkedin") ? "LinkedIn" : "Profile"}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
