"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import { useState } from "react";

interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    createdAt: string | Date;
    isRead?: boolean;
    sender: {
      id: string;
      name?: string | null;
      image?: string | null;
    };
  };
  isSelf: boolean;
  showAvatar?: boolean;
  isLast?: boolean;
}

export function MessageBubble({
  message,
  isSelf,
  showAvatar = true,
  isLast = false,
}: MessageBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group flex w-full gap-2",
        isSelf ? "ml-auto flex-row-reverse" : "",
        isSelf ? "max-w-[90%] sm:max-w-[75%]" : "max-w-[90%] sm:max-w-[75%]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isSelf && showAvatar ? (
        <Avatar className="h-8 w-8 self-end">
          <AvatarImage
            src={message.sender.image || ""}
            alt={message.sender.name || ""}
          />
          <AvatarFallback>
            {message.sender.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      ) : (
        !isSelf && <div className="w-8" />
      )}
      <div
        className={cn(
          "relative rounded-2xl px-4 py-2.5 shadow-xs",
          isSelf
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm bg-muted",
        )}
      >
        <p className="whitespace-pre-wrap break-words text-sm sm:text-base">
          {message.content}
        </p>
        <div
          className={cn(
            "mt-1 flex items-center gap-1 text-xs opacity-100 md:opacity-0 transition-opacity duration-200",
            isSelf ? "text-primary-foreground/70" : "text-muted-foreground",
            (isHovered || isLast) && "md:opacity-100",
          )}
        >
          <span>{format(new Date(message.createdAt), "h:mm a")}</span>
          {isSelf && (
            <span className="ml-1">
              {message.isRead ? (
                <CheckCheck className="h-3.5 w-3.5" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
