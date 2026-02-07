'use client';

import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { Award, Users } from 'lucide-react';
import Image from 'next/image';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import img1 from '@/images/best-computer/1.jpg';
import img2 from '@/images/best-computer/2.jpg';
import img3 from '@/images/best-computer/3.jpg';

interface SlideContent {
  // biome-ignore lint: error
  img: any;
  title: string;
  description: string;
  features?: string[];
  stats?: { label: string; value: string; icon: React.ReactNode }[];
  theme: 'gradient' | 'modern' | 'elegant';
  accentColor: string;
}

// Enhanced content data with themes
const contentData: SlideContent[] = [
  {
    img: img1,
    title: 'ওয়েল্কা ট্রেনিং সেন্টারের পক্ষ থেকে আপনাকে স্বাগতম',
    description:
      'ওয়েল্কা ট্রেনিং সেন্টার, রফি টাওয়ার (১০ তলা ভবনের ৫ম তলা) পায়রা চত্ত্বর, ঝিনাইদহ',
    features: ['সরকারি অনুমোদিত', 'অভিজ্ঞ প্রশিক্ষক', 'আধুনিক সুবিধা'],
    stats: [
      {
        label: 'শিক্ষার্থী',
        value: '৫০০০+',
        icon: <Users className='h-4 w-4' />,
      },
      { label: 'কোর্স', value: '১৫+', icon: <Award className='h-4 w-4' /> },
    ],
    theme: 'gradient',
    accentColor: 'from-blue-500 to-purple-600',
  },
  {
    img: img2,
    title: 'কারিগরি শিক্ষা বোর্ড কতৃক পরীক্ষার মাধ্যমে সরকারী সার্টিফিকেট প্রদান করা হয়',
    description: 'ঝিনাইদহে একমাত্র নির্ভরযোগ্য প্রতিষ্ঠান।',
    features: ['সরকারি সার্টিফিকেট', 'চাকরির নিশ্চয়তা', 'বিনামূল্যে প্লেসমেন্ট'],
    stats: [
      {
        label: 'সফলতার হার',
        value: '৯৫%',
        icon: <Award className='h-4 w-4' />,
      },
      {
        label: 'চাকরি প্রাপ্ত',
        value: '৮৫%',
        icon: <Users className='h-4 w-4' />,
      },
    ],
    theme: 'modern',
    accentColor: 'from-green-500 to-teal-600',
  },
  {
    img: img3,
    title: 'আধুনিক ও সুসজ্জিত মাল্টিমিডিয়া কম্পিউটার ল্যাব',
    description:
      'প্রশিক্ষণ নিন, দক্ষতা অর্জন করুন, সফলতা আসবেই। নিজেকে দক্ষ করে তুলুন, যুগের সাথে তাল মিলিয়ে এগিয়ে চলুন',
    features: ['আধুনিক কম্পিউটার', 'হাতে-কলমে শিক্ষা', 'প্রজেক্ট বেসড লার্নিং'],
    stats: [
      {
        label: 'ল্যাব সুবিধা',
        value: '৩টি',
        icon: <Award className='h-4 w-4' />,
      },
      { label: 'কম্পিউটার', value: '৫০+', icon: <Users className='h-4 w-4' /> },
    ],
    theme: 'elegant',
    accentColor: 'from-orange-500 to-red-600',
  },
];

