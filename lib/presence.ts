import { AblyService } from './ably';
import Prisma from './prisma';

export async function updateUserStatus(userId: string, isOnline: boolean) {
  await Prisma.user.update({
    where: { id: userId },
    data: {
      isOnline,
      lastSeen: isOnline ? undefined : new Date(),
    },
  });

  const ably = AblyService.getInstance();
  const presenceChannel = ably.channels.get('presence');

  await presenceChannel.publish('status-change', {
    userId,
    isOnline,
    timestamp: Date.now(),
  });
}

export async function getUserStatus(userId: string) {
  try {
    const user = await Prisma.user.findUnique({
      where: { id: userId },
      select: {
        isOnline: true,
        lastSeen: true,
      },
    });

    return user;
    // biome-ignore lint: error
  } catch (error) {
    return null;
  }
}
