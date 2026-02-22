'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Eye, Heart, Medal, Users } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Services from './Services';
import SectionHeader from './section-header';
import Team from './Team';
import Testimonials from './Testimonials';
import ToolsSkills from './ToolsSkills';

export default function AboutPage() {
  const heroRef = useRef(null);

  const storyContent = [
    {
      year: '2010',
      title: 'The Spark of an Idea',
      description:
        'Oylkka IT was born out of a passion for design and a vision to help businesses thrive through compelling visual communication. Founded by John Doe, our journey began in a small studio with big dreams.',
    },
    {
      year: '2012-2015',
      title: 'Growing the Team',
      description:
        "Over the years, we've grown into a dynamic team of creative professionals, each bringing unique skills and perspectives to our work. From branding startups to revamping corporate identities, we've had the privilege of working with diverse clients across industries.",
    },
    {
      year: '2018',
      title: 'Recognition and Awards',
      description:
        'Our commitment to innovation and excellence has earned us recognition in the design community, including awards for our groundbreaking work in UI/UX design and motion graphics. But our greatest reward is the success and satisfaction of our clients.',
    },
    {
      year: 'Today',
      title: 'Leading the Industry',
      description:
        "Today, Oylkka IT stands at the forefront of the design industry, continuously pushing boundaries and setting new standards. We're not just creating designs; we're crafting experiences that resonate with audiences and drive results for our clients.",
    },
  ];

  const values = [
    {
      icon: <Eye className='h-8 w-8 text-primary' />,
      title: 'Vision',
      description:
        'We approach every project with fresh eyes and innovative ideas.',
    },
    {
      icon: <Medal className='h-8 w-8 text-primary' />,
      title: 'Excellence',
      description:
        'We strive for perfection in every pixel and every interaction.',
    },
    {
      icon: <Users className='h-8 w-8 text-primary' />,
      title: 'Collaboration',
      description:
        'We believe in the power of teamwork, both internally and with our clients.',
    },
    {
      icon: <Heart className='h-8 w-8 text-primary' />,
      title: 'Integrity',
      description:
        'We maintain the highest ethical standards in all our business practices.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className='min-h-screen bg-background text-foreground'>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className='relative h-[75vh] overflow-hidden bg-primary/5'
      >
        <div className='absolute inset-0 flex items-center justify-center text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='flex flex-col items-center'
          >
            <h1 className='mb-4 text-4xl font-extrabold tracking-tight  md:text-6xl lg:text-7xl'>
              We Are Oylkka IT
            </h1>
            <p className='mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl'>
              A creative agency dedicated to building brilliant brands and
              digital experiences that drive results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section - Timeline */}
      <section className='py-24 sm:py-32'>
        <div className='container mx-auto max-w-5xl px-4'>
          <SectionHeader title='Our Journey' text='THE STORY OF OYLKKA IT' />
          <div className='relative mt-16'>
            <div
              className='absolute left-1/2 -ml-px h-full w-0.5 bg-border'
              aria-hidden='true'
            />
            {storyContent.map((story, index) => (
              <motion.div
                // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative mb-12 flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}
                >
                  <div
                    className={`absolute left-1/2 top-4 -ml-4 h-8 w-8 rounded-full border-4 border-background bg-primary ${index % 2 === 0 ? '-translate-x-full' : ''}`}
                  />
                  <p className='text-lg font-semibold text-primary'>
                    {story.year}
                  </p>
                  <h3 className='mt-1 text-2xl font-bold'>{story.title}</h3>
                  <p className='mt-2 text-muted-foreground'>
                    {story.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Services />

      {/* Our Values Section */}
      <section className='bg-secondary/20 py-24 sm:py-32'>
        <div className='container mx-auto max-w-6xl px-4'>
          <SectionHeader title='Our Core Values' text='GUIDING PRINCIPLES' />
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className='h-full'
              >
                <Card className='h-full transform-gpu bg-background text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl'>
                  <CardContent className='flex flex-col items-center p-8'>
                    {value.icon}
                    <h3 className='mt-4 text-xl font-bold'>{value.title}</h3>
                    <p className='mt-2 text-muted-foreground'>
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ToolsSkills />
      <Team />
      <Testimonials />

      {/* Call to Action */}
      <section className='py-24 sm:py-32'>
        <div className='container mx-auto max-w-4xl px-4 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
              Ready to bring your vision to life?
            </h2>
            <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
              Let&apos;s create something amazing together. We&apos;re excited
              to learn about your project.
            </p>
            <Button asChild size='lg' className='mt-8'>
              <Link href='/contact'>
                Get in Touch <ArrowRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
