import { Prisma } from "@/components/helper/prisma/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const id = queryParams.get("id");

    if (!id) {
      return new NextResponse("No id provided", { status: 404 });
    }

    // Fetch the specific design
    const design = await Prisma.design.findUnique({
      where: { id },
    });

    if (!design) {
      return new NextResponse("Design not found", { status: 404 });
    }

    // Fetch related designs based on shared tags or category
    const relatedDesigns = await Prisma.design.findMany({
      where: {
        id: { not: design.id }, // Exclude the current design
        status: "PUBLISHED", // Ensure related designs are published
        OR: [
          { tags: { hasSome: design.tags } }, // Match designs with overlapping tags
          { category: design.category }, // Match designs with the same category
        ],
      },
      take: 10, // Limit the number of results
    });

    return NextResponse.json(relatedDesigns);
  } catch (error) {
    console.error("Error fetching related designs:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
