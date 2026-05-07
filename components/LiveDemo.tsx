"use client";

import Link from "next/link";

const TIP_ITEMS = [
  { emoji: "🧂", label: "A pinch of salt", amount: 3 },
  { emoji: "🌿", label: "Fresh herbs",      amount: 5 },
  { emoji: "🍷", label: "Glass of wine",    amount: 10 },
];

/* ── tiny inline SVG icons ── */
const IconSignal = () => (
  <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
    <rect x="0"    y="8"   width="3"   height="4"   rx="0.8" opacity="0.35"/>
    <rect x="4.7"  y="5.5" width="3"   height="6.5" rx="0.8" opacity="0.55"/>
    <rect x="9.4"  y="3"   width="3"   height="9"   rx="0.8" opacity="0.8"/>
    <rect x="14.1" y="0"   width="2.9" height="12"  rx="0.8"/>
  </svg>
);

const IconWifi = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
    <circle cx="8" cy="10.5" r="1.4" fill="white"/>
    <path d="M4.2 7.2 Q8 3.8 11.8 7.2" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.75"/>
    <path d="M1.5 4.5 Q8 -0.5 14.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45"/>
  </svg>
);

const IconBattery = () => (
  <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
    <rect x="0.75" y="0.75" width="22.5" height="11.5" rx="3.25" stroke="white" strokeOpacity="0.55" strokeWidth="1.5"/>
    <rect x="2.5" y="2.5" width="16" height="8" rx="1.8" fill="white"/>
    <path d="M24.5 4.5 Q26.5 4.5 26.5 6.5 Q26.5 8.5 24.5 8.5" stroke="white" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
  </svg>
);

