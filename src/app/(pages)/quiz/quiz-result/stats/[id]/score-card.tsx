'use client';

import { Progress } from '@/components/ui/progress';

interface ScoreCardProps {
  score: number;
  totalQuestions: number;
  passed: boolean;
}

export function ScoreCard({ score, totalQuestions, passed }: ScoreCardProps) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className='relative w-full max-w-2xl mx-auto mb-8'>
      <div className='bg-card rounded-2xl shadow-lg p-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          {/* Score Display */}
          <div className='flex flex-col items-center justify-center'>
            <div className='relative mb-6'>
              <div className='text-center'>
                <div className='text-7xl font-bold text-primary mb-2'>
                  {score}
                </div>
                <div className='text-lg'>out of {totalQuestions}</div>
              </div>
            </div>
            <div className='text-center'>
              <h2
                className={`text-3xl font-bold mb-2 ${
                  passed ? 'text-green-500' : 'text-muted-foreground'
                }`}
              >
                {passed ? 'Congratulations!' : 'Keep Trying!'}
              </h2>
              <p className=' text-muted-foreground text-base'>
                {passed
                  ? 'You passed the quiz successfully!'
                  : 'You need more practice. Try again!'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className='space-y-4'>
            <div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-sm font-semibold text-foreground'>
                  Your Score
                </span>
                <span className='text-sm font-bold text-primary'>
                  {Math.round(percentage)}%
                </span>
              </div>
              <Progress value={percentage} className='h-3' />
            </div>

            <div className='bg-secondary rounded-lg p-4 space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>
                  Correct Answers
                </span>
                <span className='font-bold text-foreground'>{score}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>
                  Total Questions
                </span>
                <span className='font-bold text-foreground'>
                  {totalQuestions}
                </span>
              </div>
              <div className='h-px bg-border my-2' />
              <div className='flex justify-between items-center'>
                <span className='text-sm font-semibold text-foreground'>
                  Accuracy Rate
                </span>
                <span
                  className={`font-bold ${
                    passed ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {Math.round(percentage)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
