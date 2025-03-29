import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);

    const page = queryParams.get("page")
      ? parseInt(queryParams.get("page")!, 10)
      : 1;
    const sortBy = queryParams.get("sortBy") || "newest";
    const status = queryParams.get("filter");
    const search = queryParams.get("searchQuery");
    const certificate = queryParams.get("certificate");
    const type = queryParams.get("type") || "all";

    // Calculate skip count for pagination
    const pageSize = 20; // Number of items per page
    const skipCount = (page - 1) * pageSize;

    // Build the `where` condition for Prisma query
    const where: Prisma.ApplicationWhereInput = {
      ...(status && status !== "All" ? { status } : {}),
      ...(search
        ? {
            OR: [
              {
                studentName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
      ...(certificate && certificate !== "All" ? { certificate } : {}),
      ...(type === "free" ? { duration: "free" } : {}),
    };

    // Total count of applications matching the filter
    const totalPostsCount = await prisma.application.count({ where });

    if (totalPostsCount === 0) {
      return NextResponse.json(
        { message: "No Application Found." },
        { status: 200 },
      );
    }

    // Fetch paginated data
    const application = await prisma.application.findMany({
      select: {
        id: true,
        studentName: true,
        image: true,
        status: true,
        course: true,
        duration: true,
        createdAt: true,
        certificate: true,
        mobileNumber: true,
        editable: true,
      },
      where,
      orderBy: {
        createdAt: sortBy === "oldest" ? "asc" : "desc",
      },
      skip: skipCount,
      take: pageSize,
    });

    return NextResponse.json({ application, totalPostsCount }, { status: 200 });
  } catch (error) {
    console.error("Error while getting application:", error);

    // PrismaClientKnownRequestError handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Error while fetching application data" },
        { status: 500 },
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
