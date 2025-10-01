import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Sparkles, Crown } from "lucide-react";

const plans = {
  startups: [
    {
      name: "Free",
      price: "0",
      description: "For early-stage exploration",
      features: [
        "Basic profile listing",
        "Blurred investor list",
        "Summary AI scores",
        "Community forum access",
      ],
      limitations: ["0% platform fee"],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "49",
      description: "For serious fundraising",
      features: [
        "Full AI evaluation reports",
        "10 secure document uploads",
        "20 investor invites/month",
        "Pitch deck generator",
        "Priority support",
      ],
      limitations: ["1% success fee"],
      cta: "Start Pro",
      popular: true,
    },
    {
      name: "Premium",
      price: "99",
      description: "For scaling startups",
      features: [
        "Unlimited investor invites",
        "Unlimited document storage",
        "Featured profile badge",
        "AI communication coach",
        "Demo day participation",
        "Dedicated account manager",
      ],
      limitations: ["1% success fee"],
      cta: "Go Premium",
      popular: false,
    },
  ],
  investors: [
    {
      name: "Free",
      price: "0",
      description: "Browse and explore",
      features: [
        "5 startup previews/month",
        "Basic search filters",
        "Summary investment scores",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "149",
      description: "For active investors",
      features: [
        "Unlimited startup browsing",
        "Full data room access",
        "AI due-diligence reports",
        "Virtual demo days",
        "Advanced analytics",
      ],
      cta: "Start Pro",
      popular: true,
    },
    {
      name: "Elite",
      price: "299",
      description: "For institutional investors",
      features: [
        "Priority deal flow",
        "White-glove account manager",
        "Exclusive investor events",
        "API access for integration",
        "Custom reports & insights",
      ],
      cta: "Go Elite",
      popular: false,
    },
  ],
};

export const Pricing = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Transparent Pricing
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              For Every Stage
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Startups Plans */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            For Startups
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.startups.map((plan, index) => (
              <Card
                key={index}
                className={`relative p-8 ${
                  plan.popular
                    ? "border-primary shadow-[0_8px_32px_hsl(217_91%_60%/0.2)]"
                    : "border-border"
                } transition-all duration-300 hover:border-primary/50`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Content */}
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h4>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Limitations */}
                  {plan.limitations && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">{plan.limitations[0]}</p>
                    </div>
                  )}

                  {/* CTA */}
                  <Button
                    variant={plan.popular ? "hero" : "hero-secondary"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Investors Plans */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Crown className="w-6 h-6 text-accent" />
            For Investors
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.investors.map((plan, index) => (
              <Card
                key={index}
                className={`relative p-8 ${
                  plan.popular
                    ? "border-primary shadow-[0_8px_32px_hsl(217_91%_60%/0.2)]"
                    : "border-border"
                } transition-all duration-300 hover:border-primary/50`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h4>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "hero" : "hero-secondary"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
