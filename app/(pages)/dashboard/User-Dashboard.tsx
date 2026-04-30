'use client';

import { format } from 'date-fns';
import {
  AlertTriangle,
  CalendarDays,
  Edit,
  Eye,
  GraduationCap,
  MessageSquare,
  Palette,
  Phone,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useFetchUserDashboard } from '@/services/admin';
import type { ApplicationSummary, Comment, Design } from '@/utils/Interface';

// ── User dashboard ────────────────────────────────────────────────────────────

export default function UserDashboard() {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/sign-in');
  }, [status, router]);

  const { isLoading, isError, data: userData } = useFetchUserDashboard();

  if (status === 'loading' || isLoading) return <DashboardSkeleton />;
  if (status === 'unauthenticated') return null;
  if (!session?.user?.id)
    return <ErrorMessage message='No user ID available' />;
  if (isError) return <ErrorMessage message='Error fetching user data' />;

  const userImage = userData?.image || userData?.applications?.[0]?.image;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8'>
      {/* ── Profile card ─────────────────────────────────────────────── */}
      <div className='rounded-2xl border border-border overflow-hidden'>
        {/* Top accent strip */}
        <div className='h-1.5 w-full bg-primary' />

        <div className='p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6'>
          {/* Avatar */}
          <div className='relative shrink-0'>
            <Avatar className='h-24 w-24 border-2 border-border'>
              <AvatarImage src={userImage} alt={userData?.name || 'User'} />
              <AvatarFallback className='text-xl font-bold bg-primary/10 text-primary'>
                {userData?.name?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            {/* Online dot */}
            <span className='absolute bottom-1 right-1 w-3 h-3 rounded-full bg-primary border-2 border-background' />
          </div>

          {/* Info */}
          <div className='flex-1 space-y-4 text-center sm:text-left'>
            <div>
              {/* Eyebrow */}
              <div className='flex items-center justify-center sm:justify-start gap-3 mb-2'>
                <div className='h-px w-5 bg-primary' />
                <span className='text-[10px] font-semibold tracking-[0.2em] uppercase text-primary'>
                  Member
                </span>
              </div>
              <h2 className='text-2xl font-bold leading-tight tracking-tight'>
                {userData?.name || 'User'}
              </h2>
              <p className='text-sm text-muted-foreground mt-0.5'>
                {userData?.email}
              </p>
            </div>

            {/* Meta badges — system tag pill style */}
            <div className='flex flex-wrap justify-center sm:justify-start gap-2'>
              <MetaPill icon={Phone}>{userData?.phoneNumber || 'N/A'}</MetaPill>
              <MetaPill icon={User}>{userData?.status || 'Inactive'}</MetaPill>
              <MetaPill icon={CalendarDays}>
                Joined{' '}
                {userData?.createdAt
                  ? format(new Date(userData.createdAt), 'do MMM yyyy')
                  : 'N/A'}
              </MetaPill>
            </div>
          </div>

          {/* Stats row */}
          <div className='flex sm:flex-col gap-6 sm:gap-4 shrink-0 sm:border-l sm:border-border sm:pl-8'>
            {[
              {
                label: 'Applications',
                value: userData?.applications?.length ?? 0,
              },
              { label: 'Designs', value: userData?.design?.length ?? 0 },
              { label: 'Comments', value: userData?.comments?.length ?? 0 },
            ].map((s) => (
              <div key={s.label} className='text-center'>
                <p className='text-2xl font-bold text-primary tabular-nums'>
                  {s.value}
                </p>
                <p className='text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground'>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────────── */}
      <Tabs defaultValue='applications' className='w-full'>
        <TabsList className='w-full sm:w-auto grid grid-cols-3 sm:inline-flex mb-8 rounded-xl bg-primary/5 p-1 gap-1'>
          {[
            {
              value: 'applications',
              icon: GraduationCap,
              label: 'Applications',
            },
            { value: 'designs', icon: Palette, label: 'Designs' },
            { value: 'comments', icon: MessageSquare, label: 'Comments' },
          ].map(({ value, icon: Icon, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold tracking-widest uppercase
                data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm
                text-muted-foreground transition-all duration-200'
            >
              <Icon className='w-3.5 h-3.5' />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── Applications tab ──────────────────────────────────────── */}
        <TabsContent value='applications'>
          <TabSection
            icon={GraduationCap}
            label='Applications'
            empty={!userData?.applications?.length}
            emptyText='No applications found.'
          >
            <div className='space-y-4'>
              {userData?.applications?.map((app: ApplicationSummary) => (
                <div
                  key={app.id}
                  className='group rounded-2xl border border-border p-5 hover:border-primary/30 hover:bg-primary/2 transition-colors duration-300'
                >
                  {/* App header */}
                  <div className='flex items-start justify-between gap-4 mb-4'>
                    <div>
                      <h3 className='text-base font-bold leading-snug'>
                        {app.studentName}
                      </h3>
                      <div className='flex items-center gap-2 mt-1.5'>
                        <div className='h-px w-5 bg-primary/40 group-hover:w-8 transition-all duration-300' />
                        <span className='text-[10px] font-semibold tracking-[0.18em] uppercase text-primary/60'>
                          {app.course}
                        </span>
                      </div>
                    </div>

                    {/* Status pill */}
                    <span
                      className={`text-[10px] font-semibold tracking-[0.18em] uppercase border rounded-full px-2.5 py-1 shrink-0
                      ${
                        app.status === 'Approved'
                          ? 'border-primary/40 text-primary bg-primary/5'
                          : 'border-destructive/40 text-destructive bg-destructive/5'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  {/* Meta row */}
                  <div className='flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground mb-5'>
                    <span>Duration: {app.duration}</span>
                    {app.certificate && (
                      <span>Certificate: {app.certificate}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className='flex items-center gap-2'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size='sm'
                            className='h-9 px-4 gap-1.5 rounded-xl'
                            asChild
                          >
                            <Link
                              href={`/dashboard/application-list/single-application?id=${app.id}`}
                            >
                              <Eye className='w-3.5 h-3.5' />
                              View
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          View full application details
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {app.editable ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size='sm'
                              variant='outline'
                              className='h-9 px-4 gap-1.5 rounded-xl hover:border-primary/30 hover:text-primary'
                              asChild
                            >
                              <Link
                                href={`/dashboard/application-list/edit-application?id=${app.id}`}
                              >
                                <Edit className='w-3.5 h-3.5' />
                                Edit
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Edit application details
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Button
                        size='sm'
                        variant='outline'
                        className='h-9 px-4 gap-1.5 rounded-xl opacity-50 cursor-not-allowed'
                        onClick={() =>
                          toast.info('Contact Admin to edit application')
                        }
                      >
                        <Edit className='w-3.5 h-3.5' />
                        Edit
                      </Button>
                    )}
                  </div>

                  {/* Non-editable notice */}
                  {!app.editable && (
                    <div className='mt-4 rounded-xl border border-border bg-primary/2 px-4 py-3 flex items-start gap-3'>
                      <div className='w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5'>
                        <AlertTriangle className='w-3.5 h-3.5 text-primary' />
                      </div>
                      <div className='text-xs text-muted-foreground leading-relaxed'>
                        You don&apos;t have permission to edit this application.{' '}
                        <a
                          href='tel:01989491248'
                          className='font-semibold text-primary hover:opacity-70 transition-opacity duration-200'
                        >
                          Contact admin →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabSection>
        </TabsContent>

        {/* ── Designs tab ───────────────────────────────────────────── */}
        <TabsContent value='designs'>
          <TabSection
            icon={Palette}
            label='Designs'
            empty={!userData?.design?.length}
            emptyText='No designs found.'
          >
            <div className='space-y-3'>
              {userData?.design?.map((design: Design) => (
                <div
                  key={design.id}
                  className='group flex items-center justify-between rounded-2xl border border-border px-5 py-4
                    hover:border-primary/30 hover:bg-primary/2 transition-colors duration-300'
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0
                      group-hover:bg-primary/15 transition-colors duration-300'
                    >
                      <Palette className='w-4 h-4 text-primary' />
                    </div>
                    <div>
                      <p className='text-sm font-bold leading-snug'>Design</p>
                      <div className='flex items-center gap-2 mt-1'>
                        <div className='h-px w-5 bg-primary/40 group-hover:w-8 transition-all duration-300' />
                        <span className='text-[10px] font-semibold tracking-[0.15em] uppercase text-primary/60'>
                          {design.id.slice(0, 8)}…
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className='text-[10px] font-semibold tracking-[0.15em] uppercase border border-border rounded-full px-2.5 py-1 text-muted-foreground
                    group-hover:border-primary/30 transition-colors duration-300'
                  >
                    {new Date(design.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </TabSection>
        </TabsContent>

        {/* ── Comments tab ──────────────────────────────────────────── */}
        <TabsContent value='comments'>
          <TabSection
            icon={MessageSquare}
            label='Comments'
            empty={!userData?.comments?.length}
            emptyText='No comments found.'
          >
            <div className='space-y-3'>
              {userData?.comments?.map((comment: Comment) => (
                <div
                  key={comment.id}
                  className='group rounded-2xl border border-border p-5
                    hover:border-primary/30 hover:bg-primary/2 transition-colors duration-300'
                >
                  <p className='text-sm text-foreground leading-relaxed mb-3'>
                    {comment.content}
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div className='h-px w-5 bg-primary/40 group-hover:w-8 transition-all duration-300' />
                      <span className='text-[10px] font-semibold tracking-[0.15em] uppercase text-primary/60'>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span
                      className='text-[10px] font-semibold tracking-[0.15em] uppercase border border-border rounded-full px-2.5 py-1 text-muted-foreground
                      group-hover:border-primary/30 transition-colors duration-300'
                    >
                      {comment.id.slice(0, 8)}…
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabSection>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

/** Small icon + text pill — used in the profile meta row */
function MetaPill({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <span
      className='inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase
      border border-border rounded-full px-2.5 py-1 text-muted-foreground'
    >
      <Icon className='w-3 h-3 text-primary' />
      {children}
    </span>
  );
}

/** Tab content wrapper — eyebrow header + scroll area + empty state */
function TabSection({
  icon: Icon,
  label,
  empty,
  emptyText,
  children,
}: {
  icon: React.ElementType;
  label: string;
  empty: boolean;
  emptyText: string;
  children: React.ReactNode;
}) {
  return (
    <div className='rounded-2xl border border-border overflow-hidden'>
      {/* Section header */}
      <div className='flex items-center gap-3 px-6 py-5 border-b border-border'>
        <div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0'>
          <Icon className='w-4 h-4 text-primary' />
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <div className='h-px w-5 bg-primary' />
            <span className='text-[10px] font-semibold tracking-[0.2em] uppercase text-primary'>
              {label}
            </span>
          </div>
          <h3 className='text-base font-bold leading-snug mt-0.5'>
            Your {label}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className='p-6'>
        {empty ? (
          <div className='flex flex-col items-center justify-center py-12 gap-3'>
            <div className='w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center'>
              <Icon className='w-5 h-5 text-primary' />
            </div>
            <p className='text-sm text-muted-foreground'>{emptyText}</p>
          </div>
        ) : (
          <ScrollArea className='h-115 pr-3'>{children}</ScrollArea>
        )}
      </div>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8'>
      {/* Profile card skeleton */}
      <div className='rounded-2xl border border-border overflow-hidden'>
        <div className='h-1.5 w-full bg-primary/20' />
        <div className='p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6'>
          <Skeleton className='h-24 w-24 rounded-full shrink-0' />
          <div className='flex-1 space-y-3 w-full'>
            <Skeleton className='h-3 w-16' />
            <Skeleton className='h-7 w-48' />
            <Skeleton className='h-4 w-36' />
            <div className='flex gap-2 flex-wrap'>
              <Skeleton className='h-6 w-24 rounded-full' />
              <Skeleton className='h-6 w-20 rounded-full' />
              <Skeleton className='h-6 w-32 rounded-full' />
            </div>
          </div>
          <div className='flex gap-6 sm:flex-col sm:gap-4 sm:pl-8 sm:border-l sm:border-border'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='text-center space-y-1'>
                <Skeleton className='h-8 w-10 mx-auto' />
                <Skeleton className='h-3 w-16 mx-auto' />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <Skeleton className='h-10 w-full sm:w-72 rounded-xl' />
      <div className='rounded-2xl border border-border overflow-hidden'>
        <div className='px-6 py-5 border-b border-border flex gap-3 items-center'>
          <Skeleton className='h-9 w-9 rounded-xl' />
          <div className='space-y-1.5'>
            <Skeleton className='h-2.5 w-16' />
            <Skeleton className='h-4 w-28' />
          </div>
        </div>
        <div className='p-6 space-y-4'>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className='h-28 w-full rounded-2xl' />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Error ─────────────────────────────────────────────────────────────────────

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
      <div className='rounded-2xl border border-destructive/30 overflow-hidden'>
        <div className='h-1.5 w-full bg-destructive/60' />
        <div className='p-6 sm:p-8 flex items-start gap-4'>
          <div className='w-11 h-11 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0'>
            <AlertTriangle className='w-5 h-5 text-destructive' />
          </div>
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-1'>
              <div className='h-px w-5 bg-destructive/60' />
              <span className='text-[10px] font-semibold tracking-[0.2em] uppercase text-destructive'>
                Error
              </span>
            </div>
            <h3 className='text-base font-bold leading-snug mb-1'>
              Something went wrong
            </h3>
            <p className='text-sm text-muted-foreground mb-5'>{message}</p>
            <Button
              size='sm'
              variant='outline'
              className='h-9 px-5 rounded-xl hover:border-destructive/40 hover:text-destructive'
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
