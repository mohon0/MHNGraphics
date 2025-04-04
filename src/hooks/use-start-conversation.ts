"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useStartConversation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const startConversation = async (userId: string) => {
    try {
      setIsLoading(true);

      // Create or get an existing conversation
      const response = await axios.post("/api/conversations", { userId });

      const conversationId = response.data.id; // Assuming the response has the conversationId

      // Redirect to the conversation page
      router.push(`/messages/${conversationId}`);

      toast.success("Conversation started");
    } catch (error) {
      console.error("Error starting conversation:", error);
      toast.error("Failed to start conversation");
    } finally {
      setIsLoading(false);
    }
  };

  return { startConversation, isLoading };
};
