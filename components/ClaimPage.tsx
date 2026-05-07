"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClaimPage() {
  const [handle, setHandle] = useState("");
  const router = useRouter();

  function handleClaim(e: React.FormEvent) {
    e.preventDefault();
    const slug = handle.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (slug) router.push(`/signup?handle=${slug}`);
  }

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
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="content-container relative text-center">

        {/* Heading */}
        <h2
          className="font-display text-ivory leading-tight mb-4 mx-auto"
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)",
            fontWeight: 300,
            maxWidth: "680px",
          }}
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

        <p className="font-sans text-ivory/40 text-sm leading-relaxed font-light mb-10 mx-auto" style={{ maxWidth: "380px" }}>
          Claim your free page. No card needed. Live in 2 minutes.
        </p>

        {/* URL claim input */}
        <form
          onSubmit={handleClaim}
          className="mx-auto flex items-center"
          style={{
            maxWidth: "480px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "100px",
            padding: "6px 6px 6px 22px",
            boxShadow:
              "0 0 0 1px rgba(0,0,0,0.4), " +
              "0 8px 32px rgba(0,0,0,0.35), " +
              "inset 0 1px 0 rgba(255,255,255,0.07)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Prefix label */}
          <span
            className="font-sans whitespace-nowrap flex-shrink-0"
            style={{ fontSize: "14px", color: "rgba(250,248,244,0.35)", letterSpacing: "0.01em" }}
          >
            tipachef.com/
          </span>

          {/* Text input */}
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="yourname"
            maxLength={30}
            className="flex-1 bg-transparent outline-none font-sans"
            style={{
              fontSize: "14px",
              color: "#C9A96E",
              caretColor: "#C9A96E",
              letterSpacing: "0.01em",
              minWidth: 0,
              padding: "0 8px",
            }}
          />

          {/* Claim button */}
          <button
            type="submit"
            className="flex-shrink-0 font-sans font-semibold text-sm"
            style={{
              background: "linear-gradient(135deg,#D4B878 0%,#C9A96E 60%,#B8934A 100%)",
              color: "#1a1208",
              borderRadius: "100px",
              padding: "11px 24px",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.01em",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.25), " +
                "0 4px 16px rgba(201,169,110,0.35)",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
          >
            Claim your page →
          </button>
        </form>

        {/* Trust note */}
        <p className="font-sans text-ivory/20 text-xs mt-5 tracking-wide">
          Free forever · No credit card · Payouts via Stripe
        </p>

      </div>
    </section>
  );
}
