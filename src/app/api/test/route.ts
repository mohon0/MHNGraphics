import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    // Fetch all applications
    const applications = await prisma.application.findMany({
      select: {
        id: true,
        studentName: true,
      },
    });

    // No need to process firstName or lastName since they're removed
    return new NextResponse("Applications already use studentName only.", {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating applications:", error);
    return new NextResponse("Error updating applications", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
