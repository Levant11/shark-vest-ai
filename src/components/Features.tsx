import { Brain, Shield, Network, TrendingUp, FileCheck, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import aiIcon from "@/assets/ai-icon.jpg";
import securityIcon from "@/assets/security-icon.jpg";
import networkIcon from "@/assets/network-icon.jpg";

const features = [
  {
    icon: Brain,
    image: aiIcon,
    title: "AI-Powered Matching",
    description: "Intelligent algorithms match startups with ideal investors based on sector, stage, and investment preferences.",
  },
  {
    icon: Shield,
    image: securityIcon,
    title: "Secure Data Rooms",
    description: "Bank-grade encryption, e-NDA signing, watermarking, and detailed viewer analytics for complete security.",
  },
  {
    icon: Network,
    image: networkIcon,
    title: "Global Network",
    description: "Access to verified investors from angels to PE firms across MENA and beyond.",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description: "Track engagement, monitor deal pipeline, and get AI-generated market insights instantly.",
  },
  {
    icon: FileCheck,
    title: "Smart Due Diligence",
    description: "Automated evaluation reports covering market analysis, team assessment, and risk scoring.",
  },
  {
    icon: Zap,
    title: "Fast Deal Closing",
    description: "Streamlined workflows from first contact to signed term sheet in record time.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything You Need to
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Close Deals Faster
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Built for the MENA region, designed to scale globally. Leverage cutting-edge AI and automation.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="relative group p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_32px_hsl(217_91%_60%/0.15)] overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10 space-y-4">
                {/* Icon or Image */}
                {feature.image ? (
                  <div className="w-16 h-16 rounded-lg overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                )}

                {/* Text */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
