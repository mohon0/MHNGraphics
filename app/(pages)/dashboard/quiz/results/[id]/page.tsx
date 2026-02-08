'use client';

import { AlertCircle } from 'lucide-react';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminSingleQuizResult } from '@/services/admin';
import { QuizAnalytics } from './quiz-analytics';
import { UserResultsTable } from './user-results-table';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function QuizResultPage({ params }: PageProps) {
  const { id } = use(params);
  const { data: quizResults, isPending, error } = useAdminSingleQuizResult(id);

  if (isPending) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
        {/* Header Skeleton */}
        <div className='space-y-4'>
          <Skeleton className='h-10 w-2/4' />
          <Skeleton className='h-6 w-3/4' />
        </div>

        {/* Analytics Skeleton */}
        <div className='grid gap-4 md:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
            <Skeleton key={i} className='h-24 w-full' />
          ))}
        </div>

        {/* Results Table Skeleton */}
        <div className='space-y-4'>
          <Skeleton className='h-8 w-40' />
          <div className='space-y-3'>
            {Array.from({ length: 5 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
              <Skeleton key={i} className='h-16 w-full' />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='rounded-lg border border-destructive/20 bg-destructive/5 p-8'>
          <div className='flex items-center gap-4'>
            <AlertCircle className='h-6 w-6 text-destructive shrink-0' />
            <div>
              <p className='font-semibold text-destructive'>
                Failed to load quiz results
              </p>
              <p className='text-sm text-destructive/80 mt-1'>
                Please try again later or contact support.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!quizResults) {
    notFound();
  }

  const { quiz, results, stats, pagination } = quizResults;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-foreground'>{quiz.title}</h1>
        <p className='text-muted-foreground mt-2'>
          <span className='font-semibold text-foreground'>
            {quiz.difficulty}
          </span>{' '}
          •<span className='ml-2'>Passing Score: {quiz.passingScore}%</span> •
          <span className='ml-2'>Time Limit: {quiz.timeLimit} min</span>
        </p>
      </div>

      {/* Analytics Cards */}
      <QuizAnalytics stats={stats} isPending={false} />

      {/* Results Section */}
      <div>
        <div className='mb-4'>
          <h2 className='text-2xl font-bold'>Submissions</h2>
          <p className='text-sm text-muted-foreground mt-1'>
            {pagination.total} total submissions{' '}
            {pagination.hasMore && '(showing latest)'}
          </p>
        </div>
        <UserResultsTable
          results={results}
          quizTitle={quiz.title}
          isPending={false}
        />
      </div>
    </div>
  );
}
