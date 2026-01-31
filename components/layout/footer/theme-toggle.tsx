'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch by waiting until mounted
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className='flex items-center space-x-2'>
      <Sun className='h-4 w-4' />
      <Switch
        id='dark-mode'
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      />
      <Moon className='h-4 w-4' />
      <Label htmlFor='dark-mode' className='sr-only'>
        Toggle theme
      </Label>
    </div>
  );
}
