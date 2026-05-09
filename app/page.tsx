import Navbar             from "@/components/Navbar";
import Hero               from "@/components/Hero";
import GetOnBoard         from "@/components/GetOnBoard";
import ProfileQRShowcase  from "@/components/ProfileQRShowcase";
import WhyThisExists      from "@/components/WhyThisExists";
import LiveDemo           from "@/components/LiveDemo";
import QRSection          from "@/components/QRSection";
import EarningsSection    from "@/components/EarningsSection";
import ChefProfiles       from "@/components/ChefProfiles";
import DownloadCTA        from "@/components/DownloadCTA";
import ClaimPage          from "@/components/ClaimPage";
import Footer             from "@/components/Footer";

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
        "Join thousands of chefs worldwide on Tip a Chef. Make money as a chef with every dish you serve. Create your page, get your link and QR code, get tipped instantly.",
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
        {/* 3. Get on board — URL claim + live QR (right after hero) */}
        <GetOnBoard />
        {/* 4. Profile card + QR code showcase */}
        <ProfileQRShowcase />
        {/* 4. Manifesto */}
        <WhyThisExists />
        {/* 5. Profile demo */}
        <LiveDemo />
        {/* 6. QR code section */}
        <QRSection />
        {/* 7. Earnings section */}
        <EarningsSection />
        {/* 8. Chef profiles */}
        <ChefProfiles />
        {/* 9. Download / final CTA */}
        <DownloadCTA />
        {/* 10. Claim your page */}
        <ClaimPage />
        {/* 11. Footer */}
        <Footer />
      </main>
    </>
  );
}
