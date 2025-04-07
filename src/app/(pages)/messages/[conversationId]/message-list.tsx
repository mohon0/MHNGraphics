"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useConversationMessages } from "@/hooks/use-conversation";
import { useAbly } from "@/hooks/useAbly";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { MoreVertical, Paperclip, Search, Send, Smile } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

interface MessageListProps {
  conversationId: string;
}

export default function ConversationPage({ conversationId }: MessageListProps) {
  const { data: session } = useSession();
  const { messages, isLoading } = useConversationMessages(conversationId);
  const { ably } = useAbly();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage, isSending } = useConversationMessages(conversationId);

  const [message, setMessage] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!ably || !conversationId) return;

    const channel = ably.channels.get(`conversation:${conversationId}`);

    const onMessage = (message: any) => {
      const newMessage = message.data;

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
  }, [ably, conversationId, session?.user?.id, queryClient]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        {/* <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={conversation.avatar} alt={conversation.name} />
            <AvatarFallback>
              {conversation.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{conversation.name}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {conversation.online ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Online
                </>
              ) : (
                "Offline"
              )}
            </div>
          </div>
        </div> */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More</span>
          </Button>
        </div>
      </div>
      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <>
              <Skeleton className="h-16 w-3/4" />
              <Skeleton className="ml-auto h-16 w-3/4" />
              <Skeleton className="h-16 w-3/4" />
            </>
          ) : messages.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((msg: any) => {
              const isSelf = msg.sender.id === session?.user?.id;
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex max-w-[80%] gap-2",
                    isSelf ? "flex-row-reverse self-end" : "self-start",
                  )}
                >
                  {!isSelf && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={msg.sender.image || ""}
                        alt={msg.sender.name || ""}
                      />
                      <AvatarFallback>
                        {msg.sender.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "rounded-lg p-3",
                      isSelf
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    <p>{msg.content}</p>
                    <div
                      className={cn(
                        "mt-1 text-xs",
                        isSelf
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground",
                      )}
                    >
                      {format(new Date(msg.createdAt), "p")}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
            disabled={isSending || !message.trim()}
          >
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach</span>
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
          >
            <Smile className="h-5 w-5" />
            <span className="sr-only">Emoji</span>
          </Button>
          <Button type="submit" size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
