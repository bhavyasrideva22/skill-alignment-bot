import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from "@/types/assessment";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  value?: string | number;
  onChange: (value: string | number) => void;
  onNext: () => void;
  onPrevious?: () => void;
  isFirst: boolean;
  isLast: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({
  question,
  value,
  onChange,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  questionNumber,
  totalQuestions
}: QuestionCardProps) => {
  const renderQuestionInput = () => {
    switch (question.type) {
      case 'likert':
        return (
          <div className="space-y-4">
            <RadioGroup value={value?.toString()} onValueChange={onChange}>
              {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                <div key={num} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={num.toString()} id={`option-${num}`} />
                  <Label htmlFor={`option-${num}`} className="flex-1 cursor-pointer">
                    <span className="font-medium">{num}</span>
                    {question.likertRange?.labels && (
                      <span className="ml-2 text-muted-foreground">
                        - {question.likertRange.labels[num - 1]}
                      </span>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'multiple-choice':
      case 'single-choice':
      case 'scenario':
        return (
          <div className="space-y-3">
            <RadioGroup value={value?.toString()} onValueChange={onChange}>
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                  <RadioGroupItem value={option} id={`option-${index}`} className="mt-1" />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer leading-relaxed">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="p-8 max-w-3xl mx-auto bg-gradient-card shadow-card border-0">
      <div className="space-y-6">
        {/* Progress and Section Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
            {question.section}
          </span>
          <span className="font-medium">
            {questionNumber} of {totalQuestions}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold leading-relaxed text-foreground">
            {question.question}
          </h2>
          
          {renderQuestionInput()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirst}
            className={cn("px-6", isFirst && "invisible")}
          >
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!value}
            className="px-8 bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            {isLast ? 'Complete Assessment' : 'Next Question'}
          </Button>
        </div>
      </div>
    </Card>
  );
};