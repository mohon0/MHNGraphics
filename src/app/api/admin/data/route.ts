import { Prisma } from "@/components/helper/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    // Fetch counts from the database
    const designCount = await Prisma.design.count();
    const subscriberCount = await Prisma.subscriber.count();
    const commentsCount = await Prisma.comment.count();
    const userCount = await Prisma.user.count();

    const data = { designCount, subscriberCount, commentsCount, userCount };

    // Return counts as JSON response
    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching counts:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
