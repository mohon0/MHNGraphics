import { Prisma } from "@/components/helper/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);

    const page = queryParams.get("currentPage")
      ? parseInt(queryParams.get("currentPage")!, 10)
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
