'use client';

import { FileIcon, InfoIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useDurationToggle, useFetchDuration } from '@/services/admin';

/**
 * DurationToggle Component
 *
 * Displays a toggle switch to control the visibility of free application functionality.
 * Fetches the current state and allows admins to toggle it on/off.
 */
export default function DurationToggle() {
  const { data, isLoading, isError } = useFetchDuration();
  const [visibility, setVisibility] = useState(false);
  const { handleSwitchChange, isLoading: isToggling } = useDurationToggle(
    visibility,
    setVisibility,
  );

  // Update state when fetched data changes
  useEffect(() => {
    if (data) {
      setVisibility(data.button === 'On');
    }
  }, [data]);

  // Display loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <Skeleton className='h-5 w-[140px]' />
          <Skeleton className='h-9 w-9 rounded-full' />
        </CardHeader>
        <CardContent className='mt-4'>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-6 w-11' />
            <Skeleton className='h-4 w-24' />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Display error message if data fetching fails
  if (isError) {
    return (
      <Card className='border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20'>
        <CardContent className='p-6'>
          <p className='text-red-500 dark:text-red-400 text-sm'>
            Failed to load data.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='h-full'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='flex items-center gap-2'>
          <CardTitle className='text-sm font-medium'>
            Free Application
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className='h-4 w-4 text-muted-foreground cursor-help' />
              </TooltipTrigger>
              <TooltipContent>
                <p className='w-[200px] text-xs'>
                  Toggle to enable or disable the free application functionality
                  for users.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className='rounded-full bg-primary/10 p-2 text-primary'>
          <FileIcon className='h-5 w-5' />
        </div>
      </CardHeader>
      <CardContent className='pt-6'>
        <div className='flex items-center space-x-2'>
          <Switch
            id='free'
            checked={visibility}
            onCheckedChange={handleSwitchChange}
            disabled={isToggling}
          />
          <Label htmlFor='free' className='font-medium'>
            Free Apply {visibility ? 'Open' : 'Closed'}
          </Label>
        </div>
        <p className='mt-2 text-xs text-muted-foreground'>
          {visibility
            ? 'Users can currently apply for free.'
            : 'Free applications are currently disabled.'}
        </p>
      </CardContent>
    </Card>
  );
}
