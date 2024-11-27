import { Prisma } from "@/components/helper/prisma/Prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON data from the request
    const body = await req.json();
    const { comment, userId, designId } = body;

    // Validate the required fields
    if (!comment || !userId || !designId) {
      return NextResponse.json(
        { message: "Missing required fields: comment, userId, or designId" },
        { status: 400 },
      );
    }

    const newComment = await Prisma.comment.create({
      data: {
        content: comment,
        userId: userId,
        designId: designId,
      },
    });

    return new NextResponse("Comment submitted successfully", { status: 201 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return new NextResponse("You are not authenticated", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("commentId");

    if (!commentId) {
      return new NextResponse("CommentId not found", { status: 404 });
    }

    //
    // Fetch the comment to verify ownership or admin privileges
    const comment = await Prisma.comment.findUnique({
      where: { id: commentId },
      include: { user: true }, // Include user to check ownership
    });

    if (!comment) {
      return new NextResponse("Comment not found", { status: 404 });
    }
    if (token.role !== "ADMIN" && token.sub !== comment.userId) {
      return new NextResponse("You are not authorized", { status: 403 });
    }

    // Delete the comment
    await Prisma.comment.delete({
      where: { id: commentId },
    });

    return new NextResponse("Comment deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
