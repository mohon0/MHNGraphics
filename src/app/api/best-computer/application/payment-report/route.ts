import { Prisma } from "@/components/helper/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.applicationId) {
      return new NextResponse("Invalid query parameter");
    }

    const response = await Prisma.transaction.create({
      data: {
        comment: body.comment,
        PaymentMonth: body.PaymentMonth,
        amount: body.amount,
        PaymentReceiveDate: body.PaymentReceiveDate,
        applicationId: body.applicationId,
      },
    });
    return new NextResponse(JSON.stringify(response), { status: 201 });
  } catch (error) {
    return new NextResponse("Server error", { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
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
