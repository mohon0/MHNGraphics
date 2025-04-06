import { Prisma } from "@/components/helper/prisma/Prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/Options";
import { CustomSession } from "../../profile/route";

export async function POST(req: Request) {
  try {
    const session = (await getServerSession(authOptions)) as CustomSession;
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { userId } = await req.json();
    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const currentUser = await Prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if conversation already exists between these users
    const existingConversation = await Prisma.conversation.findFirst({
      where: {
        AND: [
          {
            participants: {
              some: {
                userId: currentUser.id,
              },
            },
          },
          {
            participants: {
              some: {
                userId,
              },
            },
          },
        ],
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    if (existingConversation) {
      return NextResponse.json(existingConversation);
    }

    // Create a new conversation
    const newConversation = await Prisma.conversation.create({
      data: {
        participants: {
          create: [{ userId: currentUser.id }, { userId }],
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    console.error("CONVERSATION_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const currentUser = await Prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get all conversations for the current user
    const conversations = await Prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId: currentUser.id,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("CONVERSATIONS_GET", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
