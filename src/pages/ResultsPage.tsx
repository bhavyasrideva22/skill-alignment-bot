import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScoreDisplay } from '@/components/assessment/ScoreDisplay';
import { RecommendationCard } from '@/components/assessment/RecommendationCard';
import { AssessmentResult } from '@/types/assessment';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('assessmentResult');
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        setResult(parsedResult);
      } catch (error) {
        console.error('Error parsing stored result:', error);
        navigate('/');
      }
    } else {
      navigate('/');
    }
    setLoading(false);
  }, [navigate]);

  const handleRetakeAssessment = () => {
    sessionStorage.removeItem('assessmentResult');
    navigate('/assessment');
  };

  const handleShareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Product Data Analysis Assessment Results',
        text: `I scored ${result?.scores.overall}% on the Product Data Analysis career assessment!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Share this link to show your results",
      });
    }
  };

  const handleDownloadResults = () => {
    if (!result) return;
    
    const resultsText = `
Product Data Analysis Assessment Results

Overall Score: ${result.scores.overall}%
Recommendation: ${result.recommendation.verdict.toUpperCase()}
Confidence: ${result.recommendation.confidence}%

Detailed Scores:
- Psychometric Fit: ${result.scores.psychometric.total}%
- Technical Readiness: ${result.scores.technical.total}%
- WISCAR Profile: ${result.scores.wiscar.total}%

Personal Insights:
${result.personalizedInsights}

Next Steps:
${result.recommendation.nextSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}
    `.trim();

    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-data-analysis-assessment-results.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Generating your results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-xl font-bold mb-4">No Results Found</h2>
          <p className="text-muted-foreground mb-6">
            You need to complete the assessment first to see your results.
          </p>
          <Button onClick={() => navigate('/')} className="w-full">
            Start Assessment
          </Button>
        </Card>
      </div>
    );
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Your Assessment Results</h1>
          <p className="text-xl opacity-90 mb-6">
            Product Data Analysis Career Fit Assessment
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm opacity-80">
            <span>Completed in {formatTime(result.completionTime)}</span>
            <span>•</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleShareResults}
              className="flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Results</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleDownloadResults}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </Button>
            
            <Button
              onClick={handleRetakeAssessment}
              className="bg-gradient-primary hover:opacity-90"
            >
              Retake Assessment
            </Button>
          </div>

          {/* Scores Section */}
          <ScoreDisplay scores={result.scores} />

          {/* Recommendation Section */}
          <RecommendationCard 
            recommendation={result.recommendation}
            personalizedInsights={result.personalizedInsights}
          />

          {/* Career Information */}
          <Card className="p-8 bg-gradient-card shadow-soft border-0">
            <h3 className="text-2xl font-bold mb-6">About Product Data Analysis</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-3">What Product Data Analysts Do:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Analyze user behavior and product usage patterns</li>
                  <li>• Design and run A/B tests to optimize features</li>
                  <li>• Create dashboards and reports for product teams</li>
                  <li>• Identify opportunities for growth and improvement</li>
                  <li>• Translate data insights into actionable recommendations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Typical Career Progression:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Junior Product Analyst (Entry level)</li>
                  <li>• Product Data Analyst (2-4 years)</li>
                  <li>• Senior Product Analyst (4-7 years)</li>
                  <li>• Lead Analyst / Analytics Manager (7+ years)</li>
                  <li>• Head of Product Analytics (10+ years)</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;