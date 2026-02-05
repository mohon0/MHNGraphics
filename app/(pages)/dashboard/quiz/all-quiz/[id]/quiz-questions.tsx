'use client';

import type { QuestionType, SingleQuizType } from '@/types/quiz-type';
import { QuestionCard } from './question-card';

interface QuizQuestionsProps {
  quiz: SingleQuizType;
}
export function QuizQuestions({ quiz }: QuizQuestionsProps): React.JSX.Element {
  // Use React.JSX.Element instead of JSX.Element
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-foreground'>Questions</h2>
          <p className='text-sm text-muted-foreground mt-1'>
            {quiz.questions.length} question
            {quiz.questions.length !== 1 ? 's' : ''} in this quiz
          </p>
        </div>
      </div>

      <div className='space-y-4'>
        {quiz.questions.length > 0 ? (
          quiz.questions.map((question: QuestionType, index) => (
            <QuestionCard key={question.id} question={question} index={index} />
          ))
        ) : (
          <div className='rounded-lg border border-border border-dashed bg-secondary/30 p-12 text-center'>
            <p className='text-foreground font-semibold mb-1'>
              No questions yet
            </p>
            <p className='text-sm text-muted-foreground'>
              Questions will appear here once they are added to the quiz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
