import { motion, type Variants } from 'framer-motion';
import type { IconType } from 'react-icons';

export default function SectionHeader({
  text,
  title,
  icon: Icon,
}: {
  text?: string;
  title: string;
  icon: IconType;
}) {
  const lineLeft: Variants = {
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

  const lineRight: Variants = {
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

  const iconVariants: Variants = {
    offscreen: {
      scale: 0,
      opacity: 0,
    },
    onscreen: {
      scale: 1,
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
      viewport={{ amount: 0.8, once: false }}
      className='mx-3 flex flex-col items-center justify-center gap-2 text-center'
    >
      <motion.div
        variants={lineLeft}
        className='text-primary-100 text-2xl font-bold md:text-4xl'
      >
        {title}
      </motion.div>

      <div className='flex items-center gap-4'>
        <motion.div
          variants={lineLeft}
          className='h-0.5 w-20 bg-muted-foreground'
        ></motion.div>
        <motion.div variants={iconVariants} className='text-lg'>
          <Icon />
        </motion.div>
        <motion.div
          variants={lineRight}
          className='h-0.5 w-20 bg-muted-foreground'
        ></motion.div>
      </div>
      {text && (
        <motion.div variants={lineRight} className='text-muted-foreground'>
          {text}
        </motion.div>
      )}
    </motion.div>
  );
}
