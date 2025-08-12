import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sectionInfo } from "@/data/questions";

interface SectionIntroProps {
  section: string;
  onStart: () => void;
  questionCount: number;
}

export const SectionIntro = ({ section, onStart, questionCount }: SectionIntroProps) => {
  const info = sectionInfo[section as keyof typeof sectionInfo];

  return (
    <Card className="p-8 max-w-2xl mx-auto bg-gradient-card shadow-card border-0 text-center">
      <div className="space-y-6">
        <div className="text-6xl mb-4">{info?.icon}</div>
        
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">{section}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {info?.description}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span>{questionCount} questions</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            <span>{info?.estimatedTime}</span>
          </div>
        </div>

        <Button 
          onClick={onStart}
          size="lg"
          className="px-8 py-3 bg-gradient-primary hover:opacity-90 transition-opacity text-lg"
        >
          Start Section
        </Button>
      </div>
    </Card>
  );
};