import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import WhySmartClassAI from "./WhySmartClassAI";
import DashboardHighlights from "./DashboardHighlights";
import PricingSection from "./PricingSection";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

const SmartClassAILanding = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <WhySmartClassAI />
      <DashboardHighlights />
      <PricingSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default SmartClassAILanding;