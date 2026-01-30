'use client';

import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type JSX, use, useCallback } from 'react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useDeleteQuiz,
  useDuplicateQuiz,
  useSingleAdminQuiz,
} from '@/services/quiz';
import { QuizHeader } from './quiz-header';
import { QuizQuestions } from './quiz-questions';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SingleAdminQuizPage({
  params,
}: PageProps): JSX.Element {
  const { id } = use(params);
  const router = useRouter();
  const { data: quiz, isPending, error } = useSingleAdminQuiz(id);

  const { mutateAsync: deleteQuiz } = useDeleteQuiz();
  const { mutateAsync: duplicateQuiz } = useDuplicateQuiz();

  const handleEdit = useCallback((): void => {
    router.push(`/admin/quizzes/${id}/edit`);
  }, [router, id]);

  const handleDuplicate = () => {
    toast.promise(duplicateQuiz(id), {
      loading: 'Duplicating quiz...',
      success: 'Quiz duplicated successfully!',
      error: 'Failed to duplicate quiz. Please try again.',
    });
  };

  const handleDelete = () => {
    toast.promise(deleteQuiz(id), {
      loading: 'Please wait...',
      success: 'Quiz deleted successfully!',
      error: 'Failed to delete quiz. Please try again.',
    });
  };

  // Loading State
  if (isPending) {
    return (
      <main className='min-h-screen bg-background'>
        <div className='px-4  sm:px-6 lg:px-8'>
          <div className='max-w-6xl mx-auto space-y-8'>
            {/* Header Skeleton */}
            <div className='space-y-4'>
              <div className='bg-card rounded-xl border border-border p-8 space-y-4'>
                <Skeleton className='h-12 w-3/4' />
                <Skeleton className='h-6 w-full' />
                <div className='flex gap-2 pt-4'>
                  <Skeleton className='h-8 w-20' />
                  <Skeleton className='h-8 w-20' />
                  <Skeleton className='h-8 w-20' />
                </div>
              </div>
            </div>

            {/* Questions Skeleton */}
            <div className='space-y-4'>
              <Skeleton className='h-8 w-40' />
              <div className='space-y-3'>
                {Array.from({ length: 3 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
                  <Skeleton key={i} className='h-48 w-full' />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error State
  if (error) {
    return (
      <main className='min-h-screen bg-background'>
        <div className='px-4 py-8 sm:px-6 lg:px-8'>
          <div className='max-w-6xl mx-auto'>
            <div className='rounded-lg border border-destructive/20 bg-destructive/5 p-8'>
              <div className='flex items-center gap-4'>
                <AlertCircle className='h-6 w-6 text-destructive flex-shrink-0' />
                <div>
                  <p className='font-semibold text-destructive'>
                    Failed to load quiz
                  </p>
                  <p className='text-sm text-destructive/80 mt-1'>
                    Please try again later or contact support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Not Found State
  if (!quiz) {
    return (
      <main className='min-h-screen bg-background'>
        <div className='px-4 py-8 sm:px-6 lg:px-8'>
          <div className='max-w-6xl mx-auto'>
            <div className='rounded-lg border border-border bg-card p-12 text-center'>
              <p className='text-lg font-semibold text-foreground mb-2'>
                Quiz not found
              </p>
              <p className='text-sm text-muted-foreground'>
                The quiz you are looking for does not exist or has been deleted.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Main Content
  return (
    <main className='min-h-screen bg-background'>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto space-y-8'>
          <QuizHeader
            quiz={quiz}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
          />

          <QuizQuestions quiz={quiz} />
        </div>
      </div>
    </main>
  );
}
