"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useConversationMessages } from "@/hooks/use-conversation";
import { useAbly } from "@/hooks/useAbly";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { type JSX, useEffect, useRef, useState } from "react";
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
  const [otherUser, setOtherUser] = useState<any>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const prevMessagesLengthRef = useRef(0);

  // Get conversation details to show in header
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await fetch(
          `/api/chat/conversation?conversationId=${conversationId}`,
        );
        if (response.ok) {
          const data = await response.json();

          // Find the specific conversation that matches the conversationId
          const conversation = data.find(
            (conv: any) => conv.id === conversationId,
          );

          if (conversation) {
            const other = conversation.otherUser; // Extract the other user
            setOtherUser(other || null); // If no other user, set it to null
          } else {
            setOtherUser(null);
            console.error("Conversation not found:", conversationId);
          }
        }
      } catch (error) {
        console.error("Failed to fetch conversation:", error);
      }
    };

    if (conversationId && session?.user?.id) {
      fetchConversation();
    }
  }, [conversationId, session?.user?.id]);

  // Detect scroll position to determine if auto-scroll should happen
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollAreaRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
      const scrollPosition = scrollTop + clientHeight;

      // If user is scrolled near the bottom (within 100px), enable auto-scroll
      const isNearBottom = scrollHeight - scrollPosition < 100;
      setShouldAutoScroll(isNearBottom);
    };

    const scrollAreaElement = scrollAreaRef.current;
    if (scrollAreaElement) {
      scrollAreaElement.addEventListener("scroll", handleScroll);
      return () =>
        scrollAreaElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Improved scroll to bottom function
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior,
        block: "end",
      });
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (!messages.length) return;

    const currentLength = messages.length;
    const prevLength = prevMessagesLengthRef.current;

    // Check if new messages were added
    if (currentLength > prevLength) {
      // Check if the new message is from the current user
      const lastMessage = messages[messages.length - 1];
      const isOwnMessage = lastMessage?.sender?.id === userId;

      // Always scroll for own messages, or if auto-scroll is enabled
      if (isOwnMessage || shouldAutoScroll) {
        // Use a short timeout to ensure DOM is updated
        setTimeout(() => {
          scrollToBottom(isOwnMessage ? "auto" : "smooth");
        }, 100);
      }
    } else if (prevLength === 0 && currentLength > 0) {
      // Initial load - scroll immediately without animation
      setTimeout(() => {
        scrollToBottom("auto");
      }, 100);
    }

    prevMessagesLengthRef.current = currentLength;
  }, [messages, userId, shouldAutoScroll]);

  // Mark messages as read when they appear in the view
  useEffect(() => {
    if (!session?.user?.id || !messages.length) return;

    const unreadMessages = messages
      .filter((msg: any) => !msg.isRead && msg.sender.id !== userId)
      .map((msg: any) => msg.id);

    if (unreadMessages.length > 0) {
      markAsRead(unreadMessages);
    }
  }, [messages, session?.user?.id, markAsRead, userId]);

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

    // Force scroll to bottom when sending a message
    setShouldAutoScroll(true);
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

      <ScrollArea
        className="flex-1 px-2 py-4 sm:px-4"
        scrollHideDelay={100}
        ref={scrollAreaRef}
      >
        {messages.length === 0 ? (
          <EmptyState
            title="No messages yet"
            description="Start the conversation by sending a message."
            showNewChatButton={false}
          />
        ) : (
          <div className="flex flex-col gap-4 sm:gap-6">
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

        <div ref={messagesEndRef} className="h-1" />
      </ScrollArea>

      <MessageInput
        onSend={handleSendMessage}
        isSending={isSending}
        onTyping={handleTyping}
      />
    </div>
  );
}
