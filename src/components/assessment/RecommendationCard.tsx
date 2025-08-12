import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, TrendingUp, BookOpen, Users } from "lucide-react";
import { CareerRecommendation } from "@/types/assessment";

interface RecommendationCardProps {
  recommendation: CareerRecommendation;
  personalizedInsights: string;
}

export const RecommendationCard = ({ recommendation, personalizedInsights }: RecommendationCardProps) => {
  const getVerdictIcon = () => {
    switch (recommendation.verdict) {
      case 'yes':
        return <CheckCircle className="w-8 h-8 text-success" />;
      case 'maybe':
        return <AlertCircle className="w-8 h-8 text-warning" />;
      case 'no':
        return <XCircle className="w-8 h-8 text-destructive" />;
    }
  };

  const getVerdictMessage = () => {
    switch (recommendation.verdict) {
      case 'yes':
        return {
          title: "Great Fit! 🎉",
          subtitle: "Product Data Analysis aligns well with your profile",
          bgColor: "bg-success/10",
          borderColor: "border-success/20"
        };
      case 'maybe':
        return {
          title: "Potential Match 🤔",
          subtitle: "You could succeed with focused development",
          bgColor: "bg-warning/10",
          borderColor: "border-warning/20"
        };
      case 'no':
        return {
          title: "Consider Alternatives 💭",
          subtitle: "Other paths might be a better fit for you",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/20"
        };
    }
  };

  const verdict = getVerdictMessage();

  return (
    <div className="space-y-6">
      {/* Main Recommendation */}
      <Card className={`p-8 ${verdict.bgColor} ${verdict.borderColor} border-2`}>
        <div className="flex items-start space-x-4">
          {getVerdictIcon()}
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{verdict.title}</h3>
            <p className="text-lg text-muted-foreground mb-4">{verdict.subtitle}</p>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm font-medium">Confidence Level:</span>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {recommendation.confidence}%
              </Badge>
            </div>
            <p className="text-foreground leading-relaxed">{personalizedInsights}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Strengths */}
        {recommendation.strengths.length > 0 && (
          <Card className="p-6 bg-gradient-card shadow-soft border-0">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-success" />
              <h4 className="font-semibold text-lg">Your Strengths</h4>
            </div>
            <ul className="space-y-2">
              {recommendation.strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Areas for Development */}
        {recommendation.gaps.length > 0 && (
          <Card className="p-6 bg-gradient-card shadow-soft border-0">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-warning" />
              <h4 className="font-semibold text-lg">Areas to Develop</h4>
            </div>
            <ul className="space-y-2">
              {recommendation.gaps.map((gap, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{gap}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      {/* Next Steps */}
      <Card className="p-6 bg-gradient-card shadow-soft border-0">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h4 className="font-semibold text-lg">Recommended Next Steps</h4>
        </div>
        <div className="grid gap-3">
          {recommendation.nextSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">{index + 1}</span>
              </div>
              <span className="text-sm">{step}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Learning Path */}
      {recommendation.learningPath && (
        <Card className="p-6 bg-gradient-card shadow-soft border-0">
          <h4 className="font-semibold text-lg mb-4">Your Learning Path</h4>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h5 className="font-medium text-success mb-2">Beginner</h5>
              <ul className="text-sm space-y-1">
                {recommendation.learningPath.beginner.map((item, index) => (
                  <li key={index} className="text-muted-foreground">• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-warning mb-2">Intermediate</h5>
              <ul className="text-sm space-y-1">
                {recommendation.learningPath.intermediate.map((item, index) => (
                  <li key={index} className="text-muted-foreground">• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-primary mb-2">Advanced</h5>
              <ul className="text-sm space-y-1">
                {recommendation.learningPath.advanced.map((item, index) => (
                  <li key={index} className="text-muted-foreground">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Alternative Careers */}
      {recommendation.alternativeCareers && recommendation.alternativeCareers.length > 0 && (
        <Card className="p-6 bg-gradient-card shadow-soft border-0">
          <h4 className="font-semibold text-lg mb-4">Alternative Career Paths</h4>
          <div className="grid gap-3 md:grid-cols-2">
            {recommendation.alternativeCareers.map((career, index) => (
              <div key={index} className="p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium">{career}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};