'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download, Monitor, Smartphone } from 'lucide-react';
import { useRef } from 'react';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/Header/Header';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppReleases } from '@/services/app-download';

// ─── Animation System ──────────────────────────────────────────────────────────
// Follows the DESIGN_SYSTEM.md conventions exactly

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  },
});

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

// ─── Platform Metadata ─────────────────────────────────────────────────────────

const PLATFORM_META: Record<
  string,
  {
    label: string;
    icon: typeof Smartphone;
    description: string;
  }
> = {
  ANDROID: {
    label: 'Android',
    icon: Smartphone,
    description: 'এপিকে ফাইল ডাউনলোড করে আপনার অ্যান্ড্রয়েড ডিভাইসে ইনস্টল করুন।',
  },
  WINDOWS: {
    label: 'Windows',
    icon: Monitor,
    description: 'উইন্ডোজ ১০ ও ১১ এর জন্য ইনস্টলার ডাউনলোড করুন।',
  },
};

// ─── Skeleton Loading ──────────────────────────────────────────────────────────

function DownloadSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto'>
      {[1, 2].map((i) => (
        <div key={i} className='rounded-2xl border border-border p-6 space-y-4'>
          <div className='flex items-center justify-between'>
            <Skeleton className='w-11 h-11 rounded-xl' />
            <Skeleton className='w-16 h-5 rounded-full' />
          </div>
          <Skeleton className='h-5 w-32' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-10 w-full rounded-xl' />
          <div className='flex items-center gap-2'>
            <Skeleton className='h-px w-5' />
            <Skeleton className='h-3 w-16' />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Download Card ─────────────────────────────────────────────────────────────

function DownloadCard({
  platform,
  downloadUrl,
  version,
}: {
  platform: string;
  downloadUrl: string;
  version?: string | null;
}) {
  const meta = PLATFORM_META[platform];
  if (!meta) return null;

  const Icon = meta.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className='group rounded-2xl border border-border p-6
        hover:border-primary/30 hover:bg-primary/[0.02] transition-colors duration-300
        flex flex-col gap-4'
    >
      {/* Header row: icon + version pill */}
      <div className='flex items-center justify-between'>
        <div
          className='w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center
            group-hover:bg-primary/15 transition-colors duration-300'
        >
          <Icon className='w-5 h-5 text-primary' />
        </div>
        <span
          className='text-[10px] font-semibold tracking-[0.18em] uppercase
            border border-border rounded-full px-2.5 py-1 text-muted-foreground
            group-hover:border-primary/30 transition-colors duration-300'
        >
          {version ? `v${version}` : 'সর্বশেষ'}
        </span>
      </div>

      {/* Title */}
      <h3 className='text-base font-bold leading-snug'>{meta.label} অ্যাপ</h3>

      {/* Description */}
      <p className='text-sm text-muted-foreground leading-relaxed flex-1'>
        {meta.description}
      </p>

      {/* Download CTA */}
      <Button asChild size='sm' className='w-full h-10 gap-2 rounded-xl'>
        <a href={downloadUrl} target='_blank' rel='noopener noreferrer'>
          <Download className='w-4 h-4' />
          {meta.label} এ ডাউনলোড
        </a>
      </Button>

      {/* Animated rule — design system micro-interaction */}
      <div className='flex items-center gap-2'>
        <div className='h-px w-5 bg-primary/40 group-hover:w-8 transition-all duration-300' />
        <span className='text-[10px] text-primary/60 font-semibold tracking-wide uppercase'>
          {meta.label}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AppDownloadPage() {
  const headerRef = useRef<HTMLDivElement>(null);

  const { data: releases, isLoading, isError } = useAppReleases();

  const activeReleases = releases?.filter((r) => r.isActive) ?? [];

  return (
    <div>
      <Header />
      <section className='py-20 md:py-28 border-b border-border min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* ── Section Header ──────────────────────────────────────────── */}
          {/* Follows DESIGN_SYSTEM.md section anatomy exactly:
            Eyebrow → Heading with italic contrast → Paragraph */}
          <div ref={headerRef} className='mb-14'>
            <motion.div
              variants={fadeUp(0)}
              initial='hidden'
              animate='show'
              className='flex items-center gap-3 mb-5'
            >
              <div className='h-px w-10 bg-primary' />
              <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
                অ্যাপ ডাউনলোড
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp(0.1)}
              initial='hidden'
              animate='show'
              className='text-3xl md:text-4xl font-bold leading-tight tracking-tight'
            >
              Oylkka <span className='italic font-bold text-primary'>App</span>
              <span className='text-primary'>.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp(0.15)}
              initial='hidden'
              animate='show'
              className='mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl'
            >
              আমাদের অফিসিয়াল অ্যাপ ডাউনলোড করুন এবং যেকোনো ডিভাইস থেকে আমাদের সব সেবা
              উপভোগ করুন।
            </motion.p>
          </div>

          {/* ── Content Area ────────────────────────────────────────────── */}
          {isLoading ? (
            <DownloadSkeleton />
          ) : isError ? (
            <motion.div
              variants={fadeUp(0.2)}
              initial='hidden'
              animate='show'
              className='text-center py-20'
            >
              <p className='text-muted-foreground'>
                ডাউনলোড তথ্য লোড করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।
              </p>
            </motion.div>
          ) : activeReleases.length === 0 ? (
            <motion.div
              variants={fadeUp(0.2)}
              initial='hidden'
              animate='show'
              className='text-center py-20'
            >
              <ArrowDown className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
              <h3 className='text-lg font-bold mb-2'>কোনো অ্যাপ পাওয়া যায়নি</h3>
              <p className='text-sm text-muted-foreground'>
                এখনও কোনো অ্যাপ রিলিজ হয়নি। শীঘ্রই আসছে!
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={gridVariants}
              initial='hidden'
              animate='show'
              className='grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto'
            >
              {activeReleases.map((release) => (
                <DownloadCard
                  key={release.id}
                  platform={release.platform}
                  downloadUrl={release.downloadUrl}
                  version={release.version}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
