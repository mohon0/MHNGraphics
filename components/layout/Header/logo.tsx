'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png';

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
      {/* Responsive text */}
      <Image src={logo} alt='logo' width={40} height={40} />
      <div className='flex flex-col sm:flex-row sm:items-baseline sm:space-x-1 md:space-x-2'>
        <span
          className={`text-lg font-bold leading-tight sm:text-xl md:text-xl ${fixed ? 'text-white' : 'dark:text-foreground'} transition-all duration-300`}
        >
          Oylkka IT
        </span>
      </div>
    </Link>
  );
}
