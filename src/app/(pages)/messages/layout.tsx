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
    <div className="flex h-screen w-full bg-background">
      {/* Chat sidebar - always visible in the layout */}
      <Sidebar className="w-full border-r md:w-80" />

      {/* Main content area - will be filled by page components */}
      <div className="h-full flex-1">{children}</div>
    </div>
  );
}
