import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Auth Card */}
        <div className="bg-card border-2 border-primary/30 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_hsl(217_91%_60%/0.2)]">
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {role === "founder" && "Welcome, Founder"}
                {role === "investor" && "Welcome, Investor"}
                {!role && "Welcome to SharkVest"}
              </h1>
              <p className="text-muted-foreground">
                Authentication coming soon. This page will handle sign-up and login.
              </p>
            </div>

            {role && (
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">
                  Selected role: <span className="font-semibold text-foreground capitalize">{role}</span>
                </p>
              </div>
            )}

            <div className="pt-4">
              <Button variant="hero" size="lg" className="w-full" disabled>
                Sign Up / Login (Coming Soon)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
