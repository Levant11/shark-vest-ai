import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, TrendingUp, Users, FileText, BarChart, Lightbulb, PresentationIcon, Calculator, MessageSquare } from "lucide-react";
import { TrustScoreCard } from "@/components/founder/TrustScoreCard";
import { VerificationWorkflow } from "@/components/founder/VerificationWorkflow";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const FounderDashboard = () => {
  const { user, loading, role, signOut } = useAuth();
  const navigate = useNavigate();
  const [trustScore, setTrustScore] = useState({
    score: 0,
    badge: 'Starter',
    profile_completeness: 0,
    verification_level: 0,
    platform_activity: 0,
  });
  const [loadingData, setLoadingData] = useState(true);

  // Fetch trust score data
  useEffect(() => {
    if (user) {
      fetchTrustScore();
    }
  }, [user]);

  const fetchTrustScore = async () => {
    try {
      const { data, error } = await supabase
        .from('trust_scores')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setTrustScore({
          score: data.score || 0,
          badge: data.badge || 'Starter',
          profile_completeness: data.profile_completeness || 0,
          verification_level: data.verification_level || 0,
          platform_activity: data.platform_activity || 0,
        });
      }
    } catch (error: any) {
      console.error('Error fetching trust score:', error);
      toast.error('Failed to load trust score');
    } finally {
      setLoadingData(false);
    }
  };

  // Authentication guard disabled for development
  // useEffect(() => {
  //   if (!loading && (!user || role !== 'founder')) {
  //     navigate('/auth?role=founder');
  //   }
  // }, [user, loading, role, navigate]);

  // if (loading) {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  // }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">SharkVest</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={signOut}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Founder Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to your SharkVest control center
          </p>
        </div>

        {/* Trust Score and Verification Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <TrustScoreCard
              score={trustScore.score}
              badge={trustScore.badge}
              profileCompleteness={trustScore.profile_completeness}
              verificationLevel={trustScore.verification_level}
              platformActivity={trustScore.platform_activity}
            />
          </div>
          <div className="lg:col-span-2">
            <VerificationWorkflow />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">AI Project Score</CardTitle>
              <BarChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-muted-foreground">Submit your project to get scored</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Investor Matches</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Potential investors matched</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Rocket className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Projects submitted</p>
            </CardContent>
          </Card>
        </div>

        {/* Project Management & AI Tools */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Project & Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  Submit Your Project
                </CardTitle>
                <CardDescription>
                  Upload your pitch deck and get AI-powered evaluation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Data Room
                </CardTitle>
                <CardDescription>
                  Manage secure documents and investor access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">Open Data Room</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Advisory Suite */}
        <div>
          <h3 className="text-xl font-bold mb-4">AI Advisory Suite</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Idea Refiner
                </CardTitle>
                <CardDescription className="text-xs">
                  Validate and refine your business concept
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" size="sm">Launch</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <PresentationIcon className="h-5 w-5 text-primary" />
                  Pitch Generator
                </CardTitle>
                <CardDescription className="text-xs">
                  Create compelling investor presentations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" size="sm">Launch</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calculator className="h-5 w-5 text-primary" />
                  Deal Structuring
                </CardTitle>
                <CardDescription className="text-xs">
                  Optimize your funding round strategy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" size="sm">Launch</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Comm. Coach
                </CardTitle>
                <CardDescription className="text-xs">
                  Enhance investor communication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" size="sm">Launch</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FounderDashboard;
