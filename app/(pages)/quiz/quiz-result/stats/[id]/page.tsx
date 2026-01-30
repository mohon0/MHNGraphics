'use client';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useSingleQuizResult } from '@/services/quiz';
import { ActionButtons } from './action-buttons';
import { ScoreCard } from './score-card';
import { StatsGrid } from './stats-grid';
import { UserSection } from './user-section';

export default function QuizResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { isPending, data, isError } = useSingleQuizResult(id);
  const router = useRouter();

  const handleRetry = () => {
    router.push(`/quiz/quiz-test/${data?.quiz.id}`);
  };

  const handleHome = () => {
    router.push('/');
  };
  const handleNext = () => {
    router.push(`/quiz/quiz-result/review-result/${data?.id}`);
  };

  if (isPending) {
    return (
      <div className='min-h-screen bg-background py-12 px-4'>
        <div className='max-w-4xl mx-auto'>
          <Skeleton className='h-48 w-48 rounded-full mx-auto mb-8' />
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
            {[...Array(4)].map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
              <Skeleton key={i} className='h-32 rounded-xl' />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center px-4'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Unable to load result
          </h1>
          <p className='text-muted mb-8'>Please try again later.</p>
          <button
            type='button'
            onClick={handleHome}
            className='bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg'
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background py-12 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance'>
            Quiz Complete!
          </h1>
          <p className=' text-lg'>
            Here's how you performed on{' '}
            <span className='font-semibold text-foreground'>
              {data.quiz.title}
            </span>
          </p>
        </div>

        {/* Score Card */}
        <ScoreCard
          score={data.score}
          totalQuestions={data.totalQuestions}
          passed={data.passed}
        />

        {/* Stats Grid */}
        <StatsGrid
          score={data.score}
          totalQuestions={data.totalQuestions}
          timeSpent={data.timeSpent}
          passingScore={data.quiz.passingScore}
          attemptNumber={data.attemptNumber}
        />

        {/* User Section */}
        <UserSection
          user={data.user}
          quizTitle={data.quiz.title}
          completedAt={data.completedAt}
        />

        {/* Action Buttons */}
        <ActionButtons
          onRetry={handleRetry}
          onHome={handleHome}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
