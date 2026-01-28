import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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

export function useQuizInfo(id: string) {
  return useQuery({
    queryKey: ['quizinfo', id],
    queryFn: async () => {
      const response = await axios.get(`/api/quiz/single-quiz?id=${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useSingleQuiz(id: string) {
  return useQuery({
    queryKey: ['quizwithquestions', id],
    queryFn: async () => {
      const response = await axios.get(
        `/api/quiz/single-quiz/with-questions?id=${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });
}

export function useSubmitQuiz() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      quizId,
      answers,
      timeSpent,
    }: {
      quizId: string;
      answers: Record<string, string>;
      timeSpent: number;
    }) => {
      const response = await axios.post(`/api/quiz/submit`, {
        quizId,
        answers,
        timeSpent,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // 1. Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });

      // 2. Redirect the user to the results page
      router.push(`/quiz/quiz-result/stats/${data.quizResult.id}`);
      toast.success('Quiz submitted successfully!');
    },
    onError: (_error) => {
      // Handle global error logic here (e.g., logging)
      toast.error('Failed to submit quiz. Please try again.');
    },
  });
}

export function useSingleQuizResult(id: string) {
  return useQuery({
    queryKey: ['quiz-result', id],
    queryFn: async () => {
      const response = await axios.get(`/api/quiz/quiz-result?id=${id}`);
      return response.data;
    },
  });
}

export function useSingleQuizResultReview(id: string) {
  return useQuery({
    queryKey: ['quiz-result-review', id],
    queryFn: async () => {
      const response = await axios.get(
        `/api/quiz/quiz-result/review-result?id=${id}`,
      );
      return response.data;
    },
  });
}
