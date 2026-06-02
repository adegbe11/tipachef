import Link from "next/link";

// Sitewide internal-link hub. Every page renders this, so these links spread
// crawl paths and ranking authority to the key SEO pages from all 35k+ URLs.
const LINK_COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Private chefs",
    links: [
      { label: "Hire a private chef",        href: "/private-chef" },
      { label: "Private chef for a wedding",  href: "/private-chef-for-wedding" },
      { label: "Find a chef to tip",          href: "/search" },
      { label: "How it works",                href: "/tutorial" },
    ],
  },
  {
    heading: "Top cities",
    links: [
      { label: "Private chef in London",      href: "/private-chef/london" },
      { label: "Private chef in New York",    href: "/private-chef/new-york" },
      { label: "Private chef in Paris",       href: "/private-chef/paris" },
      { label: "Private chef in Dubai",       href: "/private-chef/dubai" },
      { label: "Private chef in Los Angeles", href: "/private-chef/los-angeles" },
      { label: "Private chef in Sydney",      href: "/private-chef/sydney" },
    ],
  },
  {
    heading: "Tipping guides",
    links: [
      { label: "Do you tip a private chef?",      href: "/tipping/do-you-tip-a-private-chef" },
      { label: "How much to tip a hibachi chef?", href: "/tipping/how-much-to-tip-a-hibachi-chef" },
      { label: "Do you tip a sushi chef?",        href: "/tipping/do-you-tip-a-sushi-chef" },
      { label: "Do chefs get tips?",              href: "/tipping/do-chefs-get-tips" },
      { label: "All tipping guides",              href: "/tipping" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",        href: "/about" },
      { label: "For chefs",    href: "/for-chefs" },
      { label: "Blog",         href: "/blog" },
      { label: "Editorial team", href: "/team" },
      { label: "Help",         href: "/help" },
      { label: "Contact",      href: "/contact" },
    ],
  },
];

const BOTTOM_LINKS = [
  { label: "Instagram",       href: "https://instagram.com/tipachef" },
  { label: "X (Twitter)",     href: "https://twitter.com/tipachef"   },
  { label: "Privacy & Terms", href: "/privacy"                       },
];

export default function Footer() {
  return (
    <footer
      style={{ background:"#080706", borderTop:"2px solid rgba(201,169,110,0.12)", overflow:"hidden" }}
    >
      {/* ── Internal-link hub ── */}
      <div className="px-5 pt-14 pb-8" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
            gap: "32px",
          }}
        >
          {LINK_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontFamily: "-apple-system, system-ui",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  margin: "0 0 14px",
                }}
              >
                {col.heading}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="hover:text-ember transition-colors duration-200"
                      style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", color: "rgba(250,248,244,0.45)", textDecoration: "none", lineHeight: 1.4 }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Giant neo-brutal wordmark */}
      <div style={{ position:"relative" }}>
        <div className="pt-6 pb-0 leading-none select-none overflow-hidden relative">
          <p
            className="font-sans font-black text-center whitespace-nowrap"
            style={{
              fontSize: "18.5vw",
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
              color: "transparent",
              WebkitTextStroke: "2px rgba(201,169,110,0.5)",
              textShadow: "none",
            }}
          >
            TIP A CHEF
          </p>
          <p
            aria-hidden
            className="font-sans font-black text-center whitespace-nowrap absolute inset-0 flex items-center justify-center"
            style={{
              fontSize: "18.5vw",
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
              color: "#C9A96E",
              opacity: 0.18,
              paddingTop: "1.5rem",
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
        <span className="font-sans text-ivory/20 text-xs whitespace-nowrap">
          © Tip a Chef
        </span>
      </div>

    </footer>
  );
}
