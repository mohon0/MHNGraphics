'use client';
import { motion, type Variants } from 'framer-motion';

export default function SectionHeader({
  text,
  title,
}: {
  text?: string;
  title: string;
}) {
  const cardVariants: Variants = {
    offscreen: {
      x: 300,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,

      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 1.5,
      },
    },
  };
  const lineVariants: Variants = {
    offscreen: {
      x: -300,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,

      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 1.5,
      },
    },
  };
  return (
    <motion.div
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ amount: 0.8, once: true }}
      className='mx-3 flex flex-col items-center justify-center gap-6 text-center'
    >
      <motion.div variants={lineVariants} className='font-bold text-primary'>
        {text}
      </motion.div>
      <div className='flex flex-col items-center justify-center gap-3'>
        <motion.div
          variants={cardVariants}
          className='text-2xl font-bold md:text-5xl'
        >
          {title}
        </motion.div>
        <motion.div
          variants={lineVariants}
          className='h-1 w-40 bg-primary'
        ></motion.div>
      </div>
    </motion.div>
  );
}
