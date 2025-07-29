'use client';

import Link from 'next/link';

interface LogoProps {
  fixed?: boolean;
  className?: string;
}

export default function Logo({ fixed = false, className = '' }: LogoProps) {
  return (
    <Link
      href='/'
      className={`group flex items-center space-x-1 transition-all duration-300 sm:space-x-2 md:space-x-3 ${className}`}
    >
      {/* Abstract shapes - responsive sizing */}
      <div className='relative h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8'>
        <div
          className={`absolute left-0 top-0 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ${
            fixed ? 'bg-white' : 'bg-gray-900'
          } transform transition-all duration-300 group-hover:rotate-45 group-hover:bg-red-500`}
        ></div>
        <div
          className={`absolute bottom-0 right-0 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ${
            fixed ? 'bg-white' : 'bg-gray-900'
          } transform rounded-full transition-all duration-300 group-hover:scale-125 group-hover:bg-blue-500`}
        ></div>
        <div
          className={`absolute right-1.5 top-1.5 h-3 w-1.5 sm:right-2 sm:top-2 sm:h-3.5 sm:w-1.5 md:right-2 md:top-2 md:h-4 md:w-2 ${
            fixed ? 'bg-white' : 'bg-gray-900'
          } transform transition-all duration-300 group-hover:rotate-90 group-hover:bg-green-500`}
        ></div>
      </div>

      {/* Responsive text */}
      <div className='flex flex-col sm:flex-row sm:items-baseline sm:space-x-1 md:space-x-2'>
        <span
          className={`text-lg font-bold leading-tight sm:text-xl md:text-xl ${fixed ? 'text-white' : 'text-gray-900'} transition-all duration-300`}
        >
          Oylkka
        </span>
        <span
          className={`text-xs leading-tight sm:text-sm md:text-sm ${fixed ? 'text-gray-300' : 'text-gray-600'} transition-all duration-300`}
        >
          Graphics
        </span>
      </div>
    </Link>
  );
}
