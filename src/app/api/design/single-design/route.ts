import checkIfImageExists from "@/components/helper/image/checkIfImageExists";
import { Prisma } from "@/components/helper/prisma/Prisma";
import { SlugToText } from "@/components/helper/slug/SlugToText";
import cloudinary from "@/utils/cloudinary";
import storage from "@/utils/firebaseConfig";
import { DesignStatus } from "@prisma/client";
import { deleteObject, ref } from "firebase/storage";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

// Helper function to extract string value from formData
function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

// Function to upload image to Cloudinary and return URL
async function uploadImageToCloudinary(
  image: Blob,
  folder: string,
): Promise<string> {
  const filename = `${Date.now()}_${(image as File).name.replaceAll(" ", "_")}`;
  const buffer = Buffer.from(await image.arrayBuffer());

  const result = await new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, public_id: filename },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error); // Log error
          reject(error);
        } else {
          console.log("Cloudinary upload success:", result); // Log success result
          resolve(result?.secure_url || "");
        }
      },
    );

    // Convert the buffer to a readable stream and pipe it into the Cloudinary upload stream
    Readable.from(buffer).pipe(uploadStream);
  });

  return result;
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
    let imageUrl = "";
    if (imageFile) {
      // Upload the image to Cloudinary and get the URL
      imageUrl = await uploadImageToCloudinary(imageFile, "designs/");
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
        image: imageUrl, // Store the image URL in the database
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
      },
    });

    if (!product) {
      return new NextResponse("Post not found", { status: 404 });
    }

    if (token.role !== "ADMIN" && token.sub !== product.authorId) {
      return new NextResponse("You are not authorized", { status: 403 });
    }

    if (await checkIfImageExists(product.image)) {
      const storageRefToDelete = ref(storage, product.image);
      await deleteObject(storageRefToDelete);
    }
    await Prisma.design.delete({
      where: {
        id: postId,
      },
    });

    return new NextResponse("Product deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
