import type { Metadata } from "next";
import LightNavbar from "@/components/LightNavbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Tip a Chef",
  description:
    "Read the Tip a Chef Terms of Service. These terms govern your use of tipachef.com, chef profiles, and the tipping platform.",
  keywords: ["tip a chef terms", "tipachef terms of service", "chef tipping platform terms"],
  openGraph: {
    title: "Terms of Service — Tip a Chef",
    description: "The rules for using Tip a Chef, written in plain English.",
    url: "https://tipachef.com/terms",
    type: "website",
  },
  alternates: { canonical: "https://tipachef.com/terms" },
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-8" style={{ borderBottom: "1px solid #f0f0f0" }}>
      <h2 className="font-sans font-semibold text-graphite text-base mb-4">{title}</h2>
      <div className="font-sans font-light leading-relaxed space-y-3 text-sm" style={{ color: "#666666" }}>
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <LightNavbar />

      <main className="content-container max-w-3xl pt-36 pb-24 md:pt-48">
        <p className="font-sans text-xs font-medium uppercase tracking-widest mb-6" style={{ color: "#C9A96E" }}>
          Legal
        </p>
        <h1 className="font-sans font-semibold text-graphite mb-2" style={{ fontSize: "2rem", letterSpacing: "-0.02em" }}>
          Terms of Service
        </h1>
        <p className="font-sans text-sm mb-12" style={{ color: "#999" }}>
          Last updated: 1 May 2026
        </p>

        <Section id="intro" title="1. Introduction">
          <p>
            These Terms of Service govern your use of Tip a Chef (tipachef.com), operated by Tip a Chef Ltd
            (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By creating an account or using our platform, you agree to these terms.
            If you do not agree, please do not use the service.
          </p>
        </Section>

        <Section id="service" title="2. What We Provide">
          <p>
            Tip a Chef provides a platform that allows diners to send direct tips to chefs via a public
            profile page and QR code. We facilitate payments through Stripe Connect. We are not a payment
            institution — Stripe processes and holds funds.
          </p>
          <p>
            Tips sent through Tip a Chef are voluntary and non-refundable. They do not form part of any
            employment contract between a chef and their employer.
          </p>
        </Section>

        <Section id="accounts" title="3. Chef Accounts">
          <p>
            To create a chef profile you must be at least 18 years old and a legitimate culinary professional.
            You are responsible for the accuracy of information on your profile, including your name, role,
            restaurant, and location.
          </p>
          <p>
            You must connect a valid Stripe account to receive payouts. Tips are transferred directly to your
            Stripe balance. Tip a Chef does not hold funds on your behalf.
          </p>
          <p>
            We reserve the right to suspend or remove accounts that contain false information, violate these
            terms, or are used for fraudulent purposes.
          </p>
        </Section>

        <Section id="fees" title="4. Fees and Payments">
          <p>
            Creating a chef profile is free. There are no monthly fees. A platform fee of 5% is deducted
            from tips processed through Stripe Connect when a chef has connected their Stripe account.
            Stripe&apos;s own processing fees also apply and are shown at checkout.
          </p>
          <p>
            Tips sent to chefs who have not yet connected a Stripe account will be held according to
            Stripe&apos;s policies and released when the chef completes onboarding.
          </p>
        </Section>

        <Section id="conduct" title="5. Acceptable Use">
          <p>You must not use Tip a Chef to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Submit false, misleading, or fraudulent tips or profile information</li>
            <li>Impersonate another person or chef</li>
            <li>Use the platform for money laundering or any unlawful financial activity</li>
            <li>Scrape, copy, or reproduce platform content without permission</li>
            <li>Attempt to circumvent Stripe&apos;s payment systems</li>
          </ul>
        </Section>

        <Section id="ip" title="6. Intellectual Property">
          <p>
            The Tip a Chef brand, logo, design, and written content are owned by Tip a Chef Ltd. Chef
            profile content (photos, bios) remains owned by the chef who submitted it. By uploading content
            to your profile, you grant us a non-exclusive licence to display it on the platform.
          </p>
        </Section>

        <Section id="liability" title="7. Limitation of Liability">
          <p>
            Tip a Chef is provided &quot;as is&quot;. We do not guarantee uninterrupted service or that tips will
            always be processed without delay. To the maximum extent permitted by law, we are not liable
            for indirect, incidental, or consequential losses arising from your use of the platform.
          </p>
          <p>
            Our total liability to you for any claim arising from these terms is limited to the amount
            of fees paid to us in the preceding 12 months, or £100, whichever is greater.
          </p>
        </Section>

        <Section id="termination" title="8. Account Termination">
          <p>
            You may delete your account at any time from your dashboard. We may suspend or terminate
            accounts that violate these terms, with or without notice depending on the severity of the breach.
          </p>
          <p>
            On termination, your public profile is removed. Any pending payouts will be handled according
            to Stripe&apos;s standard policies.
          </p>
        </Section>

        <Section id="changes" title="9. Changes to These Terms">
          <p>
            We may update these terms from time to time. We will notify registered chefs of material
            changes by email. Continued use of the platform after changes constitutes acceptance.
          </p>
        </Section>

        <Section id="law" title="10. Governing Law">
          <p>
            These terms are governed by the laws of England and Wales. Any disputes will be subject to
            the exclusive jurisdiction of the courts of England and Wales.
          </p>
        </Section>

        <div className="pt-8">
          <p className="font-sans text-sm" style={{ color: "#999" }}>
            Questions about these terms? Email us at{" "}
            <a href="mailto:hello@tipachef.com" className="underline hover:text-graphite transition-colors">
              hello@tipachef.com
            </a>
            {" "}or visit our{" "}
            <a href="/contact" className="underline hover:text-graphite transition-colors">
              contact page
            </a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
