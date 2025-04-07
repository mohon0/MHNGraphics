import { authOptions } from "@/app/api/auth/[...nextauth]/Options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import Sidebar from "./conversation-sidebar";

interface MessagesLayoutProps {
  children: ReactNode;
}

export default async function MessagesLayout({
  children,
}: MessagesLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex h-[calc(100vh-9rem)] w-full flex-col bg-background md:flex-row">
        <div className="hidden h-full border-r md:block md:w-80">
          <Sidebar className="h-full w-full" />
        </div>
        <div className="h-full flex-1">{children}</div>
      </div>
    </>
  );
}
