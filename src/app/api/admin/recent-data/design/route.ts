import { Prisma } from "@/components/helper/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    // Fetch the latest 5 applications from the database
    const applications = await Prisma.design.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        image: true,
        createdAt: true,
      },
      take: 5,
    });

    // Return the applications as a JSON response
    return new NextResponse(JSON.stringify(applications), { status: 200 });
  } catch (error) {
    console.error("Error fetching latest applications:", error);

    // Handle errors and send an appropriate response
    return new NextResponse("Failed to fetch applications", { status: 500 });
  }
}
