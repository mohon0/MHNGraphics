import { Prisma } from "@/components/helper/prisma/Prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);

    const data = await Prisma.duration.findFirst({});
    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse("Failed to fetch data", { status: 500 });
  } finally {
    await Prisma.$disconnect();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return new NextResponse("User not logged in", { status: 401 });
    }
    if (token.role !== "ADMIN") {
      return new NextResponse("Unauthorized access", { status: 403 });
    }

    const { button } = await req.json();

    if (typeof button !== "string") {
      return new NextResponse("Button data must be a string", { status: 400 });
    }

    await Prisma.duration.update({
      where: { id: "6572cabe088598503406b0a3" },
      data: { button: button },
    });
    return new NextResponse("Button updated successfully");
  } catch (error) {
    return new NextResponse("Failed to update data", { status: 500 });
  } finally {
    await Prisma.$disconnect();
  }
}
