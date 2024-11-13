import { Prisma } from "@/components/helper/prisma/Prisma";
import cloudinary from "@/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);

    const page = queryParams.get("page")
      ? parseInt(queryParams.get("page")!, 10)
      : 1;

    const searchQuery = queryParams.get("searchQuery") || "";

    const limit = 30;
    const skip = (page - 1) * limit;

    // Define where clause for verified users
    const whereClause = {
      emailVerified: { not: null }, // Only fetch users with a non-null emailVerified date
      ...(searchQuery && {
        name: {
          contains: searchQuery,
          mode: "insensitive" as const, // Using "insensitive" with TypeScript const assertion
        },
      }),
    };

    // Fetch verified users with pagination and filtering
    const response = await Prisma.user.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        status: true,
        createdAt: true,
      },
    });

    // Get total count of verified users for pagination metadata
    const totalCount = await Prisma.user.count({
      where: whereClause,
    });

    const result = {
      data: response,
      meta: {
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        itemsPerPage: limit,
      },
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching verified users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const id = queryParams.get("id");

    // Validate ID
    if (!id) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    // Retrieve the user by ID
    const user = await Prisma.user.findUnique({
      where: { id },
    });

    // Check if the user exists
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Prevent deletion of admin accounts
    if (user.status === "ADMIN") {
      return new NextResponse("Admin accounts cannot be deleted", {
        status: 403,
      });
    }

    // Delete user image from Firebase if it exists

    if (user.imageId) {
      const result = await cloudinary.uploader.destroy(user.imageId);
      if (result.result !== "ok") {
        return new NextResponse("error", { status: 400 });
      }
    }

    // Begin transaction to delete all associated records
    await Prisma.$transaction([
      Prisma.account.deleteMany({ where: { userId: id } }),
      Prisma.session.deleteMany({ where: { userId: id } }),
      Prisma.post.deleteMany({ where: { authorId: id } }),
      Prisma.design.deleteMany({ where: { authorId: id } }),
      Prisma.comment.deleteMany({ where: { authorId: id } }),
      Prisma.user.delete({ where: { id } }),
    ]);

    return new NextResponse("User and associated data deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
