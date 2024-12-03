import { UploadImage } from "@/components/helper/image/UploadImage";
import { Prisma } from "@/components/helper/prisma/Prisma";
import { SlugToText } from "@/components/helper/slug/SlugToText";
import cloudinary from "@/utils/cloudinary";
import { Session } from "next-auth";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/Options";

// Helper function to extract string value from formData
function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}
interface CustomSession extends Session {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
    role: string; // Add any other roles you may have
  };
}
const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = (await getServerSession(authOptions)) as CustomSession;

    if (!session) {
      return new NextResponse("User not logged in or authorId missing", {
        status: 401,
      });
    }

    const authorId = session.user.id;
    const authorStatus = session.user.role;

    // Declare the status variable outside of the if-else block
    let status: "PUBLISHED" | "PENDING";

    // Conditionally set the value of status
    if (
      authorStatus === "ADMIN" ||
      authorStatus === "AUTHOR" ||
      authorStatus === "MODERATOR"
    ) {
      status = "PUBLISHED";
    } else {
      status = "PENDING";
    }

    const formData = await req.formData();

    const name = getStringValue(formData, "name");
    const description = getStringValue(formData, "description");
    const category = getStringValue(formData, "category");
    const subcategory = getStringValue(formData, "subcategory");

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
        tags,
        status,
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
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const category = queryParams.get("category");
    const day = queryParams.get("day");
    const month = queryParams.get("month");
    const year = queryParams.get("year");
    const name = queryParams.get("name");

    if (!category || !day || !month || !year || !name) {
      return new NextResponse("Missing field", { status: 400 });
    }

    const formattedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

    // Fetch the design
    const design = await Prisma.design.findFirst({
      where: {
        category: {
          contains: category,
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
        likes: {
          select: {
            userId: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: {
              select: {
                name: true,
                image: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!design) {
      return new NextResponse("Design not found", { status: 404 });
    }

    await Prisma.design.update({
      where: { id: design.id },
      data: { viewCount: { increment: 1 } },
    });

    // Add like and comments count to the response object
    const enhancedResponse = {
      ...design,
      likeCount: design.likes.length, // Count the number of likes
      commentsCount: design.comments.length,
    };

    return new NextResponse(JSON.stringify(enhancedResponse), { status: 200 });
  } catch (error) {
    console.error(error);
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

export async function PATCH(req: NextRequest, res: NextResponse) {
  // Get session
  const session = (await getServerSession(authOptions)) as CustomSession;

  // Check if user is logged in
  if (!session) {
    return new NextResponse("User not logged in", { status: 401 });
  }

  // Extract authorId and role
  const { role: authorRole } = session.user;

  // Allow only if user is an Administrator or an Author
  if (authorRole !== "ADMIN" && authorRole !== "AUTHOR") {
    return new NextResponse("Access denied", { status: 403 });
  }
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const postId = queryParams.get("id");
    const data = await req.json();
    if (!postId || !data.status) {
      return new NextResponse("Post ID or status not found", { status: 400 });
    }
    const update = await Prisma.design.update({
      where: {
        id: postId,
      },
      data: {
        status: data.status,
      },
    });
    if (!update) {
      return new NextResponse("Failed to update", { status: 400 });
    }
    return new NextResponse("Updated design", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
