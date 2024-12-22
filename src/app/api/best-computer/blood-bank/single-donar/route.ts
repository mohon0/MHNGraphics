import { Prisma } from "@/components/helper/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const search = req.nextUrl.searchParams;
    const id = search.get("id");

    if (!id) {
      return new NextResponse("no id available", { status: 400 });
    }
    const response = await Prisma.bloodDonation.findUnique({
      where: {
        id,
      },
    });

    if (!response) {
      return new NextResponse("No data found", { status: 400 });
    }

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  } finally {
    Prisma.$disconnect();
  }
}
