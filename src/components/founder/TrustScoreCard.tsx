import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TrustScoreCardProps {
  score: number;
  badge: string;
  profileCompleteness: number;
  verificationLevel: number;
  platformActivity: number;
}

export const TrustScoreCard = ({
  score,
  badge,
  profileCompleteness,
  verificationLevel,
  platformActivity,
}: TrustScoreCardProps) => {
  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'platinum':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'gold':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'silver':
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 'bronze':
        return 'bg-gradient-to-r from-orange-700 to-orange-900';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-600';
    }
  };

  return (
    <Card className="border-2 border-primary/30 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <CardTitle>Trust Score®</CardTitle>
          </div>
          <Badge className={`${getBadgeColor(badge)} text-white border-0`}>
            {badge}
          </Badge>
        </div>
        <CardDescription>
          Your credibility score on the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Score</span>
            <span className="text-3xl font-bold text-primary">{score}/100</span>
          </div>
          <Progress value={score} className="h-3" />
        </div>

        {/* Score Breakdown */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Score Breakdown
          </h4>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Profile Completeness</span>
                <span className="font-medium">{profileCompleteness}% (25pts)</span>
              </div>
              <Progress value={profileCompleteness} className="h-2" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Verification Status</span>
                <span className="font-medium">{verificationLevel}% (30pts)</span>
              </div>
              <Progress value={verificationLevel} className="h-2" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Platform Activity</span>
                <span className="font-medium">{platformActivity}% (20pts)</span>
              </div>
              <Progress value={platformActivity} className="h-2" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">AI Profile Strength</span>
                <span className="font-medium">0% (25pts)</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </div>
        </div>

        {/* Trust Features */}
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Verified profiles build investor confidence</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
