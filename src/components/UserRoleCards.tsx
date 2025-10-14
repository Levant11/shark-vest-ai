import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, TrendingUp, ArrowRight } from "lucide-react";

export const UserRoleCards = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Choose Your Path to
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Success
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Whether you're raising capital or seeking opportunities, SharkVest is built for you.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Founder Card */}
          <Card className="relative group p-12 bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_32px_hsl(217_91%_60%/0.2)] overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative z-10 text-center space-y-6">
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                <Rocket className="w-10 h-10 text-primary" />
              </div>

              {/* Text */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">For Founders</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Grow your startup with AI-matched investors, secure data rooms, and expert advisory tools.
                </p>
              </div>

              {/* CTA */}
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full group/btn"
                onClick={() => window.location.href = '/founder/dashboard'}
              >
                Start as Founder
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>

              {/* Features List */}
              <ul className="text-sm text-muted-foreground space-y-2 pt-4 border-t border-border/50">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  AI-powered investor matching
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Secure data room & e-NDA
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Pitch deck & advisory tools
                </li>
              </ul>
            </div>
          </Card>

          {/* Investor Card */}
          <Card className="relative group p-12 bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_32px_hsl(217_91%_60%/0.2)] overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative z-10 text-center space-y-6">
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto group-hover:bg-accent/20 transition-colors duration-300">
                <TrendingUp className="w-10 h-10 text-accent" />
              </div>

              {/* Text */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">For Investors</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Discover curated startups, conduct AI-powered due diligence, and close deals faster.
                </p>
              </div>

              {/* CTA */}
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full group/btn"
                onClick={() => window.location.href = '/investor/dashboard'}
              >
                Start as Investor
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>

              {/* Features List */}
              <ul className="text-sm text-muted-foreground space-y-2 pt-4 border-t border-border/50">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  AI-curated deal flow
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Smart due diligence reports
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Exclusive demo days
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