const IconVerified = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="7.5" fill="#C9A96E"/>
    <path d="M4.5 7.5 L6.5 9.5 L10.5 5.5" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function LiveDemo() {
  return (
    <section className="py-28 md:py-40" style={{ background: "#0d0c0a" }}>
      <div className="content-container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── Left copy ── */}
        <div>
          <p className="eyebrow mb-5">Your page</p>
          <h2
            className="font-display text-ivory leading-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 300 }}
          >
            Your name.<br />
            Your story.<br />
            <span className="text-ember-gradient italic">Your link.</span>
          </h2>
          <p className="font-sans text-ivory/45 text-sm leading-relaxed font-light mb-8 max-w-sm">
            Build your chef profile in 2 minutes. Add your photo, cuisine, and story.
            Share it everywhere. Your page lives at tipachef.com/yourname.
          </p>
          <Link
            href="/search"
            className="font-sans text-ember text-sm hover:text-ember-light transition-colors"
          >
            See an example page →
          </Link>
        </div>

        {/* ── Right: Apple-grade iPhone mockup ── */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative" style={{ perspective: "1200px" }}>

            {/* Ambient glow behind phone */}
            <div
              className="absolute"
              style={{
                inset: "-60px",
                background: "radial-gradient(ellipse 65% 55% at 55% 55%, rgba(201,169,110,0.18) 0%, transparent 70%)",
                filter: "blur(50px)",
                pointerEvents: "none",
              }}
            />

            {/* ── iPhone 15 Pro shell ── */}
            <div
              style={{
                position: "relative",
                width: "272px",
                borderRadius: "52px",
                /* titanium-like multi-stop gradient */
                background:
                  "linear-gradient(160deg, #4a4845 0%, #2c2b29 18%, #1c1b19 45%, #232220 72%, #3a3835 100%)",
                /* outer ring highlight + deep shadow */
                boxShadow:
                  "0 0 0 0.75px rgba(255,255,255,0.18), " +
                  "0 0 0 1.5px rgba(0,0,0,0.85), " +
                  "inset 0 1px 0 rgba(255,255,255,0.12), " +
                  "inset 0 -1px 0 rgba(0,0,0,0.4), " +
                  "0 50px 100px rgba(0,0,0,0.7), " +
                  "0 25px 50px rgba(0,0,0,0.45), " +
                  "0 8px 20px rgba(0,0,0,0.35)",
                padding: "13px",
                transform: "perspective(1200px) rotateY(-6deg) rotateX(2deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* ── Physical buttons ── */}
              {/* Silent toggle */}
              <div style={{ position: "absolute", left: "-3.5px", top: "70px", width: "3.5px", height: "20px", background: "linear-gradient(to right, #3a3835, #2a2926)", borderRadius: "2px 0 0 2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.5)" }} />
              {/* Volume up */}
              <div style={{ position: "absolute", left: "-3.5px", top: "104px", width: "3.5px", height: "32px", background: "linear-gradient(to right, #3a3835, #2a2926)", borderRadius: "2px 0 0 2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.5)" }} />
              {/* Volume down */}
              <div style={{ position: "absolute", left: "-3.5px", top: "146px", width: "3.5px", height: "32px", background: "linear-gradient(to right, #3a3835, #2a2926)", borderRadius: "2px 0 0 2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.5)" }} />
              {/* Power */}
              <div style={{ position: "absolute", right: "-3.5px", top: "112px", width: "3.5px", height: "52px", background: "linear-gradient(to left, #3a3835, #2a2926)", borderRadius: "0 2px 2px 0", boxShadow: "1px 0 2px rgba(0,0,0,0.5)" }} />

              {/* ── Screen glass ── */}
              <div
                style={{
                  borderRadius: "40px",
                  overflow: "hidden",
                  background: "#0c0b09",
                  position: "relative",
                  /* inner screen shadow for depth */
                  boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.06)",
                }}
              >
                {/* Screen glare overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
                    zIndex: 10,
                    pointerEvents: "none",
                    borderRadius: "40px",
                  }}
                />

                {/* ── Status bar ── */}
                <div
                  style={{
                    padding: "14px 22px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff", fontFamily: "-apple-system, BlinkMacSystemFont, system-ui", letterSpacing: "-0.3px" }}>
                    9:41
                  </span>

                  {/* Dynamic Island */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "10px",
                      transform: "translateX(-50%)",
                      width: "96px",
                      height: "28px",
                      background: "#000",
                      borderRadius: "20px",
                    }}
                  />

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <IconSignal />
                    <IconWifi />
                    <IconBattery />
                  </div>
                </div>

                {/* ── App content ── */}
                <div style={{ padding: "10px 14px 20px" }}>

                  {/* Cover / hero banner */}
                  <div
                    style={{
                      borderRadius: "22px",
                      marginBottom: "0",
                      height: "108px",
                      background: "linear-gradient(160deg, #1e1a12 0%, #2c2216 60%, #1a1510 100%)",
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                      padding: "12px 14px",
                    }}
                  >
                    {/* Subtle texture lines */}
                    <div style={{ position: "absolute", inset: 0, opacity: 0.12, background: "repeating-linear-gradient(135deg, rgba(201,169,110,0.15) 0px, transparent 1px, transparent 28px, rgba(201,169,110,0.08) 29px, transparent 30px)" }} />
                    {/* Glow spot */}
                    <div style={{ position: "absolute", top: "-20px", right: "-10px", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)" }} />

                    {/* Location chip */}
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", padding: "4px 9px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <span style={{ fontSize: "9px" }}>📍</span>
                      <span style={{ fontSize: "9.5px", fontFamily: "-apple-system, system-ui", color: "rgba(255,255,255,0.75)", letterSpacing: "0.01em" }}>Rome, Italy</span>
                    </div>
                  </div>

                  {/* Avatar — overlaps cover */}
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", marginTop: "-26px", marginBottom: "10px", paddingLeft: "14px", position: "relative", zIndex: 2 }}>
                    <div
                      style={{
                        width: "58px",
                        height: "58px",
                        borderRadius: "50%",
                        background: "linear-gradient(145deg, #D4B878 0%, #C9A96E 60%, #A8843F 100%)",
                        border: "3px solid #0c0b09",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "26px",
                        boxShadow: "0 4px 16px rgba(201,169,110,0.35)",
                        flexShrink: 0,
                      }}
                    >
                      👨‍🍳
                    </div>
                  </div>

                  {/* Chef name row */}
                  <div style={{ paddingLeft: "14px", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
                      <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontSize: "17px", fontWeight: 500, color: "#C9A96E", margin: 0, letterSpacing: "0.01em" }}>
                        Marco Esposito
                      </p>
                      <IconVerified />
                    </div>
                    <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "10.5px", color: "rgba(250,248,244,0.32)", margin: 0, letterSpacing: "0.01em" }}>
                      Italian · Rome · tipachef.com/marco
                    </p>
                  </div>

                  {/* Divider */}
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "12px", marginLeft: "14px", marginRight: "0" }} />

                  {/* Tip label */}
                  <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "9.5px", fontWeight: 600, color: "rgba(201,169,110,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px", paddingLeft: "2px" }}>
                    Send a tip
                  </p>

                  {/* Tip items */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
                    {TIP_ITEMS.map((item, i) => (
                      <div
                        key={item.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderRadius: "13px",
                          padding: "10px 13px",
                          background: i === 1
                            ? "linear-gradient(135deg, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0.06) 100%)"
                            : "rgba(255,255,255,0.045)",
                          border: i === 1
                            ? "1px solid rgba(201,169,110,0.25)"
                            : "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <span style={{ fontFamily: "-apple-system, system-ui", color: "rgba(250,248,244,0.75)", fontSize: "12px", display: "flex", alignItems: "center", gap: "9px" }}>
                          <span style={{ fontSize: "15px" }}>{item.emoji}</span>
                          {item.label}
                        </span>
                        <span style={{ fontFamily: "-apple-system, system-ui", fontSize: "12.5px", fontWeight: 600, color: i === 1 ? "#C9A96E" : "rgba(250,248,244,0.45)" }}>
                          ${item.amount}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA button */}
                  <button
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: "16px",
                      border: "none",
                      background: "linear-gradient(135deg, #D4B878 0%, #C9A96E 50%, #B8934A 100%)",
                      color: "#1a1208",
                      fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                      fontWeight: 700,
                      fontSize: "13.5px",
                      letterSpacing: "0.01em",
                      cursor: "pointer",
                      boxShadow:
                        "0 1px 0 rgba(255,255,255,0.25) inset, " +
                        "0 6px 24px rgba(201,169,110,0.35), " +
                        "0 2px 8px rgba(201,169,110,0.2)",
                    }}
                  >
                    Send a tip
                  </button>

                  {/* Secure note */}
                  <p style={{ textAlign: "center", fontFamily: "-apple-system, system-ui", fontSize: "9px", color: "rgba(255,255,255,0.2)", marginTop: "8px", letterSpacing: "0.02em" }}>
                    🔒 Secured by Stripe
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
