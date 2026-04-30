'use client';

import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  MessageSquare,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: custom },
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

// Eyebrow component
function Eyebrow({ label }: { label: string }) {
  return (
    <div className='flex items-center gap-3 mb-5'>
      <div className='h-px w-10 bg-primary' />
      <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
        {label}
      </span>
    </div>
  );
}

// Section wrapper with animation trigger
function AnimatedSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.section
      ref={ref}
      initial='hidden'
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Value card component
function ValueCard({
  icon: Icon,
  tag,
  title,
  description,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className='group rounded-2xl border border-border p-6 hover:border-primary/30 hover:bg-primary/2 transition-colors duration-300 flex flex-col gap-4'
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      <div className='flex items-center justify-between'>
        <div className='w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300'>
          <Icon className='w-5 h-5 text-primary' />
        </div>
        <span className='text-[10px] font-semibold tracking-[0.18em] uppercase border border-border rounded-full px-2.5 py-1 text-muted-foreground group-hover:border-primary/30 transition-colors duration-300'>
          {tag}
        </span>
      </div>

      <h3 className='text-base font-bold leading-snug'>{title}</h3>
      <p className='text-sm text-muted-foreground leading-relaxed flex-1'>
        {description}
      </p>

      <div className='flex items-center gap-2'>
        <div className='h-px w-5 bg-primary/40 group-hover:w-8 transition-all duration-300' />
        <span className='text-[10px] text-primary/60 font-semibold tracking-wide uppercase'>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
}

// Stats strip component
function StatsStrip() {
  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Uptime', value: '99.9%', icon: Shield },
    { label: 'Performance', value: 'Fast', icon: Zap },
    { label: 'Growth', value: '+200%', icon: TrendingUp },
  ];

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border'>
      {stats.map((stat, i) => (
        <motion.div
          // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
          key={i}
          variants={fadeUp}
          custom={0.1 + i * 0.05}
          className='py-10 px-6 flex flex-col items-center justify-center gap-2'
        >
          <p className='text-4xl md:text-5xl font-bold text-primary tabular-nums'>
            {stat.value}
          </p>
          <div className='flex items-center gap-1.5'>
            <stat.icon className='w-3.5 h-3.5 text-muted-foreground' />
            <p className='text-xs text-muted-foreground tracking-wide uppercase font-medium'>
              {stat.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className='min-h-screen bg-background'>
      {/* Hero Section */}
      <AnimatedSection className='relative min-h-[80vh] flex items-center overflow-hidden border-b border-border'>
        <div className='absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-background to-background' />

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-28'>
          <motion.div variants={fadeUp} custom={0} className='max-w-2xl'>
            <Eyebrow label='Welcome' />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={0.1}
            className='text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6'
          >
            Let&apos;s{' '}
            <span className='italic font-bold text-primary'>create</span>{' '}
            something <span className='text-primary'>great.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.15}
            className='text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8'
          >
            Experience the Oylkka IT design system—where editorial elegance
            meets motion-first innovation. Every detail crafted for clarity and
            delight.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.2}
            className='flex flex-col sm:flex-row gap-3'
          >
            <Button
              size='lg'
              className='h-12 px-8 gap-2 group w-full sm:w-auto'
            >
              Explore Design
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='h-12 px-8 w-full sm:w-auto'
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection className='border-b border-border'>
        <StatsStrip />
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className='py-20 md:py-28 border-b border-border'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div variants={fadeUp} custom={0} className='mb-5'>
            <Eyebrow label='Features' />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={0.1}
            className='text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-16'
          >
            Designed for{' '}
            <span className='italic font-bold text-primary'>performance.</span>
          </motion.h2>

          <motion.div
            variants={gridVariants}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, margin: '-60px' }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
          >
            {[
              {
                icon: Zap,
                tag: 'Speed',
                title: 'Lightning Fast',
                description:
                  'Optimized for performance with sub-100ms load times across all devices.',
              },
              {
                icon: Shield,
                tag: 'Security',
                title: 'Enterprise Grade',
                description:
                  'Bank-level encryption and compliance certifications for your peace of mind.',
              },
              {
                icon: Users,
                tag: 'Community',
                title: 'Growing Community',
                description:
                  'Join 50,000+ developers building the future with our platform.',
              },
              {
                icon: TrendingUp,
                tag: 'Analytics',
                title: 'Deep Insights',
                description:
                  'Real-time analytics and reporting to track what matters most.',
              },
              {
                icon: MessageSquare,
                tag: 'Support',
                title: '24/7 Support',
                description:
                  'Dedicated support team ready to help you succeed every step of the way.',
              },
              {
                icon: CheckCircle2,
                tag: 'Reliability',
                title: '99.9% Uptime',
                description:
                  'Guaranteed reliability with redundant systems and global infrastructure.',
              },
            ].map((item, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
              <ValueCard key={i} {...item} index={i} />
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Design Philosophy Section */}
      <AnimatedSection className='py-20 md:py-28 border-b border-border'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div variants={fadeUp} custom={0} className='mb-5'>
            <Eyebrow label='Philosophy' />
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <motion.div variants={fadeUp} custom={0.1}>
              <h2 className='text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-6'>
                Editorial{' '}
                <span className='italic font-bold text-primary'>
                  excellence
                </span>{' '}
                in every pixel.
              </h2>
              <p className='text-base text-muted-foreground leading-relaxed mb-4'>
                We believe in generous whitespace, clear hierarchy, and
                intentional motion. Every element serves a purpose. Every
                interaction delights.
              </p>
              <p className='text-base text-muted-foreground leading-relaxed mb-6'>
                Inspired by editorial design principles, built for the web. Our
                system prioritizes clarity without sacrificing sophistication.
              </p>
              <div className='flex items-center gap-2 mb-4'>
                <div className='h-px w-5 bg-primary' />
                <span className='text-xs font-semibold tracking-[0.2em] uppercase text-primary'>
                  Core Values
                </span>
              </div>
              <ul className='space-y-3'>
                {[
                  'Generous whitespace',
                  'Grid discipline',
                  'Motion-first approach',
                  'Accent economy',
                ].map((value, i) => (
                  <li
                    // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
                    key={i}
                    className='flex items-center gap-2 text-sm text-muted-foreground'
                  >
                    <span className='w-1.5 h-1.5 rounded-full bg-primary' />
                    {value}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={0.15}
              className='relative h-96 rounded-2xl border border-border overflow-hidden bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center'
            >
              <div className='text-center'>
                <Compass className='w-24 h-24 text-primary/30 mx-auto mb-4' />
                <p className='text-muted-foreground text-sm max-w-xs'>
                  Design system focused on clarity, performance, and delight.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className='py-20 md:py-28'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            variants={fadeUp}
            custom={0}
            className='text-center max-w-2xl mx-auto'
          >
            <Eyebrow label='Get Started' />
            <h2 className='text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-6'>
              Ready to{' '}
              <span className='italic font-bold text-primary'>elevate</span>{' '}
              your design<span className='text-primary'>?</span>
            </h2>
            <p className='text-base md:text-lg text-muted-foreground leading-relaxed mb-8'>
              Start building with our comprehensive design system today.
              Designed for teams that care about quality.
            </p>
            <motion.div
              variants={fadeUp}
              custom={0.1}
              className='flex flex-col sm:flex-row gap-3 justify-center'
            >
              <Button size='lg' className='h-12 px-8 gap-2 group'>
                Start Building
                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              </Button>
              <Button size='lg' variant='outline' className='h-12 px-8'>
                View Documentation
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>
    </main>
  );
}
