import type { Metadata } from "next";
import Link from "next/link";
import LightNavbar from "@/components/LightNavbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Help Center — Tip a Chef",
  description:
    "Find answers about your chef profile, tips, payouts, account security, and more. Browse our help articles or contact the Tip a Chef support team.",
  keywords: ["tip a chef help", "tipachef support", "chef profile help", "tip a chef faq"],
  openGraph: {
    title: "Help Center — Tip a Chef",
    description: "Browse help articles or get in touch with our support team.",
    url: "https://tipachef.com/help",
    type: "website",
  },
  alternates: { canonical: "https://tipachef.com/help" },
};

const CATEGORIES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Getting Started",
    desc: "What is Tip a Chef, how it works, and how to set up your first profile.",
    count: 8,
    href: "/contact",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: "Your Chef Profile",
    desc: "Setting up your page, adding photos, writing your story, and sharing your QR code.",
    count: 10,
    href: "/contact",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    title: "Receiving Tips",
    desc: "How tips are sent to you, tip amounts, messages from supporters, and notifications.",
    count: 7,
    href: "/contact",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: "Payouts & Banking",
    desc: "Connecting your bank account, payout schedules, minimum amounts, and Stripe setup.",
    count: 12,
    href: "/contact",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "For Supporters",
    desc: "How to find a chef, send a tip, leave a message, and what happens after you tip.",
    count: 6,
    href: "/contact",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: "Account & Security",
    desc: "Changing your email or password, two-factor authentication, and account deletion.",
    count: 8,
    href: "/contact",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
    title: "QR Codes & Sharing",
    desc: "Downloading your QR code, printing it, placing it at your station, and sharing your link.",
    count: 5,
    href: "/contact",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    title: "Troubleshooting",
    desc: "Payment issues, profile not loading, QR code not scanning, and other common problems.",
    count: 9,
    href: "/contact",
  },
];

const POPULAR = [
  { q: "How do I create my chef profile?",          href: "/contact" },
  { q: "When do I get paid?",                        href: "/contact" },
  { q: "How does a supporter send a tip?",           href: "/contact" },
  { q: "How do I download my QR code?",             href: "/contact" },
  { q: "Is Tip a Chef free for chefs?",              href: "/contact" },
  { q: "What percentage does Tip a Chef take?",      href: "/contact" },
];

export default function HelpPage() {
  return (
    <div className="bg-white min-h-screen">
      <LightNavbar />

      <main>

        {/* ── Hero + Search ── */}
        <section
          className="pt-36 pb-20 md:pt-44 md:pb-28"
          style={{ background: "#fafafa", borderBottom: "1px solid #f0f0f0" }}
        >
          <div className="content-container max-w-2xl text-center">
            <p
              className="font-sans text-xs font-medium uppercase tracking-widest mb-6"
              style={{ color: "#C9A96E" }}
            >
              Help Center
            </p>
            <h1
              className="font-display text-graphite leading-tight mb-4"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 300 }}
            >
              How can we help?
            </h1>
            <p
              className="font-sans font-light mb-10"
              style={{ color: "#888888", fontSize: "0.95rem" }}
            >
              Search our help articles or browse by topic below.
            </p>

            {/* Search bar */}
            <div className="relative max-w-lg mx-auto">
              <div
                className="flex items-center gap-3 px-5 py-4 rounded-2xl"
                style={{ background: "#ffffff", border: "1.5px solid #e8e8e8", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search for answers…"
                  className="flex-1 bg-transparent font-sans text-graphite text-sm outline-none"
                  style={{ caretColor: "#C9A96E" }}
                />
              </div>
            </div>

          </div>
        </section>

        {/* ── Categories grid ── */}
        <section className="py-16 md:py-24">
          <div className="content-container max-w-4xl">

            <p
              className="font-sans text-xs font-medium uppercase tracking-widest mb-10"
              style={{ color: "#999999" }}
            >
              Browse by topic
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="group block rounded-2xl p-6 transition-all duration-200"
                  style={{ border: "1px solid #f0f0f0", background: "#ffffff" }}
                  onMouseEnter={undefined}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200 group-hover:bg-amber-50"
                    style={{ background: "rgba(201,169,110,0.07)", border: "1px solid rgba(201,169,110,0.12)", color: "#C9A96E" }}
                  >
                    {cat.icon}
                  </div>
                  <h2
                    className="font-sans font-semibold text-graphite text-sm mb-1.5 group-hover:text-amber-700 transition-colors duration-200"
                  >
                    {cat.title}
                  </h2>
                  <p
                    className="font-sans font-light leading-relaxed mb-3"
                    style={{ fontSize: "0.82rem", color: "#888888" }}
                  >
                    {cat.desc}
                  </p>
                  <p
                    className="font-sans text-xs"
                    style={{ color: "#C9A96E" }}
                  >
                    {cat.count} articles
                  </p>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* ── Divider ── */}
        <div className="content-container max-w-4xl">
          <div style={{ height: "1px", background: "#f0f0f0" }} />
        </div>

        {/* ── Popular articles ── */}
        <section className="py-16 md:py-24">
          <div className="content-container max-w-4xl">

            <p
              className="font-sans text-xs font-medium uppercase tracking-widest mb-10"
              style={{ color: "#999999" }}
            >
              Popular questions
            </p>

            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
              {POPULAR.map((item) => (
                <Link
                  key={item.q}
                  href={item.href}
                  className="group flex items-center justify-between gap-4 rounded-xl px-5 py-4 transition-all duration-200"
                  style={{ border: "1px solid #f0f0f0", background: "#fafafa" }}
                >
                  <span
                    className="font-sans font-light text-sm text-graphite group-hover:text-amber-700 transition-colors duration-200"
                  >
                    {item.q}
                  </span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* ── Still stuck ── */}
        <section style={{ background: "#fafafa", borderTop: "1px solid #f0f0f0" }}>
          <div className="py-16 md:py-24 content-container max-w-2xl text-center">
            <h2
              className="font-display text-graphite leading-tight mb-3"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 300 }}
            >
              Still need help?
            </h2>
            <p
              className="font-sans font-light mb-8"
              style={{ color: "#888888", fontSize: "0.9rem" }}
            >
              Our team replies within one business day.
            </p>
            <Link
              href="/contact"
              className="press inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-sans font-semibold text-sm tracking-wide transition-all duration-200"
              style={{ background: "#C9A96E", color: "#ffffff", boxShadow: "0 4px 16px rgba(201,169,110,0.25)" }}
            >
              Contact support
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
