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

export default function Home() {
  return (
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
  );
}
