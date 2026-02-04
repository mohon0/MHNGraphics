'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { useSingleAdminQuiz } from '@/services/quiz';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { QuizAnalytics } from './quiz-analytics';
import { UserResultsTable, type UserResult } from './user-results-table';

// You will need a service to fetch quiz results
// import { useQuizResults } from '@/services/quiz';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function QuizResultPage({ params }: PageProps) {
  const { id } = use(params);
  const { data: quiz, isPending: isQuizPending, error: quizError } = useSingleAdminQuiz(id);
  
  // Placeholder for fetching results
  const areResultsPending = false;
  const resultsError = null;
  const results: UserResult[] = [
    {
      id: '1',
      user: { name: 'John Doe', image: null },
      score: 85,
      completedAt: new Date().toISOString(),
    },
    {
        id: '2',
        user: { name: 'Jane Smith', image: 'https://github.com/shadcn.png' },
        score: 92,
        completedAt: new Date().toISOString(),
      },
      {
        id: '3',
        user: { name: 'Peter Pan', image: null },
        score: 65,
        completedAt: new Date().toISOString(),
      },
  ];

  if (isQuizPending || areResultsPending) {
    return (
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
        {/* Header Skeleton */}
        <div className='space-y-4'>
            <Skeleton className='h-10 w-2/4' />
            <Skeleton className='h-6 w-3/4' />
        </div>
        
        <QuizAnalytics isPending={true} averageScore={0} completionRate={0} totalSubmissions={0} />

        {/* Results Table Skeleton */}
        <div className='space-y-4'>
          <Skeleton className='h-8 w-40' />
          <div className='space-y-3'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='h-16 w-full' />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (quizError || resultsError) {
    return (
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className='rounded-lg border border-destructive/20 bg-destructive/5 p-8'>
              <div className='flex items-center gap-4'>
                <AlertCircle className='h-6 w-6 text-destructive flex-shrink-0' />
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

  if (!quiz) {
    notFound();
  }

  const averageScore = results.reduce((acc, r) => acc + r.score, 0) / (results.length || 1);

  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
      <div>
        <h1 className='text-3xl font-bold text-foreground'>{quiz.title} - Results</h1>
        <p className='text-muted-foreground mt-1'>
          Showing results from {results.length} participants.
        </p>
      </div>

      <QuizAnalytics 
        isPending={areResultsPending}
        totalSubmissions={results.length}
        averageScore={averageScore}
        completionRate={100} // Placeholder
      />
      
      <div>
        <h2 className='text-2xl font-bold'>Submissions</h2>
        <UserResultsTable results={results} isPending={areResultsPending} />
      </div>
    </div>
  );
}
