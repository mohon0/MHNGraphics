"use client";

import { markMessagesAsSeen } from "@/actions/messages";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConversationSocket } from "@/hooks/use-conversation-socket";
import type { FullMessageType } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import MessageBox from "./message-box";

interface MessageListProps {
  initialMessages: FullMessageType[];
  conversationId: string;
}

export default function MessageList({
  initialMessages = [],
  conversationId,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading } = useConversationSocket(
    conversationId,
    initialMessages,
  );

  // Scroll to bottom function
  const scrollToBottom = (smooth = true) => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end",
      });
    }
  };

  // Mark messages as seen when the component mounts or messages change
  useEffect(() => {
    const markSeen = async () => {
      try {
        await markMessagesAsSeen(conversationId);
      } catch (error) {
        console.error("Error marking messages as seen:", error);
        toast.error("Failed to mark messages as seen");
      }
    };

    markSeen();
  }, [conversationId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Group messages by date for display
  const groupedMessages = messages.reduce(
    (groups: Record<string, FullMessageType[]>, message) => {
      const date = new Date(message.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    },
    {},
  );

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 overflow-y-auto px-4">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className="mb-6">
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-xs text-muted-foreground">
                {date === new Date().toLocaleDateString() ? "Today" : date}
              </span>
            </div>
          </div>

          {dateMessages.map((message, i) => (
            <MessageBox
              isLast={i === dateMessages.length - 1}
              key={message.id}
              data={message}
            />
          ))}
        </div>
      ))}
      {messages.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <p className="text-center text-muted-foreground">
            No messages yet. Start the conversation!
          </p>
        </div>
      )}
      <div className="h-4" ref={bottomRef} />
    </ScrollArea>
  );
}
