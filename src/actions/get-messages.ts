import prisma from "@/lib/prisma"

const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    return messages
  } catch (error) {
    console.error("Error getting messages:", error)
    return []
  }
}

export default getMessages

