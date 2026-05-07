import Navbar        from "@/components/Navbar";
import Hero          from "@/components/Hero";
import WhyThisExists from "@/components/WhyThisExists";
import LiveDemo      from "@/components/LiveDemo";
import QRSection       from "@/components/QRSection";
import EarningsSection from "@/components/EarningsSection";
import ChefProfiles    from "@/components/ChefProfiles";
import DownloadCTA   from "@/components/DownloadCTA";
import ClaimPage     from "@/components/ClaimPage";
import LiveTipFeed   from "@/components/LiveTipFeed";
import Footer        from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tipachef.com/#organization",
      name: "Tip a Chef",
      url: "https://tipachef.com",
      logo: {
        "@type": "ImageObject",
        url: "https://tipachef.com/android-chrome-512x512.png",
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://twitter.com/tipachef",
        "https://instagram.com/tipachef",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@tipachef.com",
        contactType: "customer support",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://tipachef.com/#website",
      url: "https://tipachef.com",
      name: "Tip a Chef",
      publisher: { "@id": "https://tipachef.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://tipachef.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://tipachef.com/#webpage",
      url: "https://tipachef.com",
      name: "Tip a Chef | Make money as a chef",
      description:
        "Tip a Chef lets chefs earn direct tips from the people who love their food. Create your free page, share your link, and get paid instantly for every dish you serve.",
      isPartOf: { "@id": "https://tipachef.com/#website" },
      about: { "@id": "https://tipachef.com/#organization" },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* 1. Nav */}
        <Navbar />
        {/* 2. Hero */}
        <Hero />
        {/* 3. Manifesto */}
        <WhyThisExists />
        {/* 4. Profile demo */}
        <LiveDemo />
        {/* 5. QR code section */}
        <QRSection />
        {/* 6. Earnings section */}
        <EarningsSection />
        {/* 7. Chef profiles */}
        <ChefProfiles />
        {/* 12. Download / final CTA */}
        <DownloadCTA />
        {/* 13. Claim your page */}
        <ClaimPage />
        {/* 14. Footer */}
        <Footer />
        {/* Live tip notifications — fixed bottom-right */}
        <LiveTipFeed />
      </main>
    </>
  );
}
