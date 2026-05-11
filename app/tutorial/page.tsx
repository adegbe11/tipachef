import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tip a Chef Tutorial | How to Setup & Use Tip a Chef to Get Tips",
  description:
    "Step-by-step video tutorial showing chefs exactly how to set up their Tip a Chef profile, share their QR code, connect Stripe, and start receiving direct tips from diners in minutes.",
  openGraph: {
    title: "Tip a Chef Tutorial | How to Setup & Use Tip a Chef to Get Tips",
    description:
      "Watch this tutorial to set up your Tip a Chef profile and start receiving direct tips from diners in minutes.",
    url: "https://tipachef.com/tutorial",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tip a Chef Tutorial | How to Setup & Use Tip a Chef",
    description:
      "Watch this tutorial to set up your Tip a Chef profile and start receiving direct tips from diners in minutes.",
  },
  alternates: { canonical: "https://tipachef.com/tutorial" },
};

const STEPS = [
  { n: "01", title: "Create your free account",     desc: "Sign up at tipachef.com in under 60 seconds. No credit card needed." },
  { n: "02", title: "Build your chef profile",      desc: "Add your name, photo, role, restaurant, and your personal story. The more detail, the more tips you receive." },
  { n: "03", title: "Connect Stripe",               desc: "Link your bank account via Stripe. It takes 2 minutes. Tips go directly to your account — no waiting, no middleman." },
  { n: "04", title: "Share your QR code",           desc: "Download your QR code and ask your restaurant to print it on menus, receipts, or table cards. Diners scan and tip in seconds." },
  { n: "05", title: "Post recipes & updates",       desc: "Share kitchen secrets, recipes, and behind-the-scenes updates. Your supporters see everything you post." },
  { n: "06", title: "Get tipped directly",          desc: "Every tip goes straight to your Stripe account. You keep 95%. No app needed for the diner — just a phone camera." },
];

