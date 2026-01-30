'use client';
import { motion, type Variants } from 'framer-motion';

export default function Skills() {
  const lineVariants: Variants = {
    offscreen: {
      x: -300,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'linear',
        bounce: 0.4,
        duration: 1.5,
      },
    },
  };

  return (
    <div className='flex w-full flex-col items-center justify-center gap-8'>
      {/* Tailwind */}
      <div className='flex w-full flex-col gap-2'>
        <div className='flex justify-between'>
          <p>Graphics Design</p>
          <p>90%</p>
        </div>
        <motion.div
          initial='offscreen'
          whileInView='onscreen'
          viewport={{ once: true, amount: 0.8 }}
          className='h-2 w-full overflow-hidden rounded-full bg-linear-to-t from-black to-gray-700'
        >
          <motion.div
            variants={lineVariants}
            className='h-2 w-[90%] rounded-full bg-linear-to-r from-blue-400 to-teal-300'
            title='90%'
          ></motion.div>
        </motion.div>
      </div>

      {/* JavaScript */}
      <div className='flex w-full flex-col gap-2'>
        <div className='flex justify-between'>
          <p>Web Design</p>
          <p>89%</p>
        </div>
        <motion.div
          initial='offscreen'
          whileInView='onscreen'
          viewport={{ once: true, amount: 0.8 }}
          className='h-2 w-full overflow-hidden rounded-full bg-linear-to-t from-black to-gray-700'
        >
          <motion.div
            variants={lineVariants}
            className='h-2 w-[89%] rounded-full bg-linear-to-r from-yellow-500 to-orange-400'
            title='89%'
          ></motion.div>
        </motion.div>
      </div>

      {/* React */}
      <div className='flex w-full flex-col gap-2'>
        <div className='flex justify-between'>
          <p>Adobe Muse</p>
          <p>97%</p>
        </div>
        <motion.div
          initial='offscreen'
          whileInView='onscreen'
          viewport={{ once: true, amount: 0.8 }}
          className='h-2 w-full overflow-hidden rounded-full bg-linear-to-t from-black to-gray-700'
        >
          <motion.div
            variants={lineVariants}
            className='h-2 w-[97%] rounded-full bg-linear-to-r from-blue-500 to-sky-400'
            title='97%'
          ></motion.div>
        </motion.div>
      </div>

      <div className='flex w-full flex-col gap-2'>
        <div className='flex justify-between'>
          <p>Illustrator</p>
          <p>87%</p>
        </div>
        <motion.div
          initial='offscreen'
          whileInView='onscreen'
          viewport={{ once: true, amount: 0.8 }}
          className='h-2 w-full overflow-hidden rounded-full bg-linear-to-t from-black to-gray-700'
        >
          <motion.div
            variants={lineVariants}
            className='h-2 w-[87%] rounded-full bg-linear-to-r from-red-500 to-orange-600'
            title='87%'
          ></motion.div>
        </motion.div>
      </div>

      {/* MongoDB */}
      <div className='flex w-full flex-col gap-2'>
        <div className='flex justify-between'>
          <p>Photoshop</p>
          <p>90%</p>
        </div>
        <motion.div
          initial='offscreen'
          whileInView='onscreen'
          viewport={{ once: true, amount: 0.8 }}
          className='h-2 w-full overflow-hidden rounded-full bg-linear-to-t from-black to-gray-700'
        >
          <motion.div
            variants={lineVariants}
            className='h-2 w-[90%] rounded-full bg-linear-to-r from-green-600 to-green-400'
            title='90%'
          ></motion.div>
        </motion.div>
      </div>

      {/* TypeScript */}
      <div className='flex w-full flex-col gap-2'>
        <div className='flex justify-between'>
          <p>Video Editing</p>
          <p>90%</p>
        </div>
        <motion.div
          initial='offscreen'
          whileInView='onscreen'
          viewport={{ once: true, amount: 0.8 }}
          className='h-2 w-full overflow-hidden rounded-full bg-linear-to-t from-black to-gray-700'
        >
          <motion.div
            variants={lineVariants}
            className='h-2 w-[90%] rounded-full bg-linear-to-r from-blue-600 to-blue-400'
            title='90%'
          ></motion.div>
        </motion.div>
      </div>
      {/* Express */}
      <div className='flex w-full flex-col gap-2'>
        <div className='flex justify-between'>
          <p>Communication</p>
          <p>90%</p>
        </div>
        <motion.div
          initial='offscreen'
          whileInView='onscreen'
          viewport={{ once: true, amount: 0.8 }}
          className='h-2 w-full overflow-hidden rounded-full bg-linear-to-t from-black to-gray-700'
        >
          <motion.div
            variants={lineVariants}
            className='h-2 w-[90%] rounded-full bg-linear-to-r from-green-500 to-lime-600'
            title='90%'
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
}
