'use client';

import {
  AlertTriangle,
  Clock,
  HelpCircle,
  Target,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuizInfo } from '@/services/quiz';

export default function QuizPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: quiz, isLoading, isError, refetch } = useQuizInfo(slug);
  const [acceptedRules, setAcceptedRules] = useState(false);

  /* -------------------- Loading Skeleton -------------------- */
  if (isLoading) {
    return (
      <div className='p-4 md:p-8'>
        <Card className='max-w-2xl mx-auto p-8 space-y-8'>
          {/* Header */}
          <div className='space-y-2'>
            <Skeleton className='h-8 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
          </div>

          {/* Stats */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='flex items-center gap-3'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='space-y-2 flex-1'>
                  <Skeleton className='h-3 w-20' />
                  <Skeleton className='h-5 w-12' />
                </div>
              </div>
            ))}
          </div>

          {/* Warning Skeleton */}
          <div className='rounded-lg border p-4 space-y-3'>
            <Skeleton className='h-4 w-40' />
            <Skeleton className='h-3 w-full' />
            <Skeleton className='h-3 w-5/6' />
            <Skeleton className='h-3 w-2/3' />
            <Skeleton className='h-3 w-2/3' />
          </div>

          {/* Checkbox Skeleton */}
          <div className='flex items-center gap-3'>
            <Skeleton className='h-4 w-4 rounded-sm' />
            <Skeleton className='h-3 w-64' />
          </div>

          {/* Button Skeleton */}
          <Skeleton className='h-12 w-full rounded-md' />
        </Card>
      </div>
    );
  }

  /* -------------------- Error State -------------------- */
  if (isError || !quiz) {
    return (
      <div className='p-4 md:p-8'>
        <Card className='max-w-md mx-auto p-8 text-center space-y-4'>
          <XCircle className='h-10 w-10 mx-auto text-destructive' />

          <div>
            <h2 className='text-xl font-semibold'>Failed to load quiz</h2>
            <p className='text-sm text-muted-foreground mt-1'>
              Something went wrong while fetching the quiz details. Please check
              your connection and try again.
            </p>
          </div>

          <Button variant='outline' onClick={() => refetch()}>
            Try again
          </Button>
        </Card>
      </div>
    );
  }

  /* -------------------- Page -------------------- */
  return (
    <div className='p-4 md:p-8'>
      <Card className='max-w-2xl mx-auto p-8 space-y-8'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold mb-2'>{quiz.title}</h1>
          <p className='text-muted-foreground'>{quiz.description}</p>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div className='flex items-center gap-3'>
            <HelpCircle className='w-8 h-8 text-primary' />
            <div>
              <p className='text-sm text-muted-foreground'>Questions</p>
              <p className='text-lg font-semibold'>{quiz._count.questions}</p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <Clock className='w-8 h-8 text-primary' />
            <div>
              <p className='text-sm text-muted-foreground'>Time Limit</p>
              <p className='text-lg font-semibold'>{quiz.timeLimit} min</p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <Target className='w-8 h-8 text-primary' />
            <div>
              <p className='text-sm text-muted-foreground'>Passing Score</p>
              <p className='text-lg font-semibold'>{quiz.passingScore}%</p>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm dark:border-yellow-900/40 dark:bg-yellow-900/10'>
          <div className='flex gap-3'>
            <AlertTriangle className='h-5 w-5 mt-0.5 text-yellow-600 dark:text-yellow-400' />
            <div className='space-y-2'>
              <p className='font-medium'>Important Instructions</p>
              <ul className='list-disc list-inside space-y-1 text-muted-foreground'>
                <li>Do not refresh or close the browser during the quiz.</li>
                <li>
                  Switching tabs or minimizing the window may end the quiz.
                </li>
                <li>The quiz is timed and cannot be paused.</li>
                <li>Any suspicious activity may be monitored.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accept Rules */}
        <div className='flex items-start gap-3'>
          <Checkbox
            id='accept-rules'
            checked={acceptedRules}
            onCheckedChange={(v) => setAcceptedRules(!!v)}
          />
          <label
            htmlFor='accept-rules'
            className='text-sm text-muted-foreground leading-snug cursor-pointer'
          >
            I understand and agree to follow the quiz rules.
          </label>
        </div>

        {/* CTA */}
        <Link href={`/quiz/quiz-start/${quiz.id}`}>
          <Button size='lg' className='w-full' disabled={!acceptedRules}>
            Start Quiz
          </Button>
        </Link>
      </Card>
    </div>
  );
}
