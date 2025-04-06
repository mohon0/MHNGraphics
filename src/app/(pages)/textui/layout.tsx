import type React from "react";
import ChatSidebar from "./chat-sidebar";
import { conversations } from "./data";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background">
      {/* Chat sidebar - always visible in the layout */}
      <ChatSidebar
        conversations={conversations}
        className="w-full border-r md:w-80"
      />

      {/* Main content area - will be filled by page components */}
      <div className="h-full flex-1">{children}</div>
    </div>
  );
}
