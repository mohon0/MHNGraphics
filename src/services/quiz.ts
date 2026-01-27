import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type QuizDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

type SearchParams = {
  page?: number;
  limit?: number;
  search?: string;
  difficulty?: QuizDifficulty;
};

export function useQuizzes(searchParams: SearchParams) {
  const { page = 1, limit = 10, search = '', difficulty } = searchParams;

  return useQuery({
    queryKey: ['quizzes', page, limit, search, difficulty],
    queryFn: async () => {
      const response = await axios.get('/api/quiz', {
        params: {
          page,
          limit,
          search,
          difficulty,
        },
      });

      return response.data;
    },
  });
}

export function useQuiz(id: string) {
  return useQuery({
    queryKey: ['quiz', id],
    queryFn: async () => {
      const response = await axios.get(`/api/quiz/single-quiz?id=${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useSubmitQuiz() {
  return useMutation({
    mutationFn: async ({
      quizId,
      answers,
    }: {
      quizId: string;
      answers: Record<string, string>;
    }) => {
      const response = await axios.post(`/api/quiz/submit`, {
        quizId,
        answers,
      });
      return response.data;
    },
  });
}
