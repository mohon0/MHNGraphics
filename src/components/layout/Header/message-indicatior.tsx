"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BadgePulse } from "./badge-pulse";

interface MessageIndicatorProps {
  fixed?: boolean;
  count?: number;
}

export default function MessageIndicator({
  fixed = false,
  count = 3,
}: MessageIndicatorProps) {
  const [unreadCount, setUnreadCount] = useState(count);

  const markAsRead = (id: string) => {
    // In a real app, this would call an API to mark the message as read
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const messages = [
    {
      id: "1",
      sender: "John Doe",
      preview: "Hey, I wanted to discuss the project...",
      time: "2m ago",
      unread: true,
    },
    {
      id: "2",
      sender: "Sarah Smith",
      preview: "The design files are ready for review",
      time: "1h ago",
      unread: true,
    },
    {
      id: "3",
      sender: "Team Updates",
      preview: "New features have been deployed",
      time: "3h ago",
      unread: true,
    },
    {
      id: "4",
      sender: "System",
      preview: "Your account has been verified",
      time: "1d ago",
      unread: false,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative rounded-full transition-colors",
            fixed
              ? "text-white hover:bg-white/10"
              : "text-foreground hover:bg-muted",
          )}
        >
          <MessageSquare className="h-5 w-5" />
          {unreadCount > 0 && (
            <BadgePulse
              variant="default"
              animation="pulse"
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0"
            >
              {unreadCount}
            </BadgePulse>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Messages</span>
          <Link
            href="/messages"
            className="text-xs text-primary hover:underline"
          >
            View All
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {messages.map((message) => (
          <DropdownMenuItem
            key={message.id}
            className={cn(
              "flex cursor-pointer flex-col items-start gap-1 p-3",
              message.unread && "bg-muted/50",
            )}
            onClick={() => markAsRead(message.id)}
          >
            <div className="flex w-full justify-between">
              <span className="font-medium">{message.sender}</span>
              <span className="text-xs text-muted-foreground">
                {message.time}
              </span>
            </div>
            <p className="line-clamp-1 text-sm text-muted-foreground">
              {message.preview}
            </p>
            {message.unread && (
              <div className="flex w-full justify-end">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
              </div>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/messages/new"
            className="flex w-full justify-center text-primary hover:text-primary/80"
          >
            New Message
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
