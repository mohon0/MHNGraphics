"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  className?: string;
}

export default function ChatSidebar({
  conversations,
  className,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const params = useParams();
  const currentConversationId = params?.conversationId as string;

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleConversationClick = (conversationId: string) => {
    router.push(`/messages/${conversationId}`);
  };

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="border-b p-4">
        <h2 className="mb-4 text-xl font-bold">Messages</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg p-3 transition-colors",
                currentConversationId === conversation.id
                  ? "bg-accent"
                  : "hover:bg-accent/50",
              )}
              onClick={() => handleConversationClick(conversation.id)}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage
                    src={conversation.avatar}
                    alt={conversation.name}
                  />
                  <AvatarFallback>
                    {conversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500"></span>
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between">
                  <span className="font-medium">{conversation.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {conversation.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="max-w-[140px] truncate text-sm text-muted-foreground">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread > 0 && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
