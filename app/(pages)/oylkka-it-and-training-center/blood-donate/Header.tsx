'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Header() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className='relative pt-16 pb-12 bg-primary/5 border-b border-border overflow-hidden'
    >
      {/* Decorative background text */}
      <div className='absolute right-8 top-4 font-display text-[8rem] font-bold text-primary/5 leading-none select-none pointer-events-none hidden lg:block'>
        রক্ত
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div
          className={`max-w-2xl transform transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Eyebrow */}
          <div className='flex items-center gap-3 mb-4'>
            <div className='h-px w-10 bg-primary' />
            <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
              রক্তযোদ্ধা পরিবার, ঝিনাইদহ
            </span>
          </div>

          {/* Heading with italic contrast */}
          <h1 className='font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4'>
            রক্তদান করুন,{' '}
            <span className='italic font-light text-muted-foreground'>
              জীবন
            </span>{' '}
            বাঁচান<span className='text-primary'>.</span>
          </h1>

          {/* Body copy */}
          <p className='text-muted-foreground text-base leading-relaxed'>
            আমরা পেরেছি, আমরাই পারবো। রক্ত দিয়ে অসহায় মানুষের পাশে দাঁড়াবো।
          </p>
        </div>
      </div>
    </section>
  );
}