export default function TutorialPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#0a0908", minHeight: "100vh", color: "#FAF8F4" }}>

        {/* ── Hero ── */}
        <section style={{ paddingTop: "80px", paddingBottom: "60px", textAlign: "center" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 20px" }}>

            <p style={{
              fontFamily: "-apple-system, system-ui",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: "16px",
            }}>
              Tutorial
            </p>

            <h1 style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 400,
              color: "#FAF8F4",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}>
              How to Set Up Tip a Chef<br />
              <span style={{ color: "#C9A96E", fontStyle: "italic" }}>and Start Getting Tipped</span>
            </h1>

            <p style={{
              fontFamily: "-apple-system, system-ui",
              fontSize: "16px",
              color: "rgba(250,248,244,0.45)",
              lineHeight: 1.7,
              marginBottom: "36px",
              maxWidth: "520px",
              margin: "0 auto 36px",
            }}>
              Watch this step-by-step video tutorial. From signup to your first tip — the full setup takes under 10 minutes.
            </p>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/signup"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: "linear-gradient(135deg,#D4B878 0%,#C9A96E 55%,#B8934A 100%)",
                  color: "#1a1208",
                  borderRadius: "100px",
                  padding: "13px 28px",
                  textDecoration: "none",
                  fontFamily: "-apple-system, system-ui",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.01em",
                  boxShadow: "0 6px 24px rgba(201,169,110,0.32)",
                }}
              >
                Create your free page →
              </Link>
              <Link
                href="/for-chefs"
                style={{
                  display: "inline-flex", alignItems: "center",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(250,248,244,0.6)",
                  borderRadius: "100px",
                  padding: "13px 28px",
                  textDecoration: "none",
                  fontFamily: "-apple-system, system-ui",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>

        {/* ── Video ── */}
        <section style={{ padding: "0 20px 80px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{
              borderRadius: "24px",
              overflow: "hidden",
              border: "2px solid rgba(201,169,110,0.2)",
              boxShadow:
                "6px 6px 0 rgba(201,169,110,0.08), " +
                "0 40px 80px rgba(0,0,0,0.7), " +
                "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}>
              <div style={{ position: "relative", paddingBottom: "51.54%", height: 0 }}>
                <iframe
                  src="https://www.youtube.com/embed/addTwea4JFc?rel=0&modestbranding=1&color=white"
                  title="Tip a Chef Tutorial | How to Setup & Use Tip a Chef to Get Donations"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute", top: 0, left: 0,
                    width: "100%", height: "100%",
                    border: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Steps ── */}
        <section style={{ padding: "0 20px 80px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>

            <p style={{
              fontFamily: "-apple-system, system-ui",
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#C9A96E", marginBottom: "16px", textAlign: "center",
            }}>
              What you&apos;ll learn
            </p>
            <h2 style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 400, color: "#FAF8F4",
              letterSpacing: "-0.02em", textAlign: "center",
              marginBottom: "48px",
            }}>
              Six steps to your first tip
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  style={{
                    display: "flex", gap: "20px", alignItems: "flex-start",
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "18px",
                    padding: "20px 22px",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.5rem", fontWeight: 400,
                    color: "rgba(201,169,110,0.4)",
                    lineHeight: 1, flexShrink: 0, minWidth: "32px",
                  }}>
                    {s.n}
                  </span>
                  <div>
                    <p style={{
                      fontFamily: "-apple-system, system-ui",
                      fontSize: "14px", fontWeight: 700,
                      color: "rgba(250,248,244,0.85)",
                      margin: "0 0 5px",
                    }}>
                      {s.title}
                    </p>
                    <p style={{
                      fontFamily: "-apple-system, system-ui",
                      fontSize: "13px", color: "rgba(250,248,244,0.35)",
                      margin: 0, lineHeight: 1.6,
                    }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: "0 20px 80px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>

            <h2 style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 400, color: "#FAF8F4",
              letterSpacing: "-0.02em", textAlign: "center",
              marginBottom: "40px",
            }}>
              Common questions
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { q: "Is it free to join?",                   a: "Yes. Creating your chef profile is completely free. Tip a Chef takes 5% of each tip received. You keep 95%." },
                { q: "Do diners need to create an account?",  a: "No. Diners scan the QR code, choose an amount, and pay with any card via Stripe. No app, no signup, no friction." },
                { q: "How quickly do I receive my tips?",     a: "Tips go directly to your connected Stripe account. Stripe pays out to your bank account on the schedule you choose — daily, weekly, or monthly." },
                { q: "Can I use this outside my restaurant?", a: "Yes. Your profile link works anywhere — Instagram bio, WhatsApp, receipts, table cards, your restaurant website. Anyone with the link can tip you." },
                { q: "What is the Kitchen Secret?",           a: "A personal message, recipe, or technique that tippers see the moment their payment completes. It makes the tip feel special and gives something back." },
              ].map((f) => (
                <div
                  key={f.q}
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px",
                    padding: "18px 20px",
                  }}
                >
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13.5px", fontWeight: 700, color: "rgba(250,248,244,0.85)", margin: "0 0 7px" }}>
                    {f.q}
                  </p>
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", color: "rgba(250,248,244,0.35)", margin: 0, lineHeight: 1.6 }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: "0 20px 100px", textAlign: "center" }}>
          <div style={{ maxWidth: "520px", margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 400, color: "#FAF8F4",
              letterSpacing: "-0.02em", marginBottom: "16px",
            }}>
              Ready to get tipped?
            </h2>
            <p style={{
              fontFamily: "-apple-system, system-ui",
              fontSize: "15px", color: "rgba(250,248,244,0.4)",
              marginBottom: "32px", lineHeight: 1.6,
            }}>
              Your page is free. Setup takes under 10 minutes. Your first tip could come today.
            </p>
            <Link
              href="/signup"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "linear-gradient(135deg,#D4B878 0%,#C9A96E 55%,#B8934A 100%)",
                color: "#1a1208",
                borderRadius: "100px",
                padding: "15px 36px",
                textDecoration: "none",
                fontFamily: "-apple-system, system-ui",
                fontSize: "15px", fontWeight: 700,
                letterSpacing: "0.01em",
                boxShadow: "0 8px 32px rgba(201,169,110,0.35)",
              }}
            >
              Create your free page →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
