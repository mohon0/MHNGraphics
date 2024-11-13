import { UploadImage } from "@/components/helper/image/UploadImage";
import { Prisma } from "@/components/helper/prisma/Prisma";
import { SlugToText } from "@/components/helper/slug/SlugToText";
import cloudinary from "@/utils/cloudinary";
import { DesignStatus } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Helper function to extract string value from formData
function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    const authorId = token?.sub;

    if (!token || !authorId) {
      console.error(
        "Authorization error: User not logged in or authorId missing",
      );
      return new NextResponse("User not logged in or authorId missing", {
        status: 401,
      });
    }

    const formData = await req.formData();

    const name = getStringValue(formData, "name");
    const description = getStringValue(formData, "description");
    const category = getStringValue(formData, "category");
    const subcategory = getStringValue(formData, "subcategory");
    const status = getStringValue(formData, "status") as DesignStatus;

    const tags =
      formData
        .get("tags")
        ?.toString()
        .split(",")
        .map((tag) => tag.trim()) || [];

    // Handle image file if present
    const imageFile = formData.get("image") as Blob;
    let imageUrl = { secure_url: "", public_id: "" };

    if (imageFile) {
      // Upload the image to Cloudinary and get the URL
      imageUrl = await UploadImage(imageFile, "designs/");
    }

    // Insert data into the database using Prisma
    const design = await Prisma.design.create({
      data: {
        name,
        description,
        category,
        subcategory,
        status,
        tags,
        image: imageUrl.secure_url,
        imageId: imageUrl.public_id,
        authorId,
      },
    });

    // Return a JSON response
    return NextResponse.json({
      message: "Design created successfully",
      design,
    });
  } catch (error) {
    console.error("POST request error:", error); // Log the error for debugging
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const category = queryParams.get("category");
    const subcategory = queryParams.get("subcategory");
    const day = queryParams.get("day");
    const month = queryParams.get("month");
    const year = queryParams.get("year");
    const name = queryParams.get("name");

    if (!category || !subcategory || !day || !month || !year || !name) {
      return new NextResponse("Missing field", { status: 400 });
    }

    const formattedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

    const response = await Prisma.design.findFirst({
      where: {
        category: {
          contains: category,
          mode: "insensitive",
        },
        subcategory: {
          contains: subcategory,
          mode: "insensitive",
        },
        name: {
          contains: SlugToText(name),
          mode: "insensitive",
        },
        createdAt: {
          gte: formattedDate,
        },
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return new NextResponse("You are not authenticated", { status: 401 });
    }

    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const postId = queryParams.get("id");

    if (!postId) {
      return new NextResponse("Post not found", { status: 404 });
    }

    // Fetch the product details
    const product = await Prisma.design.findUnique({
      where: {
        id: postId,
      },
      select: {
        image: true,
        authorId: true,
        imageId: true,
      },
    });

    if (!product) {
      return new NextResponse("Post not found", { status: 404 });
    }

    if (token.role !== "ADMIN" && token.sub !== product.authorId) {
      return new NextResponse("You are not authorized", { status: 403 });
    }

    // Check if there’s an image to delete
    if (product.imageId) {
      const result = await cloudinary.uploader.destroy(product.imageId);
      if (result.result !== "ok") {
        return new NextResponse("error", { status: 400 });
      }
    }

    await Prisma.design.delete({
      where: {
        id: postId,
      },
    });

    return new NextResponse("Product deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
