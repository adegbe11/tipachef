import type { Metadata } from "next";
import Link from "next/link";
import { CITIES, CUISINES } from "@/lib/pseo-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Browse Chefs by City and Cuisine | Tip a Chef",
  description: "Find chefs to support directly. Browse by city or cuisine, send a direct tip, and leave a personal message for the person who cooked your meal.",
  alternates: { canonical: "https://tipachef.com/chefs" },
};

export default function ChefsHubPage() {
  const cities   = Object.values(CITIES);
  const cuisines = Object.values(CUISINES);

  return (
    <>
      <Navbar />
      <main style={{ background: "#0a0908", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ paddingTop: "7rem", paddingBottom: "4rem" }}>
          <div className="content-container text-center">
            <p className="eyebrow mb-4">Explore chefs worldwide</p>
            <h1
              className="font-display text-ivory"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", fontWeight: 400, lineHeight: 1.15, marginBottom: "1.25rem" }}
            >
              Find a chef.{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg,#C9A96E,#D4B878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Tip them directly.
              </em>
            </h1>
            <p style={{ color: "rgba(250,248,244,0.55)", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.75 }}>
              Browse chefs by city or cuisine. Every profile connects you directly to the person who made your meal.
            </p>
          </div>
        </section>

        {/* Cities */}
        <section style={{ paddingBottom: "5rem" }}>
          <div className="content-container">
            <p className="eyebrow mb-8 text-center">By city</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px", maxWidth: "900px", margin: "0 auto" }}>
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/chefs/${city.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,0.035)",
                      border: "1.5px solid rgba(201,169,110,0.14)",
                      borderRadius: "16px",
                      padding: "18px 20px",
                      transition: "border-color 0.2s, background 0.2s",
                      cursor: "pointer",
                    }}
                    className="group hover:border-ember/40 hover:bg-white/[0.06]"
                  >
                    <span style={{ fontSize: "24px", display: "block", marginBottom: "8px" }}>{city.flag}</span>
                    <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: "16px", fontWeight: 500, color: "#C9A96E", margin: "0 0 2px", fontStyle: "italic" }}>
                      {city.name}
                    </p>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", color: "rgba(250,248,244,0.35)", margin: 0 }}>
                      {city.country}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cuisines */}
        <section style={{ paddingBottom: "6rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "5rem" }}>
          <div className="content-container">
            <p className="eyebrow mb-8 text-center">By cuisine</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", maxWidth: "800px", margin: "0 auto", justifyContent: "center" }}>
              {cuisines.map((cuisine) => (
                <Link
                  key={cuisine.slug}
                  href={`/cuisine/${cuisine.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,0.035)",
                      border: "1.5px solid rgba(201,169,110,0.14)",
                      borderRadius: "40px",
                      padding: "10px 22px",
                      fontFamily: "-apple-system,system-ui",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "rgba(250,248,244,0.75)",
                      letterSpacing: "0.02em",
                      transition: "border-color 0.2s, color 0.2s",
                      cursor: "pointer",
                    }}
                    className="hover:border-ember/50 hover:text-ember"
                  >
                    {cuisine.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ paddingBottom: "6rem" }}>
          <div className="content-container text-center">
            <p style={{ color: "rgba(250,248,244,0.45)", fontSize: "0.95rem", marginBottom: "1.5rem", fontFamily: "-apple-system,system-ui" }}>
              Are you a chef? Get your own profile.
            </p>
            <Link
              href="/signup"
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg,#C9A96E,#B8934A)",
                color: "#1a1208",
                fontFamily: "-apple-system,system-ui",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.04em",
                padding: "14px 36px",
                borderRadius: "40px",
                textDecoration: "none",
              }}
            >
              Create your free profile
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
