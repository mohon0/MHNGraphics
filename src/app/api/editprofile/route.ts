import storage from "@/utils/firebaseConfig";
import { PrismaClient } from "@prisma/client";
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
} from "firebase/storage";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

// Function to check if an image exists in Firebase Storage
async function checkIfImageExists(imagePath: string | undefined) {
  if (!imagePath) return false;
  const storageRef = ref(storage, imagePath);

  try {
    const metadata = await getMetadata(storageRef);
    return metadata.size > 0;
  } catch (error) {
    if ((error as any).code === "storage/object-not-found") return false;
    console.error("Error checking image existence:", error);
    throw error;
  }
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token)
    return NextResponse.json({ message: "Token not found" }, { status: 401 });

  const id = token.sub;

  try {
    const userInfo = await prisma.user.findUnique({
      where: { id },
      select: { name: true, email: true, image: true, bio: true },
    });

    if (!userInfo)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(userInfo);
  } catch (error) {
    console.error("Error retrieving user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name")?.toString();
    const bio = formData.get("bio")?.toString();
    const coverImageBlob = formData.get("avatar");

    if (!name) {
      return NextResponse.json({ message: "Missing name" }, { status: 400 });
    }

    const token = await getToken({ req, secret });
    if (!token)
      return NextResponse.json(
        { message: "You are not logged in" },
        { status: 401 },
      );

    const existingUser = await prisma.user.findUnique({
      where: { id: token.sub },
    });
    if (!existingUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Only check for image existence and deletion if a new image is provided
    if (coverImageBlob instanceof File) {
      // If there's a new image, check if there's an existing one to delete
      if (existingUser.image) {
        const imageExists = await checkIfImageExists(existingUser.image);
        if (imageExists) {
          await deleteObject(ref(storage, existingUser.image));
        }
      }

      // Upload the new image
      const buffer = Buffer.from(await coverImageBlob.arrayBuffer());
      const filename = `${Date.now()}_${encodeURIComponent(coverImageBlob.name.replace(/\s+/g, "_"))}`;
      const storageRef = ref(storage, `profile/${filename}`);
      await uploadBytes(storageRef, buffer);
      existingUser.image = await getDownloadURL(storageRef);
    }

    // Update user info with new image URL if provided
    const updatedUser = await prisma.user.update({
      where: { id: token.sub },
      data: { name, bio, image: existingUser.image || undefined },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { currentPassword, newPassword } = data;
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    const token = await getToken({ req, secret });
    if (!token)
      return NextResponse.json(
        { message: "You are not logged in" },
        { status: 401 },
      );

    const existingUser = await prisma.user.findUnique({
      where: { id: token.sub },
    });
    if (!existingUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    console.log(existingUser);
    return new NextResponse("api is working", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
