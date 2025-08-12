import { ProgressRing } from "@/components/ui/progress-ring";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreBreakdown } from "@/types/assessment";

interface ScoreDisplayProps {
  scores: ScoreBreakdown;
}

export const ScoreDisplay = ({ scores }: ScoreDisplayProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Development";
  };

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <Card className="p-8 text-center bg-gradient-card shadow-soft border-0">
        <h3 className="text-2xl font-bold mb-6">Your Overall Assessment Score</h3>
        <div className="flex justify-center mb-4">
          <ProgressRing value={scores.overall} size={160} strokeWidth={12}>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(scores.overall)}`}>
                {scores.overall}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {getScoreLabel(scores.overall)}
              </div>
            </div>
          </ProgressRing>
        </div>
      </Card>

      {/* Detailed Scores */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Psychometric */}
        <Card className="p-6 bg-gradient-card shadow-soft border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Psychometric Fit</h4>
              <Badge variant={scores.psychometric.total >= 70 ? "default" : "secondary"}>
                {scores.psychometric.total}%
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Interest Level</span>
                <span className={getScoreColor(scores.psychometric.interest)}>
                  {scores.psychometric.interest}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Personality Fit</span>
                <span className={getScoreColor(scores.psychometric.personality)}>
                  {scores.psychometric.personality}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Motivation</span>
                <span className={getScoreColor(scores.psychometric.motivation)}>
                  {scores.psychometric.motivation}%
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Technical */}
        <Card className="p-6 bg-gradient-card shadow-soft border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Technical Readiness</h4>
              <Badge variant={scores.technical.total >= 70 ? "default" : "secondary"}>
                {scores.technical.total}%
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Analytical Aptitude</span>
                <span className={getScoreColor(scores.technical.aptitude)}>
                  {scores.technical.aptitude}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Prerequisites</span>
                <span className={getScoreColor(scores.technical.prerequisites)}>
                  {scores.technical.prerequisites}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Domain Knowledge</span>
                <span className={getScoreColor(scores.technical.domain)}>
                  {scores.technical.domain}%
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* WISCAR */}
        <Card className="p-6 bg-gradient-card shadow-soft border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">WISCAR Profile</h4>
              <Badge variant={scores.wiscar.total >= 70 ? "default" : "secondary"}>
                {scores.wiscar.total}%
              </Badge>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Will</span>
                <span className={getScoreColor(scores.wiscar.will)}>{scores.wiscar.will}%</span>
              </div>
              <div className="flex justify-between">
                <span>Interest</span>
                <span className={getScoreColor(scores.wiscar.interest)}>{scores.wiscar.interest}%</span>
              </div>
              <div className="flex justify-between">
                <span>Skill</span>
                <span className={getScoreColor(scores.wiscar.skill)}>{scores.wiscar.skill}%</span>
              </div>
              <div className="flex justify-between">
                <span>Cognitive</span>
                <span className={getScoreColor(scores.wiscar.cognitive)}>{scores.wiscar.cognitive}%</span>
              </div>
              <div className="flex justify-between">
                <span>Ability</span>
                <span className={getScoreColor(scores.wiscar.ability)}>{scores.wiscar.ability}%</span>
              </div>
              <div className="flex justify-between">
                <span>Real-World</span>
                <span className={getScoreColor(scores.wiscar.realWorld)}>{scores.wiscar.realWorld}%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};