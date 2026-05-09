"use client";

import Image from "next/image";
import Link  from "next/link";
import { useEffect, useRef } from "react";

const QR_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Ftipachef.com%2Fmarco-esposito&bgcolor=F5EDD8&color=1a1208&margin=12&qzone=1";

const CHEF = {
  name:     "Marco Esposito",
  role:     "Head Chef · Il Forno, Rome",
  location: "Rome, Italy",
  flag:     "🇮🇹",
  bio:      "Fifteen years on the pass. Three Michelin stars along the way. Now I cook what I want, for people who care.",
  photo:    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80",
  tips:     "1,240",
  slug:     "marco-esposito",
};

export default function ProfileQRShowcase() {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: leftRef.current,  from: "translateX(-36px)" },
      { el: rightRef.current, from: "translateX(36px)"  },
    ];
    items.forEach(({ el, from }) => {
      if (!el) return;
      el.style.opacity   = "0";
      el.style.transform = from;
      el.style.transition = "opacity 0.85s ease, transform 0.85s ease";
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          el.style.opacity   = "1";
          el.style.transform = "translate(0)";
          obs.unobserve(el);
        }
      }, { threshold: 0.2 });
      obs.observe(el);
    });
  }, []);

  return (
    <section
      style={{
        background: "linear-gradient(180deg,#0d0c0a 0%,#100f0c 100%)",
        paddingTop: "5rem",
        paddingBottom: "6rem",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: "800px", height: "500px",
          background: "radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, transparent 65%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <div className="content-container relative">
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="eyebrow mb-4">What you get</p>
          <h2
            className="font-display text-ivory"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)", fontWeight: 400, lineHeight: 1.12 }}
          >
            Your profile.{" "}
            <em
              style={{
                fontStyle: "italic",
                background: "linear-gradient(90deg,#C9A96E,#E8C97A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your QR code.
            </em>
          </h2>
          <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.95rem", color: "rgba(250,248,244,0.4)", marginTop: "0.75rem" }}>
            One profile. One code. Diners scan. Tips land directly with you.
          </p>
        </div>

        {/* Two-column: profile card + QR */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            maxWidth: "780px",
            margin: "0 auto",
            alignItems: "center",
          }}
        >

          {/* ── LEFT: chef profile card ── */}
          <div ref={leftRef} style={{ display: "flex", justifyContent: "center" }}>
            <Link href={`/${CHEF.slug}`} style={{ textDecoration: "none", display: "block", width: "100%", maxWidth: "340px" }}>
              <div
                style={{
                  borderRadius: "28px",
                  overflow: "hidden",
                  position: "relative",
                  aspectRatio: "3/4",
                  boxShadow:
                    "0 40px 80px rgba(0,0,0,0.7), " +
                    "0 16px 40px rgba(0,0,0,0.5), " +
                    "0 0 0 1.5px rgba(255,255,255,0.07), " +
                    "6px 6px 0 rgba(201,169,110,0.08)",
                  cursor: "pointer",
                  transition: "transform 0.35s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {/* Photo */}
                <Image
                  src={CHEF.photo}
                  alt={CHEF.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  unoptimized
                />

                {/* Gradient overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0) 35%, rgba(0,0,0,0.92) 100%)" }} />

                {/* Location badge */}
                <div
                  style={{
                    position: "absolute", top: "14px", left: "14px",
                    display: "flex", alignItems: "center", gap: "6px",
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "20px",
                    padding: "4px 10px 4px 6px",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>{CHEF.flag}</span>
                  <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "10px", color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
                    {CHEF.location}
                  </span>
                </div>

                {/* Bottom info */}
                <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px" }}>
                  <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "22px", fontWeight: 500, color: "#C9A96E", margin: "0 0 4px" }}>
                    {CHEF.name}
                  </p>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: "0 0 10px" }}>
                    {CHEF.role}
                  </p>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", color: "rgba(255,255,255,0.38)", margin: "0 0 14px", lineHeight: 1.6 }}>
                    {CHEF.bio}
                  </p>

                  {/* Tips row */}
                  <div
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: "rgba(255,255,255,0.07)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(201,169,110,0.2)",
                      borderRadius: "40px",
                      padding: "8px 14px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg,#C9A96E,#D4B878)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="11" height="10" viewBox="0 0 14 12" fill="#1a1208"><path d="M7 11C7 11 0.5 7 0.5 3.5C0.5 1.8 1.8 0.5 3.5 0.5C5 0.5 6.2 1.4 7 2.5C7.8 1.4 9 0.5 10.5 0.5C12.2 0.5 13.5 1.8 13.5 3.5C13.5 7 7 11 7 11Z" /></svg>
                      </div>
                      <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", fontWeight: 700, color: "rgba(250,248,244,0.85)" }}>
                        {CHEF.tips} tips received
                      </span>
                    </div>
                    <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", fontWeight: 600, color: "#C9A96E" }}>
                      Tip now →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* ── RIGHT: QR code card ── */}
          <div ref={rightRef} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>

              {/* QR card */}
              <div
                style={{
                  width: "220px",
                  borderRadius: "28px",
                  background: "rgba(18,16,12,0.9)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1.5px solid rgba(201,169,110,0.25)",
                  boxShadow:
                    "0 40px 80px rgba(0,0,0,0.6), " +
                    "6px 6px 0 rgba(201,169,110,0.08), " +
                    "inset 0 1px 0 rgba(255,255,255,0.06)",
                  padding: "24px 20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                {/* "Tonight's menu" label */}
                <p
                  style={{
                    fontFamily: "Georgia,serif",
                    fontStyle: "italic",
                    fontSize: "13px",
                    color: "#C9A96E",
                    margin: 0,
                    letterSpacing: "0.03em",
                    opacity: 0.8,
                  }}
                >
                  Tonight&apos;s menu
                </p>

                {/* QR image */}
                <div
                  style={{
                    width: "160px", height: "160px",
                    borderRadius: "18px",
                    background: "#F5EDD8",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.7)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={QR_URL}
                    alt="Tip Marco — scan to tip"
                    width={160}
                    height={160}
                    style={{ display: "block", borderRadius: "10px" }}
                  />
                </div>

                {/* Chef name under QR */}
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "16px", color: "#C9A96E", margin: "0 0 2px", fontWeight: 500 }}>
                    {CHEF.name}
                  </p>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "10px", color: "rgba(250,248,244,0.3)", margin: 0, letterSpacing: "0.04em" }}>
                    tipachef.com/{CHEF.slug}
                  </p>
                </div>

                {/* Tap to tip hint */}
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "20px",
                    padding: "5px 12px",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.7)", animation: "pulse 2s infinite" }} />
                  <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>
                    Scan to tip · No app needed
                  </span>
                </div>
              </div>

              {/* Bullet points */}
              <div style={{ display: "grid", gap: "10px", width: "220px" }}>
                {[
                  { icon: "⚡", text: "QR ready the moment you sign up" },
                  { icon: "🖨️", text: "Print-ready PNG or PDF included" },
                  { icon: "💸", text: "100% of every tip goes to you" },
                ].map((b) => (
                  <div key={b.text} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "14px", flexShrink: 0 }}>{b.icon}</span>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", color: "rgba(250,248,244,0.45)", margin: 0, lineHeight: 1.5 }}>
                      {b.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(1.4); }
        }
      `}</style>
    </section>
  );
}
