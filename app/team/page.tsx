import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EDITORIAL_TEAM } from "@/lib/authors";

export const metadata: Metadata = {
  title: "Editorial Standards | Tip a Chef",
  description:
    "How the Tip a Chef editorial team researches, writes, and reviews our private-chef pricing and tipping guides.",
  alternates: { canonical: "https://tipachef.com/team" },
};

const STANDARDS = [
  {
    title: "Estimates, clearly labelled",
    body: "Every pricing figure in our guides is an editorial estimate based on published market rates and hospitality-industry sources. We never present estimates as live platform data.",
  },
  {
    title: "Dated and reviewed",
    body: "Every guide shows the date it was last reviewed, so you know how current the information is. When market rates shift, we update the guide and the date.",
  },
  {
    title: "No pay-to-rank",
    body: "Chefs cannot pay to appear more prominently in our guides or search results. Listings reflect real chef profiles on the platform.",
  },
  {
    title: "Honest about our fees",
    body: "Chefs keep 95% of every tip; Tip a Chef takes a 5% platform fee, and Stripe's processing fees apply. We state this everywhere money is discussed.",
  },
];

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#0a0908", minHeight: "100vh", color: "#FAF8F4" }}>
        <section style={{ padding: "100px 20px 80px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "14px" }}>
              Editorial standards
            </p>
            <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 400, color: "#FAF8F4", letterSpacing: "-0.02em", margin: "0 0 16px" }}>
              How we research our guides
            </h1>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "16px", color: "rgba(250,248,244,0.45)", lineHeight: 1.7, maxWidth: "560px", marginBottom: "48px" }}>
              {EDITORIAL_TEAM.bio}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))", gap: "16px" }}>
              {STANDARDS.map((s) => (
                <div key={s.title} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "22px 24px" }}>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "15px", fontWeight: 700, color: "#FAF8F4", margin: "0 0 8px" }}>{s.title}</p>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13.5px", color: "rgba(250,248,244,0.45)", margin: 0, lineHeight: 1.6 }}>{s.body}</p>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", color: "rgba(250,248,244,0.4)", lineHeight: 1.7, marginTop: "40px" }}>
              Spotted something out of date?{" "}
              <Link href="/contact" style={{ color: "#C9A96E", textDecoration: "none", fontWeight: 600 }}>
                Tell us
              </Link>{" "}
              and we&apos;ll review it.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
