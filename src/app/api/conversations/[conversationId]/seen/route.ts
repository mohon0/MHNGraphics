import getCurrentUser from "@/actions/get-current-user";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  conversationId: string;
}

export async function POST(
  request: Request,
  context: { params: Promise<Params> },
) {
  try {
    const { conversationId } = await context.params;
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    // Update all messages in this conversation that do not already have the current user's ID in seenIds
    const result = await prisma.message.updateMany({
      where: {
        conversationId,
        NOT: {
          seenIds: {
            has: currentUser.id,
          },
        },
      },
      data: {
        seenIds: { push: currentUser.id },
      },
    });

    return NextResponse.json({ success: true, updatedCount: result.count });
  } catch (error: any) {
    console.error("Error marking messages as seen:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
