import type { Metadata } from "next";
import LightNavbar from "@/components/LightNavbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Service — Tip a Chef",
  description:
    "Read how Tip a Chef collects, uses, and protects your data. Our privacy policy and terms of service, written in plain English.",
  keywords: ["tip a chef privacy policy", "tip a chef terms of service", "tipachef data policy"],
  openGraph: {
    title: "Privacy & Terms — Tip a Chef",
    description: "How we handle your data, your rights, and the rules for using Tip a Chef.",
    url: "https://tipachef.com/privacy",
    type: "website",
  },
  alternates: { canonical: "https://tipachef.com/privacy" },
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-8" style={{ borderBottom: "1px solid #f0f0f0" }}>
      <h2 className="font-sans font-semibold text-graphite text-base mb-4">{title}</h2>
      <div
        className="font-sans font-light leading-relaxed space-y-3 text-sm"
        style={{ color: "#666666" }}
      >
        {children}
      </div>
    </section>
  );
}

const TOC = [
  { id: "intro",     label: "Introduction" },
  { id: "data",      label: "Data we collect" },
  { id: "use",       label: "How we use it" },
  { id: "sharing",   label: "Sharing your data" },
  { id: "retention", label: "Data retention" },
  { id: "rights",    label: "Your rights" },
  { id: "cookies",   label: "Cookies" },
  { id: "payments",  label: "Payments" },
  { id: "terms",     label: "Terms of service" },
  { id: "conduct",   label: "User conduct" },
  { id: "liability", label: "Liability" },
  { id: "changes",   label: "Changes" },
  { id: "contact",   label: "Contact us" },
];

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <style>{`
        .toc-link { color: #aaaaaa; font-size: 0.78rem; display: block; padding: 4px 0; transition: color 0.15s; text-decoration: none; }
        .toc-link:hover { color: #C9A96E; }
      `}</style>
      <LightNavbar />

      <main>

        {/* ── Header ── */}
        <section className="pt-36 pb-14 md:pt-48 md:pb-20">
          <div className="content-container max-w-3xl">
            <p
              className="font-sans text-xs font-medium uppercase tracking-widest mb-8"
              style={{ color: "#C9A96E" }}
            >
              Legal
            </p>
            <h1
              className="font-display text-graphite leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300 }}
            >
              Privacy Policy &{" "}
              <span style={{ color: "#C9A96E", fontStyle: "italic" }}>Terms of Service</span>
            </h1>
            <p
              className="font-sans font-light"
              style={{ fontSize: "0.85rem", color: "#aaaaaa" }}
            >
              Last updated: 1 May 2026 · Written in plain English.
              {" "}Questions?{" "}
              <a href="mailto:legal@tipachef.com" style={{ color: "#C9A96E" }}>
                legal@tipachef.com
              </a>
            </p>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="content-container max-w-3xl">
          <div style={{ height: "1px", background: "#f0f0f0" }} />
        </div>

        {/* ── Body ── */}
        <div className="py-16 md:py-24">
          <div className="content-container">
            <div className="grid md:grid-cols-[180px_1fr] gap-14 max-w-4xl items-start">

              {/* Sticky TOC */}
              <nav className="hidden md:block sticky top-24">
                <p
                  className="font-sans uppercase tracking-widest mb-4"
                  style={{ fontSize: "0.65rem", color: "#cccccc" }}
                >
                  Contents
                </p>
                <div className="space-y-0.5">
                  {TOC.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="toc-link font-sans"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </nav>

              {/* Content */}
              <article>

                <Section id="intro" title="Introduction">
                  <p>Tip a Chef Ltd ("Tip a Chef", "we", "us", "our") operates tipachef.com and related services. This document explains what personal data we collect, how we use it, your rights, and the rules that govern use of our platform.</p>
                  <p>By using Tip a Chef you agree to this policy. If you are under 18, please do not use the service without a parent's permission.</p>
                </Section>

                <Section id="data" title="Data we collect">
                  <p><strong style={{ color: "#333333", fontWeight: 600 }}>Chefs (account holders)</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Name, email address, and profile photo</li>
                    <li>Restaurant or venue name and location</li>
                    <li>Bank account details (collected and stored by Stripe — we never see your raw account numbers)</li>
                    <li>Profile content: bio, photos, story, menu items</li>
                    <li>Usage data: page views, tip events, payout history</li>
                  </ul>
                  <p className="mt-3"><strong style={{ color: "#333333", fontWeight: 600 }}>Supporters (tippers)</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Payment information (processed by Stripe — we never store card numbers)</li>
                    <li>Optional: name and message left with a tip</li>
                    <li>IP address and browser type for fraud prevention</li>
                  </ul>
                  <p className="mt-3"><strong style={{ color: "#333333", fontWeight: 600 }}>All visitors</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Anonymised analytics (pages visited, time on site, device type)</li>
                    <li>Cookies — see the Cookies section below</li>
                  </ul>
                </Section>

                <Section id="use" title="How we use it">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>To operate the platform and process tips</li>
                    <li>To verify chef identities and prevent fraud</li>
                    <li>To send transactional emails (tip confirmations, payout notifications)</li>
                    <li>To improve the product through anonymised analytics</li>
                    <li>To comply with legal and regulatory obligations</li>
                  </ul>
                  <p>We do not sell your data to third parties. We do not use your data to serve advertising.</p>
                </Section>

                <Section id="sharing" title="Sharing your data">
                  <p>We share data only with the following trusted third parties, only to the extent necessary:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong style={{ color: "#333333", fontWeight: 600 }}>Stripe</strong> — payment processing and identity verification</li>
                    <li><strong style={{ color: "#333333", fontWeight: 600 }}>Supabase</strong> — secure database hosting</li>
                    <li><strong style={{ color: "#333333", fontWeight: 600 }}>Vercel</strong> — website hosting</li>
                    <li><strong style={{ color: "#333333", fontWeight: 600 }}>Resend</strong> — transactional email delivery</li>
                  </ul>
                  <p>We may disclose data if required by law or to protect the rights and safety of users.</p>
                </Section>

                <Section id="retention" title="Data retention">
                  <p>Chef account data is retained for the life of the account plus 2 years after deletion (for legal and tax compliance). Tip transaction records are retained for 7 years as required by financial regulations. Anonymised analytics data has no deletion schedule.</p>
                </Section>

                <Section id="rights" title="Your rights">
                  <p>Under GDPR and equivalent laws, you have the right to:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Access a copy of your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Delete your account and associated data</li>
                    <li>Object to or restrict processing</li>
                    <li>Data portability (export your data in machine-readable format)</li>
                  </ul>
                  <p>
                    Email{" "}
                    <a href="mailto:privacy@tipachef.com" style={{ color: "#C9A96E" }}>privacy@tipachef.com</a>
                    {" "}to exercise any of these rights. We respond within 30 days.
                  </p>
                </Section>

                <Section id="cookies" title="Cookies">
                  <p>We use a minimal set of cookies:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong style={{ color: "#333333", fontWeight: 600 }}>Session cookie</strong> — keeps you logged in (essential)</li>
                    <li><strong style={{ color: "#333333", fontWeight: 600 }}>Analytics cookie</strong> — anonymised, first-party only, no cross-site tracking</li>
                  </ul>
                  <p>We do not use third-party advertising cookies. You can disable cookies in your browser settings.</p>
                </Section>

                <Section id="payments" title="Payments">
                  <p>All payments are processed by Stripe, Inc. Tip a Chef never stores or accesses your raw card or bank account numbers. By using the payment features you also agree to{" "}
                    <a href="https://stripe.com/legal/consumer" target="_blank" rel="noopener noreferrer" style={{ color: "#C9A96E" }}>
                      Stripe's Consumer Terms
                    </a>.
                  </p>
                  <p>A small platform fee is deducted from each tip and shown to you before you confirm payment. 100% of the remainder goes to the chef.</p>
                </Section>

                <Section id="terms" title="Terms of service">
                  <p>By creating an account or using Tip a Chef you agree to these terms.</p>
                  <p><strong style={{ color: "#333333", fontWeight: 600 }}>Eligibility.</strong> You must be at least 18 years old to create a chef account or send a tip.</p>
                  <p><strong style={{ color: "#333333", fontWeight: 600 }}>Accurate information.</strong> You agree to provide truthful information. Impersonating a chef, venue, or other person is grounds for immediate account termination.</p>
                  <p><strong style={{ color: "#333333", fontWeight: 600 }}>Our role.</strong> We are a technology platform, not an employer of chefs. We do not guarantee earnings, employment, or availability of the service.</p>
                </Section>

                <Section id="conduct" title="User conduct">
                  <p>You agree not to:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Use the platform for money laundering, fraud, or illegal activity</li>
                    <li>Create fake chef profiles or fake tips</li>
                    <li>Harass, threaten, or abuse any user</li>
                    <li>Attempt to reverse-engineer or scrape the platform</li>
                    <li>Upload content that is defamatory, obscene, or infringes third-party rights</li>
                  </ul>
                  <p>We may suspend or terminate accounts that violate these rules without notice.</p>
                </Section>

                <Section id="liability" title="Limitation of liability">
                  <p>To the maximum extent permitted by law, Tip a Chef Ltd will not be liable for indirect, incidental, or consequential damages arising from your use of the platform. Our total liability for any claim will not exceed the fees you paid to us in the 12 months prior to the claim.</p>
                  <p>The service is provided "as is". We make no warranty that it will be uninterrupted or error-free.</p>
                </Section>

                <Section id="changes" title="Changes to this policy">
                  <p>When we make material changes we will notify active users by email at least 14 days before the changes take effect. Continued use after that date constitutes acceptance of the updated policy.</p>
                </Section>

                <Section id="contact" title="Contact us">
                  <p>Privacy requests: <a href="mailto:privacy@tipachef.com" style={{ color: "#C9A96E" }}>privacy@tipachef.com</a></p>
                  <p>Legal notices: <a href="mailto:legal@tipachef.com" style={{ color: "#C9A96E" }}>legal@tipachef.com</a></p>
                  <p style={{ color: "#aaaaaa" }}>Tip a Chef Ltd · Registered in England & Wales</p>
                </Section>

              </article>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
