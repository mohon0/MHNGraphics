import { Prisma } from "@/components/helper/prisma/Prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token)
      return NextResponse.json({ message: "Token not found" }, { status: 401 });

    const id = token.sub;

    const userData = await Prisma.user.findUnique({
      where: { id: id },
      select: {
        name: true,
        email: true,
        phoneNumber: true,
        image: true,
        createdAt: true,
        bio: true,
        status: true,
        applications: {
          select: {
            id: true,
            studentName: true,
            duration: true,
            image: true,
            status: true,
            course: true,
            createdAt: true,
            certificate: true,
            roll: true,
            editable: true,
          },
        },
        design: {
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
        },
        comments: {
          take: 5,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    // Return a 404 if the user doesn't exist
    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);

    // Return an error response
    return NextResponse.json(
      { error: "An error occurred while fetching user data" },
      { status: 500 },
    );
  }
}
