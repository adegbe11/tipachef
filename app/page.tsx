import Navbar           from "@/components/Navbar";
import Hero             from "@/components/Hero";
import StatsBar         from "@/components/StatsBar";
import SocialProofStrip from "@/components/SocialProofStrip";
import HowItWorks       from "@/components/HowItWorks";
import LiveDemo      from "@/components/LiveDemo";
import TipTiers      from "@/components/TipTiers";
import Memberships   from "@/components/Memberships";
import ForChefs      from "@/components/ForChefs";
import ForRestaurants from "@/components/ForRestaurants";
import WallOfLove    from "@/components/WallOfLove";
import WhyTipAChef   from "@/components/WhyTipAChef";
import Testimonials  from "@/components/Testimonials";
import DownloadCTA   from "@/components/DownloadCTA";
import Footer        from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsBar />
      <SocialProofStrip />
      <HowItWorks />
      <LiveDemo />
      <TipTiers />
      <Memberships />
      <ForChefs />
      <ForRestaurants />
      <WallOfLove />
      <WhyTipAChef />
      <Testimonials />
      <DownloadCTA />
      <Footer />
    </main>
  );
}
