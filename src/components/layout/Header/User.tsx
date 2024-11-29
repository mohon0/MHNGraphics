"use client";
import Logout from "@/components/common/Logout";
import LoadingSpinner from "@/components/common/skeleton/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function User({ fixed = false }: { fixed?: boolean }) {
  const { status, data: session } = useSession();

  return (
    <>
      {status === "loading" ? (
        <LoadingSpinner />
      ) : status === "authenticated" && session.user ? (
        <Menubar className="border-none bg-transparent p-0">
          <MenubarMenu>
            <MenubarTrigger className="rounded-full p-0">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                  width={50}
                  height={50}
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                  <FaUser size={16} />
                </div>
              )}
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="font-bold">
                {session.user.name}
              </MenubarItem>
              <MenubarSeparator />
              <Link href="/dashboard">
                <MenubarItem>Dashboard</MenubarItem>
              </Link>
              <Link href="/edit-profile">
                <MenubarItem>Edit Account</MenubarItem>
              </Link>
              <Link href={`/profile?id=${session.user.id}`}>
                <MenubarItem>Account Details</MenubarItem>
              </Link>
              <MenubarSeparator />

              <Logout />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ) : (
        <Link href="/sign-in">
          <Button variant={fixed ? "secondary" : "default"}>Sign In</Button>
        </Link>
      )}
    </>
  );
}
