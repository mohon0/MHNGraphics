"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useConversationMessages } from "@/hooks/use-conversation";
import { useAbly } from "@/hooks/useAbly";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

interface MessageListProps {
  conversationId: string;
}

export function MessageList({ conversationId }: MessageListProps) {
  const { data: session } = useSession();
  const { messages, isLoading } = useConversationMessages(conversationId);
  const { ably } = useAbly();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Subscribe to new messages
  useEffect(() => {
    if (!ably || !conversationId) return;

    const channel = ably.channels.get(`conversation:${conversationId}`);

    const onMessage = (message: any) => {
      const newMessage = message.data;

      // Only update if the message is from someone else
      if (newMessage.sender.id !== session?.user?.id) {
        queryClient.setQueryData(
          ["messages", conversationId],
          (oldData: any) => {
            if (!oldData) return { items: [newMessage], nextCursor: null };
            return {
              ...oldData,
              items: [...oldData.items, newMessage],
            };
          },
        );
      }
    };

    channel.subscribe("new-message", onMessage);

    return () => {
      channel.unsubscribe("new-message", onMessage);
    };
  }, [ably, conversationId, queryClient, session?.user?.id]);

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <Skeleton className="h-16 w-3/4" />
        <Skeleton className="ml-auto h-16 w-3/4" />
        <Skeleton className="h-16 w-3/4" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">
          No messages yet. Start the conversation!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((message: any) => {
        const isCurrentUser = message.sender.id === session?.user?.id;

        return (
          <div
            key={message.id}
            className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} max-w-[80%] gap-2`}
            >
              {!isCurrentUser && (
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={message.sender.image || ""}
                    alt={message.sender.name || ""}
                  />
                  <AvatarFallback>
                    {message.sender.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    isCurrentUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                <p
                  className={`mt-1 text-xs text-muted-foreground ${isCurrentUser ? "text-right" : "text-left"}`}
                >
                  {format(new Date(message.createdAt), "p")}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
