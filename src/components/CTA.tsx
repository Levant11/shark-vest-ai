import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-card to-card border-2 border-primary/30 shadow-[0_8px_32px_hsl(217_91%_60%/0.2)]">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl" />

            {/* Content */}
            <div className="relative z-10 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Ready to Transform
                  <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Your Investment Journey?
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Join the waitlist for early access. Be among the first to experience the future of MENA investment.
                </p>
              </div>

              {/* Email Signup Form */}
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 h-12 bg-background/50 border-border focus:border-primary"
                  />
                  <Button variant="hero" size="lg" className="group">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  No credit card required. Launch Q2 2026.
                </p>
              </div>

              {/* Stats */}
              <div className="pt-8 grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-border/50">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">$250M+</div>
                  <div className="text-sm text-muted-foreground">Target GMV</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">50K+</div>
                  <div className="text-sm text-muted-foreground">Users Goal</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">1K+</div>
                  <div className="text-sm text-muted-foreground">Deals Target</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
