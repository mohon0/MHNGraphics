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
import { Mail } from "lucide-react";
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
                  ? "overflow-hidden text-white"
                  : "overflow-hidden text-black"
              }
            >
              <Button
                variant="ghost"
                className={`nav-gradient-border relative cursor-pointer overflow-hidden px-5 py-2.5 font-semibold ${
                  fixed
                    ? "text-white hover:text-white"
                    : "text-black hover:text-black"
                } bg-transparent hover:bg-transparent`}
              >
                Best Computer T.C.
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
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
