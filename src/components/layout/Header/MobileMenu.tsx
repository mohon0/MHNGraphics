"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileMenu({ fixed = false }: { fixed?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu className={fixed ? "h-6 w-6 text-white" : "h-6 w-6 text-black"} />
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0 sm:w-[400px]">
        <SheetHeader className="border-b p-6 text-left">
          <SheetTitle className="text-2xl font-bold">MHN Graphics</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <nav className="flex flex-col gap-3 p-6">
            <Link href="/">Home</Link>

            <Link href="/shop" legacyBehavior passHref>
              <div>
                MHN Shop
                <Badge
                  variant="secondary"
                  className="ml-1 animate-bounce px-1 py-0 text-[10px] text-black delay-75"
                >
                  Soon
                </Badge>
              </div>
            </Link>
            <Link href="/mhn-it" legacyBehavior passHref>
              <div>
                MHN IT Agency
                <Badge
                  variant="secondary"
                  className="ml-1 animate-bounce px-1 py-0 text-[10px] text-black delay-75"
                >
                  Soon
                </Badge>
              </div>
            </Link>
            <Link href="/best-computer-training-center/blood-donate">
              Blood Donate
            </Link>
            <Link href="/best-computer-training-center">
              Best Computer T.C.
            </Link>
            <Link href="/pricing">Pricing</Link>
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
