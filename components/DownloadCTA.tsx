"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add("visible"),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

export default function DownloadCTA() {
  const headRef = useRef<HTMLHeadingElement>(null);
  useReveal(headRef as React.RefObject<HTMLElement>);

  return (
    <section id="download" className="py-28 md:py-36 relative overflow-hidden">
      <div className="gold-line absolute top-0 left-0 right-0" />

      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, #C9A96E 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <Image src="/tipchef-logo.png" alt="Tip a Chef" width={56} height={56} className="rounded-2xl" />
        </div>

        <p className="eyebrow mb-5">Available now</p>

        <h2
          ref={headRef}
          className="reveal font-display text-ivory leading-none mb-6 mx-auto"
          style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 300, maxWidth: "16ch" }}
        >
          Start tipping the chefs who feed you.
        </h2>

        <p className="font-sans text-ivory/55 text-lg font-light leading-relaxed mb-12 max-w-xl mx-auto">
          Download Tip a Chef and honour the craft behind every plate. Free to use as a diner. Free to set up as a chef.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#"
            className="press w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-ivory text-graphite font-sans font-semibold text-sm tracking-wide hover:bg-ivory-dim transition-all duration-300 shadow-2xl"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left">
              <div className="text-xs font-normal opacity-70 leading-none mb-0.5">Download on the</div>
              <div className="text-sm font-semibold leading-none">App Store</div>
            </div>
          </a>

          <a
            href="#"
            className="press w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-ivory text-graphite font-sans font-semibold text-sm tracking-wide hover:bg-ivory-dim transition-all duration-300 shadow-2xl"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.37.21.8.22 1.2.04l12.72-7.36-2.78-2.78-11.14 10.1zM.5 1.37C.19 1.74 0 2.28 0 2.98v18.04c0 .7.19 1.24.5 1.61l.08.08 10.1-10.1v-.24L.58 1.29.5 1.37zm16.12 11.45l-2.96-2.96 2.96-2.96 3.35 1.94c.96.55.96 1.44 0 1.99l-3.35 1.99zM4.38.2L17.1 7.56l-2.78 2.78L3.18.24C3.58.06 4.01.07 4.38.2z"/>
            </svg>
            <div className="text-left">
              <div className="text-xs font-normal opacity-70 leading-none mb-0.5">Get it on</div>
              <div className="text-sm font-semibold leading-none">Google Play</div>
            </div>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-ivory/30 text-xs font-sans">
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Free to download
          </span>
          <span className="hidden sm:block w-px h-3 bg-white/10" />
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            No account needed to tip
          </span>
          <span className="hidden sm:block w-px h-3 bg-white/10" />
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Instant payouts for chefs
          </span>
        </div>
      </div>
    </section>
  );
}
