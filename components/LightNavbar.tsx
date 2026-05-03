"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LightNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-black/[0.06] py-3 shadow-sm"
          : "bg-white py-4"
      }`}
    >
      <div className="content-container flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 press flex-shrink-0 group">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src="/tipchef-logo.png"
              alt="Tip a Chef"
              width={32}
              height={32}
              className="rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <span
            className="font-display leading-none select-none text-graphite"
            style={{ fontSize: "1.25rem", fontWeight: 400, fontStyle: "italic", letterSpacing: "0.01em" }}
          >
            Tip a Chef
          </span>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/login"
            className="press hidden sm:inline-flex text-sm font-sans font-medium px-5 py-2.5 rounded-full text-black/50 hover:text-black transition-colors duration-200 tracking-wide"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="press inline-flex text-sm font-sans font-semibold px-6 py-2.5 rounded-full bg-ember text-white hover:bg-ember-light transition-all duration-200 tracking-wide shadow-md shadow-ember/20"
          >
            Sign up
          </Link>
        </div>

      </div>
    </header>
  );
}
