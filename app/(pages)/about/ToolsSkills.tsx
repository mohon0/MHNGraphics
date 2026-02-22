'use client';
import { motion } from 'framer-motion';
import Skills from './Skills';
import SectionHeader from './section-header';
import Tools from './Tools';

export default function ToolsSkills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className='py-24 sm:py-32'
    >
      <SectionHeader title='Our Expertise' text='TOOLS & SKILLS' />
      <div className='container mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-16 px-4 md:grid-cols-2'>
        <Tools />
        <Skills />
      </div>
    </motion.div>
  );
}
