'use client';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  GraduationCap,
  Heart,
  Palette,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  badge: string;
  link: string;
  showApplyButton?: boolean;
  soon?: boolean;
  accentClass?: string;
  borderClass?: string;
}

const services: Service[] = [
  {
    id: 'training-center',
    title: 'Oylkka IT & Computer Training Center',
    icon: <GraduationCap className='w-8 h-8' />,
    badge: 'Education',
    link: '/best-computer-training-center',
    showApplyButton: true,
    accentClass:
      'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
    borderClass: 'hover:border-blue-200 dark:hover:border-blue-800',
  },

  {
    id: 'it-agency',
    title: 'Oylkka IT Agency',
    icon: <Palette className='w-8 h-8' />,
    badge: 'Creative',
    link: '/',
    accentClass:
      'bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400',
    borderClass: 'hover:border-pink-200 dark:hover:border-pink-800',
  },
  {
    id: 'ecommerce',
    title: 'Oylkka E-Commerce',
    icon: <ShoppingCart className='w-8 h-8' />,
    badge: 'Commerce',
    link: 'https://www.oylkka.com',
    accentClass:
      'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400',
    borderClass: 'hover:border-green-200 dark:hover:border-green-800',
  },
  {
    id: 'blood-bank',
    title: 'Oylkka Blood Bank',
    icon: <Heart className='w-8 h-8' />,
    badge: 'Healthcare',
    link: '/best-computer-training-center/blood-donate',
    accentClass: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400',
    borderClass: 'hover:border-red-200 dark:hover:border-red-800',
  },
  {
    id: 'foundation',
    title: 'Oylkka Foundation',
    icon: <Heart className='w-8 h-8' />,
    badge: 'Non-Profit',
    link: '#',
    soon: true,
    accentClass:
      'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400',
    borderClass: 'hover:border-amber-200 dark:hover:border-amber-800',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const isExternalLink = service.link.startsWith('http');
  const isSoon = service.soon;

  const LearnMoreButton = () => (
    <Button
      className={`w-full font-semibold rounded-lg ${isSoon ? 'cursor-not-allowed opacity-50' : ''}`}
      disabled={isSoon}
      variant='secondary'
    >
      {isSoon ? 'Coming Soon' : 'Learn More'}
      {!isSoon && (
        <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
      )}
    </Button>
  );

  const ApplyButton = () => (
    <Button className='w-full font-semibold rounded-lg'>Apply Now</Button>
  );

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: isSoon ? 1 : 1.05,
        y: isSoon ? 0 : -2,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`h-full ${isSoon ? 'cursor-not-allowed' : ''}`}
    >
      <Card
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-500 ${isSoon ? 'opacity-60' : `hover:shadow-lg ${service.borderClass}`}`}
      >
        <div
          className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 ${isSoon ? '' : 'group-hover:opacity-100'}`}
          style={{
            background: `linear-gradient(to bottom right, var(--color-accent-light), transparent)`,
          }}
        />
        <CardHeader className='relative z-10 flex-grow p-6 sm:p-8'>
          <div className='flex items-center justify-between mb-4'>
            <motion.div
              className={`p-3 rounded-lg ${service.accentClass}`}
              whileHover={{ scale: isSoon ? 1 : 1.1, rotate: isSoon ? 0 : 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              {service.icon}
            </motion.div>
            <Badge variant='secondary'>{service.badge}</Badge>
          </div>
          <CardTitle className='text-xl font-bold text-foreground transition-colors duration-500'>
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardFooter className='relative z-10 p-6 sm:p-8 pt-4'>
          <div
            className={`w-full flex ${service.showApplyButton ? 'flex-row gap-3' : 'flex-col'}`}
          >
            {isExternalLink || isSoon ? (
              <a
                href={isSoon ? '#' : service.link}
                target={isSoon ? '' : '_blank'}
                rel={isSoon ? '' : 'noopener noreferrer'}
                className={service.showApplyButton ? 'flex-1' : 'w-full'}
                onClick={(e) => isSoon && e.preventDefault()}
              >
                <LearnMoreButton />
              </a>
            ) : (
              <Link
                href={service.link}
                className={service.showApplyButton ? 'flex-1' : 'w-full'}
              >
                <LearnMoreButton />
              </Link>
            )}

            {service.showApplyButton && (
              <Link
                href='/best-computer-training-center/application'
                className='flex-1'
              >
                <ApplyButton />
              </Link>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 bg-background'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight'>
            Explore Our Services
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            From digital strategy to creative design, we've got you covered.
          </p>
        </div>
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
