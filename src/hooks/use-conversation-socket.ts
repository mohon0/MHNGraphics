"use client";

import type { FullConversationType, FullMessageType } from "@/types";
import type { Message, RealtimeChannel } from "ably";
import { useAbly } from "ably/react";
import { useEffect, useRef, useState } from "react";

export function useConversationSocket(
  conversationId: string,
  initialMessages: FullMessageType[] = [],
) {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const ably = useAbly();
  const channelRef = useRef<RealtimeChannel | null>(null);
  const isMounted = useRef(false);
  const isCleaningUp = useRef(false);

  useEffect(() => {
    if (!ably || !conversationId || isCleaningUp.current) return;

    isMounted.current = true;
    setIsLoading(true);

    const channel = (channelRef.current =
      channelRef.current ||
      ably.channels.get(`conversation:${conversationId}`));

    const handleNewMessage = (message: Message) => {
      const newMessage = message.data as FullMessageType;
      if (!newMessage.id || !newMessage.sender || !newMessage.seen) {
        console.error("Invalid message data:", newMessage);
        return;
      }
      setMessages((current) => {
        if (current.some((msg) => msg.id === newMessage.id)) {
          return current;
        }
        return [...current, newMessage].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
      });
    };

    const handleMessageUpdate = (message: Message) => {
      const updatedMessage = message.data as FullMessageType;
      if (
        !updatedMessage.id ||
        !updatedMessage.sender ||
        !updatedMessage.seen
      ) {
        console.error("Invalid message data:", updatedMessage);
        return;
      }
      setMessages((current) =>
        current.map((msg) =>
          msg.id === updatedMessage.id ? updatedMessage : msg,
        ),
      );
    };

    if (
      isMounted.current &&
      (channel.state === "initialized" || channel.state === "detached")
    ) {
      channel.subscribe("new", handleNewMessage);
      channel.subscribe("update", handleMessageUpdate);
    }

    setMessages(initialMessages);
    setIsLoading(false);

    return () => {
      if (!channel || !isMounted.current) return;

      isMounted.current = false;
      isCleaningUp.current = true;

      channel.unsubscribe("new", handleNewMessage);
      channel.unsubscribe("update", handleMessageUpdate);

      if (channel.state === "attached" || channel.state === "attaching") {
        channel
          .detach()
          .then(() => {
            ably.channels.release(`conversation:${conversationId}`);
            channelRef.current = null;
            isCleaningUp.current = false;
          })
          .catch((err) => {
            console.error("Failed to detach channel:", err);
            isCleaningUp.current = false;
          });
      } else if (
        channel.state === "initialized" ||
        channel.state === "detached"
      ) {
        ably.channels.release(`conversation:${conversationId}`);
        channelRef.current = null;
        isCleaningUp.current = false;
      } else {
        setTimeout(() => {
          if (channel.state === "detached") {
            ably.channels.release(`conversation:${conversationId}`);
            channelRef.current = null;
          }
          isCleaningUp.current = false;
        }, 100);
      }
    };
  }, [ably, conversationId, initialMessages]);

  return { messages, isLoading };
}

export function useUserConversationsSocket(
  userId: string,
  initialConversations: FullConversationType[] = [],
) {
  const [conversations, setConversations] =
    useState<FullConversationType[]>(initialConversations);
  const [isLoading, setIsLoading] = useState(false);
  const ably = useAbly();
  const channelRef = useRef<RealtimeChannel | null>(null);
  const isMounted = useRef(false);
  const isCleaningUp = useRef(false);

  useEffect(() => {
    if (!ably || !userId || isCleaningUp.current) return;

    isMounted.current = true;
    setIsLoading(true);

    const channel = (channelRef.current =
      channelRef.current || ably.channels.get(`user:${userId}:conversations`));

    const handleNewConversation = (message: Message) => {
      const newConversation = message.data as FullConversationType;
      if (
        !newConversation.id ||
        !newConversation.users ||
        !newConversation.messages
      ) {
        console.error("Invalid conversation data:", newConversation);
        return;
      }
      setConversations((current) => {
        if (current.some((conv) => conv.id === newConversation.id)) {
          return current;
        }
        return [newConversation, ...current];
      });
    };

    const handleUpdateConversation = (message: Message) => {
      const updatedConversation = message.data as FullConversationType;
      if (
        !updatedConversation.id ||
        !updatedConversation.users ||
        !updatedConversation.messages
      ) {
        console.error("Invalid conversation data:", updatedConversation);
        return;
      }
      setConversations((current) =>
        current
          .map((conv) => {
            if (conv.id === updatedConversation.id) {
              return {
                ...conv,
                messages: updatedConversation.messages || conv.messages,
                lastMessageAt:
                  updatedConversation.lastMessageAt || conv.lastMessageAt,
              };
            }
            return conv;
          })
          .sort(
            (a, b) =>
              new Date(b.lastMessageAt).getTime() -
              new Date(a.lastMessageAt).getTime(),
          ),
      );
    };

    if (
      isMounted.current &&
      (channel.state === "initialized" || channel.state === "detached")
    ) {
      channel.subscribe("new", handleNewConversation);
      channel.subscribe("update", handleUpdateConversation);
    }

    setConversations(initialConversations);
    setIsLoading(false);

    return () => {
      if (!channel || !isMounted.current) return;

      isMounted.current = false;
      isCleaningUp.current = true;

      channel.unsubscribe("new", handleNewConversation);
      channel.unsubscribe("update", handleUpdateConversation);

      if (channel.state === "attached" || channel.state === "attaching") {
        channel
          .detach()
          .then(() => {
            ably.channels.release(`user:${userId}:conversations`);
            channelRef.current = null;
            isCleaningUp.current = false;
          })
          .catch((err) => {
            console.error("Failed to detach channel:", err);
            isCleaningUp.current = false;
          });
      } else if (
        channel.state === "initialized" ||
        channel.state === "detached"
      ) {
        ably.channels.release(`user:${userId}:conversations`);
        channelRef.current = null;
        isCleaningUp.current = false;
      } else {
        setTimeout(() => {
          if (channel.state === "detached") {
            ably.channels.release(`user:${userId}:conversations`);
            channelRef.current = null;
          }
          isCleaningUp.current = false;
        }, 100);
      }
    };
  }, [ably, userId, initialConversations]);

  return { conversations, isLoading };
}
