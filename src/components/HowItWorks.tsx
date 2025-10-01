import { UserPlus, Search, MessageSquare, Handshake } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Sign Up & Get Verified",
    description: "Quick KYC process for startups and investors. Build your profile and Trust Score.",
  },
  {
    icon: Search,
    number: "02",
    title: "AI-Powered Matching",
    description: "Our algorithm connects you with perfect matches based on 25+ data points.",
  },
  {
    icon: MessageSquare,
    number: "03",
    title: "Connect & Collaborate",
    description: "Secure messaging, data room access, and virtual demo days with built-in tools.",
  },
  {
    icon: Handshake,
    number: "04",
    title: "Close the Deal",
    description: "E-signature, automated invoicing, and compliance tracking all in one place.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Simple Process,
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Powerful Results
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            From first contact to signed deal in four streamlined steps
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="relative z-10 space-y-6">
                  {/* Icon Container */}
                  <div className="relative w-32 h-32 mx-auto">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    
                    {/* Main Circle */}
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-card to-card border-2 border-primary flex items-center justify-center">
                      <step.icon className="w-12 h-12 text-primary" />
                    </div>

                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
