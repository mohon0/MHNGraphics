'use client';

import Autoplay from 'embla-carousel-autoplay';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import img5 from '@/images/slider/icons.jpg';
import img4 from '@/images/slider/mockups.jpg';
import img1 from '@/images/slider/photo.jpg';
import img6 from '@/images/slider/sports.jpg';
import img3 from '@/images/slider/templates.jpg';
import img2 from '@/images/slider/vector.jpg';

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

const sliderData = [
  {
    id: 1,
    name: 'People',
    description: 'High-quality photos of people for your projects',
    img: img1,
    link: '/design?category=people&query=&page=1',
  },
  {
    id: 2,
    name: 'Illustration',
    description: 'Creative illustrations for unique designs',
    img: img2,
    link: '/design?category=illustrations&query=&page=1',
  },
  {
    id: 3,
    name: 'Mock Up',
    description: 'Professional mockups for product presentations',
    img: img3,
    link: '/design?category=mockups&query=&page=1',
  },
  {
    id: 4,
    name: 'Templates',
    description: 'Ready-to-use templates for quick implementation',
    img: img4,
    link: '/design?category=templates&query=&page=1',
  },
  {
    id: 5,
    name: 'Icons',
    description: 'Versatile icons for any design project',
    img: img5,
    link: '/design?category=icons&query=&page=1',
  },
  {
    id: 6,
    name: 'Sports',
    description: 'Dynamic sports imagery for active content',
    img: img6,
    link: '/design?category=sports&query=&page=1',
  },
];

export function CategorySlider() {
  // biome-ignore lint: error
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  // biome-ignore lint: error
  const autoplayRef = useRef<any>(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  );
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className='py-20 md:py-28 border-b border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <div
          ref={ref}
          className='mb-10 md:mb-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between'
        >
          <div>
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial='hidden'
              animate={inView ? 'show' : 'hidden'}
              custom={0}
              className='flex items-center gap-3 mb-5'
            >
              <div className='h-px w-10 bg-primary' />
              <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
                Categories
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              initial='hidden'
              animate={inView ? 'show' : 'hidden'}
              custom={0.1}
              className='text-3xl md:text-4xl font-bold leading-tight tracking-tight'
            >
              Explore our{' '}
              <span className='italic font-bold text-primary'>asset</span>{' '}
              categories
              <span className='text-primary'>.</span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              initial='hidden'
              animate={inView ? 'show' : 'hidden'}
              custom={0.15}
              className='mt-4 max-w-lg text-sm md:text-base text-muted-foreground leading-relaxed'
            >
              Discover our extensive collection of high-quality assets ready for
              your next creative project.
            </motion.p>
          </div>

          {/* Controls */}
          <motion.div
            variants={fadeUp}
            initial='hidden'
            animate={inView ? 'show' : 'hidden'}
            custom={0.2}
            className='flex items-center gap-3 shrink-0'
          >
            <span className='text-sm text-muted-foreground tabular-nums'>
              {current} <span className='text-muted-foreground/50'>/</span>{' '}
              {count}
            </span>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='icon'
                className='h-9 w-9 rounded-full bg-transparent'
                onClick={() => api?.scrollPrev()}
              >
                <ChevronLeft className='h-4 w-4' />
                <span className='sr-only'>Previous slide</span>
              </Button>
              <Button
                variant='outline'
                size='icon'
                className='h-9 w-9 rounded-full bg-transparent'
                onClick={() => api?.scrollNext()}
              >
                <ChevronRight className='h-4 w-4' />
                <span className='sr-only'>Next slide</span>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          variants={gridVariants}
          initial='hidden'
          animate={inView ? 'show' : 'hidden'}
        >
          <Carousel
            setApi={setApi}
            opts={{ align: 'start', loop: true }}
            plugins={[autoplayRef.current]}
            className='w-full'
          >
            <CarouselContent className='-ml-5'>
              {sliderData.map((item) => (
                <CarouselItem
                  key={item.id}
                  className='basis-2/3 pl-5 md:basis-1/3 lg:basis-1/4'
                >
                  <motion.div variants={cardVariants}>
                    <SliderCard item={item} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}

interface SliderItem {
  id: number;
  name: string;
  description: string;
  img: StaticImageData;
  link: string;
}

function SliderCard({ item }: { item: SliderItem }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      <Link href={item.link} className='group block'>
        <div className='overflow-hidden rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-black/5 transition-all duration-300'>
          <div className='relative aspect-4/3 overflow-hidden'>
            {/* Image */}
            <Image
              src={item.img || '/placeholder.svg'}
              alt={item.name}
              fill
              className='object-cover transition-transform duration-700 group-hover:scale-105 brightness-75'
              sizes='(max-width: 768px) 66vw, (max-width: 1200px) 33vw, 25vw'
            />

            {/* Bottom-up overlay — system standard */}
            <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent' />

            {/* Caption */}
            <div className='absolute bottom-0 left-0 right-0 p-5 text-white'>
              {/* Animated rule + label */}
              <div className='flex items-center gap-2 mb-2'>
                <div className='h-px w-5 bg-white/60 group-hover:w-8 transition-all duration-300' />
                <span className='text-[10px] font-semibold tracking-[0.18em] uppercase text-white/60'>
                  Category
                </span>
              </div>

              <h3 className='text-lg font-bold leading-snug'>{item.name}</h3>
              <p className='mt-1 text-xs text-white/70 leading-relaxed line-clamp-2'>
                {item.description}
              </p>

              {/* Explore CTA — revealed on hover */}
              <div className='mt-3 flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <span className='text-xs font-semibold tracking-[0.12em] uppercase'>
                  Explore
                </span>
                <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-1' />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
