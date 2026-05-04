import Navbar          from "@/components/Navbar";
import Hero            from "@/components/Hero";
import StatsBar        from "@/components/StatsBar";
import HowItWorks      from "@/components/HowItWorks";
import LiveDemo        from "@/components/LiveDemo";
import TipTiers        from "@/components/TipTiers";
import Memberships     from "@/components/Memberships";
import ForChefs        from "@/components/ForChefs";
import ForRestaurants  from "@/components/ForRestaurants";
import Leaderboard     from "@/components/Leaderboard";
import ComparisonTable from "@/components/ComparisonTable";
import Testimonials    from "@/components/Testimonials";
import FinalCTA        from "@/components/FinalCTA";
import Footer          from "@/components/Footer";

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
        {/* 3. Stats bar */}
        <StatsBar />
        {/* 4. How it works */}
        <HowItWorks />
        {/* 5. Profile demo */}
        <LiveDemo />
        {/* 6. Tip tiers */}
        <TipTiers />
        {/* 7. Memberships */}
        <Memberships />
        {/* 8. For chefs */}
        <ForChefs />
        {/* 9. For restaurants */}
        <ForRestaurants />
        {/* 10. Leaderboard */}
        <Leaderboard />
        {/* 11. Comparison table */}
        <ComparisonTable />
        {/* 12. Testimonials */}
        <Testimonials />
        {/* 13. Final CTA */}
        <FinalCTA />
        {/* 14. Footer */}
        <Footer />
      </main>
    </>
  );
}
