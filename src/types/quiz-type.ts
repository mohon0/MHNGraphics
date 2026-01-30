// ============================================================================
// Types
// ============================================================================

export type QuizDifficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type QuizStatus = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  image?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
}

export interface QuizResult {
  id: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  passed: boolean;
  attemptNumber: number;
  completedAt: string;
  user: User;
  quiz: Quiz;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  order: number;
}

export interface AdminQuiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: QuizDifficulty;
  image: string;
  imageId: string;
  tags: string[];
  status: QuizStatus;
  scheduledFor?: string;
  timeLimit: number;
  passingScore: number;
  createdAt: string;
  updatedAt: string;
  questions: QuizQuestion[];
}
