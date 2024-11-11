"use client";

import { productCategories } from "@/components/data/ProductCategory";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function DesktopMenu({ fixed = false }: { fixed?: boolean }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
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

        {/* Other Menu Items */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={fixed ? "text-white" : "text-black hover:text-black/80"}
          >
            Image
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-3 md:grid-cols-2">
              {productCategories
                .find((category) => category.value === "photos")
                ?.subcategories?.map((subcategory) => (
                  <ListItem
                    key={subcategory.value}
                    title={subcategory.label}
                    href={`/design?category=photos&subcategory=${subcategory.value}&query=&page=1`}
                  />
                ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={fixed ? "text-white" : "text-black hover:text-black/80"}
          >
            Icons
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-3 md:grid-cols-2">
              {productCategories
                .find((category) => category.value === "icons")
                ?.subcategories?.map((subcategory) => (
                  <ListItem
                    key={subcategory.value}
                    title={subcategory.label}
                    href={`/design?category=icons&subcategory=${subcategory.value}&query=&page=1`}
                  />
                ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={fixed ? "text-white" : "text-black hover:text-black/80"}
          >
            Template
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-3 md:grid-cols-2">
              {productCategories
                .find((category) => category.value === "templates")
                ?.subcategories?.map((subcategory) => (
                  <ListItem
                    key={subcategory.value}
                    title={subcategory.label}
                    href={`/design?category=templates&subcategory=${subcategory.value}&query=&page=1`}
                  />
                ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={fixed ? "text-white" : "text-black hover:text-black/80"}
          >
            Animation
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-3 md:grid-cols-2">
              {productCategories
                .find((category) => category.value === "animations")
                ?.subcategories?.map((subcategory) => (
                  <ListItem
                    key={subcategory.value}
                    title={subcategory.label}
                    href={`/design?category=animations&subcategory=${subcategory.value}&query=&page=1`}
                  />
                ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={fixed ? "text-white" : "text-black hover:text-black/80"}
          >
            Mockups
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-3 md:grid-cols-2">
              {productCategories
                .find((category) => category.value === "mockups")
                ?.subcategories?.map((subcategory) => (
                  <ListItem
                    key={subcategory.value}
                    title={subcategory.label}
                    href={`/design?category=mockups&subcategory=${subcategory.value}&query=&page=1`}
                  />
                ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={fixed ? "text-white" : "text-black hover:text-black/80"}
          >
            More
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] lg:grid-cols-3">
              {productCategories
                .find((category) => category.value === "textures")
                ?.subcategories?.map((subcategory) => (
                  <ListItem
                    key={subcategory.value}
                    title={subcategory.label}
                    href={`/design?category=textures&subcategory=${subcategory.value}&query=&page=1`}
                  />
                ))}
              {productCategories
                .find((category) => category.value === "patterns")
                ?.subcategories?.map((subcategory) => (
                  <ListItem
                    key={subcategory.value}
                    title={subcategory.label}
                    href={`/design?category=patterns&subcategory=${subcategory.value}&query=&page=1`}
                  />
                ))}
              {productCategories
                .find((category) => category.value === "3d-models")
                ?.subcategories?.map((subcategory) => (
                  <ListItem
                    key={subcategory.value}
                    title={subcategory.label}
                    href={`/design?category=3d-models&subcategory=${subcategory.value}&query=&page=1`}
                  />
                ))}
            </ul>
          </NavigationMenuContent>
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
