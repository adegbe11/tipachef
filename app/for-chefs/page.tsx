import type { Metadata } from "next";
import Link  from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Chefs: Get Tips Directly From Your Diners | Tip a Chef",
  description: "Create a free Tip a Chef profile. Your diners scan your QR code, send a tip, and leave a personal message. 100% reaches you instantly via Stripe. No restaurant cut.",
  openGraph: {
    title: "Get Direct Tips From Your Diners | Tip a Chef",
    description: "Free profile. QR code. 100% of every tip goes straight to you.",
    url: "https://tipachef.com/for-chefs",
    type: "website",
  },
  alternates: { canonical: "https://tipachef.com/for-chefs" },
};

const STEPS = [
  { n: "01", title: "Create your free profile", body: "Takes five minutes. Add your name, photo, role, and city. We give you a public profile page and a QR code card." },
  { n: "02", title: "Put your QR code where diners see it", body: "On your pass, on the menu, on a card at the table. Anywhere a diner might want to say thank you." },
  { n: "03", title: "Diner scans, picks an amount, leaves a note", body: "No app download. No account needed on their side. Thirty seconds on any phone." },
  { n: "04", title: "Money hits your Stripe account directly", body: "100% of every tip. Instant transfer. No restaurant cut, no platform fee on tips received." },
];

const EARNINGS = [
  { scenario: "Quiet Tuesday", covers: 30, tip: "$3", total: "$90", note: "Small service, consistent income" },
  { scenario: "Weekend dinner service", covers: 60, tip: "$5", total: "$300", note: "Busy service, strong result" },
  { scenario: "Private dinner (8 guests)", covers: 8, tip: "$20", total: "$160", note: "Intimate event, high appreciation" },
];

