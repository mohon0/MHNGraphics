'use client';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useSingleQuizResultReview } from '@/services/quiz';
import { Award, CheckCircle2, Clock, Info, XCircle } from 'lucide-react';
import { use } from 'react';

export default function ReviewResult({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    isPending,
    data: resultWrapper,
    isError,
  } = useSingleQuizResultReview(id);

  if (isPending)
    return <div className='p-8 text-center'>Loading results...</div>;
  if (isError || !resultWrapper)
    return (
      <div className='p-8 text-center text-red-500'>Error loading review.</div>
    );

  const data = resultWrapper;

  return (
    <div className='max-w-4xl mx-auto p-4 md:p-8 space-y-8'>
      {/* Header Summary Card */}
      <Card className='border-t-4 border-t-primary'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <div>
            <CardTitle className='text-2xl font-bold'>
              {data.quiz.title}
            </CardTitle>
            <CardDescription>
              Reviewing results for {data.user.name}
            </CardDescription>
          </div>
          <Badge
            variant={data.passed ? 'default' : 'destructive'}
            className='text-lg px-4 py-1'
          >
            {data.passed ? 'PASSED' : 'FAILED'}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
            <div className='flex items-center gap-2'>
              <Award className='text-muted-foreground w-5 h-5' />
              <div>
                <p className='text-sm text-muted-foreground'>Score</p>
                <p className='font-bold'>
                  {data.score} / {data.totalQuestions}
                </p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Clock className='text-muted-foreground w-5 h-5' />
              <div>
                <p className='text-sm text-muted-foreground'>Time Spent</p>
                <p className='font-bold'>
                  {Math.floor(data.timeSpent / 60)}m {data.timeSpent % 60}s
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className='text-xl font-semibold mt-8 mb-4'>Question Review</h2>

      {/* Questions List */}
      <div className='space-y-6'>
        {data.quiz.questions.map((question: any, index: number) => {
          // Find the user's specific answer for this question
          const userAnswer = data.answers.find(
            (a: any) => a.questionId === question.id,
          );

          return (
            <Card
              key={question.id}
              className={cn(
                'overflow-hidden',
                userAnswer?.isCorrect
                  ? 'border-l-4 border-l-green-500'
                  : 'border-l-4 border-l-red-500',
              )}
            >
              <CardHeader>
                <div className='flex justify-between items-start gap-4'>
                  <span className='text-sm font-medium text-muted-foreground'>
                    Question {index + 1}
                  </span>
                  {userAnswer?.isCorrect ? (
                    <Badge className='bg-green-100 text-green-700 hover:bg-green-100 border-none'>
                      Correct
                    </Badge>
                  ) : (
                    <Badge className='bg-red-100 text-red-700 hover:bg-red-100 border-none'>
                      Incorrect
                    </Badge>
                  )}
                </div>
                <CardTitle className='text-lg leading-relaxed'>
                  {question.text}
                </CardTitle>
              </CardHeader>

              <CardContent className='space-y-3'>
                <div className='grid gap-2'>
                  {question.options.map((option: any) => {
                    const isSelected =
                      userAnswer?.selectedOptionId === option.id;
                    const isCorrect = option.isCorrect;

                    return (
                      <div
                        key={option.id}
                        className={cn(
                          'flex items-center justify-between p-3 rounded-md border transition-colors',
                          isSelected &&
                            !isCorrect &&
                            'bg-red-50 border-red-200 text-red-900',
                          isCorrect &&
                            'bg-green-50 border-green-200 text-green-900',
                          !isSelected &&
                            !isCorrect &&
                            'bg-background border-slate-100',
                        )}
                      >
                        <div className='flex items-center gap-3'>
                          <span className='text-sm font-bold opacity-50 uppercase'>
                            {String.fromCharCode(
                              65 + question.options.indexOf(option),
                            )}
                          </span>
                          <span>{option.text}</span>
                        </div>

                        <div className='flex items-center'>
                          {isCorrect && (
                            <CheckCircle2 className='w-5 h-5 text-green-600' />
                          )}
                          {isSelected && !isCorrect && (
                            <XCircle className='w-5 h-5 text-red-600' />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Block */}
                {question.options.find((o: any) => o.isCorrect)
                  ?.explanation && (
                  <div className='mt-4 p-4 bg-blue-50 rounded-lg flex gap-3 text-blue-900 border border-blue-100'>
                    <Info className='w-5 h-5 shrink-0 mt-0.5 text-blue-600' />
                    <div>
                      <p className='text-sm font-semibold'>Explanation</p>
                      <p className='text-sm opacity-90'>
                        {
                          question.options.find((o: any) => o.isCorrect)
                            .explanation
                        }
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
