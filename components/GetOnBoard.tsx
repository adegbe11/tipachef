"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

function qrUrl(slug: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    `https://tipachef.com/${slug}`
  )}&bgcolor=F5EDD8&color=1a1208&margin=14&qzone=1`;
}

export default function GetOnBoard() {
  const [handle,  setHandle]  = useState("");
  const [qrSlug,  setQrSlug]  = useState("");
  const [qrReady, setQrReady] = useState(false);
  const router      = useRouter();
  const sectionRef  = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── scroll-in ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "opacity 0.85s ease, transform 0.85s ease";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── debounced QR update ── */
  useEffect(() => {
    const slug = handle.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (slug.length < 2) { setQrSlug(""); setQrReady(false); return; }
    debounceRef.current = setTimeout(() => {
      setQrReady(false);
      setQrSlug(slug);
    }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [handle]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slug = handle.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (slug) router.push(`/signup?handle=${slug}`);
  }

  const displaySlug = handle.trim().toLowerCase().replace(/[^a-z0-9-]/g, "") || "yourname";

  return (
    <section
      style={{
        background: "linear-gradient(180deg,#0a0908 0%,#0d0c0a 100%)",
        paddingTop: "5rem",
        paddingBottom: "6rem",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* top ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%", top: "0",
          transform: "translateX(-50%)",
          width: "900px", height: "400px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.08) 0%, transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div ref={sectionRef} className="content-container relative" style={{ textAlign: "center" }}>

        {/* Eyebrow */}
        <p className="eyebrow mb-5">For chefs</p>

        {/* Headline */}
        <h2
          className="font-display text-ivory"
          style={{
            fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          Claim your{" "}
          <em
            style={{
              fontStyle: "italic",
              background: "linear-gradient(90deg,#C9A96E,#E8C97A,#C9A96E)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            page.
          </em>
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "-apple-system,system-ui",
            fontSize: "1.05rem",
            color: "rgba(250,248,244,0.45)",
            marginBottom: "2.5rem",
            lineHeight: 1.7,
          }}
        >
          Type your name and watch your QR code generate instantly.
        </p>

        {/* ── URL input ── */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "540px",
            margin: "0 auto",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "2px solid rgba(201,169,110,0.28)",
            borderRadius: "100px",
            padding: "7px 7px 7px 24px",
            boxShadow:
              "0 0 0 6px rgba(201,169,110,0.04), " +
              "0 20px 60px rgba(0,0,0,0.5), " +
              "inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          <span
            style={{
              fontFamily: "-apple-system,system-ui",
              fontSize: "15px",
              color: "rgba(250,248,244,0.3)",
              whiteSpace: "nowrap",
              flexShrink: 0,
              letterSpacing: "0.01em",
            }}
          >
            tipachef.com/
          </span>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="yourname"
            maxLength={30}
            autoComplete="off"
            style={{
              flex: 1,
              background: "transparent",
              outline: "none",
              border: "none",
              fontFamily: "-apple-system,system-ui",
              fontSize: "15px",
              color: "#C9A96E",
              caretColor: "#C9A96E",
              padding: "0 10px",
              minWidth: 0,
              letterSpacing: "0.01em",
            }}
          />
          <button
            type="submit"
            style={{
              flexShrink: 0,
              background: "linear-gradient(135deg,#D4B878 0%,#C9A96E 55%,#B8934A 100%)",
              color: "#1a1208",
              borderRadius: "100px",
              padding: "13px 28px",
              border: "none",
              cursor: "pointer",
              fontFamily: "-apple-system,system-ui",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.03em",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.28), 0 6px 20px rgba(201,169,110,0.3)",
              transition: "opacity 0.2s, transform 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            Get on board →
          </button>
        </form>

        {/* ── QR card — slides in when handle typed ── */}
        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            justifyContent: "center",
            minHeight: "220px",
          }}
        >
          <div
            style={{
              opacity: qrSlug ? 1 : 0,
              transform: qrSlug ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
              transition: "opacity 0.45s ease, transform 0.45s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
            }}
          >
            {/* Card */}
            <div
              style={{
                width: "190px",
                borderRadius: "26px",
                background: "rgba(18,16,12,0.85)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1.5px solid rgba(201,169,110,0.25)",
                boxShadow:
                  "0 40px 80px rgba(0,0,0,0.65), " +
                  "0 16px 40px rgba(0,0,0,0.4), " +
                  "6px 6px 0 rgba(201,169,110,0.07), " +
                  "inset 0 1px 0 rgba(255,255,255,0.06)",
                padding: "18px 18px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {/* QR image */}
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "16px",
                  background: "#F5EDD8",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
              >
                {qrSlug && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={qrSlug}
                    src={qrUrl(qrSlug)}
                    alt={`tipachef.com/${qrSlug}`}
                    width={150}
                    height={150}
                    onLoad={() => setQrReady(true)}
                    style={{
                      display: "block",
                      opacity: qrReady ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                  />
                )}
              </div>

              {/* URL */}
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "-apple-system,system-ui",
                    fontSize: "11px",
                    color: "rgba(250,248,244,0.3)",
                    margin: "0 0 2px",
                    letterSpacing: "0.02em",
                  }}
                >
                  tipachef.com/
                </p>
                <p
                  style={{
                    fontFamily: "Georgia,serif",
                    fontStyle: "italic",
                    fontSize: "15px",
                    color: "#C9A96E",
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {displaySlug}
                </p>
              </div>

              {/* Scan hint */}
              <p
                style={{
                  fontFamily: "-apple-system,system-ui",
                  fontSize: "9px",
                  color: "rgba(250,248,244,0.18)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                🔒 Scannable · No app needed
              </p>
            </div>

            {/* Ready indicator */}
            {qrReady && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  animation: "fadeUp 0.4s ease",
                }}
              >
                <div
                  style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: "#4ade80",
                    boxShadow: "0 0 8px rgba(74,222,128,0.7)",
                    animation: "pulse 2s infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "-apple-system,system-ui",
                    fontSize: "11px",
                    color: "rgba(250,248,244,0.4)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Your QR is ready to print
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Fine print */}
        <p
          style={{
            fontFamily: "-apple-system,system-ui",
            fontSize: "12px",
            color: "rgba(250,248,244,0.18)",
            marginTop: "1.5rem",
          }}
        >
          Free forever · No credit card · Profile live in 5 minutes
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.5; transform:scale(1.3); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </section>
  );
}
