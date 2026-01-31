'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export default function DesktopMenu({
  fixed = false,
  best = false,
}: {
  fixed?: boolean;
  best?: boolean;
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList className='space-x-7 text-sm'>
        <NavigationMenuItem>
          <Link href='/' legacyBehavior passHref>
            <NavigationMenuLink
              className={fixed ? 'pl-2 text-white' : 'pl-2 text-foreground'}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href='https://www.oylkka.com'
            target='_blank'
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={
                fixed
                  ? 'pl-2 text-sm text-white'
                  : 'pl-2 text-sm text-foreground'
              }
            >
              Oylkka Shop
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/mhn-it' legacyBehavior passHref>
            <NavigationMenuLink
              className={
                fixed
                  ? 'pl-2 text-sm text-white'
                  : 'pl-2 text-sm text-foreground'
              }
            >
              Oylkka IT Agency
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href='/best-computer-training-center/blood-donate'
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={fixed ? 'pl-2 text-white' : 'pl-2 text-foreground'}
            >
              Blood Donate
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {!best && (
          <NavigationMenuItem>
            <Link
              href='/best-computer-training-center'
              className='overflow-hidden'
              legacyBehavior
              passHref
            >
              <NavigationMenuLink
                className={
                  fixed
                    ? 'overflow-hidden text-white'
                    : 'overflow-hidden text-black'
                }
              >
                <Button variant='secondary'>Oylkka IT & Training Center</Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none',
            className,
          )}
          {...props}
        >
          <div className='text-sm leading-none font-medium'>{title}</div>
          <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
