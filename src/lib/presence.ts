import { AblyService } from "./ably";
import Prisma from "./prisma";

// Presence service to track user online status
export class PresenceService {
  // Update user's online status and last seen timestamp
  static async updateUserStatus(userId: string, isOnline: boolean) {
    try {
      await Prisma.user.update({
        where: { id: userId },
        data: {
          isOnline: isOnline,
          lastSeen: isOnline ? undefined : new Date(),
        },
      });

      // Publish status change to all relevant channels
      const ably = AblyService.getInstance();
      const presenceChannel = ably.channels.get("presence");

      await presenceChannel.publish("status-change", {
        userId,
        isOnline,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  }

  // Get user's online status and last seen time
  static async getUserStatus(userId: string) {
    try {
      const user = await Prisma.user.findUnique({
        where: { id: userId },
        select: {
          isOnline: true,
          lastSeen: true,
        },
      });

      return user;
    } catch (error) {
      console.error("Failed to get user status:", error);
      return null;
    }
  }
}
