"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useConversationMessages } from "@/hooks/use-conversation";
import { useAbly } from "@/hooks/useAbly";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { JSX, useEffect, useRef, useState } from "react";
import { EmptyState } from "../empty-state";
import { ChatHeader } from "./chat-header";
import { MessageBubble } from "./message-bubble";
import { MessageInput } from "./message-input";
import { TypingIndicator } from "./typing-indicator";

interface MessageListProps {
  conversationId: string;
}

export default function MessageList({ conversationId }: MessageListProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { messages, isLoading, sendMessage, isSending, markAsRead } =
    useConversationMessages(conversationId);
  const { ably, publishTypingIndicator, subscribeToTyping } = useAbly();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
  const [otherUser, setOtherUser] = useState<any>(null);

  // Get conversation details to show in header
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await fetch(
          `/api/chat/conversation?conversationId=${conversationId}`,
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);

          // Assuming the first item in the array is the relevant conversation
          const conversation = data[0]; // If there's more than one conversation, adjust accordingly
          const other = conversation?.otherUser; // Extract the other user
          console.log("Other User:", other);
          setOtherUser(other || null); // If no other user, set it to null
        }
      } catch (error) {
        console.error("Failed to fetch conversation:", error);
      }
    };

    if (conversationId && session?.user?.id) {
      fetchConversation();
    }
  }, [conversationId, session?.user?.id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  // Mark messages as read when they appear in the view
  useEffect(() => {
    if (!session?.user?.id || !messages.length) return;

    const unreadMessages = messages
      .filter((msg: any) => !msg.isRead && msg.sender.id !== userId)
      .map((msg: any) => msg.id);

    if (unreadMessages.length > 0) {
      markAsRead(unreadMessages);
    }
  }, [messages, session?.user?.id, markAsRead]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!ably || !conversationId) return;

    // Subscribe to new messages
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

        // Mark the message as read immediately if the chat is open
        markAsRead([newMessage.id]);
      }
    };

    channel.subscribe("new-message", onMessage);

    // Subscribe to typing indicators
    const unsubscribeTyping = subscribeToTyping(
      conversationId,
      (isTyping, userId) => {
        if (userId !== session?.user?.id) {
          setIsOtherUserTyping(isTyping);
        }
      },
    );

    return () => {
      channel.unsubscribe("new-message", onMessage);
      unsubscribeTyping();
    };
  }, [
    ably,
    conversationId,
    session?.user?.id,
    queryClient,
    markAsRead,
    subscribeToTyping,
  ]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    sendMessage(content);

    // Indicate that user stopped typing
    publishTypingIndicator(conversationId, false);
  };

  const handleTyping = () => {
    publishTypingIndicator(conversationId, true);

    // Automatically set typing to false after 3 seconds of inactivity
    setTimeout(() => {
      publishTypingIndicator(conversationId, false);
    }, 3000);
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: Record<string, any[]> = {};

    messages.forEach((message: any) => {
      const date = new Date(message.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate();

  // Group consecutive messages from the same sender
  const renderMessages = (messagesGroup: any[]) => {
    const result: JSX.Element[] = [];

    messagesGroup.forEach((message, index) => {
      const isSelf = message.sender.id === session?.user?.id;
      const prevMessage = index > 0 ? messagesGroup[index - 1] : null;
      const nextMessage =
        index < messagesGroup.length - 1 ? messagesGroup[index + 1] : null;

      // Show avatar only for the last message in a sequence from the same sender
      const showAvatar =
        !nextMessage || nextMessage.sender.id !== message.sender.id;
      const isLast = index === messagesGroup.length - 1;

      result.push(
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-2"
        >
          <MessageBubble
            message={message}
            isSelf={isSelf}
            showAvatar={showAvatar}
            isLast={isLast}
          />
        </motion.div>,
      );
    });

    return result;
  };

  if (isLoading) {
    return (
      <div className="flex h-full flex-col">
        <ChatHeader isLoading />
        <div className="flex-1 p-4">
          <div className="space-y-4">
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="ml-auto h-16 w-3/4" />
            <Skeleton className="h-16 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <ChatHeader user={otherUser} />

      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <EmptyState
            title="No messages yet"
            description="Start the conversation by sending a message."
            showNewChatButton={false}
          />
        ) : (
          <div className="flex flex-col gap-6">
            {Object.entries(messageGroups).map(([date, messagesGroup]) => (
              <div key={date} className="space-y-2">
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="mx-4 flex-shrink-0 text-xs text-muted-foreground">
                    {new Date(date).toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <div className="flex-grow border-t border-border"></div>
                </div>
                {renderMessages(messagesGroup)}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {isOtherUserTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-2"
            >
              <TypingIndicator isTyping={isOtherUserTyping} />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </ScrollArea>

      <MessageInput
        onSend={handleSendMessage}
        isSending={isSending}
        onTyping={handleTyping}
      />
    </div>
  );
}
