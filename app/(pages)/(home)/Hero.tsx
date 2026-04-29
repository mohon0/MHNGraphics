'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useHeroBanners } from '@/services/banner';

// ── Skeleton ────────────────────────────────────────────────────────────────

function HeroSkeleton() {
  return (
    <section className='relative min-h-[92vh] flex items-center overflow-hidden border-b border-border'>
      {/* Background skeleton */}
      <div className='absolute inset-0'>
        <Skeleton className='h-full w-full' />
        <div className='absolute inset-0 bg-linear-to-r from-black/95 via-black/75 to-black/30' />
        <div className='absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/60 to-transparent' />
      </div>

      {/* Ambient blurs */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-primary/15 blur-3xl' />
        <div className='absolute right-0 bottom-1/4 h-56 w-56 rounded-full bg-primary/10 blur-3xl' />
      </div>

      {/* Content */}
      <div className='relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32'>
        <div className='max-w-3xl'>
          {/* Eyebrow */}
          <div className='flex items-center gap-3 mb-7'>
            <Skeleton className='h-px w-10 bg-white/20' />
            <Skeleton className='h-4 w-28 bg-white/20' />
          </div>

          {/* Headline */}
          <div className='mb-6'>
            <Skeleton className='h-16 w-1/3 bg-white/20 mb-2' />
            <Skeleton className='h-16 w-3/4 bg-white/20' />
          </div>

          {/* Subtitle + Slogan */}
          <Skeleton className='h-7 w-1/2 bg-white/20 mb-3' />
          <Skeleton className='h-5 w-2/3 bg-white/20 mb-10' />

          {/* Search bar */}
          <div className='mb-8 max-w-xl'>
            <div className='relative h-14 rounded-2xl bg-white/10 border border-white/20'>
              <Skeleton className='absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white/20' />
              <Skeleton className='absolute right-2 top-1/2 -translate-y-1/2 h-10 w-24 rounded-xl bg-white/20' />
              <Skeleton className='h-4 w-48 ml-11 mt-5 bg-white/20' />
            </div>
            <Skeleton className='mt-2.5 ml-1 h-3 w-56 bg-white/20' />
          </div>

          {/* Category pills */}
          <div className='flex flex-wrap gap-2'>
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton
                key={i}
                className='h-10 w-24 rounded-full bg-white/20'
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className='absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2'>
        <Skeleton className='h-1.5 w-8 rounded-full bg-white/30' />
        <Skeleton className='h-1.5 w-1.5 rounded-full bg-white/30' />
        <Skeleton className='h-1.5 w-1.5 rounded-full bg-white/30' />
      </div>

      {/* Progress bar */}
      <div className='absolute bottom-0 inset-x-0 z-10 h-px bg-white/10'>
        <Skeleton className='h-full w-1/3 bg-primary/40' />
      </div>
    </section>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface HeroBanner {
  id: string;
  title: string;
  subtitle?: string | null;
  slogan?: string | null;
  image: string;
  isActive: boolean;
}

// ── Animation config ──────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

// ── Data ──────────────────────────────────────────────────────────────────────

const categories = [
  { name: 'All Designs', href: '/design?category=all&query=&page=1' },
  { name: 'Photos', href: '/design?category=photos&query=&page=1' },
  {
    name: 'Illustrations',
    href: '/design?category=illustrations&query=&page=1',
  },
  { name: 'Templates', href: '/design?category=templates&query=&page=1' },
  { name: 'Animations', href: '/design?category=animation&query=&page=1' },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Hero() {
  const router = useRouter();
  const shouldReduce = useReducedMotion();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isPending, data, isError } = useHeroBanners();

  // ── Banner rotation ────────────────────────────────────────────────────────

  const activeBanners = useMemo(
    () =>
      Array.isArray(data) ? data.filter((b: HeroBanner) => b.isActive) : [],
    [data],
  );

  useEffect(() => {
    if (activeBanners.length === 0) return;
    const rand = Math.floor(Math.random() * activeBanners.length);
    setCurrentIndex(rand);
  }, [activeBanners.length]);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const id = setInterval(
      () => setCurrentIndex((i) => (i + 1) % activeBanners.length),
      10_000,
    );
    return () => clearInterval(id);
  }, [activeBanners.length]);

  // ── Search ─────────────────────────────────────────────────────────────────

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim().replace(/\s+/g, '+');
    router.push(`/design?category=all&query=${q}&page=1`);
  };

  // ── Guards ─────────────────────────────────────────────────────────────────

  if (isError)
    return (
      <div className='flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground'>
        Failed to load hero banners.
      </div>
    );

  if (isPending || !data) return <HeroSkeleton />;

  if (activeBanners.length === 0)
    return (
      <div className='flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground'>
        No active banners found.
      </div>
    );

  const current = activeBanners[currentIndex];

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section className='relative min-h-[92vh] flex items-center overflow-hidden border-b border-border'>
      {/* ── Background image carousel ──────────────────────────────────── */}
      <div className='absolute inset-0 z-0'>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: shouldReduce ? 1 : 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className='absolute inset-0'
          >
            <Image
              src={current.image || '/placeholder.svg'}
              alt={current.title}
              fill
              priority
              className='object-cover object-center'
            />
          </motion.div>
        </AnimatePresence>

        {/* System overlay: left-heavy for text legibility */}
        <div className='absolute inset-0 bg-linear-to-r from-black/95 via-black/75 to-black/30' />
        {/* Extra bottom fade so indicators sit cleanly */}
        <div className='absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/60 to-transparent' />
      </div>

      {/* ── Ambient blurs (system decorative) ──────────────────────────── */}
      <div className='pointer-events-none absolute inset-0 z-0 overflow-hidden'>
        <div className='absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-primary/15 blur-3xl' />
        <div className='absolute right-0 bottom-1/4 h-56 w-56 rounded-full bg-primary/10 blur-3xl' />
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className='relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32'>
        <AnimatePresence mode='wait'>
          <motion.div key={currentIndex} className='max-w-3xl'>
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial='hidden'
              animate='show'
              custom={0}
              className='flex items-center gap-3 mb-7'
            >
              <div className='h-px w-10 bg-primary' />
              <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
                Design Studio
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial='hidden'
              animate='show'
              custom={0.1}
              className='text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-6'
            >
              {current.title ? (
                <>
                  {/* Highlight first word with italic-bold-primary per design system */}
                  <span className='italic font-bold text-primary'>
                    {current.title.split(' ')[0]}
                  </span>

                  {current.title.split(' ').length > 1 && (
                    <> {current.title.split(' ').slice(1).join(' ')}</>
                  )}
                  <span className='text-primary'>.</span>
                </>
              ) : null}
            </motion.h1>

            {/* Subtitle */}
            {current.subtitle && (
              <motion.p
                variants={fadeUp}
                initial='hidden'
                animate='show'
                custom={0.18}
                className='text-xl sm:text-2xl font-light text-white/80 leading-snug mb-4'
              >
                {current.subtitle}
              </motion.p>
            )}

            {/* Slogan */}
            {current.slogan && (
              <motion.p
                variants={fadeUp}
                initial='hidden'
                animate='show'
                custom={0.24}
                className='text-sm md:text-base text-gray-300 leading-relaxed max-w-xl mb-10'
              >
                {current.slogan}
              </motion.p>
            )}

            {/* ── Search bar ──────────────────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              initial='hidden'
              animate='show'
              custom={0.32}
              className='mb-8'
            >
              <form onSubmit={handleSearch} className='relative max-w-xl group'>
                {/* Glow ring on focus */}
                <div
                  className={cn(
                    'absolute -inset-0.5 rounded-2xl bg-primary/40 blur-sm transition-opacity duration-300',
                    inputFocused ? 'opacity-100' : 'opacity-0',
                  )}
                />

                <div
                  className={cn(
                    'relative flex items-center rounded-2xl border transition-all duration-300',
                    inputFocused
                      ? 'border-primary/60 bg-black/70 backdrop-blur-md'
                      : 'border-white/20 bg-black/40 backdrop-blur-sm',
                  )}
                >
                  {/* Search icon — animates on focus */}
                  <Search
                    className={cn(
                      'absolute left-4 w-4 h-4 transition-colors duration-200 shrink-0',
                      inputFocused ? 'text-primary' : 'text-white/50',
                    )}
                  />

                  <input
                    ref={inputRef}
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    placeholder='Search templates, photos, illustrations…'
                    aria-label='Search designs'
                    className='w-full h-14 bg-transparent pl-11 pr-36 text-sm text-white placeholder:text-white/40 outline-none'
                  />

                  {/* Submit button — pill, sits inside the bar */}
                  <div className='absolute right-2'>
                    <Button
                      type='submit'
                      size='sm'
                      className='h-10 px-5 gap-1.5 rounded-xl group/btn'
                    >
                      <span>Search</span>
                      <ArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5' />
                    </Button>
                  </div>
                </div>
              </form>

              {/* Search hint */}
              <p className='mt-2.5 pl-1 text-[11px] text-white/35 tracking-wide'>
                Try &ldquo;logo design&rdquo;, &ldquo;social media
                template&rdquo;…
              </p>
            </motion.div>

            {/* ── Category pills ──────────────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              initial='hidden'
              animate='show'
              custom={0.42}
              className='flex flex-wrap gap-2'
            >
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.42 + idx * 0.06,
                    duration: 0.4,
                    ease: EASE,
                  }}
                >
                  <Link
                    href={cat.href}
                    className={cn(
                      'group inline-flex items-center gap-1.5 rounded-full border px-4 py-2',
                      'text-xs font-semibold tracking-[0.12em] uppercase',
                      'transition-all duration-200',
                      idx === 0
                        ? // First pill: primary-filled
                          'border-primary bg-primary text-primary-foreground hover:bg-primary/90'
                        : // Rest: ghost on dark
                          'border-white/20 bg-white/5 text-white/70 hover:border-primary/50 hover:bg-primary/10 hover:text-white backdrop-blur-sm',
                    )}
                  >
                    {cat.name}
                    <ArrowRight className='w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200' />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Slide indicators ───────────────────────────────────────────── */}
      {activeBanners.length > 1 && (
        <div className='absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2'>
          {activeBanners.map((_: HeroBanner, idx: number) => (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
              key={idx}
              type='button'
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-500',
                idx === currentIndex
                  ? 'w-8 bg-primary shadow-sm shadow-primary/50'
                  : 'w-1.5 bg-white/30 hover:bg-white/60',
              )}
            />
          ))}
        </div>
      )}

      {/* ── Progress bar — auto-advance timer ──────────────────────────── */}
      {activeBanners.length > 1 && (
        <div className='absolute bottom-0 inset-x-0 z-10 h-px bg-white/10'>
          <motion.div
            key={currentIndex}
            className='h-full bg-primary'
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 10, ease: 'linear' }}
          />
        </div>
      )}
    </section>
  );
}
