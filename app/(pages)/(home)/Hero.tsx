'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useHeroBanners } from '@/services/banner';
import HeroSkeleton from './skeleton';

interface HeroBanner {
  id: string;
  title: string;
  subtitle?: string | null;
  slogan?: string | null;
  image: string;
  isActive: boolean;
}

export default function HeroImmersiveEnhanced() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isPending, data, isError } = useHeroBanners();

  // Filter active banners and set up rotation
  useEffect(() => {
    if (data && data.length > 0) {
      const activeBanners = data.filter(
        (banner: HeroBanner) => banner.isActive,
      );
      if (activeBanners.length > 0) {
        const randomIndex = Math.floor(Math.random() * activeBanners.length);
        setCurrentIndex(randomIndex);
      }
    }
  }, [data]);

  // Image rotation effect
  useEffect(() => {
    if (!data) return;
    const activeBanners = data.filter((banner: HeroBanner) => banner.isActive);
    if (activeBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activeBanners.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [data]);

  const activeBanners = useMemo(() => {
    return Array.isArray(data)
      ? data.filter((banner: HeroBanner) => banner.isActive)
      : [];
  }, [data]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedQuery = searchQuery.trim().replace(/\s+/g, '+');
    router.push(`/design?category=all&query=${formattedQuery}&page=1`);
  };

  if (isError) {
    return (
      <div className='text-center text-red-500'>
        Failed to load hero banners
      </div>
    );
  }

  if (isPending || !data) {
    return <HeroSkeleton />;
  }

  if (activeBanners.length === 0) {
    return (
      <div className='text-center text-muted-foreground py-20'>
        No active banners found
      </div>
    );
  }

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

  return (
    <section className='relative overflow-hidden'>
      {/* Full-screen background with parallax effect */}
      <div className='absolute inset-0'>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className='absolute inset-0'
          >
            <Image
              src={activeBanners[currentIndex].image || '/placeholder.svg'}
              alt={
                activeBanners[currentIndex].title ||
                `Hero background ${currentIndex + 1}`
              }
              fill
              priority
              className='object-cover object-center'
            />
            {/* Enhanced gradient overlay for better text contrast */}
            <div className='absolute inset-0 bg-linear-to-b from-black/85 via-black/70 to-black/85' />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className='relative mx-auto flex min-h-175 max-w-7xl flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className='max-w-4xl text-center'
          >
            <h1 className='mb-6 text-4xl font-bold tracking-tight  drop-shadow-xs sm:text-5xl md:text-6xl lg:text-7xl'>
              <span className='block text-primary'>
                {activeBanners[currentIndex].title}
              </span>
              {activeBanners[currentIndex].subtitle && (
                <span className='mt-2 block text-white drop-shadow-sm'>
                  {activeBanners[currentIndex].subtitle}
                </span>
              )}
            </h1>

            {activeBanners[currentIndex].slogan && (
              <p className='mx-auto mb-10 max-w-2xl text-lg text-white/90 drop-shadow-xs sm:text-xl'>
                {activeBanners[currentIndex].slogan}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='w-full max-w-2xl'
        >
          <form
            onSubmit={handleSearch}
            className='relative mx-auto mb-10 w-full max-w-2xl overflow-hidden rounded-full border border-white/30 bg-black/40 shadow-lg backdrop-blur-xs'
          >
            <div className='relative flex items-center'>
              <Search className='absolute left-4 h-5 w-5 text-white/70' />
              <Input
                type='text'
                placeholder='Search for templates, photos, illustrations...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='h-16 border-0 bg-transparent pl-12 pr-32 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 md:text-lg'
                aria-label='Search input'
              />
              <Button
                type='submit'
                className='absolute right-2 rounded-full px-6 py-2 shadow-md'
                aria-label='Submit search'
              >
                <Search className='h-4 w-4' />
                <span className='mr-2'>Search</span>
              </Button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='flex flex-wrap justify-center gap-3 md:gap-4'
        >
          {categories.map((category) => (
            <Link key={category.href} href={category.href}>
              <Button
                variant='outline'
                className='border-white/30 bg-black/40 text-white shadow-md backdrop-blur-xs hover:bg-white/10 hover:text-white'
              >
                {category.name}
                <ChevronRight className='ml-1 h-4 w-4' />
              </Button>
            </Link>
          ))}
        </motion.div>

        {/* Slide indicators */}
        <div className='absolute bottom-8 left-1/2 flex -translate-x-1/2 transform gap-2'>
          {activeBanners.map((_: HeroBanner, index: number) => (
            <button
              type='button'
              // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'h-2 w-2 rounded-full transition-all',
                index === currentIndex
                  ? 'w-8 bg-primary shadow-xs'
                  : 'bg-white/60 hover:bg-white/90',
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl' />
        <div className='absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl' />
      </div>
    </section>
  );
}
