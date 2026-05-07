"use client";

import Link from "next/link";

const STATS = [
  { value: "$247",   label: "Tips received" },
  { value: "14",     label: "Supporters"    },
  { value: "$1,840", label: "This month"    },
  { value: "100%",   label: "Goes to you"   },
];

const TIPS = [
  { name: "Anonymous diner", note: "That risotto was perfect.",     amount: 25 },
  { name: "Table 4",         note: "Flew here just for your food.", amount: 10 },
  { name: "Regular guest",   note: "See you next week.",            amount: 5  },
];

export default function EarningsSection() {
  return (
    <section
      className="py-28 md:py-40"
      style={{ background: "linear-gradient(180deg,#100f0c 0%,#0d0c0a 100%)" }}
    >
      <div className="content-container grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* ── Left copy ── */}
        <div>
          <p className="eyebrow mb-5">Your earnings</p>
          <h2
            className="font-display text-ivory leading-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 300 }}
          >
            100% yours.<br />
            Paid<br />
            <span className="text-ember-gradient italic">instantly.</span>
          </h2>
          <p className="font-sans text-ivory/45 text-sm leading-relaxed font-light mb-10 max-w-sm">
            Every tip goes directly to your account. Not the restaurant. Not a
            shared pool. Yours. Cash out any time. No minimum. No waiting.
          </p>
          <Link
            href="/about"
            className="font-sans text-ember text-sm hover:text-ember-light transition-colors"
          >
            See how payouts work →
          </Link>
        </div>

        {/* ── Right: earnings dashboard card ── */}
        <div className="flex justify-center lg:justify-end">
          <div
            style={{
              width: "100%",
              maxWidth: "360px",
              borderRadius: "22px",
              background:
                "linear-gradient(160deg,#1c1a15 0%,#161410 55%,#1a1813 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow:
                "0 0 0 0.5px rgba(255,255,255,0.04), " +
                "0 40px 80px rgba(0,0,0,0.55), " +
                "0 16px 40px rgba(0,0,0,0.35)",
              overflow: "hidden",
            }}
          >
            {/* Card header */}
            <div
              style={{
                padding: "14px 18px 12px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "-apple-system,BlinkMacSystemFont,system-ui",
                  fontSize: "9.5px",
                  fontWeight: 700,
                  color: "rgba(201,169,110,0.55)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Tonight&apos;s service
              </span>
              {/* Live indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div
                  style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: "#4ade80",
                    boxShadow: "0 0 7px rgba(74,222,128,0.75)",
                    animation: "pulse 2s infinite",
                  }}
                />
                <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "9px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.04em" }}>LIVE</span>
              </div>
            </div>

            {/* Stats grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1px",
                background: "rgba(255,255,255,0.05)",
                margin: "0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    padding: "16px 18px",
                    background:
                      i === 3
                        ? "linear-gradient(135deg,rgba(201,169,110,0.1) 0%,rgba(201,169,110,0.04) 100%)"
                        : "#161410",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "-apple-system,BlinkMacSystemFont,system-ui",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: i === 3 ? "#C9A96E" : "rgba(250,248,244,0.9)",
                      margin: "0 0 3px",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {s.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "-apple-system,system-ui",
                      fontSize: "10.5px",
                      color: "rgba(250,248,244,0.3)",
                      margin: 0,
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Tip feed */}
            <div style={{ padding: "6px 0 8px" }}>
              {TIPS.map((tip, i) => (
                <div
                  key={tip.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "11px 18px",
                    borderBottom:
                      i < TIPS.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.background =
                      "rgba(255,255,255,0.025)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.background =
                      "transparent")
                  }
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "-apple-system,system-ui",
                        fontSize: "12.5px",
                        fontWeight: 600,
                        color: "rgba(250,248,244,0.85)",
                        margin: "0 0 2px",
                      }}
                    >
                      {tip.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "Georgia,'Times New Roman',serif",
                        fontStyle: "italic",
                        fontSize: "11px",
                        color: "rgba(250,248,244,0.32)",
                        margin: 0,
                      }}
                    >
                      &ldquo;{tip.note}&rdquo;
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: "-apple-system,system-ui",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#C9A96E",
                      marginLeft: "16px",
                      flexShrink: 0,
                    }}
                  >
                    ${tip.amount}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer stripe */}
            <div
              style={{
                padding: "10px 18px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "11px" }}>🔒</span>
              <span
                style={{
                  fontFamily: "-apple-system,system-ui",
                  fontSize: "9.5px",
                  color: "rgba(255,255,255,0.18)",
                  letterSpacing: "0.03em",
                }}
              >
                Instant payouts · Secured by Stripe
              </span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1);   }
          50%      { opacity:0.5; transform:scale(1.3); }
        }
      `}</style>
    </section>
  );
}
