'use client';

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
          <NavigationMenuLink
            href='/'
            className={fixed ? 'pl-2 text-white' : 'pl-2 text-foreground'}
          >
            Home
          </NavigationMenuLink>
          -
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            target='_blank'
            href='https://www.oylkka.com'
            className={
              fixed ? 'pl-2 text-sm text-white' : 'pl-2 text-sm text-foreground'
            }
          >
            Oylkka Shop
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href='/mhn-it'
            className={
              fixed ? 'pl-2 text-sm text-white' : 'pl-2 text-sm text-foreground'
            }
          >
            Oylkka IT Agency
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href='/oylkka-it-and-training-center/blood-donate'
            className={fixed ? 'pl-2 text-white' : 'pl-2 text-foreground'}
          >
            Blood Donate
          </NavigationMenuLink>
        </NavigationMenuItem>

        {!best && (
          <NavigationMenuItem>
            <NavigationMenuLink
              href='/oylkka-it-and-training-center'
              className={
                fixed
                  ? 'overflow-hidden text-white'
                  : 'overflow-hidden text-black'
              }
            >
              <Button variant='secondary'>Oylkka IT & Training Center</Button>
            </NavigationMenuLink>
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
