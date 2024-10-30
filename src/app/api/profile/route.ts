import { Prisma } from "@/components/helper/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const take = parseInt(req.nextUrl.searchParams.get("take") || "30", 10);
    const skip = parseInt(req.nextUrl.searchParams.get("skip") || "0", 10); // Get the skip parameter

    if (!id) {
      return new NextResponse("ID parameter is required", { status: 400 });
    }

    // Fetch user data along with total design count
    const response = await Prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        status: true,
        image: true,
        bio: true,
        design: {
          take: take,
          skip: skip, // Use skip to prevent duplication
        },
        _count: {
          select: {
            design: true, // Fetch the total count of designs
          },
        },
      },
    });

    if (!response) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(response);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
