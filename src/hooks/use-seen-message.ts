"use client";

import { useAblyClient } from "@/hooks/use-ably";
import axios from "axios";
import { useEffect } from "react";
import useConversation from "./use-conversation";

const useSeenMessage = () => {
  const { conversationId } = useConversation();
  const ablyContext = useAblyClient();

  useEffect(() => {
    if (!conversationId || !ablyContext) return;

    const markSeen = async () => {
      try {
        await axios.post(`/api/conversations/${conversationId}/seen`);
      } catch (error) {
        console.error("Error marking message as seen:", error);
      }
    };

    markSeen();

    // No need to create a channel here since we're just making an API call

    return () => {
      // Cleanup if needed
    };
  }, [conversationId, ablyContext]);

  return {};
};

export default useSeenMessage;
