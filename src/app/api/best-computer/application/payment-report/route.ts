import { Prisma } from "@/components/helper/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);

    const id = queryParams.get("id");
    if (!id) {
      return new NextResponse("Invalid query parameter");
    }

    const response = await Prisma.application.findUnique({
      where: {
        id: id,
      },
      select: {
        studentName: true,
        image: true,
        fullAddress: true,
        email: true,
        mobileNumber: true,
        payments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);

    const id = queryParams.get("id");
    if (!id) {
      return new NextResponse("Invalid query parameter");
    }
    const body = await req.json();
    const amount = parseFloat(body.amount);
    const response = await Prisma.transaction.create({
      data: {
        trxId: body.trxId,
        month: body.month,
        amount: amount,
        year: body.year,
        applicationId: id,
        time: body.date,
      },
    });
    return new NextResponse(JSON.stringify(response), { status: 201 });
  } catch (error) {
    return new NextResponse("Server error", { status: 500 });
  }
}
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);

    const id = queryParams.get("id");
    if (!id) {
      return new NextResponse("Invalid query parameter");
    }

    const response = await Prisma.transaction.delete({
      where: {
        id: id,
      },
    });
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new NextResponse("Server error", { status: 500 });
  }
}
