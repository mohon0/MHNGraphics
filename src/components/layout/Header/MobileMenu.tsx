"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { productCategories } from "@/components/data/ProductCategory";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6 text-background" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0 sm:w-[400px]">
        <SheetHeader className="border-b p-6 text-left">
          <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <nav>
            {productCategories.map((category) => (
              <Link
                href={`/design?category=${category.value}&query=&page=1`}
                key={category.value}
              >
                <p className="px-6 py-3 text-sm font-medium">
                  {category.label}
                </p>
              </Link>
            ))}

            <Link href="/pricing" className="px-6 py-4 text-primary">
              Pricing
            </Link>
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