const FAQS = [
  { q: "Is it really free?", a: "Yes. Creating a profile, getting your QR code, and receiving tips costs you nothing. We do not take a cut of tips. Stripe's standard processing fee (around 1.5% + 20p) applies, but that is Stripe's fee, not ours." },
  { q: "Does my restaurant need to approve this?", a: "Your profile is yours. It lives on tipachef.com and belongs to you, not your employer. You can use it at any venue you work at, or for private events." },
  { q: "What if I change jobs or cities?", a: "Update your profile in seconds. Your QR code stays the same. Your tips follow you wherever you cook." },
  { q: "Do my diners need to download an app?", a: "No. They open their phone camera, scan the QR code, and it opens a webpage. Nothing to download, no account to create. That is why it works." },
  { q: "When do I receive my tips?", a: "Stripe pays out on a standard schedule (typically next business day for most countries). You set up your Stripe account during onboarding and all payouts go directly there." },
  { q: "Can I use this for private chef events too?", a: "Absolutely. Many chefs on our platform do private dinners and send guests their profile link in advance so they can tip after the meal." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tip a Chef — For Chefs",
  description: "Create a free chef profile and receive direct tips from diners via QR code.",
  url: "https://tipachef.com/for-chefs",
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
};

export default function ForChefsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main style={{ background: "#0a0908", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ paddingTop: "7rem", paddingBottom: "5rem" }}>
          <div className="content-container text-center">
            <p className="eyebrow mb-4">For chefs</p>
            <h1 className="font-display text-ivory" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: "1.5rem" }}>
              The tip your diner wanted{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg,#C9A96E,#D4B878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                to give you
              </em>
            </h1>
            <p style={{ color: "rgba(250,248,244,0.55)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
              Diners want to tip the chef. The current system makes it impossible. Tip a Chef fixes that with a QR code, a phone, and thirty seconds.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/signup" style={{ display: "inline-block", background: "linear-gradient(135deg,#C9A96E,#B8934A)", color: "#1a1208", fontFamily: "-apple-system,system-ui", fontWeight: 700, fontSize: "15px", letterSpacing: "0.04em", padding: "15px 40px", borderRadius: "40px", textDecoration: "none" }}>
                Create your free profile
              </Link>
              <a href="#how-it-works" style={{ display: "inline-block", background: "rgba(255,255,255,0.05)", color: "rgba(250,248,244,0.7)", fontFamily: "-apple-system,system-ui", fontWeight: 600, fontSize: "14px", padding: "15px 32px", borderRadius: "40px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.1)" }}>
                See how it works
              </a>
            </div>
          </div>
        </section>

        {/* The problem */}
        <section style={{ paddingBottom: "5rem" }}>
          <div className="content-container" style={{ maxWidth: "700px" }}>
            <div style={{ background: "rgba(201,169,110,0.06)", border: "1.5px solid rgba(201,169,110,0.2)", borderRadius: "20px", padding: "2.5rem" }}>
              <p className="font-display text-ivory" style={{ fontSize: "1.2rem", fontWeight: 400, fontStyle: "italic", marginBottom: "1rem", lineHeight: 1.5 }}>
                The server gets the tip. You cooked the meal.
              </p>
              <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.5)", margin: 0, lineHeight: 1.8 }}>
                In most restaurants, tips go to front-of-house. If a diner loves their meal and wants to thank the chef directly, they have no way to do it. Tip a Chef is that way. A QR code on your pass, at the table, or on a card. One scan. One direct payment. Yours.
              </p>
            </div>
          </div>
        </section>

        {/* Earnings scenarios */}
        <section style={{ paddingBottom: "5rem" }}>
          <div className="content-container" style={{ maxWidth: "760px" }}>
            <p className="eyebrow mb-8 text-center">What it adds up to</p>
            <div style={{ display: "grid", gap: "14px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {EARNINGS.map((e) => (
                <div key={e.scenario} style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(201,169,110,0.15)", borderRadius: "20px", padding: "1.75rem" }}>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", fontWeight: 700, color: "rgba(250,248,244,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 10px" }}>{e.scenario}</p>
                  <p style={{ fontFamily: "Georgia,serif", fontSize: "2.2rem", fontStyle: "italic", color: "#C9A96E", margin: "0 0 6px", fontWeight: 400 }}>{e.total}</p>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", color: "rgba(250,248,244,0.4)", margin: "0 0 12px" }}>{e.covers} covers · avg {e.tip}/person</p>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", color: "rgba(250,248,244,0.55)", margin: 0, lineHeight: 1.6 }}>{e.note}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", color: "rgba(250,248,244,0.25)", textAlign: "center", marginTop: "1.25rem" }}>Illustrative scenarios. Actual tips vary by venue, cuisine, and diner.</p>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" style={{ paddingBottom: "5rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "4rem" }}>
          <div className="content-container" style={{ maxWidth: "680px" }}>
            <p className="eyebrow mb-8 text-center">How it works</p>
            <div style={{ display: "grid", gap: "2.25rem" }}>
              {STEPS.map((step) => (
                <div key={step.n} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(201,169,110,0.1)", border: "1.5px solid rgba(201,169,110,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "-apple-system,system-ui", fontSize: "11px", fontWeight: 700, color: "#C9A96E", letterSpacing: "0.05em" }}>{step.n}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "Georgia,serif", fontSize: "1rem", color: "rgba(250,248,244,0.9)", margin: "0 0 6px", fontWeight: 500 }}>{step.title}</p>
                    <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.45)", margin: 0, lineHeight: 1.75 }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Tip a Chef */}
        <section style={{ paddingBottom: "5rem" }}>
          <div className="content-container" style={{ maxWidth: "760px" }}>
            <p className="eyebrow mb-8 text-center">Why chefs choose Tip a Chef</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
              {[
                { icon: "💸", title: "100% goes to you", body: "We do not take a cut of your tips. Every penny a diner sends lands in your Stripe account." },
                { icon: "🆓", title: "Free to join", body: "No monthly fee, no setup fee, no hidden charge. Your profile is yours for life." },
                { icon: "📱", title: "No app for diners", body: "Diners scan a QR code and pay from the browser. Nothing to download. Higher conversion." },
                { icon: "🌍", title: "Works anywhere you cook", body: "Restaurant, private event, pop-up, supper club. Your profile moves with you." },
                { icon: "💬", title: "Personal messages", body: "Diners can leave a note with their tip. You get to read what your food meant to them." },
                { icon: "⚡", title: "Instant Stripe payouts", body: "Set up your Stripe account in minutes. Tips land on your standard payout schedule." },
              ].map((item) => (
                <div key={item.title} style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: "18px", padding: "1.5rem" }}>
                  <p style={{ fontSize: "1.6rem", marginBottom: "0.6rem" }}>{item.icon}</p>
                  <p style={{ fontFamily: "Georgia,serif", fontSize: "0.95rem", color: "rgba(250,248,244,0.88)", margin: "0 0 8px", fontWeight: 500 }}>{item.title}</p>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.85rem", color: "rgba(250,248,244,0.4)", margin: 0, lineHeight: 1.7 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ paddingBottom: "5rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "4rem" }}>
          <div className="content-container" style={{ maxWidth: "700px" }}>
            <p className="eyebrow mb-8 text-center">Questions chefs ask</p>
            <div style={{ display: "grid", gap: "1.25rem" }}>
              {FAQS.map((faq, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "1.5rem" }}>
                  <p style={{ fontFamily: "Georgia,serif", fontSize: "1rem", color: "rgba(250,248,244,0.9)", margin: "0 0 10px", fontWeight: 500 }}>{faq.q}</p>
                  <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.5)", margin: 0, lineHeight: 1.75 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ paddingBottom: "8rem" }}>
          <div className="content-container text-center" style={{ maxWidth: "560px" }}>
            <div style={{ background: "rgba(201,169,110,0.06)", border: "1.5px solid rgba(201,169,110,0.2)", borderRadius: "24px", padding: "3rem 2rem" }}>
              <p className="font-display text-ivory" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, fontStyle: "italic", marginBottom: "0.75rem", lineHeight: 1.3 }}>
                Ready to receive your first tip?
              </p>
              <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "0.9rem", color: "rgba(250,248,244,0.45)", marginBottom: "2rem", lineHeight: 1.7 }}>
                Five minutes to set up. Free forever. Your profile goes live the moment you finish.
              </p>
              <Link href="/signup" style={{ display: "inline-block", background: "linear-gradient(135deg,#C9A96E,#B8934A)", color: "#1a1208", fontFamily: "-apple-system,system-ui", fontWeight: 700, fontSize: "15px", letterSpacing: "0.04em", padding: "16px 44px", borderRadius: "40px", textDecoration: "none" }}>
                Create your free profile
              </Link>
              <p style={{ fontFamily: "-apple-system,system-ui", fontSize: "12px", color: "rgba(250,248,244,0.2)", marginTop: "1.25rem" }}>No credit card. No monthly fee. Just your profile and a QR code.</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
