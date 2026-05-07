"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";

const CHEFS = [
  { slug:"marco-esposito",  emoji:"🇮🇹", name:"Marco Esposito",  role:"Head Chef",      venue:"Osteria del Fuoco · Rome",   story:"Every pasta I make is a love letter to my grandmother." },
  { slug:"nikos-stavridis", emoji:"🇬🇷", name:"Nikos Stavridis", role:"Pastry Chef",    venue:"Kuzina · Athens",            story:"I put the Aegean sea into every dessert I create." },
  { slug:"sofia-reyes",     emoji:"🇲🇽", name:"Sofia Reyes",     role:"Executive Chef", venue:"Casa Humo · Mexico City",    story:"Spice is the language I grew up speaking at home." },
  { slug:"dimitri-kostas",  emoji:"🇬🇷", name:"Dimitri Kostas",  role:"Head Chef",      venue:"Kuzina · Athens",            story:"Every dish I make carries a piece of the Aegean." },
  { slug:"mehmet-yilmaz",   emoji:"🇹🇷", name:"Mehmet Yilmaz",   role:"Head Chef",      venue:"Mikla · Istanbul",           story:"My kitchen carries the smell of my mother's home." },
  { slug:"lena-fischer",    emoji:"🇩🇪", name:"Lena Fischer",    role:"Sous Chef",      venue:"Facil · Berlin",             story:"Precision is just another word for care on the plate." },
];

function TiltCard({ chef, delay }: { chef: typeof CHEFS[0]; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - 0.5) * 14;
    const y = ((e.clientY - top)  / height - 0.5) * -14;
    el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
  }

  function onLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: "transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94)",
        transformStyle: "preserve-3d",
        animationDelay: `${delay}ms`,
        willChange: "transform",
      }}
      className="neo-glass group flex flex-col rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Flag + glow top block */}
      <div
        className="flex items-center justify-center pt-10 pb-7 relative overflow-hidden"
        style={{ background:"linear-gradient(160deg,rgba(201,169,110,0.06) 0%,transparent 70%)" }}
      >
        <div style={{ position:"absolute", width:"80px", height:"80px", borderRadius:"50%", background:"radial-gradient(circle,rgba(201,169,110,0.2) 0%,transparent 70%)", filter:"blur(20px)" }} />
        <div
          style={{
            width:"64px", height:"64px", borderRadius:"50%",
            background:"rgba(255,255,255,0.05)", backdropFilter:"blur(12px)",
            border:"1.5px solid rgba(201,169,110,0.2)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"2rem", lineHeight:1,
            boxShadow:"0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            position:"relative",
            transition:"transform 0.3s ease, box-shadow 0.3s ease",
          }}
          className="group-hover:scale-110"
        >
          {chef.emoji}
        </div>
      </div>

      <div style={{ height:"1px", background:"linear-gradient(90deg,transparent,rgba(201,169,110,0.25) 50%,transparent)", margin:"0 1.5rem" }} />

      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <p className="font-sans text-ivory font-semibold text-sm tracking-wide">{chef.name}</p>
          <p className="font-sans text-ivory/35 text-xs mt-1">{chef.role} · {chef.venue}</p>
        </div>

        <p className="font-display text-ivory/55 italic leading-snug flex-1" style={{ fontSize:"clamp(0.95rem,1.2vw,1.05rem)", fontWeight:300 }}>
          &ldquo;{chef.story}&rdquo;
        </p>

        <Link
          href={`/${chef.slug}`}
          className="brutal-btn press w-full py-3 rounded-xl bg-ember text-graphite font-sans font-bold text-sm text-center hover:bg-ember-light transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          Tip {chef.name.split(" ")[0]}
        </Link>
      </div>
    </div>
  );
}

export default function ChefProfiles() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  /* Scroll reveal for header */
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

  /* Stagger reveal for grid cards */
  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;
    const cards = Array.from(container.children) as HTMLElement[];
    cards.forEach((c, i) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(36px)";
      c.style.transition = `opacity 0.6s ease ${i * 0.09}s, transform 0.6s ease ${i * 0.09}s`;
    });
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cards.forEach((c) => { c.style.opacity = "1"; c.style.transform = "translateY(0)"; });
        obs.unobserve(container);
      }
    }, { threshold: 0.1 });
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-36" style={{ background:"linear-gradient(180deg,#0d0c0a 0%,#0f0e0b 100%)" }}>
      <div className="content-container">

        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-14">
          <div>
            <p className="eyebrow mb-3">Chef profiles</p>
            <h2 className="font-display text-ivory leading-tight" style={{ fontSize:"clamp(1.9rem,3.5vw,2.8rem)", fontWeight:400 }}>
              Real chefs.{" "}<span className="text-ember-gradient italic">Real gratitude.</span>
            </h2>
          </div>
          <Link href="/search" className="press inline-flex items-center gap-2 text-sm font-sans font-medium text-ivory/40 hover:text-ember transition-colors duration-200 flex-shrink-0 mb-1">
            Browse all chefs
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CHEFS.map((chef, i) => (
            <TiltCard key={chef.slug} chef={chef} delay={i * 90} />
          ))}
        </div>

        <p className="text-center font-sans text-ivory/25 text-sm mt-12">
          Hundreds of chefs. One tap away.{" "}
          <Link href="/search" className="text-ivory/40 hover:text-ember transition-colors underline underline-offset-2">Find one near you →</Link>
        </p>

      </div>
    </section>
  );
}
