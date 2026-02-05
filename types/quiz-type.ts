/**
 * Quiz Option Type
 */
export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

/**
 * Quiz Question Type
 */
export interface QuizQuestion {
  id: string;
  text: string;
  order: number;
  options: QuizOption[];
}

/**
 * Quiz Status Type
 */
export type QuizStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

/**
 * Quiz Difficulty Type
 */
export type QuizDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

/**
 * Full Quiz Type with Questions
 */
export interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in seconds or minutes
  passingScore: number; // percentage
  status: QuizStatus;
  difficulty: QuizDifficulty;
  category: string;
  tags: string[];
  _count: {
    questions: number;
  };
  questions: QuizQuestion[];
}

/**
 * Quiz response wrapper (as returned from your API)
 */
export interface QuizResponse {
  json: Quiz;
}

/**
 * Quiz without questions (for list views)
 */
export interface QuizPreview extends Omit<Quiz, 'questions'> {}

/**
 * Quiz Result Entry - represents a single user's submission
 */
export interface QuizResultEntry {
  id: string;
  userId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  passed: boolean;
  attemptNumber: number;
  completedAt: string; // ISO date string
  userName: string;
  userImage: string;
  percentage: number;
}

/**
 * Quiz Statistics
 */
export interface QuizStats {
  averageScore: number;
  highestScore: number;
  passRate: number; // percentage 0-100
  totalAttempts: number;
}

/**
 * Pagination Info
 */
export interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * Quiz Info for Results Page (basic quiz data)
 */
export interface QuizInfo {
  id: string;
  title: string;
  difficulty: QuizDifficulty;
  passingScore: number;
  timeLimit: number;
  questionCount: number;
}

/**
 * Quiz Results Response - contains quiz info, results, and stats
 */
export interface QuizResultsResponse {
  json: {
    quiz: QuizInfo;
    results: QuizResultEntry[];
    stats: QuizStats;
    pagination: PaginationInfo;
  };
}
