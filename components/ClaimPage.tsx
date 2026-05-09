"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

function qrUrl(slug: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://tipachef.com/${slug}`)}&bgcolor=F5EDD8&color=1a1208&margin=14&qzone=1`;
}

export default function ClaimPage() {
  const [handle,  setHandle]  = useState("");
  const [qrSlug,  setQrSlug]  = useState("");
  const [qrReady, setQrReady] = useState(false);
  const router     = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── scroll-in animation ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(36px)";
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

  /* ── debounce QR update so we don't fire on every keystroke ── */
  useEffect(() => {
    const slug = handle.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (slug.length < 2) {
      setQrSlug("");
      setQrReady(false);
      return;
    }
    debounceRef.current = setTimeout(() => {
      setQrReady(false);
      setQrSlug(slug);
    }, 400);
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
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#0a0908" }}
    >
      {/* Ambient ember glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: "800px", height: "500px",
          background: "radial-gradient(ellipse at center, rgba(201,169,110,0.09) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <div ref={sectionRef} className="content-container relative">

        {/* ── Two-column layout ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "3rem",
          alignItems: "center",
          maxWidth: "780px",
          margin: "0 auto",
        }}
          className="sm:grid-cols-[1fr_auto] grid-cols-1"
        >

          {/* ── LEFT: heading + input ── */}
          <div>
            <h2
              className="font-display text-ivory leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", fontWeight: 400 }}
            >
              The meal was yours.<br />
              <span
                className="italic"
                style={{
                  background: "linear-gradient(135deg,#C9A96E 0%,#E8C97A 50%,#C9A96E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                The tip should be too.
              </span>
            </h2>

            {/* URL claim input */}
            <form
              onSubmit={handleClaim}
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "2px solid rgba(201,169,110,0.25)",
                borderRadius: "100px",
                padding: "6px 6px 6px 22px",
                boxShadow:
                  "5px 5px 0 rgba(201,169,110,0.08), " +
                  "0 16px 48px rgba(0,0,0,0.45), " +
                  "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <span
                style={{
                  fontFamily: "-apple-system,system-ui",
                  fontSize: "14px",
                  color: "rgba(250,248,244,0.35)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
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
                style={{
                  flex: 1,
                  background: "transparent",
                  outline: "none",
                  fontFamily: "-apple-system,system-ui",
                  fontSize: "14px",
                  color: "#C9A96E",
                  caretColor: "#C9A96E",
                  minWidth: 0,
                  padding: "0 8px",
                }}
              />
              <button
                type="submit"
                style={{
                  flexShrink: 0,
                  background: "linear-gradient(135deg,#D4B878 0%,#C9A96E 60%,#B8934A 100%)",
                  color: "#1a1208",
                  borderRadius: "100px",
                  padding: "11px 24px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "-apple-system,system-ui",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.02em",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 16px rgba(201,169,110,0.3)",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
              >
                Claim your page →
              </button>
            </form>

            <p style={{
              fontFamily: "-apple-system,system-ui",
              fontSize: "12px",
              color: "rgba(250,248,244,0.22)",
              marginTop: "14px",
              paddingLeft: "4px",
            }}>
              Free forever · QR code included · No restaurant cut
            </p>
          </div>

          {/* ── RIGHT: live QR preview ── */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}
            className="hidden sm:flex"
          >
            {/* QR card */}
            <div style={{
              width: "172px",
              borderRadius: "22px",
              background: "rgba(20,18,14,0.8)",
              backdropFilter: "blur(20px)",
              border: "1.5px solid rgba(201,169,110,0.22)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6), 6px 6px 0 rgba(201,169,110,0.08)",
              padding: "16px 16px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              transition: "box-shadow 0.3s ease",
            }}>
              {/* QR image area */}
              <div style={{
                width: "136px", height: "136px",
                borderRadius: "14px",
                background: "#F5EDD8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 4px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}>
                {qrSlug ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={qrSlug}
                    src={qrUrl(qrSlug)}
                    alt={`QR code for tipachef.com/${qrSlug}`}
                    width={136}
                    height={136}
                    onLoad={() => setQrReady(true)}
                    style={{
                      display: "block",
                      borderRadius: "8px",
                      opacity: qrReady ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                  />
                ) : (
                  /* Placeholder grid when no handle typed */
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "4px", padding: "10px" }}>
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: "16px", height: "16px", borderRadius: "3px",
                          background: [0,1,5,6,10,14,18,19,23,24].includes(i)
                            ? "rgba(201,169,110,0.25)"
                            : "rgba(201,169,110,0.08)",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* URL label */}
              <p style={{
                fontFamily: "-apple-system,system-ui",
                fontSize: "10px",
                color: qrSlug ? "#C9A96E" : "rgba(250,248,244,0.25)",
                letterSpacing: "0.02em",
                textAlign: "center",
                transition: "color 0.3s ease",
              }}>
                tipachef.com/<span style={{ fontWeight: 700 }}>{displaySlug}</span>
              </p>

              {/* Scan hint */}
              <p style={{
                fontFamily: "-apple-system,system-ui",
                fontSize: "9px",
                color: "rgba(250,248,244,0.2)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}>
                {qrSlug ? "Your QR code" : "Type your name ↑"}
              </p>
            </div>

            {/* Animated indicator */}
            {qrSlug && qrReady && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                animation: "fadeIn 0.4s ease",
              }}>
                <div style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 6px rgba(74,222,128,0.7)",
                  animation: "pulse 2s infinite",
                }} />
                <span style={{
                  fontFamily: "-apple-system,system-ui",
                  fontSize: "10px",
                  color: "rgba(250,248,244,0.35)",
                  letterSpacing: "0.04em",
                }}>
                  Ready to print
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
        @keyframes fadeIn {
          from { opacity:0; transform:translateY(6px); }
          to { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </section>
  );
}
