"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ClaimPage() {
  const [handle, setHandle] = useState("");
  const router   = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);

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
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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

      <div ref={sectionRef} className="content-container relative text-center">

        {/* Heading */}
        <h2
          className="font-display text-ivory leading-tight mb-4 mx-auto"
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)",
            fontWeight: 400,
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

        {/* URL claim input */}
        <form
          onSubmit={handleClaim}
          className="mx-auto flex items-center"
          style={{
            maxWidth: "500px",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "2px solid rgba(201,169,110,0.25)",
            borderRadius: "100px",
            padding: "6px 6px 6px 22px",
            boxShadow:
              "5px 5px 0 rgba(201,169,110,0.1), " +
              "0 16px 48px rgba(0,0,0,0.45), " +
              "inset 0 1px 0 rgba(255,255,255,0.08)",
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


      </div>
    </section>
  );
}
