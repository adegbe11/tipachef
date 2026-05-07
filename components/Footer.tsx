import Link from "next/link";

const BOTTOM_LINKS = [
  { label: "Blog",            href: "/blog"                          },
  { label: "Help",            href: "/help"                          },
  { label: "Contact",         href: "/contact"                       },
  { label: "Instagram",       href: "https://instagram.com/tipachef" },
  { label: "X (Twitter)",     href: "https://twitter.com/tipachef"   },
  { label: "Privacy & Terms", href: "/privacy"                       },
  { label: "About",           href: "/about"                         },
];

export default function Footer() {
  return (
    <footer
      style={{ background:"#080706", borderTop:"2px solid rgba(201,169,110,0.12)", overflow:"hidden" }}
    >
      {/* Ember glow behind text */}
      <div style={{ position:"relative" }}>
        <div
          style={{
            position:"absolute", left:"50%", top:"50%",
            transform:"translate(-50%,-50%)",
            width:"60%", height:"100%",
            background:"radial-gradient(ellipse at center,rgba(201,169,110,0.07) 0%,transparent 70%)",
            pointerEvents:"none",
          }}
        />

        {/* Giant neo-brutal wordmark */}
        <div className="pt-10 pb-0 leading-none select-none overflow-hidden relative">
          <p
            className="font-sans font-black text-center whitespace-nowrap"
            style={{
              fontSize: "18.5vw",
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
              /* neo-brutalism: fill transparent, stroke ember */
              color: "transparent",
              WebkitTextStroke: "2px rgba(201,169,110,0.5)",
              /* second layer: filled version on top via text-shadow trick */
              textShadow: "none",
            }}
          >
            TIP A CHEF
          </p>
          {/* Filled layer stacked — creates dual-tone neo-brutal effect */}
          <p
            aria-hidden
            className="font-sans font-black text-center whitespace-nowrap absolute inset-0 flex items-center justify-center"
            style={{
              fontSize: "18.5vw",
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
              color: "#C9A96E",
              opacity: 0.18,
              paddingTop: "2.5rem",
            }}
          >
            TIP A CHEF
          </p>
        </div>
      </div>

      {/* Thick ember rule */}
      <div style={{ height:"1px", background:"linear-gradient(90deg,transparent,rgba(201,169,110,0.3) 50%,transparent)", margin:"0 auto", maxWidth:"300px" }} />

      <div className="px-2 py-7 flex flex-wrap items-center justify-center gap-6">
        {BOTTOM_LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="font-sans text-ivory/30 text-xs hover:text-ember transition-colors duration-200 whitespace-nowrap tracking-wide"
          >
            {l.label}
          </Link>
        ))}
      </div>

    </footer>
  );
}
