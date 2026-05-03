import Image from "next/image";
import Link from "next/link";

const LINKS = {
  Product: [
    { label: "How it works",  href: "#how-it-works" },
    { label: "For chefs",     href: "#for-chefs"    },
    { label: "For restaurants", href: "#restaurants" },
    { label: "Download",      href: "#download"     },
  ],
  Company: [
    { label: "About",    href: "/about"   },
    { label: "Blog",     href: "/blog"    },
    { label: "Careers",  href: "/careers" },
    { label: "Contact",  href: "/contact" },
  ],
  Legal: [
    { label: "Privacy",  href: "/privacy" },
    { label: "Terms",    href: "/terms"   },
    { label: "Cookies",  href: "/cookies" },
  ],
};

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com/tipachef",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/tipachef",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@tipachef",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.23 8.23 0 004.81 1.53V6.77a4.85 4.85 0 01-1.04-.08z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-graphite">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <Image src="/tipchef-logo.png" alt="Tip a Chef" width={32} height={32} className="rounded-lg" />
              <span className="font-display text-lg font-medium text-ivory" style={{ letterSpacing: "0.15em" }}>
                TIP A CHEF
              </span>
            </Link>
            <p className="font-sans text-ivory/40 text-xs leading-relaxed font-light mb-6 max-w-[200px]">
              Connecting diners directly with the chefs who feed them.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="press w-9 h-9 rounded-full glass flex items-center justify-center text-ivory/40 hover:text-ember transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="eyebrow text-ivory/30 mb-5">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans text-ivory/45 text-sm hover:text-ivory transition-colors duration-200 font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="gold-line mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-ivory/25 text-xs font-light">
            &copy; {new Date().getFullYear()} Tip a Chef Ltd. All rights reserved.
          </p>
          <p className="font-sans text-ivory/20 text-xs font-light">
            Made with care for the people who cook.
          </p>
        </div>
      </div>
    </footer>
  );
}
