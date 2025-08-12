import { Answer, ScoreBreakdown, CareerRecommendation, AssessmentResult } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export class AssessmentEngine {
  static calculateScores(answers: Answer[]): ScoreBreakdown {
    const answerMap = new Map(answers.map(a => [a.questionId, a]));
    
    // Psychometric scoring
    const psychometricScores = this.calculatePsychometricScores(answerMap);
    
    // Technical scoring
    const technicalScores = this.calculateTechnicalScores(answerMap);
    
    // WISCAR scoring
    const wiscarScores = this.calculateWiscarScores(answerMap);
    
    // Overall score calculation
    const overall = Math.round(
      (psychometricScores.total * 0.3 + 
       technicalScores.total * 0.4 + 
       wiscarScores.total * 0.3)
    );

    return {
      psychometric: psychometricScores,
      technical: technicalScores,
      wiscar: wiscarScores,
      overall
    };
  }

  private static calculatePsychometricScores(answerMap: Map<string, Answer>) {
    const interestQuestions = ['psych_interest_1', 'psych_interest_2', 'psych_interest_3'];
    const personalityQuestions = ['psych_personality_1', 'psych_personality_2'];
    
    const interest = this.calculateSectionScore(answerMap, interestQuestions, 'likert');
    const personality = this.calculateSectionScore(answerMap, personalityQuestions, 'choice');
    
    // Motivation is derived from interest and personality patterns
    const motivation = Math.round((interest * 0.7 + personality * 0.3));
    
    const total = Math.round((interest + personality + motivation) / 3);
    
    return { interest, personality, motivation, total };
  }

  private static calculateTechnicalScores(answerMap: Map<string, Answer>) {
    const aptitudeQuestions = ['tech_logic_1'];
    const prerequisiteQuestions = ['tech_stats_1'];
    const domainQuestions = ['tech_data_1'];
    
    const aptitude = this.calculateSectionScore(answerMap, aptitudeQuestions, 'correctness');
    const prerequisites = this.calculateSectionScore(answerMap, prerequisiteQuestions, 'correctness');
    const domain = this.calculateSectionScore(answerMap, domainQuestions, 'correctness');
    
    const total = Math.round((aptitude + prerequisites + domain) / 3);
    
    return { aptitude, prerequisites, domain, total };
  }

  private static calculateWiscarScores(answerMap: Map<string, Answer>) {
    const will = this.calculateSectionScore(answerMap, ['wiscar_will_1'], 'likert');
    const interest = this.calculateSectionScore(answerMap, ['wiscar_interest_1'], 'likert');
    const skill = this.calculateSectionScore(answerMap, ['wiscar_skill_1'], 'skill_level');
    const cognitive = this.calculateSectionScore(answerMap, ['wiscar_cognitive_1'], 'correctness');
    const ability = this.calculateSectionScore(answerMap, ['wiscar_learning_1'], 'likert');
    const realWorld = this.calculateSectionScore(answerMap, ['wiscar_realworld_1'], 'correctness');
    
    const total = Math.round((will + interest + skill + cognitive + ability + realWorld) / 6);
    
    return { will, interest, skill, cognitive, ability, realWorld, total };
  }

  private static calculateSectionScore(
    answerMap: Map<string, Answer>, 
    questionIds: string[], 
    scoringMethod: string
  ): number {
    let totalScore = 0;
    let totalQuestions = questionIds.length;
    
    for (const questionId of questionIds) {
      const answer = answerMap.get(questionId);
      if (!answer) continue;
      
      const question = assessmentQuestions.find(q => q.id === questionId);
      if (!question) continue;
      
      let score = 0;
      
      switch (scoringMethod) {
        case 'likert':
          score = ((Number(answer.value) - 1) / 4) * 100; // Convert 1-5 to 0-100
          break;
        case 'correctness':
          score = answer.value === question.correctAnswer ? 100 : 0;
          break;
        case 'choice':
          // Score based on choice quality (simplified)
          score = Math.min(((answer.value as string).length + 20) * 2, 100);
          break;
        case 'skill_level':
          // Convert skill level to score
          const skillLevels = ['Never used SQL', 'Can write basic SELECT statements', 'Comfortable with JOINs and GROUP BY', 'Can write complex queries with subqueries', 'Expert level with optimization and advanced functions'];
          const index = skillLevels.indexOf(answer.value as string);
          score = (index / (skillLevels.length - 1)) * 100;
          break;
      }
      
      totalScore += score * (question.weight || 1);
    }
    
    return Math.round(totalScore / totalQuestions);
  }

  static generateRecommendation(scores: ScoreBreakdown): CareerRecommendation {
    const { overall, psychometric, technical, wiscar } = scores;
    
    let verdict: 'yes' | 'no' | 'maybe';
    let confidence: number;
    
    if (overall >= 75 && psychometric.total >= 70 && technical.total >= 60) {
      verdict = 'yes';
      confidence = Math.min(95, overall + 10);
    } else if (overall >= 50 && (psychometric.total >= 60 || technical.total >= 60)) {
      verdict = 'maybe';
      confidence = Math.max(50, overall - 10);
    } else {
      verdict = 'no';
      confidence = Math.max(20, 100 - overall);
    }

    const strengths = [];
    const gaps = [];
    
    // Analyze strengths
    if (psychometric.interest >= 70) strengths.push('Strong intrinsic interest in data analysis');
    if (psychometric.motivation >= 70) strengths.push('High motivation for analytical work');
    if (technical.aptitude >= 70) strengths.push('Solid analytical and logical reasoning');
    if (wiscar.cognitive >= 70) strengths.push('Strong problem-solving approach');
    if (wiscar.will >= 70) strengths.push('Good persistence and follow-through');

    // Analyze gaps
    if (technical.prerequisites < 60) gaps.push('Statistics and SQL knowledge needs development');
    if (wiscar.skill < 50) gaps.push('Technical skills require significant building');
    if (psychometric.personality < 60) gaps.push('Work style alignment could be improved');
    if (wiscar.realWorld < 60) gaps.push('Practical application skills need practice');

    const nextSteps = this.generateNextSteps(verdict, scores);
    const alternativeCareers = verdict === 'no' ? this.generateAlternatives(scores) : undefined;
    const learningPath = verdict !== 'no' ? this.generateLearningPath(scores) : undefined;

    return {
      verdict,
      confidence,
      strengths,
      gaps,
      nextSteps,
      alternativeCareers,
      learningPath
    };
  }

  private static generateNextSteps(verdict: 'yes' | 'no' | 'maybe', scores: ScoreBreakdown): string[] {
    const steps = [];
    
    if (verdict === 'yes') {
      steps.push('Enroll in a comprehensive Product Analytics course');
      steps.push('Start building a portfolio with real data projects');
      steps.push('Learn SQL through hands-on practice');
      if (scores.technical.prerequisites < 80) {
        steps.push('Strengthen your statistics foundation');
      }
      steps.push('Join product analytics communities and forums');
    } else if (verdict === 'maybe') {
      steps.push('Take a foundational course in data analysis');
      steps.push('Practice with free datasets and analytics tools');
      if (scores.technical.total < 60) {
        steps.push('Focus on building technical skills first');
      }
      steps.push('Shadow a product analyst or take informational interviews');
      steps.push('Retake this assessment in 3-6 months');
    } else {
      steps.push('Explore alternative careers that better match your profile');
      steps.push('Consider roles that use some analytical skills but require less technical depth');
      steps.push('Develop foundational skills if you\'re still interested in analytics');
    }
    
    return steps;
  }

  private static generateAlternatives(scores: ScoreBreakdown): string[] {
    const alternatives = [];
    
    if (scores.psychometric.interest >= 60) {
      alternatives.push('UX Researcher - Focus on user behavior without heavy technical requirements');
    }
    
    if (scores.psychometric.personality >= 60) {
      alternatives.push('Product Manager - Strategic thinking with some data analysis');
      alternatives.push('Business Analyst - Process improvement and requirements gathering');
    }
    
    if (scores.wiscar.cognitive >= 60) {
      alternatives.push('Strategy Consultant - Problem-solving with business focus');
      alternatives.push('Market Research Analyst - Research and analysis in business context');
    }
    
    alternatives.push('Product Marketing Manager - Customer insights and go-to-market strategy');
    
    return alternatives;
  }

  private static generateLearningPath(scores: ScoreBreakdown) {
    const beginner = ['SQL Fundamentals', 'Statistics for Beginners', 'Introduction to Product Metrics'];
    const intermediate = ['Advanced SQL', 'A/B Testing Fundamentals', 'Data Visualization with Tableau/Looker'];
    const advanced = ['Advanced Statistics', 'Machine Learning for Product Analytics', 'Advanced A/B Testing and Experimentation'];
    
    // Customize based on scores
    if (scores.technical.prerequisites < 60) {
      beginner.unshift('Basic Statistics and Probability');
    }
    
    if (scores.wiscar.skill < 50) {
      beginner.unshift('Excel/Google Sheets for Data Analysis');
    }
    
    return { beginner, intermediate, advanced };
  }

  static generatePersonalizedInsights(scores: ScoreBreakdown, recommendation: CareerRecommendation): string {
    const insights = [];
    
    if (recommendation.verdict === 'yes') {
      insights.push(`You show strong potential for Product Data Analysis with an overall fit of ${scores.overall}%.`);
      
      if (scores.psychometric.total > scores.technical.total) {
        insights.push('Your mindset and interests are well-aligned, but focus on building technical skills.');
      } else {
        insights.push('You have good technical aptitude - developing domain expertise will accelerate your growth.');
      }
    } else if (recommendation.verdict === 'maybe') {
      insights.push(`You have ${scores.overall}% alignment with Product Data Analysis. With focused effort, you could succeed in this field.`);
      
      if (scores.wiscar.will >= 70) {
        insights.push('Your persistence and determination are strong assets for overcoming skill gaps.');
      }
    } else {
      insights.push('Based on your assessment, Product Data Analysis may not be the best fit for your current interests and skills.');
      insights.push('Consider exploring the alternative career paths that better match your strengths.');
    }
    
    // Add specific insights based on scores
    if (scores.wiscar.interest >= 80) {
      insights.push('Your high interest level suggests you\'d find genuine satisfaction in analytical work.');
    }
    
    if (scores.technical.total >= 80) {
      insights.push('Your strong technical foundation gives you a significant advantage in the field.');
    }
    
    return insights.join(' ');
  }

  static generateResult(answers: Answer[], completionTime: number): AssessmentResult {
    const scores = this.calculateScores(answers);
    const recommendation = this.generateRecommendation(scores);
    const personalizedInsights = this.generatePersonalizedInsights(scores, recommendation);
    
    return {
      scores,
      recommendation,
      completionTime,
      personalizedInsights
    };
  }
}