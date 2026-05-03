"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add("visible"),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/tipchef-welcome.png"
          alt="Chef at work"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/85 to-graphite/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-graphite/60" />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="max-w-2xl">
          <p
            className="eyebrow mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            For chefs · For restaurants · For the kitchen
          </p>

          <h1
            ref={headRef}
            className="reveal font-display text-ivory leading-none mb-6"
            style={{ fontSize: "clamp(3.2rem, 8vw, 7.5rem)", fontWeight: 300 }}
          >
            Earn what your{" "}
            <span className="text-ember-gradient italic">cooking deserves.</span>
          </h1>

          <p
            className="opacity-0 animate-fade-up font-sans text-ivory/70 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            Tip a Chef connects you directly with every diner you impress.
            Set up your profile in 2 minutes. Get paid instantly. Build a following that loves you.
          </p>

          <div
            className="opacity-0 animate-fade-up flex flex-wrap gap-4"
            style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
          >
            <a
              href="#for-chefs"
              className="press inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ember text-graphite font-sans font-semibold text-sm tracking-wide hover:bg-ember-light transition-all duration-300 shadow-lg shadow-ember/20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Claim your free chef profile
            </a>
            <a
              href="#restaurants"
              className="press inline-flex items-center gap-2 px-8 py-4 rounded-full glass border border-white/10 text-ivory font-sans font-medium text-sm tracking-wide hover:bg-white/[0.08] transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              For restaurants
            </a>
          </div>

          {/* Trust badges */}
          <div
            className="opacity-0 animate-fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-2"
            style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
          >
            {[
              "Free to set up",
              "Instant payouts",
              "2,400+ chefs earning",
              "No monthly fees",
            ].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-xs font-sans text-ivory/45">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
        style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="eyebrow text-ivory/30" style={{ fontSize: "0.6rem" }}>scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-ember/60 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
