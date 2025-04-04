"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import useOtherUser from "@/hooks/use-other-user";
import { cn } from "@/lib/utils";
import type { FullConversationType } from "@/types";
import { format } from "date-fns";
import { Check, CheckCheck, ImageIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

export default function ConversationBox({
  data,
  selected,
}: ConversationBoxProps) {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/messages/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[0]; // First message is the latest due to orderBy desc
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.some((user) => user.email === userEmail);
  }, [userEmail, lastMessage]);

  const isOwn = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    return lastMessage.sender.email === userEmail;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  // Calculate how long ago the message was sent
  const timeAgo = useMemo(() => {
    if (!lastMessage?.createdAt) return "";

    const now = new Date();
    const messageDate = new Date(lastMessage.createdAt);
    const diffInHours =
      (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24 && messageDate.getDate() === now.getDate()) {
      return format(messageDate, "p"); // Today, show time
    } else if (
      diffInHours < 48 &&
      now.getDate() - messageDate.getDate() === 1
    ) {
      return "Yesterday";
    } else if (diffInHours < 168) {
      // Within a week
      return format(messageDate, "EEEE"); // Day name
    } else {
      return format(messageDate, "MMM d"); // Month and day
    }
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 transition-all",
        selected ? "bg-muted" : "hover:bg-muted/50",
        !hasSeen && !isOwn && "bg-primary/5",
      )}
    >
      <div className="relative">
        <Avatar className="h-12 w-12 border-2 border-primary/10">
          <AvatarImage src={otherUser?.image || "/placeholder.svg"} />
          <AvatarFallback>{otherUser?.name?.charAt(0) || "?"}</AvatarFallback>
        </Avatar>
        {data.isGroup && (
          <Badge
            variant="outline"
            className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-primary p-0 text-[10px] text-primary-foreground"
          >
            {data.users.length}
          </Badge>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p
            className={cn(
              "truncate text-sm font-medium",
              !hasSeen && !isOwn && "font-semibold text-primary",
            )}
          >
            {data.name || otherUser?.name}
          </p>
          {lastMessage?.createdAt && (
            <p className="whitespace-nowrap text-xs text-muted-foreground">
              {timeAgo}
            </p>
          )}
        </div>

        <div className="mt-1 flex items-center gap-1">
          {isOwn && (
            <div className="mr-1 flex-shrink-0">
              {hasSeen ? (
                <CheckCheck className="h-3 w-3 text-primary" />
              ) : (
                <Check className="h-3 w-3 text-muted-foreground" />
              )}
            </div>
          )}

          {lastMessage?.image && (
            <ImageIcon className="mr-1 h-3 w-3 flex-shrink-0 text-muted-foreground" />
          )}

          <p
            className={cn(
              "truncate text-xs",
              hasSeen ? "text-muted-foreground" : "text-foreground",
              !hasSeen && !isOwn && "font-medium text-primary",
            )}
          >
            {isOwn ? `You: ${lastMessageText}` : lastMessageText}
          </p>

          {!hasSeen && !isOwn && (
            <span className="ml-auto flex h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
          )}
        </div>
      </div>
    </div>
  );
}
