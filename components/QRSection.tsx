"use client";

import Image from "next/image";
import Link  from "next/link";
import { useState, useEffect, useRef } from "react";

const QR_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https%3A%2F%2Ftipachef.com%2Fmarco&bgcolor=F5EDD8&color=1a1208&margin=10&qzone=1";

export default function QRSection() {
  const [tipped, setTipped] = useState(false);
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [
      { el: leftRef.current,  dir: "translateX(-40px)" },
      { el: rightRef.current, dir: "translateX(40px)"  },
    ].forEach(({ el, dir }) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = dir;
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translate(0)";
          obs.unobserve(el);
        }
      }, { threshold: 0.2 });
      obs.observe(el);
    });
  }, []);

  return (
    <section
      className="py-14 md:py-20"
      style={{ background: "linear-gradient(180deg,#0d0c0a 0%,#100f0c 100%)" }}
    >
      <div className="content-container grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* ── Left: physical menu card mockup ── */}
        <div ref={leftRef} className="flex justify-center lg:justify-start">
          <div className="relative" style={{ perspective: "1000px" }}>

            {/* Soft amber glow */}
            <div
              style={{
                position: "absolute",
                inset: "-60px",
                background:
                  "radial-gradient(ellipse 65% 55% at 46% 52%, rgba(201,169,110,0.16) 0%, transparent 70%)",
                filter: "blur(50px)",
                pointerEvents: "none",
              }}
            />

            {/* Menu card — neo-glass brutal */}
            <div
              style={{
                position: "relative",
                width: "280px",
                borderRadius: "24px",
                background: "rgba(20,18,14,0.75)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "2px solid rgba(201,169,110,0.22)",
                boxShadow:
                  "6px 6px 0 rgba(201,169,110,0.1), " +
                  "0 40px 80px rgba(0,0,0,0.65), " +
                  "0 16px 40px rgba(0,0,0,0.45), " +
                  "inset 0 1px 0 rgba(255,255,255,0.07)",
                padding: "28px 24px 22px",
                transform: "perspective(1000px) rotateY(5deg) rotateX(-1deg)",
              }}
            >
              {/* Tonight's menu header */}
              <p
                style={{
                  fontFamily: "Georgia,'Times New Roman',serif",
                  fontStyle: "italic",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#C9A96E",
                  textAlign: "center",
                  marginBottom: "18px",
                  letterSpacing: "0.02em",
                }}
              >
                Tonight&apos;s menu
              </p>

              {/* QR code card */}
              <div
                style={{
                  borderRadius: "18px",
                  background: "#F5EDD8",
                  padding: "14px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow:
                    "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
                  marginBottom: "14px",
                }}
              >
                <Image
                  src={QR_URL}
                  alt="Tip a Chef QR code"
                  width={136}
                  height={136}
                  unoptimized
                  style={{ borderRadius: "8px", display: "block" }}
                />
                <p
                  style={{
                    fontFamily: "-apple-system,BlinkMacSystemFont,system-ui",
                    fontSize: "10.5px",
                    fontWeight: 500,
                    color: "#6b5d47",
                    letterSpacing: "0.02em",
                  }}
                >
                  Tap to tip your chef
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "14px" }} />

              {/* Tip notification toast */}
              <button
                onClick={() => setTipped(!tipped)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  borderRadius: "14px",
                  padding: "12px 14px",
                  background: tipped
                    ? "linear-gradient(135deg,rgba(201,169,110,0.18) 0%,rgba(201,169,110,0.08) 100%)"
                    : "rgba(255,255,255,0.05)",
                  border: tipped
                    ? "1px solid rgba(201,169,110,0.3)"
                    : "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  textAlign: "left",
                }}
              >
                {/* Heart icon */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg,#C9A96E,#D4B878)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 12px rgba(201,169,110,0.35)",
                  }}
                >
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="#1a1208">
                    <path d="M8 12.5 C8 12.5 1 8.2 1 4.5 C1 2.5 2.5 1 4.5 1 C6 1 7.2 1.9 8 3 C8.8 1.9 10 1 11.5 1 C13.5 1 15 2.5 15 4.5 C15 8.2 8 12.5 8 12.5Z"/>
                  </svg>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "-apple-system,system-ui",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: tipped ? "#C9A96E" : "rgba(250,248,244,0.85)",
                      margin: 0,
                      marginBottom: "2px",
                    }}
                  >
                    {tipped ? "$30 tip from Table 4" : "$25 tip from Table 7"}
                  </p>
                  <p
                    style={{
                      fontFamily: "-apple-system,system-ui",
                      fontSize: "10.5px",
                      color: "rgba(250,248,244,0.38)",
                      margin: 0,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {tipped ? "The risotto was incredible." : `"Best carbonara I've ever had."`}
                  </p>
                </div>

                {/* Live dot */}
                <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                  <div
                    style={{
                      width: "7px", height: "7px", borderRadius: "50%",
                      background: "#4ade80",
                      boxShadow: "0 0 6px rgba(74,222,128,0.7)",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  <span style={{ fontSize: "9px", fontFamily: "-apple-system,system-ui", color: "rgba(255,255,255,0.3)", letterSpacing: "0.03em" }}>LIVE</span>
                </div>
              </button>

              {/* Subtle bottom hint */}
              <p style={{ textAlign: "center", fontFamily: "-apple-system,system-ui", fontSize: "9px", color: "rgba(255,255,255,0.15)", marginTop: "10px", letterSpacing: "0.04em" }}>
                🔒 Secured by Stripe · No app needed
              </p>
            </div>

          </div>
        </div>

        {/* ── Right: copy ── */}
        <div ref={rightRef}>
          <p className="eyebrow mb-5">Your QR code</p>
          <h2
            className="font-display text-ivory leading-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 300 }}
          >
            On the menu.<br />
            In your bio.<br />
            <span className="text-ember-gradient italic">Everywhere.</span>
          </h2>
          <p className="font-sans text-ivory/45 text-sm leading-relaxed font-light mb-10 max-w-sm">
            We generate your QR code instantly. Your restaurant prints it on the
            menu. Diners scan and tip in seconds.
          </p>

          {/* Feature bullets */}
          <div className="space-y-4 mb-10">
            {[
              { icon: "⚡", title: "Instant generation", desc: "Your unique QR is ready the moment you sign up." },
              { icon: "🖨️", title: "Print-ready file", desc: "Download a hi-res PNG or PDF. Drop it on the menu." },
              { icon: "📱", title: "Works on any device", desc: "Diners scan with their camera. No app required." },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span
                  style={{
                    width: "34px", height: "34px", borderRadius: "10px",
                    background: "rgba(201,169,110,0.1)",
                    border: "1px solid rgba(201,169,110,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "15px", flexShrink: 0,
                  }}
                >
                  {f.icon}
                </span>
                <div>
                  <p className="font-sans text-ivory/80 text-sm font-semibold mb-0.5">{f.title}</p>
                  <p className="font-sans text-ivory/35 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/signup"
            className="font-sans text-ember text-sm hover:text-ember-light transition-colors"
          >
            Get your QR code →
          </Link>
        </div>

      </div>

      {/* Pulse animation for live dot */}
      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1);   }
          50%      { opacity:0.5; transform:scale(1.3); }
        }
      `}</style>
    </section>
  );
}
