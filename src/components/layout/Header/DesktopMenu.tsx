"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function DesktopMenu({
  fixed = false,
}: {
  fixed?: boolean;
  best?: boolean;
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-7 text-sm">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={fixed ? "pl-2 text-white" : "pl-2 text-black"}
            >
              Home
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
              Oylkka Shop
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
              Oylkka IT Agency
            </NavigationMenuLink>
          </Link>
          <Badge
            variant="secondary"
            className="ml-1 animate-bounce px-1 py-0 text-[10px] text-black delay-75"
          >
            Soon
          </Badge>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href="/best-computer-training-center/blood-donate"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={fixed ? "pl-2 text-white" : "pl-2 text-black"}
            >
              Blood Donate
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link
            href="/best-computer-training-center"
            className="overflow-hidden"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={
                fixed
                  ? "overflow-hidden pl-2 text-white"
                  : "overflow-hidden pl-2 text-black"
              }
            >
              <Button
                variant="ghost"
                className={
                  fixed
                    ? "overflow-hidden pl-2 text-white hover:bg-transparent hover:text-white"
                    : "overflow-hidden pl-2 text-black hover:bg-transparent hover:text-black"
                }
              >
                <span className="hover:shadow-cyanshadow relative overflow-hidden px-4 py-1.5 duration-300">
                  <span className="absolute left-0 top-0 block h-0.5 w-full animate-animate1 bg-primary-100"></span>
                  <span className="absolute right-0 block h-full w-0.5 animate-animate2 bg-primary-100"></span>
                  <span className="absolute bottom-0 right-0 block h-0.5 w-full animate-animate3 bg-primary-100"></span>
                  <span className="absolute -bottom-6 left-0 block h-full w-0.5 animate-animate4 bg-primary-100"></span>
                  Best Computer T.C.
                </span>
              </Button>
            </NavigationMenuLink>
          </Link>
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
