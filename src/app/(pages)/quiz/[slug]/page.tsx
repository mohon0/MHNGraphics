'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useQuiz, useSubmitQuiz } from '@/services/quiz';
import { Check, Clock, HelpCircle, Target, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type QuizStatus = 'lobby' | 'active' | 'submitted';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

interface QuizData {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit: number;
  passingScore: number;
}

interface SubmissionResult {
  score: number;
  passed: boolean;
  correctAnswers: Record<string, string>;
  userAnswers: Record<string, string>;
}

function ActiveQuiz({
  quiz,
  onComplete,
}: {
  quiz: QuizData;
  onComplete: (answers: Record<string, string>) => void;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete(answers);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete, answers]);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(answers);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <Card className='max-w-2xl mx-auto'>
      <CardHeader>
        <div className='flex justify-between items-center mb-4'>
          <CardTitle>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </CardTitle>
          <div className='flex items-center gap-2 font-semibold text-lg'>
            <Clock className='w-6 h-6' />
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>
        <Progress value={progress} />
      </CardHeader>
      <CardContent>
        <p className='mb-4 text-lg font-bold py-5'>{currentQuestion.text}</p>

        <RadioGroup
          value={answers[currentQuestion.id] || ''}
          onValueChange={(value) =>
            handleAnswerChange(currentQuestion.id, value)
          }
        >
          {(currentQuestion.options || []).map((option) => (
            <div
              key={option.id}
              className='flex items-center space-x-2 p-3 rounded-md hover:bg-muted'
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className='flex-1'>
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className='flex justify-between mt-8'>
          <Button
            variant='outline'
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          {isLastQuestion ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function QuizResult({
  quiz,
  result,
  onTryAgain,
}: {
  quiz: QuizData;
  result: SubmissionResult;
  onTryAgain: () => void;
}) {
  return (
    <Card className='max-w-2xl mx-auto'>
      <CardHeader className='text-center'>
        <h2 className='text-2xl font-bold'>Quiz Completed!</h2>
        <div className='my-4'>
          <p className='text-4xl font-bold'>{result.score}%</p>
          <Badge
            className={
              result.passed
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }
          >
            {result.passed ? 'Passed' : 'Failed'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className='text-xl font-semibold mb-4'>Review Answers</h3>
        <div className='space-y-6'>
          {quiz.questions.map((question, index) => {
            const userAnswerId = result.userAnswers[question.id];
            const correctAnswerId = result.correctAnswers[question.id];
            const isCorrect = userAnswerId === correctAnswerId;

            return (
              <div key={question.id}>
                <p className='font-semibold'>
                  {index + 1}. {question.text}
                </p>
                <div className='mt-2 space-y-2'>
                  {question.options.map((option) => {
                    const isUserAnswer = option.id === userAnswerId;
                    const isCorrectAnswer = option.id === correctAnswerId;

                    return (
                      <div
                        key={option.id}
                        className={`flex items-center gap-3 p-2 rounded-md ${
                          isCorrectAnswer
                            ? 'bg-green-100'
                            : isUserAnswer
                              ? 'bg-red-100'
                              : ''
                        }`}
                      >
                        {isCorrectAnswer ? (
                          <Check className='w-5 h-5 text-green-600' />
                        ) : isUserAnswer ? (
                          <X className='w-5 h-5 text-red-600' />
                        ) : (
                          <div className='w-5 h-5' />
                        )}
                        <span>{option.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <Button onClick={onTryAgain} className='w-full mt-8'>
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}

export default function QuizPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [quizStatus, setQuizStatus] = useState<QuizStatus>('lobby');
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);

  const { data: quiz, isLoading, isError } = useQuiz(slug);
  const { mutate: submitQuiz, isPending: isSubmitting } = useSubmitQuiz();

  const handleQuizSubmit = (answers: Record<string, string>) => {
    submitQuiz(
      { quizId: slug, answers },
      {
        onSuccess: (data) => {
          setSubmissionResult({ ...data, userAnswers: answers });
          setQuizStatus('submitted');
        },
      },
    );
  };

  const handleTryAgain = () => {
    setSubmissionResult(null);
    setQuizStatus('lobby');
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        Loading quiz...
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        Error loading quiz.
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        Submitting your answers...
      </div>
    );
  }

  return (
    <div className='p-4 md:p-8'>
      {quizStatus === 'lobby' && (
        <Card className='max-w-2xl mx-auto p-8'>
          <h1 className='text-3xl font-bold mb-2'>{quiz.title}</h1>
          <p className='text-muted-foreground mb-6'>{quiz.description}</p>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
            <div className='flex items-center gap-3'>
              <HelpCircle className='w-8 h-8 text-primary' />
              <div>
                <p className='text-sm text-muted-foreground'>Questions</p>
                <p className='text-lg font-semibold'>{quiz.questions.length}</p>
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

          <Button
            size='lg'
            className='w-full'
            onClick={() => setQuizStatus('active')}
          >
            Start Quiz
          </Button>
        </Card>
      )}

      {quizStatus === 'active' && quiz && (
        <ActiveQuiz quiz={quiz} onComplete={handleQuizSubmit} />
      )}

      {quizStatus === 'submitted' && submissionResult && quiz && (
        <QuizResult
          quiz={quiz}
          result={submissionResult}
          onTryAgain={handleTryAgain}
        />
      )}
    </div>
  );
}
