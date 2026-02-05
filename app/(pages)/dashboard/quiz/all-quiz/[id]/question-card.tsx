'use client';

import { CheckCircle2, Circle } from 'lucide-react';
import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { QuestionType } from '@/types/quiz-type';

type QuestionCardProps = {
  index: number;
  question: QuestionType;
};

export function QuestionCard({
  question,
  index,
}: QuestionCardProps): JSX.Element {
  const correctAnswersCount = question.options.filter(
    (opt) => opt.isCorrect,
  ).length;

  return (
    <Card className='overflow-hidden hover:shadow-md transition-shadow'>
      <CardHeader className='pb-3 bg-secondary/50 border-b border-border'>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex-1'>
            <div className='flex items-center gap-3 mb-2'>
              <Badge variant='outline' className='bg-accent/10 text-foreground'>
                Question {index + 1}
              </Badge>
              {correctAnswersCount > 1 && (
                <Badge variant='secondary' className='text-xs'>
                  {correctAnswersCount} correct answers
                </Badge>
              )}
            </div>
            <h3 className='text-lg font-semibold text-foreground leading-snug'>
              {question.text}
            </h3>
          </div>
        </div>
      </CardHeader>

      <CardContent className='pt-4'>
        <div className='space-y-2'>
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                option.isCorrect
                  ? 'bg-primary/5 border-primary/30'
                  : 'bg-background border-border hover:border-primary/20'
              }`}
            >
              {option.isCorrect ? (
                <CheckCircle2 className='h-5 w-5 text-primary shrink-0 mt-0.5' />
              ) : (
                <Circle className='h-5 w-5 text-muted-foreground shrink-0 mt-0.5' />
              )}
              <div className='flex-1 min-w-0'>
                <p
                  className={`text-sm leading-relaxed ${
                    option.isCorrect
                      ? 'font-semibold text-foreground'
                      : 'text-foreground'
                  }`}
                >
                  {option.text}
                </p>
              </div>
              {option.isCorrect && (
                <Badge className='bg-primary text-primary-foreground text-xs font-medium shrink-0'>
                  Correct
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
