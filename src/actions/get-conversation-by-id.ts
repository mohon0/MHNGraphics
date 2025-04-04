import Prisma from "@/lib/prisma";
import getCurrentUser from "./get-current-user";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const conversation = await Prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error) {
    console.error("Error getting conversation by ID:", error);
    return null;
  }
};

export default getConversationById;
