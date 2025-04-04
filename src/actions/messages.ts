"use server";

import { publishMessage } from "@/lib/ably";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import getCurrentUser from "./get-current-user";

export async function sendMessage(
  conversationId: string,
  message: string,
  image?: string,
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      throw new Error("Unauthorized");
    }

    // Create the new message
    const newMessage = await prisma.message.create({
      include: {
        seen: true,
        sender: true,
      },
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conversationId },
        },
        sender: {
          connect: { id: currentUser.id },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    // Update the conversation with the new message
    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    // Publish the new message to the conversation channel
    await publishMessage(`conversation:${conversationId}`, "new", newMessage);

    // Notify all users in the conversation about the update
    for (const user of updatedConversation.users) {
      await publishMessage(`user:${user.id}:conversations`, "update", {
        id: conversationId,
        messages: updatedConversation.messages,
        lastMessageAt: updatedConversation.lastMessageAt,
      });
    }

    revalidatePath(`/messages/${conversationId}`);
    return { success: true, message: newMessage };
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, error: "Failed to send message" };
  }
}

export async function markMessagesAsSeen(conversationId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      throw new Error("Unauthorized");
    }

    // Find messages that haven't been seen by the current user
    const unseenMessages = await prisma.message.findMany({
      where: {
        conversationId,
        NOT: [
          {
            seenIds: {
              has: currentUser.id,
            },
          },
          {
            senderId: currentUser.id,
          },
        ],
      },
      select: {
        id: true,
      },
    });

    if (unseenMessages.length === 0) {
      return { success: true, updatedCount: 0 };
    }

    // Update all unseen messages
    const updatePromises = unseenMessages.map((message) =>
      prisma.message.update({
        where: { id: message.id },
        data: {
          seen: {
            connect: {
              id: currentUser.id,
            },
          },
        },
        include: {
          seen: true,
          sender: true,
        },
      }),
    );

    const updatedMessages = await Promise.all(updatePromises);

    // Publish updates for each message
    for (const message of updatedMessages) {
      await publishMessage(`conversation:${conversationId}`, "update", message);
    }

    revalidatePath(`/messages/${conversationId}`);
    return { success: true, updatedCount: unseenMessages.length };
  } catch (error) {
    console.error("Error marking messages as seen:", error);
    return { success: false, error: "Failed to mark messages as seen" };
  }
}
