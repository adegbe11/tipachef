"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

const TOP_CHEFS = [
  {
    slug:     "marco-esposito",
    name:     "Marco Esposito",
    role:     "Head Chef",
    venue:    "Osteria del Fuoco",
    location: "Rome, Italy",
    flag:     "🇮🇹",
    tips:     "312",
    photo:    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&q=85",
  },
  {
    slug:     "dimitri-kostas",
    name:     "Dimitri Kostas",
    role:     "Head Chef",
    venue:    "Kuzina",
    location: "Athens, Greece",
    flag:     "🇬🇷",
    tips:     "247",
    photo:    "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&auto=format&q=85",
  },
  {
    slug:     "pierre-laurent",
    name:     "Pierre Laurent",
    role:     "Executive Chef",
    venue:    "Le Comptoir",
    location: "Paris, France",
    flag:     "🇫🇷",
    tips:     "189",
    photo:    "https://images.unsplash.com/photo-1583394293214-0bc3b882c2ad?w=600&auto=format&q=85",
  },
];

export default function ChefProfiles() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.unobserve(el);
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;
    const cards = Array.from(container.children) as HTMLElement[];
    cards.forEach((c, i) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(40px) scale(0.97)";
      c.style.transition = `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`;
    });
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cards.forEach((c) => {
          c.style.opacity = "1";
          c.style.transform = "translateY(0) scale(1)";
        });
        obs.unobserve(container);
      }
    }, { threshold: 0.1 });
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-36" style={{ background:"linear-gradient(180deg,#0d0c0a 0%,#0f0e0b 100%)" }}>
      <div className="content-container">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <p className="eyebrow mb-4">Check out our top chef profiles</p>
          <h2
            className="font-display text-ivory leading-tight"
            style={{ fontSize:"clamp(2rem, 3.8vw, 3rem)", fontWeight:400 }}
          >
            Real chefs.{" "}
            <span className="text-ember-gradient italic">Real gratitude.</span>
          </h2>
        </div>

        {/* 3-card grid */}
        <div ref={gridRef} className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {TOP_CHEFS.map((chef) => (
            <Link
              key={chef.slug}
              href={`/${chef.slug}`}
              className="group block"
              style={{ textDecoration:"none" }}
            >
              {/* Photo card */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "28px",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  boxShadow:
                    "0 24px 60px rgba(0,0,0,0.6), " +
                    "0 8px 24px rgba(0,0,0,0.4), " +
                    "0 0 0 1.5px rgba(255,255,255,0.07)",
                  transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s ease",
                }}
                className="group-hover:scale-[1.02] group-hover:shadow-2xl"
              >
                {/* Chef photo */}
                <Image
                  src={chef.photo}
                  alt={chef.name}
                  fill
                  style={{ objectFit:"cover", objectPosition:"center top", transition:"transform 0.6s ease" }}
                  className="group-hover:scale-105"
                  unoptimized
                />

                {/* Gradient overlay */}
                <div
                  style={{
                    position:"absolute", inset:0,
                    background:"linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)",
                  }}
                />

                {/* Flag + location top-left */}
                <div
                  style={{
                    position:"absolute", top:"14px", left:"14px",
                    display:"flex", alignItems:"center", gap:"6px",
                    background:"rgba(0,0,0,0.5)",
                    backdropFilter:"blur(12px)",
                    WebkitBackdropFilter:"blur(12px)",
                    border:"1px solid rgba(255,255,255,0.12)",
                    borderRadius:"20px",
                    padding:"4px 10px 4px 6px",
                  }}
                >
                  <span style={{ fontSize:"14px" }}>{chef.flag}</span>
                  <span style={{ fontFamily:"-apple-system,system-ui", fontSize:"10px", color:"rgba(255,255,255,0.75)", fontWeight:600, letterSpacing:"0.02em" }}>
                    {chef.location}
                  </span>
                </div>

                {/* Name + role over bottom gradient */}
                <div style={{ position:"absolute", bottom:"14px", left:"14px", right:"14px" }}>
                  <p style={{ fontFamily:"Georgia,'Times New Roman',serif", fontStyle:"italic", fontSize:"18px", fontWeight:500, color:"#C9A96E", margin:"0 0 2px", letterSpacing:"0.01em" }}>
                    {chef.name}
                  </p>
                  <p style={{ fontFamily:"-apple-system,system-ui", fontSize:"11px", color:"rgba(255,255,255,0.5)", margin:0 }}>
                    {chef.role} · {chef.venue}
                  </p>
                </div>
              </div>

              {/* Stats pill below photo — Ko-fi style */}
              <div
                style={{
                  marginTop:"12px",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"space-between",
                  background:"rgba(255,255,255,0.04)",
                  backdropFilter:"blur(16px)",
                  WebkitBackdropFilter:"blur(16px)",
                  border:"1.5px solid rgba(201,169,110,0.18)",
                  borderRadius:"40px",
                  padding:"10px 16px",
                  boxShadow:"3px 3px 0 rgba(201,169,110,0.07)",
                  transition:"border-color 0.2s, background 0.2s",
                }}
                className="group-hover:border-ember/40 group-hover:bg-white/[0.07]"
              >
                <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  {/* Heart */}
                  <div style={{ width:"26px", height:"26px", borderRadius:"50%", background:"linear-gradient(135deg,#C9A96E,#D4B878)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 2px 8px rgba(201,169,110,0.35)" }}>
                    <svg width="12" height="11" viewBox="0 0 14 12" fill="#1a1208">
                      <path d="M7 11C7 11 0.5 7 0.5 3.5C0.5 1.8 1.8 0.5 3.5 0.5C5 0.5 6.2 1.4 7 2.5C7.8 1.4 9 0.5 10.5 0.5C12.2 0.5 13.5 1.8 13.5 3.5C13.5 7 7 11 7 11Z"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily:"-apple-system,system-ui", fontSize:"13px", fontWeight:700, color:"rgba(250,248,244,0.88)", margin:0 }}>
                      {chef.tips}+ tips
                    </p>
                    <p style={{ fontFamily:"-apple-system,system-ui", fontSize:"10px", color:"rgba(250,248,244,0.3)", margin:0 }}>received</p>
                  </div>
                </div>

                <span
                  style={{
                    fontFamily:"-apple-system,system-ui", fontSize:"11px", fontWeight:600,
                    color:"#C9A96E", letterSpacing:"0.02em",
                  }}
                >
                  Tip now →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
