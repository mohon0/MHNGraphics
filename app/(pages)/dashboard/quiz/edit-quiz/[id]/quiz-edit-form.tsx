'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Clock, GripVertical, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateQuiz } from '@/services/quiz';

// Zod Schema Definitions
const OptionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, 'Option text is required'),
  isCorrect: z.boolean(),
  explanation: z.string().optional().nullable().default(''),
});

const QuestionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, 'Question text is required'),
  order: z.number().int().nonnegative(),
  image: z.string().optional().nullable().default(''),
  imageId: z.string().optional().nullable().default(''),
  options: z.array(OptionSchema).min(2, 'At least 2 options are required'),
});

const QuizFormSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string().optional().nullable().default(''),
  category: z.string().optional().nullable().default(''),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  timeLimit: z.number().int().positive().optional().nullable(),
  passingScore: z.number().int().min(0).max(100).optional().nullable(),
  image: z.string().optional().nullable().default(''),
  imageId: z.string().optional().nullable().default(''),
  status: z
    .enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED'])
    .default('DRAFT'),
  scheduledFor: z.date().optional().nullable(),
  questions: z
    .array(QuestionSchema)
    .min(1, 'At least one question is required'),
});

type QuizFormData = z.infer<typeof QuizFormSchema>;

export function QuizEditForm({ initialData }: { initialData: QuizFormData }) {
  const [tagInput, setTagInput] = useState('');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newAnswerText, setNewAnswerText] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [draggedQuestionId, setDraggedQuestionId] = useState<string | null>(
    null,
  );
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const { mutateAsync: updateQuiz, isPending } = useUpdateQuiz();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm<QuizFormData>({
    resolver: zodResolver(QuizFormSchema),
    mode: 'onChange',
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const formData = watch();

  useEffect(() => {
    if (formData.status !== 'SCHEDULED') {
      setValue('scheduledFor', undefined);
    }
  }, [formData.status, setValue]);

  // biome-ignore lint/suspicious/noExplicitAny: this is fine
  const updateFormField = (field: keyof QuizFormData, value: any) => {
    setValue(field, value, { shouldValidate: true });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      updateFormField('tags', [...formData.tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateFormField(
      'tags',
      formData.tags.filter((tag) => tag !== tagToRemove),
    );
  };

  const addQuestion = () => {
    if (newQuestionText.trim()) {
      const newQuestion = {
        id: `new-${Date.now().toString()}`,
        text: newQuestionText.trim(),
        order: formData.questions.length,
        options: [],
      };
      updateFormField('questions', [...formData.questions, newQuestion]);
      setNewQuestionText('');
      setExpandedQuestion(newQuestion.id);
    }
  };

  const removeQuestion = (questionId: string) => {
    const filtered = formData.questions.filter(
      (q) => (q.id || `new-${q.text}`) !== questionId,
    );
    const reordered = filtered.map((q, idx) => ({ ...q, order: idx }));
    updateFormField('questions', reordered);
  };

  const addOptionToQuestion = (questionId: string) => {
    if (newAnswerText.trim()) {
      updateFormField(
        'questions',
        formData.questions.map((q) =>
          (q.id || `new-${q.text}`) === questionId
            ? {
                ...q,
                options: [
                  ...q.options,
                  {
                    id: `new-${Date.now().toString()}`,
                    text: newAnswerText.trim(),
                    isCorrect: false,
                    explanation: '',
                  },
                ],
              }
            : q,
        ),
      );
      setNewAnswerText('');
    }
  };

  const removeOption = (questionId: string, optionId: string) => {
    updateFormField(
      'questions',
      formData.questions.map((q) =>
        (q.id || `new-${q.text}`) === questionId
          ? {
              ...q,
              options: q.options.filter(
                (o) => (o.id || `new-${o.text}`) !== optionId,
              ),
            }
          : q,
      ),
    );
  };

  const toggleCorrectOption = (questionId: string, optionId: string) => {
    updateFormField(
      'questions',
      formData.questions.map((q) =>
        (q.id || `new-${q.text}`) === questionId
          ? {
              ...q,
              options: q.options.map((o) => ({
                ...o,
                isCorrect: (o.id || `new-${o.text}`) === optionId,
              })),
            }
          : q,
      ),
    );
  };

  const updateOptionExplanation = (
    questionId: string,
    optionId: string,
    explanation: string,
  ) => {
    updateFormField(
      'questions',
      formData.questions.map((q) =>
        (q.id || `new-${q.text}`) === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                (o.id || `new-${o.text}`) === optionId
                  ? { ...o, explanation }
                  : o,
              ),
            }
          : q,
      ),
    );
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    questionId: string,
  ) => {
    setDraggedQuestionId(questionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number,
  ) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (!draggedQuestionId) return;

    const draggedIndex = formData.questions.findIndex(
      (q) => (q.id || `new-${q.text}`) === draggedQuestionId,
    );
    if (draggedIndex === dropIndex || draggedIndex === -1) {
      setDraggedQuestionId(null);
      return;
    }

    const newQuestions = [...formData.questions];
    const [draggedQuestion] = newQuestions.splice(draggedIndex, 1);
    newQuestions.splice(dropIndex, 0, draggedQuestion);

    const reorderedQuestions = newQuestions.map((q, idx) => ({
      ...q,
      order: idx,
    }));

    updateFormField('questions', reorderedQuestions);
    setDraggedQuestionId(null);
  };

  const onSubmit = (data: QuizFormData) => {
    toast.promise(updateQuiz(data), {
      loading: 'Updating quiz...',
      success: 'Quiz updated successfully! 🎉',
      error: 'Failed to update quiz ❌',
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-5xl mx-auto px-4 space-y-8'
    >
      <div className='space-y-2 mb-8'>
        <h1 className='text-3xl font-bold text-slate-900'>Edit Quiz</h1>
        <p className='text-slate-600'>
          Modify quiz details, questions, and publishing settings
        </p>
      </div>

      {/* Basic Information Section */}
      <Card className='border-0 shadow-sm hover:shadow-md transition-shadow'>
        <CardHeader className='bg-linear-to-r from-blue-50 to-blue-100 border-b rounded-t-lg'>
          <div className='flex items-center gap-2'>
            <div className='w-1 h-6 bg-blue-600 rounded-full'></div>
            <div>
              <CardTitle className='text-lg'>Quiz Information</CardTitle>
              <CardDescription>Basic details about your quiz</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className='pt-6 space-y-6'>
          {/* Title */}
          <Field>
            <FieldLabel htmlFor='title'>Quiz Title</FieldLabel>
            <FieldContent>
              <Input
                id='title'
                placeholder='e.g., Advanced JavaScript Concepts'
                className='border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                {...register('title')}
              />
              <FieldError errors={errors.title ? [errors.title] : undefined} />
              <FieldDescription>
                Choose a clear, descriptive title for your quiz
              </FieldDescription>
            </FieldContent>
          </Field>

          {/* Description */}
          <Field>
            <FieldLabel htmlFor='description'>Description</FieldLabel>
            <FieldContent>
              <Textarea
                id='description'
                placeholder='Describe what your quiz covers...'
                className='border-slate-300 focus:border-blue-500 focus:ring-blue-500 min-h-24'
                {...register('description')}
              />
              <FieldError
                errors={errors.description ? [errors.description] : undefined}
              />
              <FieldDescription>
                Help users understand the quiz topic and difficulty level
              </FieldDescription>
            </FieldContent>
          </Field>

          {/* Category and Difficulty Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Field>
              <FieldLabel htmlFor='category'>Category</FieldLabel>
              <FieldContent>
                <Input
                  id='category'
                  placeholder='e.g., Programming'
                  className='border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                  {...register('category')}
                />
                <FieldError
                  errors={errors.category ? [errors.category] : undefined}
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor='difficulty'>Difficulty Level</FieldLabel>
              <FieldContent>
                <Controller
                  name='difficulty'
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='border-slate-300 focus:border-blue-500 focus:ring-blue-500'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='EASY'>Easy</SelectItem>
                        <SelectItem value='MEDIUM'>Medium</SelectItem>
                        <SelectItem value='HARD'>Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError
                  errors={errors.difficulty ? [errors.difficulty] : undefined}
                />
              </FieldContent>
            </Field>
          </div>

          {/* Time Limit & Passing Score */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <Field>
              <FieldLabel htmlFor='timeLimit'>Time Limit (minutes)</FieldLabel>
              <FieldContent>
                <Input
                  id='timeLimit'
                  type='number'
                  placeholder='e.g., 30'
                  className='border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                  {...register('timeLimit', { valueAsNumber: true })}
                />
                <FieldError
                  errors={errors.timeLimit ? [errors.timeLimit] : undefined}
                />
                <FieldDescription>
                  Leave empty for no time limit
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor='passingScore'>Passing Score (%)</FieldLabel>
              <FieldContent>
                <Input
                  id='passingScore'
                  type='number'
                  min='0'
                  max='100'
                  placeholder='e.g., 70'
                  className='border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                  {...register('passingScore', { valueAsNumber: true })}
                />
                <FieldError
                  errors={
                    errors.passingScore ? [errors.passingScore] : undefined
                  }
                />
              </FieldContent>
            </Field>
          </div>

          {/* Tags */}
          <Field>
            <FieldLabel htmlFor='tags'>Tags</FieldLabel>
            <FieldContent>
              <div className='space-y-3'>
                <div className='flex gap-2'>
                  <Input
                    id='tags'
                    placeholder='Add a tag and press Enter...'
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    className='border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                  />
                  <Button
                    type='button'
                    onClick={addTag}
                    variant='outline'
                    className='border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent'
                  >
                    Add
                  </Button>
                </div>

                {formData.tags.length > 0 && (
                  <div className='flex flex-wrap gap-2'>
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant='secondary'
                        className='flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 border-blue-300'
                      >
                        {tag}
                        <button
                          type='button'
                          onClick={() => removeTag(tag)}
                          className='hover:text-blue-900'
                        >
                          <X className='w-3 h-3' />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <FieldError errors={errors.tags ? [errors.tags] : undefined} />
              </div>
            </FieldContent>
          </Field>
        </CardContent>
      </Card>

      {/* Questions Section */}
      <Card className='border-0 shadow-sm hover:shadow-md transition-shadow'>
        <CardHeader className='bg-linear-to-r from-orange-50 to-orange-100 border-b rounded-t-lg'>
          <div className='flex items-center gap-2'>
            <div className='w-1 h-6 bg-orange-600 rounded-full'></div>
            <div>
              <CardTitle className='text-lg'>Questions & Options</CardTitle>
              <CardDescription>
                Build your quiz with questions and answer options
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className='pt-6 space-y-6'>
          {/* Add New Question */}
          <div className='space-y-3 border-b pb-6'>
            <FieldLabel className='text-sm font-semibold text-slate-700'>
              Add Question{' '}
              {formData.questions.length > 0 &&
                `(${formData.questions.length})`}
            </FieldLabel>
            <Textarea
              placeholder='Enter your question here...'
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              className='border-slate-300 focus:border-orange-500 focus:ring-orange-500 min-h-20'
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  e.preventDefault();
                  addQuestion();
                }
              }}
            />
            <Button
              type='button'
              onClick={addQuestion}
              className='bg-linear-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'
            >
              + Add Question
            </Button>
          </div>

          {/* Questions List */}
          {formData.questions.length > 0 && (
            <div className='space-y-3'>
              {formData.questions.map((question, qIndex) => {
                const questionId = question.id || `new-${question.text}`;
                return (
                  // biome-ignore lint/a11y/noStaticElementInteractions: this is fine
                  <div
                    key={questionId}
                    draggable
                    onDragStart={(e) => handleDragStart(e, questionId)}
                    onDragOver={(e) => handleDragOver(e, qIndex)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, qIndex)}
                    className={`border rounded-lg overflow-hidden transition ${
                      draggedQuestionId === questionId
                        ? 'opacity-50 border-orange-400 bg-orange-50'
                        : dragOverIndex === qIndex
                          ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-300'
                          : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Question Header */}
                    <button
                      type='button'
                      onClick={() =>
                        setExpandedQuestion(
                          expandedQuestion === questionId ? null : questionId,
                        )
                      }
                      className='w-full flex items-start gap-3 p-4 bg-linear-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-150 transition'
                    >
                      <div
                        className='shrink-0 cursor-grab active:cursor-grabbing p-1 hover:bg-slate-200 rounded transition'
                        title='Drag to reorder'
                      >
                        <GripVertical className='w-5 h-5 text-slate-600' />
                      </div>
                      <span className='shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-semibold'>
                        {qIndex + 1}
                      </span>
                      <div className='flex-1 text-left'>
                        <p className='font-semibold text-slate-900'>
                          {question.text}
                        </p>
                        <p className='text-sm text-slate-600 mt-1'>
                          {question.options.length} options
                        </p>
                      </div>
                    </button>

                    {/* Question Details (Expanded) */}
                    {expandedQuestion === questionId && (
                      <div className='p-4 border-t space-y-4 bg-white'>
                        {/* Options List */}
                        {question.options.length > 0 && (
                          <div className='space-y-3'>
                            <p className='text-xs font-semibold text-slate-600 uppercase'>
                              Options
                            </p>
                            {question.options.map((option, optIndex) => {
                              const optionId =
                                option.id || `new-${option.text}`;
                              return (
                                <div
                                  key={optionId}
                                  className='p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2'
                                >
                                  <div className='flex items-start gap-3'>
                                    <button
                                      type='button'
                                      onClick={() =>
                                        toggleCorrectOption(
                                          questionId,
                                          optionId,
                                        )
                                      }
                                      className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                                        option.isCorrect
                                          ? 'bg-green-600 border-green-600'
                                          : 'border-slate-300 hover:border-green-600'
                                      }`}
                                    >
                                      {option.isCorrect && (
                                        // biome-ignore lint/a11y/noSvgWithoutTitle: This is fine
                                        <svg
                                          className='w-4 h-4 text-white'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          stroke='currentColor'
                                        >
                                          <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={3}
                                            d='M5 13l4 4L19 7'
                                          />
                                        </svg>
                                      )}
                                    </button>
                                    <div className='flex-1'>
                                      <div className='flex items-center gap-2'>
                                        <span className='font-medium text-slate-900'>
                                          {String.fromCharCode(65 + optIndex)}.
                                        </span>
                                        <span className='text-slate-700'>
                                          {option.text}
                                        </span>
                                      </div>
                                      <Badge
                                        variant='outline'
                                        className={`mt-1 ${
                                          option.isCorrect
                                            ? 'bg-green-50 text-green-700 border-green-300'
                                            : 'bg-slate-100 text-slate-600 border-slate-300'
                                        }`}
                                      >
                                        {option.isCorrect
                                          ? '✓ Correct'
                                          : 'Wrong'}
                                      </Badge>
                                    </div>
                                    <Button
                                      type='button'
                                      variant='ghost'
                                      size='sm'
                                      onClick={() =>
                                        removeOption(questionId, optionId)
                                      }
                                      className='text-red-600 hover:bg-red-50'
                                    >
                                      <X className='w-4 h-4' />
                                    </Button>
                                  </div>
                                  <Input
                                    placeholder='Add explanation (optional)...'
                                    value={option.explanation || ''}
                                    onChange={(e) =>
                                      updateOptionExplanation(
                                        questionId,
                                        optionId,
                                        e.target.value,
                                      )
                                    }
                                    className='border-slate-300 focus:border-orange-500 focus:ring-orange-500 text-sm'
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Add Option Form */}
                        <div className='border-t pt-4 space-y-2'>
                          <p className='text-xs font-semibold text-slate-600 uppercase'>
                            Add Option
                          </p>
                          <div className='flex gap-2'>
                            <Input
                              placeholder='Enter option text...'
                              value={newAnswerText}
                              onChange={(e) => setNewAnswerText(e.target.value)}
                              className='border-slate-300 focus:border-orange-500 focus:ring-orange-500'
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addOptionToQuestion(questionId);
                                }
                              }}
                            />
                            <Button
                              type='button'
                              onClick={() => addOptionToQuestion(questionId)}
                              variant='outline'
                              className='border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent'
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Remove Question Button */}
                    <div className='px-4 py-2 border-t bg-slate-50'>
                      <Button
                        type='button'
                        variant='destructive'
                        size='sm'
                        onClick={() => removeQuestion(questionId)}
                        className='w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent'
                      >
                        Remove Question
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {formData.questions.length === 0 && (
            <div className='text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300'>
              <p className='text-slate-600 font-medium mb-2'>
                No questions added yet
              </p>
              <p className='text-sm text-slate-500'>
                Create your first question above to get started
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Publishing & Scheduling Section */}
      <Card className='border-0 shadow-sm hover:shadow-md transition-shadow'>
        <CardHeader className='bg-linear-to-r from-purple-50 to-purple-100 border-b rounded-t-lg'>
          <div className='flex items-center gap-2'>
            <div className='w-1 h-6 bg-purple-600 rounded-full'></div>
            <div>
              <CardTitle className='text-lg'>Publishing & Scheduling</CardTitle>
              <CardDescription>
                Control when your quiz goes live
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className='pt-6 space-y-6'>
          {/* Status Radio Group */}
          <div className='space-y-3'>
            {/* Draft */}
            <label className='flex items-start gap-4 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition'>
              <input
                type='radio'
                value='DRAFT'
                {...register('status')}
                className='w-5 h-5 mt-1 accent-blue-600'
              />
              <div className='flex-1'>
                <p className='font-semibold text-slate-900'>Save as Draft</p>
                <p className='text-sm text-slate-600 mt-1'>
                  Quiz will be saved but not visible to users
                </p>
              </div>
            </label>

            {/* Scheduled */}
            <label className='flex items-start gap-4 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition'>
              <input
                type='radio'
                value='SCHEDULED'
                {...register('status')}
                className='w-5 h-5 mt-1 accent-purple-600'
              />
              <div className='flex-1'>
                <p className='font-semibold text-slate-900'>
                  Schedule for Later
                </p>
                <p className='text-sm text-slate-600 mt-1'>
                  Quiz will be published at a specific date and time
                </p>
              </div>
            </label>

            {/* Published */}
            <label className='flex items-start gap-4 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition'>
              <input
                type='radio'
                value='PUBLISHED'
                {...register('status')}
                className='w-5 h-5 mt-1 accent-green-600'
              />
              <div className='flex-1'>
                <p className='font-semibold text-slate-900'>Publish Now</p>
                <p className='text-sm text-slate-600 mt-1'>
                  Quiz will be available to users immediately
                </p>
              </div>
            </label>
          </div>

          {/* Scheduled Date/Time Picker */}
          {formData.status === 'SCHEDULED' && (
            <div className='space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200'>
              <div className='flex items-center gap-2'>
                <CalendarIcon className='w-5 h-5 text-purple-600' />
                <h3 className='font-semibold text-slate-900'>
                  Schedule Publication
                </h3>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {/* Date Picker */}
                <div>
                  <FieldLabel className='text-sm mb-2 block'>Date</FieldLabel>
                  <Controller
                    name='scheduledFor'
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant='outline'
                            className='w-full justify-start text-left font-normal border-purple-300 hover:border-purple-400 bg-transparent'
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {field.value
                              ? format(new Date(field.value), 'MMM dd, yyyy')
                              : 'Select date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>

                {/* Time Picker */}
                <div>
                  <FieldLabel className='text-sm mb-2 block'>Time</FieldLabel>
                  <Controller
                    name='scheduledFor'
                    control={control}
                    render={({ field }) => (
                      <div className='flex gap-2'>
                        <div className='flex-1 relative'>
                          <Clock className='absolute left-3 top-3 h-4 w-4 text-purple-600 pointer-events-none' />
                          <input
                            type='time'
                            value={
                              field.value
                                ? format(new Date(field.value), 'HH:mm')
                                : ''
                            }
                            onChange={(e) => {
                              if (field.value && e.target.value) {
                                const [hours, minutes] =
                                  e.target.value.split(':');
                                const newDate = new Date(field.value);
                                newDate.setHours(
                                  parseInt(hours, 10),
                                  parseInt(minutes, 10),
                                );
                                field.onChange(newDate);
                              } else if (e.target.value) {
                                const [hours, minutes] =
                                  e.target.value.split(':');
                                const newDate = new Date();
                                newDate.setHours(
                                  parseInt(hours, 10),
                                  parseInt(minutes, 10),
                                );
                                field.onChange(newDate);
                              }
                            }}
                            className='w-full pl-10 pr-3 py-2 border border-purple-300 rounded-md focus:border-purple-500 focus:ring-purple-500 outline-none'
                          />
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>

              {formData.scheduledFor && (
                <div className='p-3 bg-white rounded-lg border border-purple-200'>
                  <p className='text-sm font-medium text-slate-900'>
                    Quiz scheduled for:{' '}
                    <span className='text-purple-600 font-semibold'>
                      {format(
                        new Date(formData.scheduledFor),
                        "MMMM dd, yyyy 'at' hh:mm a",
                      )}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Published Status */}
          {formData.status === 'PUBLISHED' && (
            <div className='p-4 bg-green-50 rounded-lg border border-green-200'>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-600 rounded-full'></div>
                <p className='text-sm font-medium text-green-900'>
                  Quiz is currently published and visible to users
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className='flex gap-3 justify-end pt-4 border-t'>
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
