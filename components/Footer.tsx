import Link from "next/link";

const COLS = [
  {
    head: "Product",
    links: [
      { label: "How it works",    href: "/#how-it-works" },
      { label: "For chefs",       href: "/#for-chefs"    },
      { label: "For restaurants", href: "/#restaurants"  },
      { label: "Download QR",     href: "/dashboard"     },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "About",   href: "/about"                       },
      { label: "Blog",    href: "/about#story"                  },
      { label: "Careers", href: "mailto:careers@tipachef.com"  },
      { label: "Contact", href: "/contact"                      },
    ],
  },
  {
    head: "Legal",
    links: [
      { label: "Privacy", href: "/privacy"         },
      { label: "Terms",   href: "/terms"           },
      { label: "Cookies", href: "/privacy#cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t" style={{ background: "#0D0A06", borderColor: "#1E1810" }}>
      <div className="content-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Col 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span
                className="font-display"
                style={{ fontStyle: "italic", fontSize: "1.3rem", fontWeight: 400, color: "#C9A84C" }}
              >
                Tip a Chef
              </span>
            </Link>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "#6B5C42" }}>
              Connecting diners directly with the chefs who feed them.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://instagram.com/tipachef" aria-label="Instagram"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: "#15100A", border: "1px solid #1E1810", color: "#6B5C42" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://twitter.com/tipachef" aria-label="X (Twitter)"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: "#15100A", border: "1px solid #1E1810", color: "#6B5C42" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.852L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Cols 2-4 */}
          {COLS.map(col => (
            <div key={col.head}>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "#6B5C42" }}>
                {col.head}
              </p>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-sans text-sm hover:text-amber-400 transition-colors duration-200"
                      style={{ color: "#6B5C42" }}
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

      {/* Bottom bar */}
      <div className="border-t px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 content-container" style={{ borderColor: "#1E1810" }}>
        <p className="font-sans text-xs" style={{ color: "#6B5C42" }}>
          &copy; 2026 Tip a Chef Ltd.
        </p>
        <p className="font-sans text-xs" style={{ color: "#6B5C42" }}>
          Made with care for the people who cook.
        </p>
      </div>
    </footer>
  );
}
