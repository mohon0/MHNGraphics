import { Prisma } from "@/components/helper/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.nextUrl);
    const id = url.searchParams.get("id");
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "12", 10);
    const sort = url.searchParams.get("sort");
    const category = url.searchParams.get("category");
    const searchTerm = url.searchParams.get("search") || "";

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is required" },
        { status: 400 },
      );
    }

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 },
      );
    }

    let orderBy = {};
    switch (sort) {
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "popular":
        orderBy = { likes: { _count: "desc" } };
        break;
      case "alphabetical":
        orderBy = { name: "asc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    // Build the where condition with category filtering and search
    let whereCondition: any = { authorId: id };
    if (category && category !== "all") {
      whereCondition.category = category;
    }
    if (searchTerm) {
      whereCondition.name = { contains: searchTerm, mode: "insensitive" };
    }

    const [designs, total] = await Promise.all([
      Prisma.design.findMany({
        where: whereCondition,
        select: { id: true, name: true, image: true, category: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy,
      }),
      Prisma.design.count({ where: whereCondition }),
    ]);

    return NextResponse.json({
      data: designs,
      pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
