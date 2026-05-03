"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CYCLING_WORDS = ["cooking", "craft", "passion", "art"];

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  // Cycling headline word
  useEffect(() => {
    const id = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % CYCLING_WORDS.length);
        setWordVisible(true);
      }, 380);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  // Parallax scroll on the background image
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.22}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden text-ivory">

      {/* ── Background layer ─────────────────────────────────── */}
      <div className="absolute inset-0">
        {/* Parallax photo */}
        <div ref={imgRef} className="absolute inset-0 scale-110 will-change-transform">
          <Image
            src="/tipchef-welcome.png"
            alt="Chef at work"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Centered radial vignette — keeps subject visible, darkens edges (Apple-style) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 75% at 50% 45%, rgba(17,17,17,0.55) 0%, rgba(17,17,17,0.85) 70%, rgba(17,17,17,0.95) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite/40 via-transparent to-graphite/80" />

        {/* Ambient ember glow */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
          style={{
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)",
            animation: "orbDrift 16s ease-in-out infinite",
          }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: 0.04,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* ── Middle: headline + subtitle + CTAs ────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto py-10">
        <h1
          className="font-display leading-none mb-8 opacity-0 animate-fade-up"
          style={{
            fontSize: "clamp(2.8rem, 9vw, 7rem)",
            fontWeight: 300,
            animationDelay: "0.35s",
            animationFillMode: "forwards",
          }}
        >
          Earn what your{" "}
          <span
            className="text-ember-gradient italic inline-block"
            style={{
              opacity: wordVisible ? 1 : 0,
              transform: wordVisible ? "translateY(0)" : "translateY(-12px)",
              transition: "opacity 0.35s ease, transform 0.38s ease",
              minWidth: "5ch",
              display: "inline-block",
            }}
          >
            {CYCLING_WORDS[wordIdx]}
          </span>
          <br />
          <span className="text-ember-gradient italic">deserves.</span>
        </h1>

        <p
          className="font-sans text-ivory/75 max-w-xl mx-auto mb-10 leading-relaxed font-light opacity-0 animate-fade-up"
          style={{
            fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)",
            animationDelay: "0.55s",
            animationFillMode: "forwards",
          }}
        >
          Diners scan a QR, tip you directly, and send a thank-you message.
          100% goes to the kitchen — no app required on their side.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.75s", animationFillMode: "forwards" }}
        >
          <a
            href="/signup"
            className="press inline-flex items-center gap-2 px-9 py-4 rounded-full bg-ember text-graphite font-sans font-semibold text-sm tracking-wide hover:bg-ember-light transition-all duration-300 shadow-lg shadow-ember/25"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Claim your free chef profile
          </a>
          <a
            href="#restaurants"
            className="press inline-flex items-center gap-2 px-8 py-4 rounded-full glass border border-white/15 text-ivory font-sans font-medium text-sm tracking-wide hover:bg-white/[0.08] transition-all duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            For restaurants
          </a>
        </div>
      </div>

    </section>
  );
}
