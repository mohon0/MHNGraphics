import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DesktopMenu from './DesktopMenu';
import Logo from './logo';
import MobileMenu from './MobileMenu';
import User from './User';

export default function Header({
  fixed = false,
  best = false,
}: {
  fixed?: boolean;
  best?: boolean;
}) {
  return (
    <header
      className={`${
        fixed ? 'absolute' : 'relative border-b'
      } top-0 z-50 flex h-14 w-full items-center transition-transform duration-500 ease-in-out`}
    >
      <div className='flex w-full items-center justify-between px-2 py-4 md:px-10'>
        {/* Mobile Menu Icon for Smaller Screens */}
        <div className='flex items-center gap-4 md:gap-10'>
          <div className='lg:hidden'>
            <MobileMenu fixed={fixed} />{' '}
            {/* Render the MobileMenu component here */}
          </div>
          {/* Logo */}
          <Logo fixed={fixed} />
        </div>

        {/* Call to Action & Social Media for Desktop */}
        <div className='flex items-center gap-4'>
          {/* Call to Action Button */}
          {/* Desktop Navigation */}
          <div className='hidden lg:block'>
            <DesktopMenu fixed={fixed} best={best} />
          </div>
          {best && (
            <Link
              href='/best-computer-training-center/application'
              className='hidden md:block'
            >
              <Button
                className={`${fixed ? 'border bg-transparent hover:bg-transparent' : 'border border-primary bg-secondary text-primary hover:bg-secondary'}`}
              >
                Apply Now
              </Button>
            </Link>
          )}
          <User fixed={fixed} />
        </div>
      </div>
    </header>
  );
}
