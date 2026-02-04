'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAdminQuizList } from '@/services/quiz';
import type { Quiz } from '../all-quiz/page';

// This is a placeholder. You'll need to create a new component for quiz results.
import { QuizCard } from '../all-quiz/quiz-card';

export default function AdminQuizResultsList() {
  const { isPending, data: quizzes = [], error } = useAdminQuizList();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('ALL');

  const router = useRouter();

  const filteredQuizzes = useMemo(() => {
    // Only show published quizzes for results
    return quizzes
      .filter((quiz: Quiz) => quiz.status === 'PUBLISHED')
      .filter((quiz: Quiz) => {
        const matchesSearch =
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDifficulty =
          difficultyFilter === 'ALL' || quiz.difficulty === difficultyFilter;

        return matchesSearch && matchesDifficulty;
      });
  }, [quizzes, searchTerm, difficultyFilter]);

  const handleViewResults = (id: string) => {
    router.push(`/dashboard/quiz/results/${id}`);
  };

  if (error) {
    return (
      <div className='bg-destructive/10 border border-destructive/30 rounded-lg p-6 text-center'>
        <p className='text-destructive font-semibold'>Failed to load quizzes</p>
        <p className='text-destructive/80 text-sm mt-1'>
          Please try again later or contact support.
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
        <div className='flex items-center justify-between'>
            <div>
                <h1 className='text-2xl font-bold'>Quiz Results</h1>
                <p className='text-muted-foreground'>
                    View participant results for published quizzes.
                </p>
            </div>
        </div>
      {/* Filters */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search quizzes...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>

        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger>
            <SelectValue placeholder='Filter by difficulty' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ALL'>All Difficulty</SelectItem>
            <SelectItem value='EASY'>Easy</SelectItem>
            <SelectItem value='MEDIUM'>Medium</SelectItem>
            <SelectItem value='HARD'>Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className='text-sm text-muted-foreground'>
        Showing {filteredQuizzes.length} of {quizzes.filter((q: Quiz) => q.status === 'PUBLISHED').length} published quizzes
      </div>

      {/* Loading State */}
      {isPending ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='h-64 bg-secondary rounded-lg animate-pulse'
            />
          ))}
        </div>
      ) : filteredQuizzes.length === 0 ? (
        <div className='bg-secondary rounded-lg p-12 text-center'>
          <p className='text-muted-foreground font-semibold'>
            No published quizzes found
          </p>
          <p className='text-muted-foreground text-sm mt-1'>
            {searchTerm || difficultyFilter !== 'ALL'
              ? 'Try adjusting your filters'
              : 'Publish a quiz to see results'}
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredQuizzes.map((quiz: Quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onView={handleViewResults}
            />
          ))}
        </div>
      )}
    </div>
  );
}
