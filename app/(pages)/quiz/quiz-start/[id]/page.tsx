'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
} from 'lucide-react';

import { use, useEffect, useMemo, useState } from 'react';

import { useForm } from 'react-hook-form';

import * as z from 'zod';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { Button } from '@/components/ui/button';

import { Card, CardContent } from '@/components/ui/card';

import { FlipClock } from '@/components/ui/flip-clock';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { Label } from '@/components/ui/label';

import { Progress } from '@/components/ui/progress';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { useSingleQuiz, useSubmitQuiz } from '@/services/quiz';

interface OptionType {
  id: string;
  text: string;
}

interface QuestionType {
  id: string;
  text: string;
  options: OptionType[];
}

export default function QuizStart({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { isPending, data, isError } = useSingleQuiz(id);
  const { mutate: submitQuiz, isPending: isSubmitting } = useSubmitQuiz();
  const [targetTime, setTargetTime] = useState<Date | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Create dynamic schema based on quiz questions with useMemo
  const quizSchema = useMemo(() => {
    if (!data?.questions) return z.object({});

    return z.object(
      data.questions.reduce(
        (
          acc: Record<string, z.ZodString>,
          question: { id: string | number },
        ) => {
          acc[String(question.id)] = z
            .string()
            .min(1, 'Please select an answer');
          return acc;
        },
        {} as Record<string, z.ZodString>,
      ),
    );
  }, [data?.questions]);

  type QuizFormValues = z.infer<typeof quizSchema>;

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    mode: 'onChange',
    defaultValues: {} as QuizFormValues,
  });

  // Reset form when data is loaded
  useEffect(() => {
    if (data?.questions) {
      const initialValues = data.questions.reduce(
        (acc: Record<string, string>, question: { id: string | number }) => {
          acc[String(question.id)] = '';
          return acc;
        },
        {} as Record<string, string>,
      );
      form.reset(initialValues as QuizFormValues);
    }
  }, [data, form]);

  useEffect(() => {
    if (!data) return;
    setTargetTime(new Date(Date.now() + data.timeLimit * 60 * 1000));

    // Set the start time once when data arrives
    if (!startTime) {
      setStartTime(Date.now());
    }
  }, [data, startTime]);

  // Get unanswered questions and calculate progress
  const formValues = form.watch();
  const formValuesRecord = formValues as Record<string, string>;
  const answeredCount = formValuesRecord
    ? Object.values(formValuesRecord).filter(Boolean).length
    : 0;
  const totalQuestions = data?._count.questions || 0;
  const allAnswered = answeredCount === totalQuestions && totalQuestions > 0;

  // Trigger celebration effect when all questions are answered
  useEffect(() => {
    if (allAnswered && !showCelebration) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [allAnswered, showCelebration]);

  if (isPending || !targetTime) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center px-4'>
        <div className='space-y-4 text-center'>
          <div className='w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto' />
          <p className='text-muted-foreground'>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center px-4'>
        <Card className='max-w-md w-full border-destructive/20 bg-destructive/5'>
          <CardContent className='pt-6'>
            <div className='flex gap-4'>
              <AlertCircle className='w-6 h-6 text-destructive shrink-0 mt-1' />
              <div>
                <h3 className='font-semibold text-foreground mb-1'>
                  Unable to load quiz
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Please check the quiz ID and try again.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = data.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === data._count.questions - 1;
  const currentAnswer = form.watch(currentQuestion.id);
  const isAnswered = !!currentAnswer;

  // Calculate unanswered questions
  const unansweredQuestions = data.questions
    // biome-ignore lint/suspicious/noExplicitAny: this is fine
    .map((q: any, idx: any) => ({ question: q, index: idx }))
    .filter(({ question }: { question: QuestionType }) => {
      const value = formValuesRecord?.[question.id];
      return !value;
    });

  // Dynamic progress based on answered questions
  const progress = (answeredCount / totalQuestions) * 100;

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowValidationAlert(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowValidationAlert(false);
    }
  };

  const handleSubmit = form.handleSubmit(
    (data) => {
      const endTime = Date.now();
      const timeSpentSeconds = startTime
        ? Math.floor((endTime - startTime) / 1000)
        : 0;
      // Trigger the mutation
      submitQuiz({
        quizId: id,
        answers: data,
        timeSpent: timeSpentSeconds,
      });
    },
    (_errors) => {
      setShowValidationAlert(true);

      // Navigate to first unanswered question
      const firstUnansweredIndex = data.questions.findIndex(
        (q: { id: string | number }) => {
          const value = formValuesRecord?.[q.id];
          return !value;
        },
      );
      if (firstUnansweredIndex !== -1) {
        setCurrentQuestionIndex(firstUnansweredIndex);
      }
    },
  );

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowValidationAlert(false);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-4 sm:py-6 lg:py-8 px-3 sm:px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-4 sm:mb-6 lg:mb-8'>
          {/* Title and Timer - Stack on mobile */}
          <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6'>
            <div className='flex-1 min-w-0'>
              <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2'>
                <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-foreground break-words'>
                  {data.title}
                </h1>
                {allAnswered && (
                  <span className='inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-500 w-fit'>
                    <CheckCircle2 className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
                    Complete
                  </span>
                )}
              </div>
              <p className='text-sm sm:text-base text-muted-foreground'>
                Question{' '}
                <span className='font-semibold text-foreground'>
                  {currentQuestionIndex + 1}
                </span>{' '}
                of{' '}
                <span className='font-semibold text-foreground'>
                  {data._count.questions}
                </span>
              </p>
            </div>

            {/* Timer - Compact on mobile */}
            <div className='flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0'>
              <Clock className='w-4 h-4 text-muted-foreground sm:hidden' />
              <div className='text-xs sm:text-sm text-muted-foreground sm:mb-2 flex-1 sm:flex-none'>
                Time remaining
              </div>
              <div className='scale-90 sm:scale-100 origin-right sm:origin-top-right'>
                <FlipClock
                  countdown
                  targetDate={targetTime}
                  size='sm'
                  variant='outline'
                />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2 sm:gap-3'>
              <Progress value={progress} className='h-1.5 sm:h-2 flex-1' />
              <div className='text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap'>
                {answeredCount}/{totalQuestions}
              </div>
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 text-xs text-muted-foreground'>
              <span>
                {answeredCount === 0
                  ? 'No questions answered yet'
                  : answeredCount === totalQuestions
                    ? '🎉 All questions answered!'
                    : `${unansweredQuestions.length} question${
                        unansweredQuestions.length > 1 ? 's' : ''
                      } remaining`}
              </span>
              <span className='sm:ml-auto'>
                {Math.round(progress)}% complete
              </span>
            </div>
          </div>
        </div>

        {/* Validation Alert */}
        {showValidationAlert && unansweredQuestions.length > 0 && (
          <Alert variant='destructive' className='mb-4 sm:mb-6'>
            <AlertTriangle className='h-4 w-4' />
            <AlertTitle className='text-sm sm:text-base'>
              Cannot submit quiz
            </AlertTitle>
            <AlertDescription className='mt-2 text-sm'>
              <p className='mb-3'>
                Please answer all questions before submitting. You have{' '}
                {unansweredQuestions.length} unanswered question
                {unansweredQuestions.length > 1 ? 's' : ''}:
              </p>
              <div className='flex flex-wrap gap-2'>
                {unansweredQuestions.map(({ index }: { index: number }) => (
                  <Button
                    key={index}
                    variant='outline'
                    size='sm'
                    onClick={() => goToQuestion(index)}
                    className='h-7 sm:h-8 text-xs sm:text-sm'
                  >
                    Question {index + 1}
                  </Button>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Question Card */}
        <Form {...form}>
          <Card className='mb-6 sm:mb-8 border-border/50 shadow-lg'>
            <CardContent className='pt-5 sm:pt-6 lg:pt-8 pb-5 sm:pb-6 lg:pb-8 px-4 sm:px-6'>
              <div className='mb-6 sm:mb-8'>
                <h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-relaxed'>
                  {currentQuestion.text}
                </h2>
              </div>

              {/* Options */}
              <FormField
                control={form.control}
                name={currentQuestion.id}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <div className='space-y-2.5 sm:space-y-3'>
                          {(currentQuestion.options || []).map(
                            (option: OptionType) => {
                              const isSelected = field.value === option.id;
                              return (
                                <div key={option.id} className='group relative'>
                                  <Label
                                    htmlFor={option.id}
                                    className={`flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                                      isSelected
                                        ? 'border-primary bg-primary/10 shadow-md shadow-primary/20'
                                        : 'border-border/40 bg-card/50 hover:border-primary/40 hover:bg-primary/5 shadow-sm hover:shadow-md'
                                    }`}
                                  >
                                    <div className='pt-0.5 flex-shrink-0'>
                                      <div
                                        className={`relative w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                          isSelected
                                            ? 'border-primary bg-primary'
                                            : 'border-border group-hover:border-primary/60'
                                        }`}
                                      >
                                        {isSelected && (
                                          <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary-foreground' />
                                        )}
                                      </div>
                                      <RadioGroupItem
                                        value={option.id}
                                        id={option.id}
                                        className='sr-only'
                                      />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                      <span
                                        className={`text-sm sm:text-base leading-relaxed block transition-colors break-words ${
                                          isSelected
                                            ? 'text-foreground font-semibold'
                                            : 'text-foreground/80 group-hover:text-foreground'
                                        }`}
                                      >
                                        {option.text}
                                      </span>
                                    </div>
                                    {isSelected && (
                                      <div className='flex-shrink-0 mt-0.5'>
                                        <CheckCircle2 className='w-5 h-5 sm:w-6 sm:h-6 text-primary animate-in fade-in scale-in duration-200' />
                                      </div>
                                    )}
                                  </Label>
                                </div>
                              );
                            },
                          )}
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Navigation - Responsive layout */}
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4'>
            <Button
              type='button'
              variant='outline'
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className='gap-2 w-full sm:w-auto order-2 sm:order-1'
              size='lg'
            >
              <ChevronLeft className='w-4 h-4' />
              Previous
            </Button>

            <div className='flex items-center gap-2 sm:gap-3 order-1 sm:order-2'>
              {!isLastQuestion && (
                <Button
                  type='button'
                  onClick={handleNext}
                  size='lg'
                  className='gap-2 flex-1 sm:flex-none sm:px-8'
                >
                  Next
                  <ChevronRight className='w-4 h-4' />
                </Button>
              )}

              {/* Show submit button when all answered OR on last question */}
              {(allAnswered || isLastQuestion) && (
                <Button
                  type='button'
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  size='lg'
                  variant={allAnswered ? 'default' : 'secondary'}
                  className={`gap-2 flex-1 sm:flex-none sm:px-8 transition-all relative ${
                    allAnswered
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30'
                      : ''
                  }`}
                >
                  {allAnswered ? (
                    <Sparkles className='w-4 h-4' />
                  ) : (
                    <CheckCircle2 className='w-4 h-4' />
                  )}
                  <span className='hidden sm:inline'>
                    {allAnswered
                      ? 'Submit Quiz'
                      : `Submit (${answeredCount}/${totalQuestions})`}
                  </span>
                  <span className='sm:hidden'>
                    {allAnswered
                      ? 'Submit'
                      : `Submit (${answeredCount}/${totalQuestions})`}
                  </span>
                </Button>
              )}
            </div>
          </div>
        </Form>

        {/* Footer Info */}
        <div
          className={`mt-6 sm:mt-8 p-3 sm:p-4 rounded-lg border transition-all ${
            allAnswered
              ? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900'
              : 'bg-muted/30 border-border/30'
          }`}
        >
          <p className='text-xs sm:text-sm text-center'>
            {allAnswered ? (
              <span className='flex items-center justify-center gap-2 text-green-700 dark:text-green-400 font-medium'>
                <CheckCircle2 className='w-4 h-4 sm:w-5 sm:h-5' />
                All questions answered! Ready to submit.
              </span>
            ) : !isAnswered ? (
              <span className='text-muted-foreground'>
                You can skip questions and answer them later
              </span>
            ) : (
              <span className='flex items-center justify-center gap-2 text-muted-foreground'>
                <CheckCircle2 className='w-4 h-4 text-primary' />
                <span className='hidden sm:inline'>
                  Answer recorded • {unansweredQuestions.length} remaining
                </span>
                <span className='sm:hidden'>
                  {unansweredQuestions.length} remaining
                </span>
              </span>
            )}
          </p>
        </div>

        {/* Question Navigator */}
        {data._count.questions > 1 && (
          <div className='mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-muted/20 border border-border/30'>
            <p className='text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3'>
              Question Navigator
            </p>
            <div className='flex flex-wrap gap-1.5 sm:gap-2'>
              {data.questions.map((question: QuestionType, index: number) => {
                const answered = !!form.watch(question.id);
                const isCurrent = index === currentQuestionIndex;
                return (
                  <Button
                    key={question.id}
                    type='button'
                    variant={
                      isCurrent ? 'default' : answered ? 'secondary' : 'outline'
                    }
                    size='sm'
                    onClick={() => goToQuestion(index)}
                    className='h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs sm:text-sm'
                  >
                    {answered && !isCurrent && (
                      <CheckCircle2 className='w-3.5 h-3.5 sm:w-4 sm:h-4 absolute' />
                    )}
                    <span className={answered && !isCurrent ? 'sr-only' : ''}>
                      {index + 1}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
