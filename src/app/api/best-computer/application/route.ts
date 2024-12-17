import { UploadImage } from "@/components/helper/image/UploadImage";
import { Prisma } from "@/components/helper/prisma/Prisma";
import cloudinary from "@/utils/cloudinary";

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const admin = process.env.NEXT_PUBLIC_ADMIN;

function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.sub;

    if (!token || !userId) {
      // User is not authenticated or authorId is missing
      return new NextResponse("User not logged in or authorId missing");
    }

    // Check if the user has already submitted an application
    const existingApplication = await Prisma.application.findFirst({
      where: {
        userId: userId,
      },
    });

    if (existingApplication) {
      // User has already submitted an application
      return new NextResponse("User has already submitted an application", {
        status: 400,
      });
    }

    // Extract form data from the request
    const formData = await req.formData();

    // Use utility function for each form field
    const studentName = getStringValue(formData, "studentName");
    const email = getStringValue(formData, "email");
    const fatherName = getStringValue(formData, "fatherName");
    const motherName = getStringValue(formData, "motherName");
    const birthDay = getStringValue(formData, "birthDay");
    const bloodGroup = getStringValue(formData, "bloodGroup");
    const mobileNumber = getStringValue(formData, "mobileNumber");
    const guardianNumber = getStringValue(formData, "guardianNumber");
    const gender = getStringValue(formData, "gender");
    const religion = getStringValue(formData, "religion");
    const fullAddress = getStringValue(formData, "fullAddress");
    const district = getStringValue(formData, "district");
    const education = getStringValue(formData, "education");
    const board = getStringValue(formData, "board");
    const rollNumber = getStringValue(formData, "rollNumber");
    const regNumber = getStringValue(formData, "regNumber");
    const passingYear = getStringValue(formData, "passingYear");
    const gpa = getStringValue(formData, "gpa");
    const nid = getStringValue(formData, "nid");
    const nationality = getStringValue(formData, "nationality");
    const course = getStringValue(formData, "course");
    const duration = getStringValue(formData, "duration");
    const pc = getStringValue(formData, "pc");
    const session = getStringValue(formData, "session");
    const transactionId = getStringValue(formData, "transactionId");
    const fatherOccupation = getStringValue(formData, "fatherOccupation");
    const maritalStatus = getStringValue(formData, "maritalStatus");
    const picture = formData.get("picture");

    try {
      // Handle image file if present
      const imageFile = formData.get("image") as Blob;
      let imageUrl = { secure_url: "", public_id: "" };

      if (imageFile) {
        // Upload the image to Cloudinary and get the URL
        imageUrl = await UploadImage(imageFile, "designs/");
      }

      const lastApplication = await Prisma.application.findFirst({
        orderBy: {
          createdAt: "desc",
        },
        select: {
          roll: true,
        },
      });
      if (!lastApplication || !lastApplication.roll) {
        return new NextResponse("There was an error. Please try again later.");
      }

      const roll = lastApplication?.roll + 1;

      // Create a new post using Prisma
      const newPost = await Prisma.application.create({
        data: {
          studentName,
          fatherName,
          motherName,
          birthDay,
          bloodGroup,
          mobileNumber,
          guardianNumber,
          gender,
          religion,
          fullAddress,
          district,
          education,
          board,
          rollNumber,
          regNumber,
          passingYear,
          gpa,
          nid,
          nationality,
          course,
          duration,
          email,
          pc,
          userId,
          roll,
          transactionId,
          fatherOccupation,
          maritalStatus,
          session,
          image: imageUrl.secure_url,
          imageId: imageUrl.public_id,
          status: "Pending",
          certificate: "Pending",
        },
      });

      return new NextResponse(JSON.stringify(newPost), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new NextResponse("Applications creation failed", { status: 400 });
    }
  } catch (error) {
    return new NextResponse("Form data processing failed", { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.sub;

    if (!token || !userId) {
      return new NextResponse("User not logged in or authorId missing");
    }

    const existingApplication = await Prisma.application.findFirst({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        studentName: true,
        duration: true,
        image: true,
        status: true,
        course: true,
        createdAt: true,
        certificate: true,
      },
    });

    if (existingApplication) {
      return new NextResponse(JSON.stringify(existingApplication), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new NextResponse("No Application Found", { status: 200 });
    }
  } catch (error) {
    return new NextResponse("An error occurred", { status: 400 });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.sub;
    const userEmail = token?.email;

    if (!token || (!userId && !userEmail)) {
      return new NextResponse("User not logged in or userId/userEmail missing");
    }

    const search = req.nextUrl.searchParams;
    const applicationId = search.get("id");

    if (!applicationId) {
      return new NextResponse("Application ID not provided", { status: 400 });
    }

    const application = await Prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      select: {
        userId: true,
        image: true,
        imageId: true,
      },
    });

    if (!application) {
      return new NextResponse("Application not found", { status: 404 });
    }

    // Check if the user has the right to delete the application
    if (userId === application.userId || userEmail === admin) {
      // Check if there’s an image to delete
      if (application.imageId) {
        const result = await cloudinary.uploader.destroy(application.imageId);
        if (result.result !== "ok") {
          return new NextResponse("error", { status: 400 });
        }
      }

      await Prisma.application.delete({
        where: {
          id: applicationId,
        },
      });

      return new NextResponse("Application deleted successfully", {
        status: 200,
      });
    } else {
      // User does not have the right to delete the application
      return new NextResponse("Unauthorized to delete this application", {
        status: 403,
      });
    }
  } catch (error) {
    console.error("Error deleting application:", error);
    return new NextResponse("Error deleting application", { status: 500 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.sub;
    const userEmail = token?.email;

    if (!token || (!userId && !userEmail)) {
      return new NextResponse("User not logged in or userId/userEmail missing");
    }

    const formData = await req.formData();
    const id = getStringValue(formData, "id");
    const imageData = formData.get("image");

    // Check if the user exists
    const existingUser = await Prisma.application.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Check if there’s an image to delete
    if (existingUser.imageId) {
      const result = await cloudinary.uploader.destroy(existingUser.imageId);
      if (result.result !== "ok") {
        return new NextResponse("Error deleting previous image", {
          status: 400,
        });
      }
    }

    // Upload the new image
    let image = existingUser.image;
    let imageId = existingUser.imageId;

    if (imageData && imageData instanceof Blob) {
      const imageFile = imageData as Blob;
      const uploadResult = await UploadImage(imageFile, "application/");
      image = uploadResult.secure_url;
      imageId = uploadResult.public_id;
    }

    const updatedData: Record<string, string | Date | null> = {};

    // Iterate through form data and add it to updatedData
    formData.forEach((value, key) => {
      if (key !== "id" && key !== "image") {
        updatedData[key] = value.toString();
      }
    });

    // Add image and imageId to updatedData
    updatedData.image = image;
    updatedData.imageId = imageId;

    if (userEmail === admin) {
      // Update the application with the provided data (including imageURL)
      const response = await Prisma.application.update({
        where: { id },
        data: updatedData,
      });

      if (response) {
        return new NextResponse(JSON.stringify(response), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    } else {
      return new NextResponse(
        "You do not have permission to update this item.",
        { status: 403 },
      );
    }
  } catch (error) {
    return new NextResponse("Error updating application", { status: 500 });
  }
}
