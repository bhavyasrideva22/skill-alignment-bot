import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { SectionIntro } from '@/components/assessment/SectionIntro';
import { assessmentQuestions } from '@/data/questions';
import { AssessmentState, Answer } from '@/types/assessment';
import { AssessmentEngine } from '@/lib/assessment-engine';
import { useToast } from '@/hooks/use-toast';

const AssessmentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [state, setState] = useState<AssessmentState>({
    currentSection: '',
    currentQuestionIndex: 0,
    answers: [],
    startTime: Date.now(),
    sectionStartTime: Date.now()
  });
  
  const [showSectionIntro, setShowSectionIntro] = useState(true);
  const [currentAnswer, setCurrentAnswer] = useState<string | number>('');

  // Group questions by section
  const sections = [...new Set(assessmentQuestions.map(q => q.section))];
  const currentSectionQuestions = assessmentQuestions.filter(
    q => q.section === (state.currentSection || sections[0])
  );
  const currentQuestion = currentSectionQuestions[state.currentQuestionIndex];

  // Initialize first section
  useEffect(() => {
    if (!state.currentSection) {
      setState(prev => ({
        ...prev,
        currentSection: sections[0],
        sectionStartTime: Date.now()
      }));
    }
  }, []);

  const handleSectionStart = () => {
    setShowSectionIntro(false);
    setState(prev => ({
      ...prev,
      sectionStartTime: Date.now()
    }));
  };

  const handleAnswerChange = (value: string | number) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    if (!currentAnswer) return;

    // Save answer
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      value: currentAnswer
    };

    const updatedAnswers = [
      ...state.answers.filter(a => a.questionId !== currentQuestion.id),
      newAnswer
    ];

    // Check if this is the last question in the section
    if (state.currentQuestionIndex === currentSectionQuestions.length - 1) {
      // Move to next section or complete assessment
      const currentSectionIndex = sections.indexOf(state.currentSection);
      
      if (currentSectionIndex === sections.length - 1) {
        // Assessment complete
        completeAssessment(updatedAnswers);
        return;
      }

      // Move to next section
      const nextSection = sections[currentSectionIndex + 1];
      setState(prev => ({
        ...prev,
        currentSection: nextSection,
        currentQuestionIndex: 0,
        answers: updatedAnswers,
        sectionStartTime: Date.now()
      }));
      setShowSectionIntro(true);
      setCurrentAnswer('');
      
      toast({
        title: "Section Complete!",
        description: `Moving to ${nextSection}`,
      });
    } else {
      // Move to next question in same section
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        answers: updatedAnswers
      }));
      setCurrentAnswer('');
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
      
      // Load previous answer if exists
      const prevQuestion = currentSectionQuestions[state.currentQuestionIndex - 1];
      const prevAnswer = state.answers.find(a => a.questionId === prevQuestion.id);
      setCurrentAnswer(prevAnswer?.value || '');
    } else {
      // Go to previous section
      const currentSectionIndex = sections.indexOf(state.currentSection);
      if (currentSectionIndex > 0) {
        const prevSection = sections[currentSectionIndex - 1];
        const prevSectionQuestions = assessmentQuestions.filter(q => q.section === prevSection);
        
        setState(prev => ({
          ...prev,
          currentSection: prevSection,
          currentQuestionIndex: prevSectionQuestions.length - 1
        }));
        setShowSectionIntro(false);
      }
    }
  };

  const completeAssessment = (finalAnswers: Answer[]) => {
    const completionTime = Date.now() - state.startTime;
    const result = AssessmentEngine.generateResult(finalAnswers, completionTime);
    
    // Store result in sessionStorage for the results page
    sessionStorage.setItem('assessmentResult', JSON.stringify(result));
    
    toast({
      title: "Assessment Complete!",
      description: "Generating your personalized results...",
    });
    
    // Navigate to results
    navigate('/results');
  };

  // Load existing answer for current question
  useEffect(() => {
    if (currentQuestion) {
      const existingAnswer = state.answers.find(a => a.questionId === currentQuestion.id);
      setCurrentAnswer(existingAnswer?.value || '');
    }
  }, [currentQuestion, state.answers]);

  if (!state.currentSection || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (showSectionIntro) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionIntro
            section={state.currentSection}
            onStart={handleSectionStart}
            questionCount={currentSectionQuestions.length}
          />
        </div>
      </div>
    );
  }

  const totalQuestions = assessmentQuestions.length;
  const globalQuestionNumber = assessmentQuestions.findIndex(q => q.id === currentQuestion.id) + 1;

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <QuestionCard
          question={currentQuestion}
          value={currentAnswer}
          onChange={handleAnswerChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={globalQuestionNumber === 1}
          isLast={globalQuestionNumber === totalQuestions}
          questionNumber={globalQuestionNumber}
          totalQuestions={totalQuestions}
        />
      </div>
    </div>
  );
};

export default AssessmentPage;