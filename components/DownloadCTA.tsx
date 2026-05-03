"use client";

import Image from "next/image";

export default function DownloadCTA() {
  return (
    <section id="download" className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">

      {/* Full-bleed chef photo */}
      <div className="absolute inset-0">
        <Image
          src="/chef.png"
          alt="Tip a Chef"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle dark veil so the card pops */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Floating white card — Patreon style */}
      <div className="relative z-10 w-full max-w-sm mx-auto px-6">
        <div className="bg-white rounded-3xl px-10 py-10 flex flex-col items-center text-center shadow-2xl">

          {/* Logo */}
          <div className="mb-5">
            <Image
              src="/tipchef-logo.png"
              alt="Tip a Chef"
              width={52}
              height={52}
              className="rounded-2xl"
            />
          </div>

          {/* Headline */}
          <h2
            className="font-display text-graphite leading-tight mb-8"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 400 }}
          >
            Your kitchen.<br />
            <span style={{ fontStyle: "italic", color: "#A07840" }}>Your tips. Your fans.</span>
          </h2>

          {/* Primary CTA */}
          <a
            href="/signup"
            className="press w-full py-4 rounded-2xl bg-graphite text-ivory font-sans font-semibold text-sm tracking-wide hover:bg-ash transition-all duration-200 shadow-lg mb-3 text-center"
          >
            Get started — it&apos;s free
          </a>

          {/* Secondary */}
          <p className="font-sans text-smoke text-sm">
            Already a chef?{" "}
            <a href="/login" className="text-graphite font-medium underline underline-offset-2 hover:text-ember-dark transition-colors">
              Log in
            </a>
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-gray-100 my-6" />

          {/* App store badges */}
          <div className="flex items-center justify-center gap-3">
            <a href="#" className="press">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#111111">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-gray-400 font-sans leading-none mb-0.5" style={{ fontSize: "0.6rem" }}>Download on the</div>
                  <div className="text-graphite font-sans font-semibold leading-none" style={{ fontSize: "0.75rem" }}>App Store</div>
                </div>
              </div>
            </a>

            <a href="#" className="press">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.37.21.8.22 1.2.04l12.72-7.36-2.78-2.78-11.14 10.1zM.5 1.37C.19 1.74 0 2.28 0 2.98v18.04c0 .7.19 1.24.5 1.61l.08.08 10.1-10.1v-.24L.58 1.29.5 1.37zm16.12 11.45l-2.96-2.96 2.96-2.96 3.35 1.94c.96.55.96 1.44 0 1.99l-3.35 1.99zM4.38.2L17.1 7.56l-2.78 2.78L3.18.24C3.58.06 4.01.07 4.38.2z" fill="#111111"/>
                </svg>
                <div className="text-left">
                  <div className="text-gray-400 font-sans leading-none mb-0.5" style={{ fontSize: "0.6rem" }}>Get it on</div>
                  <div className="text-graphite font-sans font-semibold leading-none" style={{ fontSize: "0.75rem" }}>Google Play</div>
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
