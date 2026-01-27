'use client';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Heart,
  Palette,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  badge: string;
  gradient: string;
  link: string;
  showApplyButton?: boolean;
  soon?: boolean;
}

const services: Service[] = [
  {
    id: 'training-center',
    title: 'Oylkka Computer Training Center',
    icon: <GraduationCap className='w-8 h-8' />,
    badge: 'Education',
    gradient: 'from-orange-500 to-yellow-500',
    link: '/best-computer-training-center',
    showApplyButton: true,
  },
  {
    id: 'it-agency',
    title: 'Oylkka IT Agency',
    icon: <Building2 className='w-8 h-8' />,
    badge: 'Technology',
    gradient: 'from-blue-500 to-cyan-500',
    link: '/mhn-it',
  },
  {
    id: 'graphics',
    title: 'Oylkka Graphics',
    icon: <Palette className='w-8 h-8' />,
    badge: 'Creative',
    gradient: 'from-purple-500 to-pink-500',
    link: '/',
  },
  {
    id: 'ecommerce',
    title: 'Oylkka E-Commerce',
    icon: <ShoppingCart className='w-8 h-8' />,
    badge: 'Commerce',
    gradient: 'from-green-500 to-emerald-500',
    link: 'https://www.oylkka.com',
  },
  {
    id: 'blood-bank',
    title: 'Oylkka Blood Bank',
    icon: <Heart className='w-8 h-8' />,
    badge: 'Healthcare',
    gradient: 'from-red-500 to-rose-500',
    link: '/best-computer-training-center/blood-donate',
  },
  // ✅ New "Oylkka Foundation" card with coming soon effect
  {
    id: 'foundation',
    title: 'Oylkka Foundation',
    icon: <Heart className='w-8 h-8' />,
    badge: 'Non-Profit',
    gradient: 'from-indigo-500 to-purple-500',
    link: '#',
    soon: true,
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
      className={`w-full text-white font-semibold rounded-xl bg-gradient-to-r ${service.gradient} ${isSoon ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90'} transition-opacity`}
      disabled={isSoon}
    >
      {isSoon ? 'Coming Soon' : 'Learn More'}
      {!isSoon && (
        <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
      )}
    </Button>
  );

  const ApplyButton = () => (
    <Button
      variant='ghost'
      className='w-full mt-0 nav-gradient-border relative cursor-pointer overflow-hidden px-5 py-2.5 font-semibold text-black hover:text-black bg-transparent hover:bg-transparent border-2 border-gradient-to-r border-orange-500 rounded-xl'
    >
      Apply Now
    </Button>
  );

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: isSoon ? 1 : 1.05,
        y: isSoon ? 0 : -1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`h-full ${isSoon ? 'cursor-not-allowed' : ''}`}
    >
      <Card
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-gray-100 transition-all duration-500 ${isSoon ? 'opacity-80' : 'hover:border-transparent'}`}
      >
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 ${isSoon ? '' : 'group-hover:opacity-10'}`}
        />
        <CardHeader className='relative z-10 flex-grow p-6 sm:p-8'>
          <div className='flex items-center justify-between mb-4'>
            <motion.div
              className={`p-4 rounded-full bg-gradient-to-br ${service.gradient} text-white shadow-lg`}
              whileHover={{ scale: isSoon ? 1 : 1.15, rotate: isSoon ? 0 : 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              {service.icon}
            </motion.div>
            <Badge>{service.badge}</Badge>
          </div>
          <CardTitle className='text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-500'>
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
    <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight'>
            Explore Our Services
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
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
