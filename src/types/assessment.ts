export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'single-choice' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  section: string;
  question: string;
  options?: string[];
  likertRange?: { min: number; max: number; labels: string[] };
  correctAnswer?: string | number;
  weight?: number;
}

export interface Answer {
  questionId: string;
  value: string | number;
  score?: number;
}

export interface AssessmentState {
  currentSection: string;
  currentQuestionIndex: number;
  answers: Answer[];
  startTime: number;
  sectionStartTime: number;
}

export interface ScoreBreakdown {
  psychometric: {
    interest: number;
    personality: number;
    motivation: number;
    total: number;
  };
  technical: {
    aptitude: number;
    prerequisites: number;
    domain: number;
    total: number;
  };
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
    total: number;
  };
  overall: number;
}

export interface CareerRecommendation {
  verdict: 'yes' | 'no' | 'maybe';
  confidence: number;
  strengths: string[];
  gaps: string[];
  nextSteps: string[];
  alternativeCareers?: string[];
  learningPath?: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
}

export interface AssessmentResult {
  scores: ScoreBreakdown;
  recommendation: CareerRecommendation;
  completionTime: number;
  personalizedInsights: string;
}