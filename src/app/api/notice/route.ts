import { Prisma } from "@/components/helper/prisma/Prisma";
import { UploadPDF } from "@/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";

// POST: Upload a PDF and save a new Notice record
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const pdf = formData.get("pdf") as File;

    if (!title || !pdf) {
      return new NextResponse("Title and PDF file are required", {
        status: 400,
      });
    }

    // Upload the PDF to Cloudinary in the "notices" folder
    const uploadResult = await UploadPDF(pdf, "notices");

    // Save notice details into the database
    const notice = await Prisma.notice.create({
      data: {
        title,
        pdfUrl: uploadResult.secure_url,
        pdfPublicId: uploadResult.public_id,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "PDF uploaded and notice saved successfully",
        notice,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error in POST /api/notice:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// GET: Fetch Notice records with pagination support
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    // Get page and pageSize from the query, with defaults if not provided
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const skip = (page - 1) * pageSize;

    // Run both the findMany and count queries in parallel
    const [notices, totalNotices] = await Promise.all([
      Prisma.notice.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      Prisma.notice.count(),
    ]);

    const totalPages = Math.ceil(totalNotices / pageSize);

    return new NextResponse(
      JSON.stringify({
        page,
        pageSize,
        totalPages,
        totalNotices,
        notices,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error in GET /api/notice:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
