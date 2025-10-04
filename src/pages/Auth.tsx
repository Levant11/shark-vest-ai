import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get("role") as 'founder' | 'investor' | null;
  const { signUp, signIn, user } = useAuth();

  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    country: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleParam) {
      toast.error('Please select a role first');
      navigate('/');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(
          formData.email,
          formData.password,
          formData.fullName,
          roleParam,
          formData.country,
          formData.city
        );
      } else {
        await signIn(formData.email, formData.password);
      }
    } catch (error) {
      // Error is already handled in useAuth hook
    } finally {
      setLoading(false);
    }
  };

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
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">
                {roleParam === "founder" && `${isSignUp ? 'Join' : 'Welcome Back'}, Founder`}
                {roleParam === "investor" && `${isSignUp ? 'Join' : 'Welcome Back'}, Investor`}
                {!roleParam && "Welcome to SharkVest"}
              </h1>
              <p className="text-muted-foreground">
                {isSignUp ? 'Create your account to get started' : 'Sign in to your account'}
              </p>
            </div>

            {roleParam && (
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 text-center">
                <p className="text-sm text-muted-foreground">
                  Role: <span className="font-semibold text-foreground capitalize">{roleParam}</span>
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        type="text"
                        placeholder="UAE"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        type="text"
                        placeholder="Dubai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
              >
                {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
