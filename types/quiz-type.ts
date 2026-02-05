export type QuizListType = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  image?: string;
  imageId?: string;
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';
  scheduledFor?: string | null;
  timeLimit?: number;
  passingScore?: number;
  createdAt: string;
  updatedAt: string;
};

export type SingleQuizType = {
  id: string;
  title: string;
  description: string;
  timeLimit?: number;
  passingScore?: number;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  category: string;
  tags: string[];
  _count: {
    questions: number;
  };
  questions: [
    {
      id: string;
      text: string;
      order: number;
      options: [
        {
          id: string;
          text: string;
          isCorrect: boolean;
          explanation?: string;
        },
      ];
    },
  ];
};

export type QuestionType = {
  id: string;
  text: string;
  order: number;
  options: [
    {
      id: string;
      text: string;
      isCorrect: boolean;
      explanation?: string;
    },
  ];
};

export type QuizStatsType = {
  totalAttempts: number;
  highestScore: number;
  averageScore: number;
  passRate: number;
};

export type QuizResultType = {
  id: string;
  userId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  passed: boolean;
  attemptNumber: number;
  completedAt: string;
  userName: string;
  userImage: string;
  percentage: number;
};
