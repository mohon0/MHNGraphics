import getCurrentUser from "@/actions/get-current-user";
import Sidebar from "./sidebar";
import { AblyClientProvider } from "@/lib/ably-client";
import { redirect } from "next/navigation";
import type React from "react";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/login");
  }

  return (
    <AblyClientProvider>
      <div className="h-full">
        <div className="flex h-full">
          <Sidebar currentUser={currentUser} />
          <div className="h-full flex-1">{children}</div>
        </div>
      </div>
    </AblyClientProvider>
  );
}
