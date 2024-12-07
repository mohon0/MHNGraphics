"use client";

import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface ComingSoonBadgeProps {
  children: React.ReactNode;
}

export default function DesktopMenu({ fixed = false }: { fixed?: boolean }) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-7 text-sm">
        <NavigationMenuItem>
          <Link
            href="/design?category=all&query=&page=1"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={fixed ? "pl-2 text-white" : "pl-2 text-black"}
            >
              Design
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href="/design?category=photos&query=&page=1"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={fixed ? "pl-2 text-white" : "pl-2 text-black"}
            >
              Photos
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href="/design?category=icons&query=&page=1"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={fixed ? "pl-2 text-white" : "pl-2 text-black"}
            >
              Icons
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href="/design?category=template&query=&page=1"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={fixed ? "pl-2 text-white" : "pl-2 text-black"}
            >
              Template
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/design?category=animation&query=&page=1"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={fixed ? "pl-2 text-white" : "pl-2 text-black"}
            >
              Animation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/design?category=mockups&query=&page=1"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={fixed ? "pl-2 text-white" : "pl-2 text-black"}
            >
              Mockup
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/shop" legacyBehavior passHref>
            <NavigationMenuLink
              className={
                fixed ? "pl-2 text-sm text-white" : "pl-2 text-sm text-black"
              }
            >
              MHN Shop
            </NavigationMenuLink>
          </Link>
          <Badge
            variant="secondary"
            className="ml-1 animate-bounce px-1 py-0 text-[10px] text-black"
          >
            Soon
          </Badge>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/mhn-it" legacyBehavior passHref>
            <NavigationMenuLink
              className={
                fixed ? "pl-2 text-sm text-white" : "pl-2 text-sm text-black"
              }
            >
              MHN IT
            </NavigationMenuLink>
          </Link>
          <Badge
            variant="secondary"
            className="ml-1 animate-bounce px-1 py-0 text-[10px] text-black delay-75"
          >
            Soon
          </Badge>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
