import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';

type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

interface DifficultyConfig {
  label: string;
  className: string;
}

const difficultyConfig: Record<Difficulty, DifficultyConfig> = {
  EASY: {
    label: 'Easy',
    className: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
  },
  MEDIUM: {
    label: 'Medium',
    className: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
  },
  HARD: {
    label: 'Hard',
    className: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
  },
};

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

export function DifficultyBadge({
  difficulty,
}: DifficultyBadgeProps): JSX.Element {
  const config = difficultyConfig[difficulty];
  return (
    <Badge
      variant='outline'
      className={`font-medium text-xs ${config.className}`}
    >
      {config.label}
    </Badge>
  );
}
