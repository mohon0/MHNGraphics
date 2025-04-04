"use server";

import { publishMessage } from "@/lib/ably";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import getCurrentUser from "./get-current-user";

export async function getConversations() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return [];
    }

    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    return conversations;
  } catch (error) {
    console.error("Error getting conversations:", error);
    return [];
  }
}

export async function createConversation(
  userId: string,
  isGroup = false,
  name?: string,
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      throw new Error("Unauthorized");
    }

    // For direct messages, check if a conversation already exists
    if (!isGroup) {
      const existingConversation = await prisma.conversation.findFirst({
        where: {
          AND: [
            { userIds: { has: currentUser.id } },
            { userIds: { has: userId } },
            { isGroup: false },
          ],
        },
      });

      if (existingConversation) {
        revalidatePath("/messages");
        return { success: true, conversationId: existingConversation.id };
      }
    }

    // Create a new conversation
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
        isGroup,
        name,
      },
      include: {
        users: true,
      },
    });

    // Notify all users about the new conversation
    for (const user of newConversation.users) {
      await publishMessage(
        `user:${user.id}:conversations`,
        "new",
        newConversation,
      );
    }

    revalidatePath("/messages");
    return { success: true, conversationId: newConversation.id };
  } catch (error) {
    console.error("Error creating conversation:", error);
    return { success: false, error: "Failed to create conversation" };
  }
}

export async function createGroupConversation(userIds: string[], name: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      throw new Error("Unauthorized");
    }

    // Ensure current user is included
    if (!userIds.includes(currentUser.id)) {
      userIds.push(currentUser.id);
    }

    // Create a new group conversation
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: userIds.map((id) => ({ id })),
        },
        isGroup: true,
        name,
      },
      include: {
        users: true,
      },
    });

    // Notify all users about the new conversation
    for (const user of newConversation.users) {
      await publishMessage(
        `user:${user.id}:conversations`,
        "new",
        newConversation,
      );
    }

    revalidatePath("/messages");
    return { success: true, conversationId: newConversation.id };
  } catch (error) {
    console.error("Error creating group conversation:", error);
    return { success: false, error: "Failed to create group conversation" };
  }
}
