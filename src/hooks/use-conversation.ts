import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export function useConversations() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const getConversations = async () => {
    const response = await axios.get('/api/chat/conversation');
    return response.data;
  };

  const createConversation = async (userId: string) => {
    const response = await axios.post('/api/chat/conversation', { userId });
    return response.data;
  };

  const conversationsQuery = useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
    enabled: !!session?.user,
  });

  const createConversationMutation = useMutation({
    mutationFn: createConversation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      return data;
    },
  });

  return {
    conversations: conversationsQuery.data || [],
    isLoading: conversationsQuery.isLoading,
    error: conversationsQuery.error,
    createConversation: createConversationMutation.mutate,
    isCreating: createConversationMutation.isPending,
  };
}

export function useConversationMessages(conversationId: string) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const getMessages = async ({ pageParam = null }) => {
    const params = new URLSearchParams();
    if (pageParam) params.append('cursor', pageParam);
    params.append('limit', '30');

    const response = await axios.get(
      `/api/chat/message?conversationId=${conversationId}&${params.toString()}`,
    );
    return response.data;
  };

  const sendMessage = async (content: string) => {
    const response = await axios.post(
      `/api/chat/message?conversationId=${conversationId}`,
      { content },
    );
    return response.data;
  };

  const markAsRead = async (messageIds: string[]) => {
    if (!messageIds.length) return;

    const response = await axios.post(
      `/api/chat/message/read?conversationId=${conversationId}`,
      { messageIds },
    );

    return response.data;
  };

  const messagesQuery = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => getMessages({}),
    enabled: !!session?.user && !!conversationId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (newMessage) => {
      // biome-ignore lint: error
      queryClient.setQueryData(['messages', conversationId], (oldData: any) => {
        if (!oldData) return { items: [newMessage], nextCursor: null };
        return {
          ...oldData,
          items: [...oldData.items, newMessage],
        };
      });

      // Also update the conversation list to show the latest message
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      // Update the messages to show as read
      // biome-ignore lint: error
      queryClient.setQueryData(['messages', conversationId], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          // biome-ignore lint: error
          items: oldData.items.map((message: any) => ({
            ...message,
            isRead: true,
          })),
        };
      });

      // Also update the conversation list to remove unread indicators
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });

  return {
    messages: messagesQuery.data?.items || [],
    nextCursor: messagesQuery.data?.nextCursor,
    isLoading: messagesQuery.isLoading,
    error: messagesQuery.error,
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isPending,
    markAsRead: markAsReadMutation.mutate,
  };
}
