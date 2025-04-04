// pages/api/conversations.ts (or .js if you are not using TypeScript)

import getCurrentUser from "@/actions/get-current-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the incoming request body
    const body = await req.json();
    const { userId } = body;
    console.log(`Creating conversation for userId: ${userId}`);

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    // Check if a conversation already exists with the given userId
    let conversation = await prisma.conversation.findFirst({
      where: {
        userIds: {
          has: userId,
        },
      },
    });

    if (!conversation) {
      // Create a new conversation if it doesn't exist
      conversation = await prisma.conversation.create({
        data: {
          userIds: [currentUser.id, userId],
        },
      });
    }

    // Return the conversationId to the frontend
    return NextResponse.json({ id: conversation.id });
  } catch (error) {
    console.log(error, "ERROR_CREATING_CONVERSATION");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
