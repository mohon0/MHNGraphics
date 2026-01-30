'use client';

import { use } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useSingleAdminQuiz } from '@/services/quiz';
import { QuizEditForm } from './quiz-edit-form';

export default function EditQuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: quizData, isPending, error } = useSingleAdminQuiz(id);

  if (isPending) {
    return (
      <div className='w-full max-w-5xl mx-auto px-4 space-y-8'>
        <Skeleton className='h-12 w-1/2' />
        <Skeleton className='h-64 w-full' />
        <Skeleton className='h-96 w-full' />
        <Skeleton className='h-64 w-full' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full max-w-5xl mx-auto px-4'>
        <div className='bg-destructive/10 border border-destructive/30 rounded-lg p-6 text-center'>
          <p className='text-destructive font-semibold'>Failed to load quiz</p>
          <p className='text-destructive/80 text-sm mt-1'>
            Please try again later or contact support.
          </p>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className='w-full max-w-5xl mx-auto px-4'>
        <div className='bg-secondary rounded-lg p-12 text-center'>
          <p className='text-muted-foreground font-semibold'>Quiz not found</p>
          <p className='text-muted-foreground text-sm mt-1'>
            The quiz you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return <QuizEditForm initialData={quizData} />;
}
