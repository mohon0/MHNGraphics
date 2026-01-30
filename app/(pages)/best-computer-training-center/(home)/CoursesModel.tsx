import { motion, type Variants } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import type React from 'react';
import { useState } from 'react';

// Define possible directions
type Direction = 'left' | 'right' | 'top' | 'bottom' | 'center';

interface props {
  img: StaticImageData;
  color: string;
  title: string;
}

export default function CoursesModel({ img, color, title }: props) {
  const [hoverDirection, setHoverDirection] = useState<Direction>('center');
  const [isHovered, setIsHovered] = useState(false);

  const determineHoverDirection = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    if (x < width / 3) return 'left';
    if (x > (width * 2) / 3) return 'right';
    if (y < height / 3) return 'top';
    if (y > (height * 2) / 3) return 'bottom';
    return 'center';
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    setHoverDirection(determineHoverDirection(e));
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoverDirection(determineHoverDirection(e));
    setIsHovered(false); // Trigger exit animation
  };

  // Variants for the animation
  const slideVariants: Variants = {
    left: { x: '-100%' },
    right: { x: '100%' },
    top: { y: '-100%' },
    bottom: { y: '100%' },
    center: { scale: 0, opacity: 0 },
    visible: { x: 0, y: 0, scale: 1, opacity: 1 },
  };

  return (
    <main
      className='group relative z-0 overflow-hidden rounded-lg border'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hover content with direction-based animation */}
      <motion.div
        className={`absolute inset-0 z-10 ${
          color === 'green'
            ? 'bg-primary-100'
            : color === 'blue'
              ? 'bg-primary-200'
              : color === 'yellow'
                ? 'bg-primary-300'
                : ''
        }`}
        key={hoverDirection} // Key prop to re-render when hoverDirection changes
        variants={slideVariants}
        initial={isHovered ? hoverDirection : 'visible'} // Handle direction on enter
        animate={isHovered ? 'visible' : hoverDirection} // Animate to visible state or exit based on hover state
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div className='flex h-full flex-col items-center justify-between px-6 py-10'>
          <div className='space-y-4 text-white'>
            <div className='text-2xl'>{title}</div>
            {/* <div className="text-thin text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
              deleniti?
            </div> */}
          </div>
          <div className='flex gap-5'>
            <button
              type='button'
              className='hover:bg-primary-300 rounded border bg-white p-2 text-sm font-bold text-orange-600 shadow-lg transition-all duration-300 hover:text-white'
            >
              আরও জানুন
            </button>
            <button
              type='button'
              className='hover:bg-primary-300 rounded border bg-white p-2 text-sm font-bold text-orange-600 shadow-lg transition-all duration-300 hover:text-white'
            >
              এখন কিনুন
            </button>
          </div>
        </div>
      </motion.div>
      <div className='relative'>
        <Image src={img} alt='Course Image' className='w-full object-cover' />
        <div
          className={`absolute bottom-0 w-full p-4 text-sm text-white md:text-2xl ${
            color === 'green'
              ? 'bg-primary-100'
              : color === 'blue'
                ? 'bg-primary-200'
                : color === 'yellow'
                  ? 'bg-primary-300'
                  : ''
          } `}
        >
          {title}
        </div>
      </div>
    </main>
  );
}
