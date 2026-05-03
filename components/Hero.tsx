"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CYCLING_WORDS = ["cooking", "craft", "passion", "art"];

export default function Hero() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const imgRef  = useRef<HTMLDivElement>(null);
  const [wordIdx,     setWordIdx]     = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  // Cycling headline word
  useEffect(() => {
    const id = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % CYCLING_WORDS.length);
        setWordVisible(true);
      }, 380);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  // Parallax scroll
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.22}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Headline reveal
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

      {/* ── Background layer ─────────────────────────────────── */}
      <div className="absolute inset-0">
        {/* Parallax photo */}
        <div ref={imgRef} className="absolute inset-0 scale-110 will-change-transform">
          <Image
            src="/tipchef-welcome.png"
            alt="Chef at work"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/92 to-graphite/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-graphite/55" />

        {/* Ambient orbs */}
        <div
          className="absolute w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none"
          style={{
            top: "15%", left: "8%",
            background: "radial-gradient(circle, rgba(201,169,110,0.18) 0%, transparent 70%)",
            animation: "orbDrift 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{
            bottom: "25%", left: "35%",
            background: "radial-gradient(circle, rgba(217,188,142,0.10) 0%, transparent 70%)",
            animation: "orbDrift 20s ease-in-out 4s infinite reverse",
          }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: 0.038,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 content-container pt-20 xs:pt-24 md:pt-32 pb-20 w-full">
        <div className="flex items-center justify-between gap-12 xl:gap-20">

          {/* Left: copy ───────────────────────────────────────── */}
          <div className="max-w-2xl flex-shrink-0">
            <p
              className="eyebrow mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              For chefs · For restaurants · For the kitchen
            </p>

            <h1
              ref={headRef}
              className="reveal fluid-hero font-display text-ivory leading-none mb-6"
              style={{ fontWeight: 300 }}
            >
              Earn what your{" "}
              <span
                className="text-ember-gradient italic inline-block"
                style={{
                  opacity:    wordVisible ? 1 : 0,
                  transform:  wordVisible ? "translateY(0)" : "translateY(-12px)",
                  transition: "opacity 0.35s ease, transform 0.38s ease",
                  minWidth: "4ch",
                  display: "inline-block",
                }}
              >
                {CYCLING_WORDS[wordIdx]}
              </span>
              <br />
              <span className="text-ember-gradient italic">deserves.</span>
            </h1>

            <p
              className="opacity-0 animate-fade-up fluid-body-lg font-sans text-ivory/70 font-light leading-relaxed mb-10 max-w-lg"
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
                href="/signup"
                className="press inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ember text-graphite font-sans font-semibold text-sm tracking-wide hover:bg-ember-light transition-all duration-300 shadow-lg shadow-ember/25"
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

            <div
              className="opacity-0 animate-fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-2"
              style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
            >
              {["Free to set up", "Instant payouts", "2,400+ chefs earning", "No monthly fees"].map((badge) => (
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
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
        style={{ animationDelay: "1.6s", animationFillMode: "forwards" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="eyebrow text-ivory/30" style={{ fontSize: "0.6rem" }}>scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-ember/60 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
