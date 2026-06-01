'use client';

import { ArrowLeft, Loader2, Monitor, Save, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import {
  useAdminAppReleases,
  useUpsertAppRelease,
} from '@/services/app-download';

// ─── Platform Configuration ────────────────────────────────────────────────────

const PLATFORM_CONFIG = [
  {
    value: 'ANDROID' as const,
    label: 'Android',
    icon: Smartphone,
    description: 'APK download for Android devices',
  },
  {
    value: 'WINDOWS' as const,
    label: 'Windows',
    icon: Monitor,
    description: 'Installer for Windows 10 & 11',
  },
  {
    value: 'IOS' as const,
    label: 'iOS',
    icon: Smartphone,
    description: 'Coming soon — iOS support',
  },
  {
    value: 'MACOS' as const,
    label: 'macOS',
    icon: Monitor,
    description: 'Coming soon — macOS support',
  },
  {
    value: 'LINUX' as const,
    label: 'Linux',
    icon: Monitor,
    description: 'Coming soon — Linux support',
  },
];

// ─── Types ─────────────────────────────────────────────────────────────────────

interface PlatformFormState {
  url: string;
  version: string;
  active: boolean;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function AdminAppDownloadPage() {
  const { data: releases, isLoading } = useAdminAppReleases();
  const { mutate: upsert, isPending: isSaving } = useUpsertAppRelease();
  const [savingPlatform, setSavingPlatform] = useState<string | null>(null);

  const [formState, setFormState] = useState<Record<string, PlatformFormState>>(
    {},
  );

  // Initialise form state from server data
  useEffect(() => {
    if (!releases) return;

    setFormState((prev) => {
      const next = { ...prev };
      for (const release of releases) {
        next[release.platform] = {
          url: release.downloadUrl,
          version: release.version ?? '',
          active: release.isActive,
        };
      }
      return next;
    });
  }, [releases]);

  const updateField = (
    platform: string,
    field: keyof PlatformFormState,
    value: string | boolean,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [platform]: {
        ...(prev[platform] ?? { url: '', version: '', active: false }),
        [field]: value,
      },
    }));
  };

  const handleSave = (platform: string) => {
    const entry = formState[platform];
    if (!entry?.url) return;

    setSavingPlatform(platform);
    upsert(
      {
        platform,
        downloadUrl: entry.url,
        version: entry.version || undefined,
        isActive: entry.active,
      },
      {
        onSettled: () => setSavingPlatform(null),
      },
    );
  };

  if (isLoading) {
    return (
      <div className='min-h-screen p-6 space-y-6'>
        <Skeleton className='h-8 w-56' />
        <div className='grid gap-6 md:grid-cols-2'>
          {[1, 2].map((i) => (
            <Skeleton key={i} className='h-56 rounded-2xl' />
          ))}
        </div>
      </div>
    );
  }

  const activePlatforms = PLATFORM_CONFIG.filter(
    (p) => p.value === 'ANDROID' || p.value === 'WINDOWS',
  );
  const futurePlatforms = PLATFORM_CONFIG.filter(
    (p) => p.value !== 'ANDROID' && p.value !== 'WINDOWS',
  );

  return (
    <div className='min-h-screen p-6'>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className='mb-8 flex items-center gap-4'>
        <Button variant='ghost' size='icon' asChild className='rounded-full'>
          <Link href='/dashboard'>
            <ArrowLeft className='w-5 h-5' />
          </Link>
        </Button>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            App Download Settings
          </h1>
          <p className='text-sm text-muted-foreground'>
            Manage download links for each platform
          </p>
        </div>
      </div>

      {/* ── Active Platforms ─────────────────────────────────────────── */}
      <div className='grid gap-6 md:grid-cols-2 mb-10'>
        {activePlatforms.map((platform) => {
          const Icon = platform.icon;
          const entry = formState[platform.value] ?? {
            url: '',
            version: '',
            active: false,
          };
          const isSavingThis = isSaving && savingPlatform === platform.value;

          return (
            <Card
              key={platform.value}
              className='rounded-2xl border-border overflow-hidden'
            >
              <CardHeader className='pb-4 border-b border-border'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center'>
                      <Icon className='w-5 h-5 text-primary' />
                    </div>
                    <div>
                      <CardTitle className='text-lg'>
                        {platform.label}
                      </CardTitle>
                      <p className='text-xs text-muted-foreground mt-0.5'>
                        {platform.description}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Label
                      htmlFor={`active-${platform.value}`}
                      className='text-xs text-muted-foreground'
                    >
                      Active
                    </Label>
                    <Switch
                      id={`active-${platform.value}`}
                      checked={entry.active}
                      onCheckedChange={(checked) =>
                        updateField(platform.value, 'active', checked)
                      }
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className='pt-4 space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor={`url-${platform.value}`}>Download URL</Label>
                  <Input
                    id={`url-${platform.value}`}
                    placeholder={`https://example.com/${platform.label.toLowerCase()}-app`}
                    value={entry.url}
                    onChange={(e) =>
                      updateField(platform.value, 'url', e.target.value)
                    }
                    disabled={!entry.active}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor={`version-${platform.value}`}>Version</Label>
                  <Input
                    id={`version-${platform.value}`}
                    placeholder='1.0.0'
                    value={entry.version}
                    onChange={(e) =>
                      updateField(platform.value, 'version', e.target.value)
                    }
                    disabled={!entry.active}
                  />
                </div>

                <Button
                  onClick={() => handleSave(platform.value)}
                  disabled={isSavingThis || !entry.url || !entry.active}
                  className='w-full gap-2 rounded-xl'
                  size='sm'
                >
                  {isSavingThis ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    <Save className='w-4 h-4' />
                  )}
                  Save {platform.label}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Future Platforms ─────────────────────────────────────────── */}
      <div>
        <h2 className='text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-4'>
          Future Platforms
        </h2>
        <div className='grid gap-4 md:grid-cols-3'>
          {futurePlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.value}
                className='rounded-2xl border border-border p-5 flex items-center gap-4 opacity-60'
              >
                <div className='w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0'>
                  <Icon className='w-5 h-5 text-muted-foreground' />
                </div>
                <div>
                  <p className='text-sm font-semibold'>{platform.label}</p>
                  <p className='text-xs text-muted-foreground'>
                    {platform.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
