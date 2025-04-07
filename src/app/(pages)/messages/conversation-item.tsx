"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { usePresence } from "@/hooks/use-presence";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ConversationItemProps {
  conversation: {
    id: string;
    otherUser: {
      id: string;
      name?: string | null;
      image?: string | null;
      email?: string | null;
    };
    lastMessage?: {
      id: string;
      content: string;
      createdAt: string | Date;
      senderId: string;
      isRead: boolean;
    } | null;
    updatedAt: string | Date;
  };
  isActive?: boolean;
  onClick?: () => void;
}

export function ConversationItem({
  conversation,
  isActive = false,
  onClick,
}: ConversationItemProps) {
  const { data: session } = useSession();
  const { getUserStatus } = usePresence();
  const { otherUser, lastMessage } = conversation;
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState<Date | null>(null);

  const isUnread =
    lastMessage &&
    !lastMessage.isRead &&
    lastMessage.senderId !== session?.user?.id;

  // Fetch and subscribe to user's online status
  useEffect(() => {
    if (!otherUser?.id) return;

    // Initial fetch
    const fetchStatus = async () => {
      const status = await getUserStatus(otherUser.id);
      if (status) {
        setIsOnline(status.isOnline);
        setLastSeen(status.lastSeen || null);
      }
    };

    fetchStatus();

    // Set up interval to refresh status
    const intervalId = setInterval(fetchStatus, 60000); // Every minute

    return () => clearInterval(intervalId);
  }, [otherUser?.id, getUserStatus]);

  return (
    <button
      className={cn(
        "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors",
        isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
        isUnread && "font-medium",
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-12 w-12 border shadow-sm">
          <AvatarImage src={otherUser.image || ""} alt={otherUser.name || ""} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {otherUser.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        {isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500"></span>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between">
          <span className={cn("truncate", isUnread && "font-semibold")}>
            {otherUser.name}
          </span>
          <span
            className={cn(
              "shrink-0 text-xs",
              isUnread ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {lastMessage?.createdAt
              ? formatDistanceToNow(new Date(lastMessage.createdAt), {
                  addSuffix: false,
                })
              : ""}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p
            className={cn(
              "truncate text-sm",
              isUnread ? "text-foreground" : "text-muted-foreground",
              "max-w-[180px] sm:max-w-[140px]", // Wider on mobile
            )}
          >
            {lastMessage
              ? `${session?.user?.id === lastMessage.senderId ? "You: " : ""}${lastMessage.content}`
              : !isOnline && lastSeen
                ? `Last seen ${formatDistanceToNow(lastSeen, { addSuffix: true })}`
                : "No messages yet"}
          </p>
          {isUnread && (
            <Badge
              variant="default"
              className="h-5 min-w-[20px] rounded-full px-1.5"
            >
              1
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}
