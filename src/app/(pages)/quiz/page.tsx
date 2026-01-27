/** biome-ignore-all lint/suspicious/noArrayIndexKey: this is fine*/
'use client';

import {
  BookOpen,
  ChevronRight,
  Clock,
  Flame,
  Search,
  Sparkles,
  Target,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import type React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { type QuizDifficulty, useQuizzes } from '@/services/quiz';

interface Datum {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  image: string;
  tags: string[];
  timeLimit: number;
  passingScore: number;
  createdAt: Date;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const PAGE_SIZE = 9;

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const variants: Record<
    string,
    { bg: string; text: string; icon: React.ReactNode }
  > = {
    EASY: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: '●' },
    MEDIUM: { bg: 'bg-amber-100', text: 'text-amber-700', icon: '●●' },
    HARD: {
      bg: 'bg-rose-100',
      text: 'text-rose-700',
      icon: <Flame className='w-3 h-3' />,
    },
  };
  const variant = variants[difficulty] || variants.EASY;

  return (
    <Badge
      className={`${variant.bg} ${variant.text} border-0 font-semibold text-xs`}
    >
      {difficulty}
    </Badge>
  );
}

function QuizzesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL state
  const pageParam = Number(searchParams.get('page')) || 1;
  const searchParamValue = searchParams.get('search') || '';
  const difficultyParam = searchParams.get('difficulty') || undefined;

  const [page, setPage] = useState(pageParam);
  const [search, setSearch] = useState(searchParamValue);
  const [difficulty, setDifficulty] = useState<string | undefined>(
    difficultyParam,
  );

  // Debounced search
  const [debouncedSearch] = useDebounce(search, 400);

  // Sync URL → state
  useEffect(() => {
    setPage(pageParam);
    setSearch(searchParamValue);
    setDifficulty(difficultyParam);
  }, [pageParam, searchParamValue, difficultyParam]);

  // Sync state → URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (page > 1) params.set('page', String(page));
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (difficulty) params.set('difficulty', difficulty);

    router.push(`?${params.toString()}`, { scroll: false });
  }, [page, debouncedSearch, difficulty, router]);

  const { data, isLoading } = useQuizzes({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch,
    difficulty:
      difficulty === undefined ? undefined : (difficulty as QuizDifficulty),
  });

  const quizzes = data?.data ?? [];
  const totalQuizzes = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPages ?? 1;

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/5 border-b border-border'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl' />
          <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl' />
        </div>

        <div className='max-w-7xl mx-auto px-6 py-16 relative'>
          <div className='flex items-center gap-3 mb-3'>
            <div className='p-2.5 bg-primary/15 rounded-lg'>
              <Sparkles className='w-6 h-6 text-primary' />
            </div>
            <h1 className='text-5xl font-bold tracking-tight'>Quiz Library</h1>
          </div>
          <p className='text-muted-foreground text-lg max-w-2xl'>
            Discover and master new skills with our curated collection of
            interactive quizzes
          </p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 py-12'>
        {/* Filters */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-12'>
          <div className='md:col-span-2'>
            <div className='relative'>
              <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
              <Input
                placeholder='Search quizzes by title or topic...'
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className='pl-12 py-6 text-base rounded-lg border-border bg-card shadow-sm focus:shadow-md transition-shadow'
              />
            </div>
          </div>

          <Select
            value={difficulty || 'ALL'}
            onValueChange={(value) => {
              setPage(1);
              setDifficulty(value === 'ALL' ? undefined : value);
            }}
          >
            <SelectTrigger className='py-6 rounded-lg bg-card text-base shadow-sm focus:shadow-md transition-shadow'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ALL'>All Levels</SelectItem>
              <SelectItem value='EASY'>Easy</SelectItem>
              <SelectItem value='MEDIUM'>Medium</SelectItem>
              <SelectItem value='HARD'>Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results info */}
        {!isLoading && quizzes.length > 0 && (
          <div className='mb-8 flex items-center gap-2 text-sm text-muted-foreground'>
            <BookOpen className='w-4 h-4' />
            <span>
              Showing{' '}
              <span className='font-semibold text-foreground'>
                {quizzes.length}
              </span>{' '}
              of{' '}
              <span className='font-semibold text-foreground'>
                {totalQuizzes}
              </span>{' '}
              quizzes
            </span>
          </div>
        )}

        {/* Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {isLoading &&
            Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <Card key={i} className='p-6 space-y-4'>
                <Skeleton className='h-40 w-full rounded-lg' />
                <Skeleton className='h-6 w-3/4' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-10 w-full' />
              </Card>
            ))}

          {!isLoading && quizzes.length === 0 && (
            <div className='col-span-full py-20 text-center'>
              <div className='p-4 bg-muted rounded-full w-fit mx-auto mb-4'>
                <BookOpen className='w-8 h-8 text-muted-foreground' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>No quizzes found</h3>
              <p className='text-muted-foreground'>
                Try adjusting your search or filters to find more quizzes
              </p>
            </div>
          )}

          {!isLoading &&
            quizzes.map((quiz: Datum) => (
              <Card
                key={quiz.id}
                onClick={() => router.push(`/quiz/quiz-test/${quiz.id}`)}
                className='overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-accent/50 group cursor-pointer'
              >
                <div className='h-40 bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden'>
                  <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/30 to-accent/30' />
                  <div className='absolute top-4 right-4'>
                    <DifficultyBadge difficulty={quiz.difficulty} />
                  </div>
                  <div className='absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity'>
                    <BookOpen className='w-20 h-20' />
                  </div>
                </div>

                <div className='p-6 flex flex-col h-full'>
                  <div className='flex-grow mb-4'>
                    <h3 className='text-lg font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors'>
                      {quiz.title}
                    </h3>
                    <p className='text-sm text-muted-foreground line-clamp-2'>
                      {quiz.description}
                    </p>
                  </div>

                  <div className='grid grid-cols-2 gap-3 mb-5 pb-5 border-t border-border pt-5'>
                    <div className='flex items-center gap-2 text-sm'>
                      <Clock className='w-4 h-4 text-primary' />
                      <span className='font-medium'>{quiz.timeLimit} min</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                      <Target className='w-4 h-4 text-primary' />
                      <span className='font-medium'>
                        {quiz.passingScore}% pass
                      </span>
                    </div>
                  </div>

                  <Button className='w-full rounded-lg h-10 font-semibold group/btn'>
                    <span className='flex items-center justify-center gap-2'>
                      Start Quiz
                      <ChevronRight className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform' />
                    </span>
                  </Button>
                </div>
              </Card>
            ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex justify-center items-center gap-3 py-8'>
            <Button
              variant='outline'
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className='rounded-lg'
            >
              Previous
            </Button>
            <div className='px-4 py-2 text-sm font-medium'>
              <span className='text-foreground'>{page}</span>
              <span className='text-muted-foreground'> of </span>
              <span className='text-foreground'>{totalPages}</span>
            </div>
            <Button
              variant='outline'
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className='rounded-lg'
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizzesPageLoading() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/5 border-b border-border'>
        <div className='max-w-7xl mx-auto px-6 py-16'>
          <div className='flex items-center gap-3 mb-3'>
            <Skeleton className='w-10 h-10 rounded-lg' />
            <Skeleton className='w-64 h-10 rounded-lg' />
          </div>
          <Skeleton className='w-full h-6 rounded-lg max-w-2xl' />
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-12'>
          <Skeleton className='md:col-span-2 h-12 rounded-lg' />
          <Skeleton className='h-12 rounded-lg' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: 9 }).map((_, i) => (
            <Card key={i} className='p-6 space-y-4'>
              <Skeleton className='h-40 w-full rounded-lg' />
              <Skeleton className='h-6 w-3/4' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-10 w-full' />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function QuizzesPage() {
  return (
    <Suspense fallback={<QuizzesPageLoading />}>
      <QuizzesContent />
    </Suspense>
  );
}
