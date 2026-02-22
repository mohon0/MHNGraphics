'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import img3 from '@/images/tools/adobe.svg';
import img2 from '@/images/tools/adobe-after-effects.svg';
import img1 from '@/images/tools/adobe-illustrator.svg';
import img4 from '@/images/tools/adobe-lightroom.svg';
import img5 from '@/images/tools/adobe-photoshop.svg';

const tools = [
  { img: img1, name: 'Illustrator' },
  { img: img2, name: 'After Effects' },
  { img: img3, name: 'Adobe XD' },
  { img: img4, name: 'Lightroom' },
  { img: img5, name: 'Photoshop' },
  // Add more tools if you have them
];

export default function Tools() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <div>
      <h3 className='mb-8 text-center text-2xl font-bold md:text-3xl'>
        Our Power Tools
      </h3>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='flex h-fit flex-wrap items-center justify-center gap-8 rounded-lg bg-secondary/20 p-8'
      >
        {tools.map(({ img, name }) => (
          <motion.div
            key={name}
            variants={itemVariants}
            className='h-20 w-20 md:h-24 md:w-24'
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    src={img}
                    alt={name}
                    className='h-full w-full object-contain transition-transform duration-300 hover:scale-110'
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
