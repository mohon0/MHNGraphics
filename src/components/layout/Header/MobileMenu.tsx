"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const menuItems = [
  { href: "/about", label: "About Me" },
  { href: "/design", label: "Design" },
  { href: "/blood-bank", label: "Blood Bank" },
  { href: "/best-computer", label: "Best Computer T.C." },
  { href: "/login", label: "Login" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="h-full w-full">
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-10 w-10" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] p-0 sm:w-[400px]">
        <SheetHeader className="border-b p-6 text-left">
          <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
        </SheetHeader>
        <nav className="p-6">
          <ul className="space-y-4">
            <AnimatePresence>
              {menuItems.map((item) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className={`block py-2 text-lg transition-colors hover:text-primary ${
                      pathname === item.href
                        ? "font-semibold text-primary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
