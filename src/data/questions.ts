import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Section - Interest Scale
  {
    id: 'psych_interest_1',
    type: 'likert',
    category: 'psychometric',
    section: 'Interest & Motivation',
    question: 'How excited are you about exploring large datasets to find hidden patterns?',
    likertRange: { min: 1, max: 5, labels: ['Not at all', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
    weight: 1.2
  },
  {
    id: 'psych_interest_2',
    type: 'likert',
    category: 'psychometric',
    section: 'Interest & Motivation',
    question: 'How interested are you in understanding why users behave the way they do in digital products?',
    likertRange: { min: 1, max: 5, labels: ['Not at all', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
    weight: 1.3
  },
  {
    id: 'psych_interest_3',
    type: 'likert',
    category: 'psychometric',
    section: 'Interest & Motivation',
    question: 'How much do you enjoy running experiments and A/B tests to validate hypotheses?',
    likertRange: { min: 1, max: 5, labels: ['Not at all', 'Slightly', 'Moderately', 'Very', 'Extremely'] },
    weight: 1.1
  },

  // Psychometric Section - Personality & Work Style
  {
    id: 'psych_personality_1',
    type: 'multiple-choice',
    category: 'psychometric',
    section: 'Work Style & Personality',
    question: 'When approaching a new problem, you prefer to:',
    options: [
      'Break it down systematically into smaller parts',
      'Dive in and experiment with different approaches',
      'Research what others have done first',
      'Discuss it with team members before starting'
    ],
    weight: 1.0
  },
  {
    id: 'psych_personality_2',
    type: 'single-choice',
    category: 'psychometric',
    section: 'Work Style & Personality',
    question: 'In a typical work week, you feel most energized when:',
    options: [
      'Working independently on detailed analysis',
      'Collaborating with cross-functional teams',
      'Presenting insights to stakeholders',
      'Learning new tools and techniques'
    ],
    weight: 1.1
  },

  // Technical & Aptitude Section
  {
    id: 'tech_logic_1',
    type: 'multiple-choice',
    category: 'technical',
    section: 'Logical Reasoning',
    question: 'If 40% of users who start a free trial convert to paid, and 1000 users start trials in a month, how many paid conversions do you expect?',
    options: ['200', '300', '400', '600'],
    correctAnswer: '400',
    weight: 1.2
  },
  {
    id: 'tech_data_1',
    type: 'scenario',
    category: 'technical',
    section: 'Data Interpretation',
    question: 'You notice that user engagement dropped 20% last week. What would be your first step in investigating this?',
    options: [
      'Check if there were any product releases or changes',
      'Segment the data by user demographics',
      'Compare with industry benchmarks',
      'Survey users about their experience'
    ],
    correctAnswer: 'Check if there were any product releases or changes',
    weight: 1.3
  },
  {
    id: 'tech_stats_1',
    type: 'multiple-choice',
    category: 'technical',
    section: 'Statistics Knowledge',
    question: 'What does a p-value of 0.03 in an A/B test result indicate?',
    options: [
      'There is a 3% chance the result is due to random chance',
      'The test has 97% statistical power',
      '3% of users were affected by the change',
      'The effect size is 3%'
    ],
    correctAnswer: 'There is a 3% chance the result is due to random chance',
    weight: 1.1
  },

  // WISCAR Framework Questions
  {
    id: 'wiscar_will_1',
    type: 'likert',
    category: 'wiscar',
    section: 'Will & Persistence',
    question: 'How often do you follow through on learning new technical skills, even when they become challenging?',
    likertRange: { min: 1, max: 5, labels: ['Rarely', 'Sometimes', 'Often', 'Usually', 'Always'] },
    weight: 1.2
  },
  {
    id: 'wiscar_interest_1',
    type: 'likert',
    category: 'wiscar',
    section: 'Deep Interest',
    question: 'Rate your excitement about discovering why users abandon a mobile app at specific steps.',
    likertRange: { min: 1, max: 5, labels: ['Not excited', 'Slightly excited', 'Moderately excited', 'Very excited', 'Extremely excited'] },
    weight: 1.3
  },
  {
    id: 'wiscar_skill_1',
    type: 'single-choice',
    category: 'wiscar',
    section: 'Current Skills',
    question: 'How would you rate your current SQL skills?',
    options: [
      'Never used SQL',
      'Can write basic SELECT statements',
      'Comfortable with JOINs and GROUP BY',
      'Can write complex queries with subqueries',
      'Expert level with optimization and advanced functions'
    ],
    weight: 1.1
  },
  {
    id: 'wiscar_cognitive_1',
    type: 'scenario',
    category: 'wiscar',
    section: 'Cognitive Readiness',
    question: 'A product team asks you to determine if a new feature increased user retention. The feature was released to 50% of users randomly. How would you approach this?',
    options: [
      'Compare retention rates between the two groups',
      'Look at overall retention before and after the release',
      'Survey users about their satisfaction with the feature',
      'Analyze retention patterns by user segments'
    ],
    correctAnswer: 'Compare retention rates between the two groups',
    weight: 1.4
  },
  {
    id: 'wiscar_learning_1',
    type: 'likert',
    category: 'wiscar',
    section: 'Learning Agility',
    question: 'How comfortable are you with receiving feedback that challenges your analysis approach?',
    likertRange: { min: 1, max: 5, labels: ['Very uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Very comfortable'] },
    weight: 1.1
  },
  {
    id: 'wiscar_realworld_1',
    type: 'scenario',
    category: 'wiscar',
    section: 'Real-World Application',
    question: 'You find that a key product metric is declining, but you\'re not sure why. The product manager needs an answer by tomorrow. What do you do?',
    options: [
      'Provide your best hypothesis with available data',
      'Ask for more time to do thorough analysis',
      'Present multiple possible explanations with confidence levels',
      'Recommend immediate changes to reverse the trend'
    ],
    correctAnswer: 'Present multiple possible explanations with confidence levels',
    weight: 1.2
  }
];

export const sectionInfo = {
  'Interest & Motivation': {
    description: 'Evaluating your intrinsic motivation and curiosity for product data work',
    icon: '💡',
    estimatedTime: '3 minutes'
  },
  'Work Style & Personality': {
    description: 'Understanding your preferred working style and personality fit',
    icon: '🧠',
    estimatedTime: '2 minutes'
  },
  'Logical Reasoning': {
    description: 'Testing your analytical and mathematical reasoning abilities',
    icon: '🔍',
    estimatedTime: '4 minutes'
  },
  'Data Interpretation': {
    description: 'Assessing your ability to interpret and act on data insights',
    icon: '📊',
    estimatedTime: '3 minutes'
  },
  'Statistics Knowledge': {
    description: 'Evaluating your understanding of statistical concepts',
    icon: '📈',
    estimatedTime: '3 minutes'
  },
  'Will & Persistence': {
    description: 'Measuring your determination and follow-through',
    icon: '💪',
    estimatedTime: '2 minutes'
  },
  'Deep Interest': {
    description: 'Assessing your genuine curiosity in product analytics',
    icon: '❤️',
    estimatedTime: '2 minutes'
  },
  'Current Skills': {
    description: 'Understanding your existing technical capabilities',
    icon: '🛠️',
    estimatedTime: '2 minutes'
  },
  'Cognitive Readiness': {
    description: 'Testing your analytical thinking and problem-solving approach',
    icon: '🧩',
    estimatedTime: '4 minutes'
  },
  'Learning Agility': {
    description: 'Evaluating your openness to learning and growth',
    icon: '🌱',
    estimatedTime: '2 minutes'
  },
  'Real-World Application': {
    description: 'Testing how you handle real product analytics challenges',
    icon: '🎯',
    estimatedTime: '3 minutes'
  }
};