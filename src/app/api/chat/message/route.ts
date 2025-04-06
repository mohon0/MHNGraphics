import { authOptions } from "@/app/api/auth/[...nextauth]/Options";
import { AblyService } from "@/lib/ably";
import Prisma from "@/lib/prisma";
import { getServerSession, Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface CustomSession extends Session {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
    role: string; // Add any other roles you may have
  };
}
export async function GET(req: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as CustomSession;

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log("heelo");
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");
    const cursor = searchParams.get("cursor");
    const limit = Number.parseInt(searchParams.get("limit") || "20");
    if (!conversationId) {
      return new NextResponse("Conversation id missing", { status: 400 });
    }

    const currentUser = await Prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user is a participant in the conversation
    const isParticipant = await Prisma.conversationParticipant.findFirst({
      where: {
        conversationId,
        userId: currentUser.id,
      },
    });

    if (!isParticipant) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Build query for pagination
    const queryOptions: any = {
      where: {
        conversationId,
        isDeleted: false,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    };

    if (cursor) {
      queryOptions.cursor = {
        id: cursor,
      };
      queryOptions.skip = 1; // Skip the cursor
    }

    const messages = await Prisma.message.findMany(queryOptions);

    // Mark messages as read
    await Prisma.message.updateMany({
      where: {
        conversationId,
        receiverId: currentUser.id,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    // Get the next cursor
    let nextCursor = null;
    if (messages.length === limit) {
      nextCursor = messages[messages.length - 1].id;
    }

    return NextResponse.json({
      items: messages.reverse(), // Reverse to get chronological order
      nextCursor,
    });
  } catch (error) {
    console.error("MESSAGES_GET", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as CustomSession;
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { content } = await req.json();
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");

    if (!content || !conversationId) {
      return new NextResponse("Content is required", { status: 400 });
    }

    const currentUser = await Prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the conversation and check if the current user is a participant
    const conversation = await Prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        participants: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    const isParticipant = conversation.participants.some(
      (participant) => participant.userId === currentUser.id,
    );

    if (!isParticipant) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Find the other participant to set as receiver
    const otherParticipant = conversation.participants.find(
      (participant) => participant.userId !== currentUser.id,
    );

    if (!otherParticipant) {
      return new NextResponse("Receiver not found", { status: 404 });
    }

    // Create the message
    const message = await Prisma.message.create({
      data: {
        content,
        senderId: currentUser.id,
        receiverId: otherParticipant.userId,
        conversationId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Update conversation's updatedAt
    await Prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    // Publish to Ably
    const ably = AblyService.getInstance();
    const channel = ably.channels.get(`conversation:${conversationId}`);
    await channel.publish("new-message", message);

    return NextResponse.json(message);
  } catch (error) {
    console.error("MESSAGE_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
