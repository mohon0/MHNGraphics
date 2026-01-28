'use client';

import Image from 'next/image';

interface UserSectionProps {
  user: {
    name: string;
    email: string;
    image?: string;
  };
  quizTitle: string;
  completedAt: string;
}

export function UserSection({
  user,
  quizTitle,
  completedAt,
}: UserSectionProps) {
  const date = new Date(completedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const time = new Date(completedAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className='bg-card rounded-xl shadow-sm border border-border p-6 mb-8'>
      <div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
        <div className='flex-shrink-0'>
          {user.image ? (
            <div className='relative w-20 h-20'>
              <Image
                src={user.image || '/placeholder.svg'}
                alt={user.name}
                fill
                className='rounded-full object-cover'
              />
            </div>
          ) : (
            <div className='w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center'>
              <span className='text-xl font-bold text-white'>
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className='flex-grow'>
          <h3 className='text-2xl font-bold text-foreground mb-1'>
            {user.name}
          </h3>
          <p className='text-muted-foreground mb-3'>{user.email}</p>
          <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Quiz Completed</p>
              <p className='font-semibold text-foreground'>{quizTitle}</p>
            </div>
            <div className='sm:border-l sm:border-border sm:pl-4'>
              <p className='text-sm text-muted-foreground'>Date & Time</p>
              <p className='font-semibold text-foreground'>
                {date} at {time}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
