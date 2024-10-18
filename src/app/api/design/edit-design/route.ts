import checkIfImageExists from "@/components/helper/image/checkIfImageExists";
import { Prisma } from "@/components/helper/prisma/Prisma";
import storage from "@/utils/firebaseConfig";
import { DesignStatus } from "@prisma/client";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

// Helper function to get string value from form data
function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

// Function to upload image to Firebase and return download URL
async function uploadImage(image: Blob, path: string): Promise<string> {
  const filename = `${Date.now()}_${(image as File).name.replace(/\s+/g, "_")}`;
  const storageRef = ref(storage, `${path}${filename}`);
  await uploadBytes(storageRef, image);
  return getDownloadURL(storageRef);
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) {
      return new NextResponse("Invalid Request Id", { status: 400 });
    }

    const design = await Prisma.design.findUnique({ where: { id } });
    if (!design) {
      return new NextResponse("Design not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(design), { status: 200 });
  } catch (error) {
    console.error("Error in GET:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();
    const designId = getStringValue(formData, "productId");

    if (!designId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    const name = getStringValue(formData, "name");
    const description = getStringValue(formData, "description");
    const category = getStringValue(formData, "category");
    const subcategory = getStringValue(formData, "subcategory");
    const status = getStringValue(formData, "status") as DesignStatus; // Cast to `DesignStatus` enum type
    const tags = getStringValue(formData, "tags")
      .split(",")
      .map((tag) => tag.trim());
    const deletedImage = getStringValue(formData, "deletedImage");
    const imageFile = formData.get("image") as Blob;

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImage(imageFile, "designs/");
    }

    if (deletedImage && (await checkIfImageExists(deletedImage))) {
      const storageRefToDelete = ref(storage, deletedImage);
      await deleteObject(storageRefToDelete);
    }

    const currentDesign = await Prisma.design.findUnique({
      where: { id: designId },
    });
    if (!currentDesign) {
      return new NextResponse("Design not found", { status: 404 });
    }

    // Construct partial update data
    const updatedData = {
      name,
      description,
      category,
      subcategory,
      status,
      tags,
      ...(imageUrl && { image: imageUrl }), // Only include `image` if `imageUrl` exists
    };

    await Prisma.design.update({
      where: { id: designId },
      data: updatedData,
    });

    return new NextResponse("Design updated successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
