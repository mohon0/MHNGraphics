"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useConversations } from "@/hooks/use-conversation";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar({ className }: { className?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const params = useParams();
  const currentConversationId = params?.conversationId as string;
  const { conversations, isLoading } = useConversations();
  const { data: session } = useSession();

  const handleConversationClick = (conversationId: string) => {
    router.push(`/messages/${conversationId}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!conversations || conversations.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground">No conversations yet</p>
      </div>
    );
  }

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="border-b p-4">
        <h2 className="mb-4 text-xl font-bold">Messages</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {conversations.map((conversation: any) => {
            const { id, otherUser, lastMessage } = conversation;
            const isActive = currentConversationId === id;

            return (
              <button
                key={id}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg p-3 transition-colors",
                  isActive ? "bg-accent" : "hover:bg-accent/50",
                )}
                onClick={() => handleConversationClick(id)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage
                      src={otherUser.image || ""}
                      alt={otherUser.name || ""}
                    />
                    <AvatarFallback>
                      {otherUser.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {otherUser.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500"></span>
                  )}
                </div>

                <div className="flex-1 text-left">
                  <div className="flex justify-between">
                    <span className="font-medium">{otherUser.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {lastMessage?.createdAt
                        ? formatDistanceToNow(new Date(lastMessage.createdAt), {
                            addSuffix: true,
                          })
                        : ""}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="max-w-[140px] truncate text-sm text-muted-foreground">
                      {lastMessage
                        ? `${session?.user?.id === lastMessage.senderId ? "You: " : ""}${lastMessage.content}`
                        : "No message yet"}
                    </p>
                    {lastMessage &&
                      lastMessage.senderId !== session?.user?.id &&
                      !lastMessage.isRead && (
                        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          1
                        </span>
                      )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
