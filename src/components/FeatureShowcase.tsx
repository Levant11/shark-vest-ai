import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles, Shield, Users } from "lucide-react";

const showcaseFeatures = [
  {
    icon: Sparkles,
    title: "AI Matching",
    description: "Get personalized startup recommendations with precision match scores.",
    demo: "92% match with Investor X based on sector, stage, and preferences",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Shield,
    title: "Deal Workspace",
    description: "Secure data rooms with e-NDA signing, watermarking, and viewer analytics.",
    demo: "Bank-grade encryption • Version control • Real-time collaboration",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Users,
    title: "AI Advisor",
    description: "Refine pitches, model valuations, and structure deals with AI guidance.",
    demo: "Pitch scoring • SAFE/Equity calculator • Communication coach",
    color: "from-primary-glow/20 to-primary-glow/5",
  },
];

export const FeatureShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % showcaseFeatures.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + showcaseFeatures.length) % showcaseFeatures.length);
  };

  const activeFeature = showcaseFeatures[activeIndex];
  const Icon = activeFeature.icon;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Built for Speed and
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Intelligence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Save time with AI-curated matches and powerful collaboration tools.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <Card className="relative p-12 md:p-16 bg-card border-2 border-primary/30 overflow-hidden">
            {/* Dynamic Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${activeFeature.color} transition-all duration-500`} />

            {/* Content */}
            <div className="relative z-10 space-y-8">
              {/* Icon & Title */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold">{activeFeature.title}</h3>
              </div>

              {/* Description */}
              <p className="text-xl text-muted-foreground max-w-2xl">
                {activeFeature.description}
              </p>

              {/* Demo Visual */}
              <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-8 min-h-[200px] flex items-center justify-center">
                <p className="text-lg text-center text-muted-foreground max-w-lg">
                  {activeFeature.demo}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="rounded-full"
                  aria-label="Previous feature"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                {/* Dots */}
                <div className="flex gap-2">
                  {showcaseFeatures.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? "w-8 bg-primary"
                          : "bg-border hover:bg-muted-foreground"
                      }`}
                      aria-label={`Go to feature ${index + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="rounded-full"
                  aria-label="Next feature"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>

          {/* CTA Below Carousel */}
          <div className="text-center mt-8">
            <Button variant="hero" size="lg" onClick={() => window.location.href = '/auth'}>
              Explore All Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
