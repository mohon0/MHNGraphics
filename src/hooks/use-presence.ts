'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useAbly } from './useAbly';

export interface UserStatus {
  userId: string;
  isOnline: boolean;
  lastSeen?: Date | null;
}

export function usePresence() {
  const { data: session } = useSession();
  const { ably } = useAbly();
  const [userStatuses, setUserStatuses] = useState<Record<string, UserStatus>>(
    {},
  );

  // Update current user's status when component mounts/unmounts
  useEffect(() => {
    if (!session?.user?.id) return;

    // Set user as online when component mounts
    const setOnline = async () => {
      try {
        await axios.post('/api/chat/presence', { isOnline: true });
      } catch (error) {
        // biome-ignore lint: error
        console.error('Failed to set online status:', error);
      }
    };

    setOnline();

    // Set user as offline when component unmounts or tab is closed
    const handleBeforeUnload = () => {
      navigator.sendBeacon(
        '/api/chat/presence',
        JSON.stringify({ isOnline: false }),
      );
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);

      // Also set offline when component unmounts (e.g., logout)
      axios.post('/api/chat/presence', { isOnline: false });
    };
  }, [session?.user?.id]);

  // Subscribe to presence changes
  useEffect(() => {
    if (!ably) return;

    const presenceChannel = ably.channels.get('presence');
    // biome-ignore lint: error
    const handleStatusChange = (message: any) => {
      const { userId, isOnline, timestamp } = message.data;

      setUserStatuses((prev) => ({
        ...prev,
        [userId]: {
          userId,
          isOnline,
          lastSeen: isOnline ? null : new Date(timestamp),
        },
      }));
    };

    presenceChannel.subscribe('status-change', handleStatusChange);

    return () => {
      presenceChannel.unsubscribe('status-change', handleStatusChange);
    };
  }, [ably]);

  // Function to get a specific user's status
  const getUserStatus = async (userId: string): Promise<UserStatus | null> => {
    // First check if we already have the status in state
    if (userStatuses[userId]) {
      return userStatuses[userId];
    }

    // Otherwise fetch from API
    try {
      const response = await axios.get(`/api/chat/presence?userId=${userId}`);
      const status = response.data;

      // Update local state
      setUserStatuses((prev) => ({
        ...prev,
        [userId]: {
          userId,
          isOnline: status.isOnline,
          lastSeen: status.lastSeen ? new Date(status.lastSeen) : null,
        },
      }));

      return {
        userId,
        isOnline: status.isOnline,
        lastSeen: status.lastSeen ? new Date(status.lastSeen) : null,
      };
    } catch (error) {
      // biome-ignore lint: error
      console.error('Failed to get user status:', error);
      return null;
    }
  };

  return {
    userStatuses,
    getUserStatus,
  };
}
