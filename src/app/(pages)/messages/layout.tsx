import { authOptions } from "@/app/api/auth/[...nextauth]/Options";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/footer/Footer";
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
      <Header />
      <div className="flex h-[90vh] w-full bg-background">
        <Sidebar className="w-full border-r md:w-80" />
        <div className="h-full flex-1">{children}</div>
      </div>
      <Footer />
    </>
  );
}