// Different animation variants for each slide
const slideAnimations = [
  // Slide 1: Gradient theme - Fade and scale
  {
    title: {
      initial: { opacity: 0, scale: 0.8, y: 50 },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: { delay: 0.2, duration: 0.8, ease: 'easeOut' },
    },
    description: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: 0.4, duration: 0.6, ease: 'easeOut' },
    },
    image: {
      initial: { opacity: 0, rotateY: 90, scale: 0.8 },
      animate: { opacity: 1, rotateY: 0, scale: 1 },
      transition: { delay: 0.3, duration: 1, ease: 'easeOut' },
    },
    features: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.6, duration: 0.5, staggerChildren: 0.1 },
    },
    stats: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: 0.8, duration: 0.6, staggerChildren: 0.1 },
    },
    buttons: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 1, duration: 0.5 },
    },
  },
  // Slide 2: Modern theme - Slide and bounce
  {
    title: {
      initial: { opacity: 0, x: -200, rotate: -5 },
      animate: { opacity: 1, x: 0, rotate: 0 },
      transition: { delay: 0.2, duration: 0.8, type: 'spring', bounce: 0.4 },
    },
    description: {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.4, duration: 0.6, ease: 'easeOut' },
    },
    image: {
      initial: { opacity: 0, x: 200, rotateZ: 10 },
      animate: { opacity: 1, x: 0, rotateZ: 0 },
      transition: { delay: 0.3, duration: 0.8, type: 'spring' },
    },
    features: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: 0.6, duration: 0.5, staggerChildren: 0.15 },
    },
    stats: {
      initial: { opacity: 0, y: 50, rotate: 5 },
      animate: { opacity: 1, y: 0, rotate: 0 },
      transition: { delay: 0.8, duration: 0.6, staggerChildren: 0.1 },
    },
    buttons: {
      initial: { opacity: 0, scale: 0.5 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: 1, duration: 0.5, type: 'spring', bounce: 0.6 },
    },
  },
  // Slide 3: Elegant theme - Smooth and sophisticated
  {
    title: {
      initial: { opacity: 0, y: -50, skewY: 5 },
      animate: { opacity: 1, y: 0, skewY: 0 },
      transition: { delay: 0.2, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    description: {
      initial: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
      animate: { opacity: 1, clipPath: 'inset(0 0% 0 0)' },
      transition: { delay: 0.4, duration: 0.8, ease: 'easeInOut' },
    },
    image: {
      initial: { opacity: 0, scale: 1.2, filter: 'blur(10px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      transition: { delay: 0.3, duration: 1.2, ease: 'easeOut' },
    },
    features: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.6, duration: 0.8, staggerChildren: 0.2 },
    },
    stats: {
      initial: { opacity: 0, rotateX: 90 },
      animate: { opacity: 1, rotateX: 0 },
      transition: { delay: 0.8, duration: 0.7, staggerChildren: 0.1 },
    },
    buttons: {
      initial: { opacity: 0, y: 30, filter: 'blur(5px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      transition: { delay: 1, duration: 0.8, ease: 'easeOut' },
    },
  },
];

export const Slider: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'gradient':
        return 'bg-linear-to-br from-green-900/90 via-teal-900/90 to-emerald-900/90';
      case 'modern':
        return 'bg-linear-to-br from-blue-900/90 via-purple-900/90 to-indigo-900/90';
      case 'elegant':
        return 'bg-linear-to-br from-orange-900/90 via-red-900/90 to-pink-900/90';
      default:
        return 'bg-linear-to-br from-gray-900/90 to-black/90';
    }
  };

  return (
    <div className='relative w-full'>
      <Carousel
        setApi={setApi}
        className='w-full'
        plugins={[
          Autoplay({
            delay: 8000,
          }),
        ]}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {contentData.map((slide, index) => {
            const animation = slideAnimations[index];
            return (
              <CarouselItem key={slide.title}>
                <div className='relative h-220 w-full overflow-hidden rounded-b-2xl shadow-2xl md:h-160'>
                  {/* Theme-based Overlay */}
                  <div
                    className={`absolute inset-0 ${getThemeClasses(slide.theme)}`}
                  />

                  {/* Animated Background Elements */}
                  <div className='absolute inset-0 overflow-hidden'>
                    <motion.div
                      className={`absolute -right-40 -top-40 h-80 w-80 rounded-full bg-linear-to-r ${slide.accentColor} opacity-20 blur-3xl`}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'linear',
                      }}
                    />
                    <motion.div
                      className={`absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-linear-to-r ${slide.accentColor} opacity-10 blur-3xl`}
                      animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                      }}
                      transition={{
                        duration: 25,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'linear',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className='absolute inset-0 z-20 flex items-center'>
                    <div className='container mx-auto px-2 md:px-6'>
                      <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
                        {/* Text Content */}
                        <div className='space-y-6 text-white'>
                          <motion.div
                            // biome-ignore lint: error
                            key={`title-${index}`}
                            initial={animation.title.initial}
                            animate={
                              current === index
                                ? animation.title.animate
                                : animation.title.initial
                            }
                            transition={animation.title.transition}
                          >
                            <h1 className='text-3xl font-bold leading-tight md:text-5xl'>
                              {slide.title}
                            </h1>
                          </motion.div>

                          <motion.p
                            // biome-ignore lint: error
                            key={`desc-${index}`}
                            initial={animation.description.initial}
                            animate={
                              current === index
                                ? animation.description.animate
                                : animation.description.initial
                            }
                            transition={animation.description.transition}
                            className='text-lg leading-relaxed text-white/90 md:text-xl'
                          >
                            {slide.description}
                          </motion.p>

                          {/* Features */}
                          {slide.features && (
                            <motion.div
                              // biome-ignore lint: error
                              key={`features-${index}`}
                              initial={animation.features.initial}
                              animate={
                                current === index
                                  ? animation.features.animate
                                  : animation.features.initial
                              }
                              transition={animation.features.transition}
                              className='flex flex-wrap gap-2'
                            >
                              {slide.features.map((feature, idx) => (
                                <motion.div
                                  // biome-ignore lint: error
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={
                                    current === index
                                      ? { opacity: 1, scale: 1 }
                                      : { opacity: 0, scale: 0.8 }
                                  }
                                  transition={{ delay: 0.6 + idx * 0.1 }}
                                >
                                  <Badge
                                    variant='secondary'
                                    className='border-white/20 bg-white/10 text-white backdrop-blur-xs'
                                  >
                                    {feature}
                                  </Badge>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}

                          {/* Stats */}
                          {slide.stats && (
                            <motion.div
                              // biome-ignore lint: error
                              key={`stats-${index}`}
                              initial={animation.stats.initial}
                              animate={
                                current === index
                                  ? animation.stats.animate
                                  : animation.stats.initial
                              }
                              transition={animation.stats.transition}
                              className='grid grid-cols-2 gap-4 md:grid-cols-3'
                            >
                              {slide.stats.map((stat, idx) => (
                                <motion.div
                                  // biome-ignore lint: error
                                  key={idx}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={
                                    current === index
                                      ? { opacity: 1, y: 0 }
                                      : { opacity: 0, y: 20 }
                                  }
                                  transition={{ delay: 0.8 + idx * 0.1 }}
                                >
                                  <Card className='border-white/20 bg-white/10 text-center backdrop-blur-xs'>
                                    <CardContent className='p-3'>
                                      <div className='mb-1 flex items-center justify-center text-white'>
                                        {stat.icon}
                                      </div>
                                      <div className='text-2xl font-bold text-white'>
                                        {stat.value}
                                      </div>
                                      <div className='text-sm text-white/80'>
                                        {stat.label}
                                      </div>
                                    </CardContent>
                                  </Card>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </div>

                        {/* Image Content */}
                        <motion.div
                          // biome-ignore lint: error
                          key={`image-${index}`}
                          initial={animation.image.initial}
                          animate={
                            current === index
                              ? animation.image.animate
                              : animation.image.initial
                          }
                          transition={animation.image.transition}
                          className='relative'
                        >
                          <div className='relative overflow-hidden rounded-2xl shadow-2xl'>
                            <Image
                              src={slide.img || '/placeholder.svg'}
                              alt=''
                              width={600}
                              height={400}
                              className='h-auto w-full object-cover'
                            />
                            <div
                              className={`absolute inset-0 bg-linear-to-t ${slide.accentColor} opacity-20`}
                            />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className='absolute left-6 top-1/2 z-50 -translate-y-1/2 border-white/30 bg-white/20 text-white backdrop-blur-xs hover:bg-white/30' />
        <CarouselNext className='absolute right-6 top-1/2 z-50 -translate-y-1/2 border-white/30 bg-white/20 text-white backdrop-blur-xs hover:bg-white/30' />

        {/* Custom Pagination Dots */}
        <div className='absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2'>
          {Array.from({ length: count }).map((_, index) => (
            <button
              type='button'
              // biome-ignore lint: error
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};
