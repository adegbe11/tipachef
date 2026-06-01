import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AUTHORS } from "@/lib/authors";
import Avatar from "@/components/Avatar";

export const metadata: Metadata = {
  title: "Editorial Team | Tip a Chef",
  description:
    "Meet the Tip a Chef editorial team. Former chefs, hospitality journalists, and private dining specialists who research and review our city guides.",
  alternates: { canonical: "https://tipachef.com/team" },
};

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#0a0908", minHeight: "100vh", color: "#FAF8F4" }}>
        <section style={{ padding: "100px 20px 80px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "14px" }}>
              Editorial team
            </p>
            <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 400, color: "#FAF8F4", letterSpacing: "-0.02em", margin: "0 0 16px" }}>
              The people behind our guides
            </h1>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "16px", color: "rgba(250,248,244,0.45)", lineHeight: 1.7, maxWidth: "560px", marginBottom: "48px" }}>
              Former chefs, hospitality journalists, and private dining specialists who research, write, and review every city guide on Tip a Chef.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "16px" }}>
              {AUTHORS.map((a) => (
                <Link key={a.slug} href={`/team/${a.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "22px 24px", height: "100%" }}>
                    <Avatar name={a.name} size={56} />
                    <div>
                      <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "15px", fontWeight: 700, color: "#FAF8F4", margin: "0 0 2px" }}>{a.name}</p>
                      <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12.5px", fontWeight: 600, color: "#C9A96E", margin: "0 0 8px" }}>{a.role}</p>
                      <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", color: "rgba(250,248,244,0.4)", margin: 0, lineHeight: 1.55 }}>{a.bio}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
