import { Prisma } from "@/components/helper/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const search = req.nextUrl.searchParams;
    const postId = search.get("id");

    if (!postId) {
      return new NextResponse("Error: Post ID not specified", { status: 400 });
    }

    const application = await Prisma.application.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: {
            email: true,
            phoneNumber: true,
          },
        },
      },
    });

    if (!application) {
      return new NextResponse("Error: Post not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify({ application }));
  } catch (error) {
    console.error("Error fetching post:", error);
    return new NextResponse("Error: Internal server error", { status: 500 });
  } finally {
    await Prisma.$disconnect();
  }
}
