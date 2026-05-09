"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

function qrUrl(slug: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `https://tipachef.com/${slug}`
  )}&bgcolor=F5EDD8&color=1a1208&margin=14&qzone=1`;
}

export default function GetOnBoard() {
  const [handle,  setHandle]  = useState("");
  const [qrSlug,  setQrSlug]  = useState("");
  const [qrReady, setQrReady] = useState(false);
  const router      = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* load default QR on mount */
  useEffect(() => { setQrReady(false); }, []);

  /* debounced QR update */
  useEffect(() => {
    const slug = handle.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (slug.length < 2) { setQrSlug(""); setQrReady(false); return; }
    debounceRef.current = setTimeout(() => { setQrReady(false); setQrSlug(slug); }, 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [handle]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slug = handle.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (slug) router.push(`/signup?handle=${slug}`);
  }

  const displaySlug  = handle.trim().toLowerCase().replace(/[^a-z0-9-]/g, "") || "yourname";
  const activeSlug   = qrSlug || "yourname"; // always show a QR

  return (
    <section style={{
      background: "#0d0c0a",
      paddingTop: "3rem",
      paddingBottom: "3.5rem",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* glow */}
      <div aria-hidden style={{
        position: "absolute", left: "50%", top: "0",
        transform: "translateX(-50%)",
        width: "800px", height: "360px",
        background: "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.1) 0%, transparent 65%)",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      <div className="content-container relative" style={{ textAlign: "center" }}>

        {/* eyebrow */}
        <p className="eyebrow mb-3">For chefs</p>

        {/* headline */}
        <h2 className="font-display text-ivory" style={{
          fontSize: "clamp(2.8rem, 5.5vw, 4.6rem)",
          fontWeight: 400,
          lineHeight: 1.08,
          marginBottom: "0.3rem",
        }}>
          Get on board.
        </h2>

        {/* sub-headline italic gold */}
        <p className="font-display" style={{
          fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "rgba(201,169,110,0.65)",
          marginBottom: "1.25rem",
          lineHeight: 1.5,
        }}>
          Create your page and start receiving direct tips.
        </p>

        {/* URL input */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "560px",
            margin: "0 auto 0.9rem",
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
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
          >
            Join Tip a Chef →
          </button>
        </form>


        {/* QR card — always visible, updates as you type */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            opacity: 1,
            transition: "opacity 0.4s ease, transform 0.4s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}>
            {/* card */}
            <div style={{
              width: "196px",
              borderRadius: "26px",
              background: "rgba(16,14,10,0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1.5px solid rgba(201,169,110,0.24)",
              boxShadow:
                "0 36px 72px rgba(0,0,0,0.65), " +
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
                width: "152px", height: "152px",
                borderRadius: "16px",
                background: "#F5EDD8",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={activeSlug}
                  src={qrUrl(activeSlug)}
                  alt={`tipachef.com/${activeSlug}`}
                  width={152}
                  height={152}
                  onLoad={() => setQrReady(true)}
                  style={{ display: "block", opacity: qrReady ? 1 : 0, transition: "opacity 0.4s ease" }}
                />
              </div>

              {/* URL label */}
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", color: "rgba(250,248,244,0.22)", margin: "0 0 2px" }}>
                  tipachef.com/
                </p>
                <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "16px", color: "#C9A96E", margin: 0, fontWeight: 500, transition: "opacity 0.3s" }}>
                  {displaySlug}
                </p>
              </div>

              {/* scan badge */}
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
                  animation: "gob-pulse 2s infinite",
                }} />
                <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>
                  Scan · No app needed
                </span>
              </div>
            </div>

            {/* ready label */}
            {qrReady && (
              <div style={{ display: "flex", alignItems: "center", gap: "7px", animation: "gob-fadeUp 0.4s ease" }}>
                <div style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "#4ade80", boxShadow: "0 0 7px rgba(74,222,128,0.7)",
                  animation: "gob-pulse 2s infinite",
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
        @keyframes gob-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.45; transform:scale(1.35); }
        }
        @keyframes gob-fadeUp {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </section>
  );
}
