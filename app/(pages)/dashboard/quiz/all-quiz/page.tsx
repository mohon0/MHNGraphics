'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useAdminQuizList,
  useDeleteQuiz,
  useDuplicateQuiz,
} from '@/services/quiz';
import { QuizCard } from './quiz-card';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  category: string;
  tags: [string];
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
  createdAt: string;
}

export default function AdminQuizList() {
  const { isPending, data: quizzes = [], error } = useAdminQuizList();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('ALL');

  const router = useRouter();
  const { mutateAsync: deleteQuiz } = useDeleteQuiz();
  const { mutateAsync: duplicateQuiz } = useDuplicateQuiz();

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz: Quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesStatus =
        statusFilter === 'ALL' || quiz.status === statusFilter;
      const matchesDifficulty =
        difficultyFilter === 'ALL' || quiz.difficulty === difficultyFilter;

      return matchesSearch && matchesStatus && matchesDifficulty;
    });
  }, [quizzes, searchTerm, statusFilter, difficultyFilter]);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/quiz/edit-quiz/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/dashboard/quiz/all-quiz/${id}`);
  };

  const handleViewResults = (id: string) => {
    router.push(`/dashboard/quiz/results/${id}`);
  };

  const handleDuplicate = (id: string) => {
    toast.promise(duplicateQuiz(id), {
      loading: 'Duplicating quiz...',
      success: 'Quiz duplicated successfully!',
      error: 'Failed to duplicate quiz. Please try again.',
    });
  };

  const handleDelete = (id: string) => {
    toast.promise(deleteQuiz(id), {
      loading: 'Please wait...',
      success: 'Quiz deleted successfully!',
      error: 'Failed to delete quiz. Please try again.',
    });
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
      {/* Filters */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search quizzes...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder='Filter by status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ALL'>All Status</SelectItem>
            <SelectItem value='DRAFT'>Draft</SelectItem>
            <SelectItem value='PUBLISHED'>Published</SelectItem>
            <SelectItem value='SCHEDULED'>Scheduled</SelectItem>
            <SelectItem value='ARCHIVED'>Archived</SelectItem>
          </SelectContent>
        </Select>

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
        Showing {filteredQuizzes.length} of {quizzes.length} quizzes
      </div>

      {/* Loading State */}
      {isPending ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
              key={i}
              className='h-64 bg-secondary rounded-lg animate-pulse'
            />
          ))}
        </div>
      ) : filteredQuizzes.length === 0 ? (
        <div className='bg-secondary rounded-lg p-12 text-center'>
          <p className='text-muted-foreground font-semibold'>
            No quizzes found
          </p>
          <p className='text-muted-foreground text-sm mt-1'>
            {searchTerm || statusFilter !== 'ALL' || difficultyFilter !== 'ALL'
              ? 'Try adjusting your filters'
              : 'Create your first quiz to get started'}
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredQuizzes.map((quiz: Quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onEdit={handleEdit}
              onView={handleView}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
              onViewResults={handleViewResults}
            />
          ))}
        </div>
      )}
    </div>
  );
}
