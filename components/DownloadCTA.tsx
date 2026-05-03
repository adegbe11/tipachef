"use client";

import Image from "next/image";

export default function DownloadCTA() {
  return (
    <section id="download" className="overflow-hidden">

      {/* ── Mobile layout (md:hidden) ─────────────────────────── */}
      <div className="md:hidden">
        {/* Image block */}
        <div className="relative h-72 overflow-hidden">
          <Image
            src="/chef.png"
            alt="Tip a Chef"
            fill
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content block */}
        <div className="bg-graphite px-6 py-10 flex flex-col items-center text-center">
          <Image
            src="/tipchef-logo.png"
            alt="Tip a Chef"
            width={44}
            height={44}
            className="rounded-xl mb-5"
          />
          <h2
            className="font-display text-ivory leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 8vw, 2.8rem)", fontWeight: 300 }}
          >
            Your craft.<br />
            <span className="text-ember-gradient italic">Finally rewarded.</span>
          </h2>
          <a
            href="/signup"
            className="press w-full max-w-xs py-4 rounded-full bg-ember text-graphite font-sans font-semibold text-sm tracking-wide hover:bg-ember-light transition-all duration-300 shadow-lg shadow-ember/25 mb-4"
          >
            Get started free
          </a>
          <p className="font-sans text-ivory/40 text-sm mb-6">
            Already a chef?{" "}
            <a href="/login" className="text-ivory/70 font-medium underline underline-offset-2 hover:text-ember transition-colors">
              Log in
            </a>
          </p>
          <div className="w-full max-w-xs h-px bg-white/8 mb-6" />
          <div className="flex gap-3 justify-center">
            <a href="#" className="press glass rounded-xl px-4 py-2.5 flex items-center gap-2 hover:border-white/20 transition-all duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-ivory">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <p className="font-sans text-ivory/40 text-xs leading-none mb-0.5">Download on the</p>
                <p className="font-sans text-ivory text-sm font-medium leading-none">App Store</p>
              </div>
            </a>
            <a href="#" className="press glass rounded-xl px-4 py-2.5 flex items-center gap-2 hover:border-white/20 transition-all duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-ivory">
                <path d="M3.18 23.76c.3.17.64.22.98.14l12.43-12.43L12.9 7.77 3.18 23.76zM20.4 10.04l-2.55-1.47-3.35 3.35 3.35 3.35 2.57-1.48c.73-.42.73-1.52-.02-1.75zM2.01 1.36C1.8 1.6 1.68 1.96 1.68 2.43v19.14c0 .47.14.83.35 1.05l.06.06 10.72-10.72v-.25L2.07 1.3l-.06.06zM12.9 16.23l-9.72 9.72c.34.2.77.22 1.13.02l13.55-7.83-4.96-1.91z"/>
              </svg>
              <div className="text-left">
                <p className="font-sans text-ivory/40 text-xs leading-none mb-0.5">Get it on</p>
                <p className="font-sans text-ivory text-sm font-medium leading-none">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ── Desktop layout (hidden md:block) ─────────────────── */}
      <div className="hidden md:block relative min-h-[88vh] overflow-hidden">
        {/* Full-bleed chef photo */}
        <div className="absolute inset-0">
          <Image
            src="/chef.png"
            alt="Tip a Chef"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Cube card */}
        <div className="absolute top-[60%] -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
          <div
            className="bg-white rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl p-5 gap-3"
            style={{ width: "160px", height: "160px" }}
          >
            <Image
              src="/tipchef-logo.png"
              alt="Tip a Chef"
              width={30}
              height={30}
              className="rounded-xl flex-shrink-0"
            />

            <a
              href="/signup"
              className="press w-full py-2 rounded-xl bg-graphite text-ivory font-sans font-semibold hover:bg-ash transition-all duration-200 shadow text-center flex-shrink-0"
              style={{ fontSize: "0.68rem" }}
            >
              Get started free
            </a>

            <p className="font-sans text-smoke flex-shrink-0" style={{ fontSize: "0.6rem" }}>
              Chef?{" "}
              <a href="/login" className="text-graphite font-semibold underline underline-offset-2 hover:text-ember-dark transition-colors">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
