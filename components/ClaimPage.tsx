"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

function qrUrl(slug: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `https://tipachef.com/${slug}`
  )}&bgcolor=F5EDD8&color=1a1208&margin=14&qzone=1`;
}

export default function ClaimPage() {
  const [handle,  setHandle]  = useState("");
  const [qrSlug,  setQrSlug]  = useState("");
  const [qrReady, setQrReady] = useState(false);
  const router      = useRouter();
  const sectionRef  = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* scroll-in */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = "opacity 0.9s ease, transform 0.9s ease";
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.unobserve(el);
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* debounced QR */
  useEffect(() => {
    const slug = handle.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (slug.length < 2) { setQrSlug(""); setQrReady(false); return; }
    debounceRef.current = setTimeout(() => { setQrReady(false); setQrSlug(slug); }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [handle]);

  function handleClaim(e: React.FormEvent) {
    e.preventDefault();
    const slug = handle.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (slug) router.push(`/signup?handle=${slug}`);
  }

  const displaySlug = handle.trim().toLowerCase().replace(/[^a-z0-9-]/g, "") || "yourname";

  return (
    <section
      style={{ background: "#0a0908", paddingTop: "6rem", paddingBottom: "7rem", position: "relative", overflow: "hidden" }}
    >
      {/* ambient glow */}
      <div aria-hidden style={{
        position: "absolute", left: "50%", top: "40%",
        transform: "translate(-50%,-50%)",
        width: "700px", height: "400px",
        background: "radial-gradient(ellipse at center, rgba(201,169,110,0.09) 0%, transparent 70%)",
        filter: "blur(70px)", pointerEvents: "none",
      }} />

      <div ref={sectionRef} className="content-container relative" style={{ textAlign: "center" }}>

        {/* ── Headline ── */}
        <h2
          className="font-display text-ivory"
          style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)", fontWeight: 400, lineHeight: 1.08, marginBottom: "0.6rem" }}
        >
          The meal was yours.
        </h2>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)", fontWeight: 400, lineHeight: 1.08,
            marginBottom: "1.25rem",
            fontStyle: "italic",
            background: "linear-gradient(90deg,#C9A96E,#E8C97A,#C9A96E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          The tip should be too.
        </h2>

        {/* subtitle */}
        <p style={{
          fontFamily: "-apple-system,system-ui",
          fontSize: "1.05rem",
          color: "rgba(250,248,244,0.4)",
          marginBottom: "2.5rem",
          lineHeight: 1.7,
        }}>
          Claim your free profile and get your QR code in minutes.
        </p>

        {/* ── URL input ── */}
        <form
          onSubmit={handleClaim}
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "560px",
            margin: "0 auto 1rem",
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
          <span style={{
            fontFamily: "-apple-system,system-ui",
            fontSize: "15px",
            color: "rgba(250,248,244,0.3)",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}>
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
              whiteSpace: "nowrap",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.28), 0 6px 20px rgba(201,169,110,0.3)",
              transition: "opacity 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          >
            Claim your page →
          </button>
        </form>


        {/* ── QR card — slides down when handle typed ── */}
        <div style={{ display: "flex", justifyContent: "center", minHeight: "240px" }}>
          <div style={{
            opacity: qrSlug ? 1 : 0,
            transform: qrSlug ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            transition: "opacity 0.45s ease, transform 0.45s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
          }}>

            {/* Card */}
            <div style={{
              width: "200px",
              borderRadius: "28px",
              background: "rgba(18,16,12,0.9)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1.5px solid rgba(201,169,110,0.25)",
              boxShadow:
                "0 40px 80px rgba(0,0,0,0.6), " +
                "6px 6px 0 rgba(201,169,110,0.07), " +
                "inset 0 1px 0 rgba(255,255,255,0.06)",
              padding: "20px 18px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}>

              {/* QR image */}
              <div style={{
                width: "156px", height: "156px",
                borderRadius: "16px",
                background: "#F5EDD8",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.7)",
              }}>
                {qrSlug && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={qrSlug}
                    src={qrUrl(qrSlug)}
                    alt={`tipachef.com/${qrSlug}`}
                    width={156}
                    height={156}
                    onLoad={() => setQrReady(true)}
                    style={{ display: "block", opacity: qrReady ? 1 : 0, transition: "opacity 0.4s ease" }}
                  />
                )}
              </div>

              {/* Name under QR */}
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", color: "rgba(250,248,244,0.25)", margin: "0 0 2px", letterSpacing: "0.02em" }}>
                  tipachef.com/
                </p>
                <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "16px", color: "#C9A96E", margin: 0, fontWeight: 500 }}>
                  {displaySlug}
                </p>
              </div>

              {/* Scan badge */}
              <div style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "20px",
                padding: "5px 12px",
              }}>
                <div style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 6px rgba(74,222,128,0.7)",
                  animation: "pulse 2s infinite",
                }} />
                <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>
                  Scan · No app needed
                </span>
              </div>
            </div>

            {/* Ready indicator */}
            {qrReady && (
              <div style={{ display: "flex", alignItems: "center", gap: "7px", animation: "fadeUp 0.4s ease" }}>
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 8px rgba(74,222,128,0.7)",
                  animation: "pulse 2s infinite",
                }} />
                <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", color: "rgba(250,248,244,0.38)", letterSpacing: "0.04em" }}>
                  Your QR is ready to print
                </span>
              </div>
            )}
          </div>
        </div>

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
