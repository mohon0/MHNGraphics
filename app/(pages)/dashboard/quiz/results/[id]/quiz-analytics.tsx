'use client';

import { Award, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { QuizStats } from '@/types/quiz-type';

interface QuizAnalyticsProps {
  stats: QuizStats;
  isPending: boolean;
}

export function QuizAnalytics({ stats, isPending }: QuizAnalyticsProps) {
  if (isPending) {
    return (
      <div className='grid gap-4 md:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                <Skeleton className='h-4 w-20' />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-16' />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const analytics = [
    {
      title: 'Total Attempts',
      value: stats.totalAttempts,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Average Score',
      value: `${stats.averageScore.toFixed(1)}`,
      subtitle: 'out of 10',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Highest Score',
      value: stats.highestScore,
      icon: Award,
      color: 'text-purple-600',
    },
    {
      title: 'Pass Rate',
      value: `${stats.passRate.toFixed(0)}%`,
      icon: TrendingUp,
      color: 'text-amber-600',
    },
  ];

  return (
    <div className='grid gap-4 md:grid-cols-4'>
      {analytics.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stat.value}</div>
              {stat.subtitle && (
                <p className='text-xs text-muted-foreground mt-1'>
                  {stat.subtitle}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
