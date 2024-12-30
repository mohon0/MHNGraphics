import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const page = parseInt(queryParams.get("page") || "1", 10);

    const searchName = queryParams.get("search") || "";
    let bloodGroup = (queryParams.get("filterBy") || "").trim();

    const skipCount = (page - 1) * 20;

    let whereClause: any = {};

    if (bloodGroup && bloodGroup !== "All") {
      if (!bloodGroup.includes("-")) {
        bloodGroup = bloodGroup + "+";
      }

      whereClause.bloodGroup = {
        equals: bloodGroup,
      };
    }

    if (searchName) {
      whereClause.AND = [
        {
          fullAddress: {
            contains: searchName,
            mode: "insensitive",
          },
        },
        ...(whereClause.AND || []),
      ];
    }

    const [allUsers, totalUsersCount] = await Promise.all([
      prisma.application.findMany({
        select: {
          id: true,
          email: true,
          image: true,
          mobileNumber: true,
          createdAt: true,
          bloodGroup: true,
          fullAddress: true,
          studentName: true,
        },
        where: whereClause,
        skip: skipCount,
        take: 20,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.application.count({ where: whereClause }),
    ]);

    if (allUsers.length > 0) {
      return new NextResponse(
        JSON.stringify({ users: allUsers, totalUsersCount }),
        { headers: { "Content-Type": "application/json" } },
      );
    } else {
      return new NextResponse("No users found.", { status: 200 });
    }
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  } finally {
    await prisma.$disconnect();
  }
}
