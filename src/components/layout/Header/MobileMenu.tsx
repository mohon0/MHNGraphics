"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { productCategories } from "@/components/data/ProductCategory";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
            <Accordion type="single" collapsible className="w-full">
              {productCategories.map((category) => (
                <AccordionItem value={category.value} key={category.value}>
                  <AccordionTrigger className="px-6 py-3 text-sm font-medium">
                    {category.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 px-6 py-2">
                      {category.subcategories?.map((subcategory) => (
                        <Link
                          key={subcategory.value}
                          href={`/design?category=${category.value}&subcategory=${subcategory.value}&query=&page=1`}
                          className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          onClick={() => setOpen(false)}
                        >
                          {subcategory.label}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Link href="/pricing" className="px-6 py-4 text-primary">
              Pricing
            </Link>
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
