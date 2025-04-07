"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useConversations } from "@/hooks/use-conversation";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function ConversationList() {
  const router = useRouter();
  const { data: session } = useSession();
  const { conversations, isLoading } = useConversations();

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground">No conversations yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conversation: any) => {
        const { id, otherUser, lastMessage } = conversation;

        return (
          <Button
            key={id}
            variant="ghost"
            className="h-auto w-full justify-start px-2 py-6"
            onClick={() => router.push(`/messages/${id}`)}
          >
            <div className="flex w-full items-center">
              <Avatar className="mr-4 h-10 w-10">
                <AvatarImage
                  src={otherUser.image || ""}
                  alt={otherUser.name || ""}
                />
                <AvatarFallback>
                  {otherUser.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="font-medium">{otherUser.name}</p>
                {lastMessage && (
                  <div className="flex w-full items-center justify-between">
                    <p className="max-w-[150px] truncate text-sm text-muted-foreground">
                      {session?.user?.id === lastMessage.senderId
                        ? "You: "
                        : ""}
                      {lastMessage.content}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(lastMessage.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
