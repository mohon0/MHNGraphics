'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createSlug } from '@/components/helper/slug/CreateSlug';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useFetchAllDesign } from '@/services/design';
import type { Design } from '@/utils/Interface';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

interface DesignShowcaseProps {
  title?: string;
  viewAllLink?: string;
}

export default function DesignShowcase({
  title = 'View Design & Sell Content',
  viewAllLink = '/design?category=all&query=&page=1',
}: DesignShowcaseProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { isLoading, data, isError } = useFetchAllDesign({
    page: 1,
    category: 'all',
    searchQuery: '',
    tag: '',
  });

  if (isLoading) {
    return (
      <section className='py-20 md:py-28'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-10 flex items-center justify-between'>
            <Skeleton className='h-10 w-72' />
            <Skeleton className='h-12 w-40' />
          </div>
          <div className='grid grid-cols-2 gap-5 lg:grid-cols-5'>
            {Array.from({ length: 10 }).map((_, i) => (
              // biome-ignore lint: error
              <Skeleton key={i} className='aspect-square rounded-2xl' />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='py-20 md:py-28'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-3 mb-5'>
            <div className='h-px w-10 bg-primary' />
            <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
              Designs
            </span>
          </div>
          <h2 className='mb-6 text-3xl md:text-4xl font-bold leading-tight tracking-tight'>
            {title}
            <span className='text-primary'>.</span>
          </h2>
          <div className='rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center'>
            <p className='text-destructive'>
              There was an error loading the designs. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const designs = data?.data || [];

  if (!isClient) {
    return (
      <section className='py-20 md:py-28'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='h-10 w-72 mb-10' />
          <div className='h-64 md:h-80' />
        </div>
      </section>
    );
  }

  return (
    <section className='py-20 md:py-28 border-b border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <div className='mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial='hidden'
              animate='show'
              custom={0}
              className='flex items-center gap-3 mb-5'
            >
              <div className='h-px w-10 bg-primary' />
              <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
                Designs
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              initial='hidden'
              animate='show'
              custom={0.1}
              className='text-3xl md:text-4xl font-bold leading-tight tracking-tight'
            >
              {title}
              <span className='text-primary'>.</span>
            </motion.h2>
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial='hidden'
            animate='show'
            custom={0.2}
            className='shrink-0'
          >
            <Button
              asChild
              variant='outline'
              className='group bg-transparent h-12 px-8'
            >
              <Link href={viewAllLink}>
                View all designs
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          variants={gridVariants}
          initial='hidden'
          animate='show'
          className='grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5'
        >
          {designs.map((design: Design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial='hidden'
          animate='show'
          custom={0.3}
          className='mt-12 flex justify-center'
        >
          <Button
            asChild
            variant='outline'
            className='group bg-transparent h-12 px-8'
          >
            <Link href={viewAllLink}>
              View all designs
              <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

interface DesignCardProps {
  design: Design;
  className?: string;
}

function DesignCard({ design, className }: DesignCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      <Link
        href={createSlug({ name: design.name, id: design.id })}
        className={cn('block', className)}
      >
        <div className='group relative overflow-hidden rounded-2xl border border-border bg-background transition-colors duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-black/5'>
          <div className='aspect-square overflow-hidden'>
            <Image
              src={design.image || '/placeholder.svg'}
              alt={design.name || 'Design'}
              width={300}
              height={300}
              className='h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105'
              loading='lazy'
            />
          </div>

          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

          {/* Caption */}
          <div className='absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-all duration-300 group-hover:opacity-100'>
            <div className='flex items-center gap-2 mb-1'>
              <div className='h-px w-5 bg-white/60 group-hover:w-8 transition-all duration-300' />
              <span className='text-[10px] font-semibold tracking-[0.18em] uppercase text-white/60'>
                Design
              </span>
            </div>
            <h3 className='line-clamp-1 text-xs font-bold text-white sm:text-sm'>
              {design.name}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
