import { authOptions } from "@/app/api/auth/[...nextauth]/Options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

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

  return <div className="h-full">{children}</div>;
}
