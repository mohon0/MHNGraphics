'use client';

import { BookOpen, Clock, Target, Zap } from 'lucide-react';

interface StatsGridProps {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  passingScore: number;
  attemptNumber: number;
}

export function StatsGrid({
  score,
  totalQuestions,
  timeSpent,
  passingScore,
  attemptNumber,
}: StatsGridProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  const stats = [
    {
      icon: Target,
      label: 'Score Percentage',
      value: `${percentage}%`,
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Clock,
      label: 'Time Spent',
      value: `${minutes}m ${seconds}s`,
      color: 'bg-pink-100 text-pink-700',
    },
    {
      icon: BookOpen,
      label: 'Passing Score',
      value: `${passingScore}%`,
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      icon: Zap,
      label: 'Attempt Number',
      value: `#${attemptNumber}`,
      color: 'bg-orange-100 text-orange-700',
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
            key={index}
            className='bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow'
          >
            <div
              className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
            >
              <Icon size={24} />
            </div>
            <p className='text-muted-foreground text-sm mb-2'>{stat.label}</p>
            <p className='text-2xl font-bold text-foreground'>{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
