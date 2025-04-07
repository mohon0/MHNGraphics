"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { MessageSquare } from "lucide-react";
import Sidebar from "./conversation-sidebar";

export default function MessagesPage() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <Sidebar className="h-full w-full" />;
  }

  return (
    <div className="flex h-full flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <MessageSquare className="h-12 w-12 text-primary" />
        </div>
        <h2 className="mb-2 text-2xl font-bold">Your Messages</h2>
        <p className="mb-4 text-muted-foreground">
          Select a conversation from the sidebar to view your messages or start
          a new conversation.
        </p>
      </div>
    </div>
  );
}
