"use client";

import * as Ably from "ably";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export interface TypingIndicatorState {
  userId: string;
  conversationId: string;
  isTyping: boolean;
  timestamp: number;
}

export function useAbly() {
  const { data: session } = useSession();
  const [ably, setAbly] = useState<Ably.Realtime | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [typingUsers, setTypingUsers] = useState<
    Record<string, TypingIndicatorState>
  >({});

  useEffect(() => {
    if (!session?.user?.id) return;

    let ablyInstance: Ably.Realtime;

    const connectToAbly = async () => {
      try {
        const response = await fetch("/api/chat/ably-token");
        if (!response.ok) throw new Error("Failed to get Ably token");

        const tokenRequest = await response.json();

        ablyInstance = new Ably.Realtime({
          authCallback: (_, callback) => {
            callback(null, tokenRequest);
          },
          clientId: session?.user?.id,
        });

        ablyInstance.connection.on("connected", () => {
          console.log("Connected to Ably");
          setIsConnected(true);
        });

        ablyInstance.connection.on("disconnected", () => {
          setIsConnected(false);
        });

        ablyInstance.connection.on("failed", (err) => {
          setError(err as any);
          setIsConnected(false);
        });

        setAbly(ablyInstance);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    };

    connectToAbly();

    return () => {
      if (ablyInstance) ablyInstance.close();
    };
  }, [session?.user?.id]);

  // Function to subscribe to typing indicators
  const subscribeToTyping = (
    conversationId: string,
    callback?: (isTyping: boolean, userId: string) => void,
  ) => {
    if (!ably || !conversationId) return () => {};

    const channel = ably.channels.get(`typing:${conversationId}`);

    const onTypingUpdate = (message: any) => {
      const data = message.data as TypingIndicatorState;

      if (data.userId === session?.user?.id) return;

      setTypingUsers((prev) => ({
        ...prev,
        [data.userId]: data,
      }));

      if (callback) {
        callback(data.isTyping, data.userId);
      }
    };

    channel.subscribe("typing", onTypingUpdate);

    // Clean up old typing indicators periodically
    const interval = setInterval(() => {
      const now = Date.now();
      setTypingUsers((prev) => {
        const updated = { ...prev };
        let changed = false;

        Object.entries(updated).forEach(([userId, state]) => {
          // Remove typing indicators older than 5 seconds
          if (now - state.timestamp > 5000 && state.isTyping) {
            updated[userId] = { ...state, isTyping: false };
            changed = true;
            if (callback && state.conversationId === conversationId) {
              callback(false, userId);
            }
          }
        });

        return changed ? updated : prev;
      });
    }, 1000);

    return () => {
      channel.unsubscribe("typing", onTypingUpdate);
      clearInterval(interval);
    };
  };

  // Function to publish typing indicator
  const publishTypingIndicator = async (
    conversationId: string,
    isTyping: boolean,
  ) => {
    if (!ably || !conversationId || !session?.user?.id) return;

    const channel = ably.channels.get(`typing:${conversationId}`);

    await channel.publish("typing", {
      userId: session.user.id,
      conversationId,
      isTyping,
      timestamp: Date.now(),
    });
  };

  return {
    ably,
    isConnected,
    error,
    subscribeToTyping,
    publishTypingIndicator,
    typingUsers,
  };
}
