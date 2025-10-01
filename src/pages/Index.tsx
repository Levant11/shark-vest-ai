import { Hero } from "@/components/Hero";
import { UserRoleCards } from "@/components/UserRoleCards";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <UserRoleCards />
      <FeatureShowcase />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
