import Navbar        from "@/components/Navbar";
import Hero          from "@/components/Hero";
import StatsBar      from "@/components/StatsBar";
import HowItWorks    from "@/components/HowItWorks";
import LiveDemo      from "@/components/LiveDemo";
import WhyThisExists from "@/components/WhyThisExists";
import ChefProfiles  from "@/components/ChefProfiles";
import SocialProof   from "@/components/SocialProof";
import ForChefs      from "@/components/ForChefs";
import ForRestaurants from "@/components/ForRestaurants";
import TrustSafety   from "@/components/TrustSafety";
import DownloadCTA   from "@/components/DownloadCTA";
import Footer        from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <LiveDemo />
      <WhyThisExists />
      <ChefProfiles />
      <SocialProof />
      <ForChefs />
      <ForRestaurants />
      <TrustSafety />
      <DownloadCTA />
      <Footer />
    </main>
  );
}
