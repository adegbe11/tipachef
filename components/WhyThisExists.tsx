"use client";
import { useEffect, useRef } from "react";

export default function WhyThisExists() {
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = linesRef.current;
    if (!container) return;
    const lines = Array.from(container.children) as HTMLElement[];
    lines.forEach((l, i) => {
      l.style.opacity = "0";
      l.style.transform = "translateY(24px)";
      l.style.transition = `opacity 0.7s ease ${i * 0.18}s, transform 0.7s ease ${i * 0.18}s`;
    });
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        lines.forEach((l) => { l.style.opacity = "1"; l.style.transform = "translateY(0)"; });
        obs.unobserve(container);
      }
    }, { threshold: 0.3 });
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-14 md:py-20 relative overflow-hidden" style={{ background:"#0a0908" }}>

      {/* Deep ember glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:"radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,169,110,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Thick horizontal ember rule top */}
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"180px", height:"2px", background:"linear-gradient(90deg,transparent,#C9A96E,transparent)" }} />

      <div className="content-container max-w-4xl text-center relative">

        {/* Glass panel behind text */}
        <div
          style={{
            position:"absolute", inset:"-2rem -1rem",
            background:"rgba(255,255,255,0.018)",
            backdropFilter:"blur(40px)",
            WebkitBackdropFilter:"blur(40px)",
            borderRadius:"32px",
            border:"1px solid rgba(201,169,110,0.08)",
            pointerEvents:"none",
          }}
        />

        <div ref={linesRef} className="space-y-1 mb-10 relative">
          <p
            className="font-display text-ivory leading-tight"
            style={{ fontSize:"clamp(2.4rem, 5.5vw, 4.6rem)", fontWeight:400 }}
          >
            The waiter got the tip.
          </p>
          <p
            className="font-display text-ivory leading-tight"
            style={{ fontSize:"clamp(2.4rem, 5.5vw, 4.6rem)", fontWeight:400 }}
          >
            You made the meal.
          </p>
          <p
            className="font-display leading-tight italic"
            style={{
              fontSize:"clamp(2.4rem, 5.5vw, 4.6rem)",
              fontWeight:500,
              background:"linear-gradient(135deg,#D4B878 0%,#E8C97A 45%,#C9A96E 100%)",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
            }}
          >
            That changes{" "}
            <span style={{ fontWeight:700, fontStyle:"normal" }}>NOW.</span>
          </p>
        </div>

        {/* Thick brutal divider */}
        <div className="flex items-center gap-4 justify-center relative">
          <div style={{ height:"2px", flex:1, maxWidth:"80px", background:"linear-gradient(to right,transparent,rgba(201,169,110,0.5))" }} />
          <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#C9A96E", boxShadow:"0 0 12px rgba(201,169,110,0.6)" }} />
          <div style={{ height:"2px", flex:1, maxWidth:"80px", background:"linear-gradient(to left,transparent,rgba(201,169,110,0.5))" }} />
        </div>

      </div>

      {/* Thick horizontal ember rule bottom */}
      <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:"180px", height:"2px", background:"linear-gradient(90deg,transparent,rgba(201,169,110,0.4),transparent)" }} />
    </section>
  );
}
