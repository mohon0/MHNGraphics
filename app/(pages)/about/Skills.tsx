'use client';
import { motion } from 'framer-motion';

const skills = [
  {
    name: 'Graphics Design',
    percentage: 90,
    color: 'from-blue-400 to-teal-300',
  },
  {
    name: 'Web Design',
    percentage: 89,
    color: 'from-yellow-500 to-orange-400',
  },
  { name: 'Adobe Muse', percentage: 97, color: 'from-blue-500 to-sky-400' },
  { name: 'Illustrator', percentage: 87, color: 'from-red-500 to-orange-600' },
  { name: 'Photoshop', percentage: 90, color: 'from-green-600 to-green-400' },
  { name: 'Video Editing', percentage: 90, color: 'from-blue-600 to-blue-400' },
  {
    name: 'Communication',
    percentage: 90,
    color: 'from-green-500 to-lime-600',
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: {
      width: 'var(--percentage)',
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div>
      <h3 className='mb-8 text-center text-2xl font-bold md:text-3xl'>
        Our Core Skills
      </h3>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='flex w-full flex-col items-center justify-center gap-6'
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            className='w-full'
          >
            <div className='flex justify-between font-medium'>
              <p>{skill.name}</p>
              <p>{skill.percentage}%</p>
            </div>
            <div className='mt-1 h-2 w-full rounded-full bg-secondary'>
              <motion.div
                variants={barVariants}
                style={
                  {
                    '--percentage': `${skill.percentage}%`,
                  } as React.CSSProperties
                }
                className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
