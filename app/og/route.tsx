import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "#111111",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,169,110,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Ambient glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-60px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,169,110,0.10) 0%, transparent 70%)",
          }}
        />

        {/* Subtle grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Left content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 64px 64px 72px",
            flex: 1,
            zIndex: 1,
          }}
        >
          {/* Top: logo + wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "rgba(201,169,110,0.12)",
                border: "1px solid rgba(201,169,110,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Flame icon SVG */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C12 2 6 8 6 13a6 6 0 0 0 12 0c0-5-6-11-6-11z" fill="#C9A96E" opacity="0.9"/>
                <path d="M12 10c0 0-2 2.5-2 4a2 2 0 0 0 4 0c0-1.5-2-4-2-4z" fill="#111111"/>
              </svg>
            </div>
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "22px",
                fontStyle: "italic",
                color: "#FAF8F4",
                letterSpacing: "0.01em",
              }}
            >
              Tip a Chef
            </span>
          </div>

          {/* Middle: headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                width: "40px",
                height: "2px",
                background: "#C9A96E",
                borderRadius: "2px",
              }}
            />
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "58px",
                fontWeight: "300",
                color: "#FAF8F4",
                lineHeight: "1.12",
                letterSpacing: "-0.02em",
              }}
            >
              The chef who made
              <br />
              your meal{" "}
              <span style={{ color: "#C9A96E", fontStyle: "italic" }}>
                deserves
              </span>
              <br />
              <span style={{ color: "#C9A96E", fontStyle: "italic" }}>
                to know.
              </span>
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "19px",
                fontWeight: "300",
                color: "rgba(250,248,244,0.45)",
                letterSpacing: "0.01em",
                lineHeight: "1.5",
              }}
            >
              Tip directly. No app needed. Free to join.
            </div>
          </div>

          {/* Bottom: URL pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(201,169,110,0.08)",
              border: "1px solid rgba(201,169,110,0.2)",
              borderRadius: "100px",
              padding: "10px 20px",
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#C9A96E",
              }}
            />
            <span
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "15px",
                color: "rgba(250,248,244,0.55)",
                letterSpacing: "0.04em",
              }}
            >
              tipachef.com
            </span>
          </div>
        </div>

        {/* Right: big logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "360px",
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Outer glow ring */}
          <div
            style={{
              position: "absolute",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              border: "1px solid rgba(201,169,110,0.12)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "230px",
              height: "230px",
              borderRadius: "50%",
              border: "1px solid rgba(201,169,110,0.08)",
            }}
          />

          {/* Logo container */}
          <div
            style={{
              width: "170px",
              height: "170px",
              borderRadius: "40px",
              background: "rgba(201,169,110,0.06)",
              border: "1px solid rgba(201,169,110,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 80px rgba(201,169,110,0.15)",
            }}
          >
            {/* Large flame icon */}
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C12 2 6 8 6 13a6 6 0 0 0 12 0c0-5-6-11-6-11z" fill="#C9A96E"/>
              <path d="M12 10c0 0-2 2.5-2 4a2 2 0 0 0 4 0c0-1.5-2-4-2-4z" fill="#111111"/>
            </svg>
          </div>
        </div>

      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
