import Navbar        from "@/components/Navbar";
import Hero          from "@/components/Hero";
import WhyThisExists from "@/components/WhyThisExists";
import LiveDemo      from "@/components/LiveDemo";
import ChefProfiles  from "@/components/ChefProfiles";
import SocialProof   from "@/components/SocialProof";
import ForChefs      from "@/components/ForChefs";
import ForRestaurants from "@/components/ForRestaurants";
import TrustSafety   from "@/components/TrustSafety";
import DownloadCTA   from "@/components/DownloadCTA";
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
      name: "Tip a Chef — Tip Your Favourite Chef in Seconds",
      description:
        "Great food deserves more than applause. Tip a Chef lets your fans tip you in seconds, leave a note, and support the chef behind every dish they love.",
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
        {/* 7. Chef profiles */}
        <ChefProfiles />
        {/* 8. Social proof */}
        <SocialProof />
        {/* 9. For chefs */}
        <ForChefs />
        {/* 10. For restaurants */}
        <ForRestaurants />
        {/* 11. Trust & safety */}
        <TrustSafety />
        {/* 12. Download / final CTA */}
        <DownloadCTA />
        {/* 13. Footer */}
        <Footer />
      </main>
    </>
  );
}
