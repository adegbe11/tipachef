"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "For chefs",    href: "#for-chefs"    },
  { label: "Restaurants",  href: "#restaurants"  },
];

const SEARCH_SUGGESTIONS = [
  { type: "chef",       name: "Marcus T.",      sub: "Head Chef · The Meridian, London"     },
  { type: "chef",       name: "Yuki Nakamura",  sub: "Pastry Chef · Sora, Tokyo"            },
  { type: "chef",       name: "Dominic Asante", sub: "Sous Chef · Firefly Kitchen, Dublin"  },
  { type: "restaurant", name: "The Meridian",   sub: "Restaurant · London, UK"              },
  { type: "restaurant", name: "Carta NYC",      sub: "Restaurant · New York, USA"           },
  { type: "restaurant", name: "Bistro Velour",  sub: "Restaurant · Melbourne, AU"           },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query,      setQuery]      = useState("");
  const searchRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = query.length > 0
    ? SEARCH_SUGGESTIONS.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.sub.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_SUGGESTIONS;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-dark border-b border-white/5 py-3" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-6">

          {/* ── Logo ─────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-3 press flex-shrink-0 group">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image
                src="/tipchef-logo.png"
                alt="Tip a Chef"
                width={36}
                height={36}
                className="rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-ember/20 group-hover:ring-ember/50 transition-all duration-300" />
            </div>
            <span
              className="font-display text-ivory leading-none select-none"
              style={{ fontSize: "1.35rem", fontWeight: 400, fontStyle: "italic", letterSpacing: "0.01em" }}
            >
              Tip a Chef
            </span>
          </Link>

          {/* ── Desktop nav links ─────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-7 ml-2">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-sm font-sans font-normal text-ivory/55 hover:text-ivory transition-colors duration-200 tracking-wide group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-ember group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* ── Search bar (grows to fill space) ─────────────── */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-sm lg:max-w-md xl:max-w-lg relative mx-2">
            <div
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300 cursor-text ${
                searchOpen
                  ? "bg-white/8 border border-ember/40 shadow-lg shadow-ember/10"
                  : "bg-white/5 border border-white/8 hover:border-white/15 hover:bg-white/7"
              }`}
              onClick={() => setSearchOpen(true)}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke={searchOpen ? "#C9A96E" : "currentColor"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`flex-shrink-0 transition-colors duration-300 ${searchOpen ? "text-ember" : "text-ivory/35"}`}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search chefs & restaurants..."
                className="flex-1 bg-transparent text-sm font-sans text-ivory placeholder:text-ivory/30 outline-none min-w-0"
              />
              {query && (
                <button
                  onClick={(e) => { e.stopPropagation(); setQuery(""); inputRef.current?.focus(); }}
                  className="flex-shrink-0 text-ivory/30 hover:text-ivory/70 transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Dropdown */}
            {searchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 glass-dark rounded-2xl overflow-hidden shadow-2xl border border-white/8 z-50">
                {query === "" && (
                  <div className="px-4 pt-3 pb-1">
                    <span className="eyebrow text-ivory/25" style={{ fontSize: "0.6rem" }}>Suggested</span>
                  </div>
                )}
                {filtered.length > 0 ? (
                  <ul className="py-1">
                    {filtered.map((s) => (
                      <li key={s.name}>
                        <button
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left group"
                          onClick={() => { setSearchOpen(false); setQuery(""); }}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            s.type === "chef" ? "bg-ember/15 border border-ember/25" : "bg-white/5 border border-white/10"
                          }`}>
                            {s.type === "chef" ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                              </svg>
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-sans text-ivory font-medium truncate group-hover:text-ember transition-colors duration-200">{s.name}</p>
                            <p className="text-xs font-sans text-ivory/35 truncate">{s.sub}</p>
                          </div>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ivory/20 group-hover:text-ember/60 transition-colors flex-shrink-0">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="font-sans text-ivory/40 text-sm">No results for &ldquo;{query}&rdquo;</p>
                  </div>
                )}
                <div className="border-t border-white/5 px-4 py-2.5 flex items-center justify-between">
                  <span className="text-xs font-sans text-ivory/25">Press Enter to search</span>
                  <kbd className="text-xs font-sans text-ivory/25 glass px-1.5 py-0.5 rounded">Esc</kbd>
                </div>
              </div>
            )}
          </div>

          {/* ── Right CTAs ────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0 ml-auto lg:ml-0">
            <a
              href="/login"
              className="press text-sm font-sans font-medium px-5 py-2.5 rounded-full text-ivory/65 hover:text-ivory transition-colors duration-200 tracking-wide whitespace-nowrap"
            >
              Sign in
            </a>
            <a
              href="/signup"
              className="press text-sm font-sans font-semibold px-6 py-2.5 rounded-full bg-ember text-graphite hover:bg-ember-light transition-all duration-200 tracking-wide shadow-lg shadow-ember/25 whitespace-nowrap"
            >
              Sign up
            </a>
          </div>

          {/* ── Mobile right ─────────────────────────────────── */}
          <div className="md:hidden flex items-center gap-3 ml-auto">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="press p-2 text-ivory/60 hover:text-ember transition-colors"
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 p-2 press"
              aria-label="Menu"
            >
              <span className={`block h-px w-5 bg-ivory transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px w-5 bg-ivory transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-ivory transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile search bar (expands below header) */}
        {searchOpen && (
          <div className="md:hidden px-6 pt-2 pb-3" ref={searchRef}>
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/8 border border-ember/30">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chefs & restaurants..."
                className="flex-1 bg-transparent text-sm font-sans text-ivory placeholder:text-ivory/30 outline-none"
              />
            </div>
          </div>
        )}
      </header>

      {/* ── Full-screen mobile menu ───────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 glass-dark flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-4xl text-ivory/80 hover:text-ivory transition-colors italic"
          >
            {l.label}
          </a>
        ))}
        <div className="flex flex-col items-center gap-3 mt-6">
          <a
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="press text-sm font-sans font-medium px-8 py-3 rounded-full border border-ember/40 text-ember"
          >
            Sign in
          </a>
          <a
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="press text-sm font-sans font-semibold px-8 py-3 rounded-full bg-ember text-graphite"
          >
            Sign up
          </a>
        </div>
      </div>
    </>
  );
}
