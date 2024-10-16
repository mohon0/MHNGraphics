import { Prisma } from "@/components/helper/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const id = queryParams.get("id");

    if (!id) {
      return new NextResponse("Invalid Request Id", { status: 404 });
    }

    const response = await Prisma.design.findUnique({
      where: {
        id,
      },
    });
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    return new NextResponse("Api is working", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
