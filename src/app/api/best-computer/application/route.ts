import { UploadImage } from "@/components/helper/image/UploadImage";
import { Prisma } from "@/components/helper/prisma/Prisma";
import cloudinary from "@/utils/cloudinary";

import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/Options";
import { CustomSession } from "../../profile/route";

const secret = process.env.NEXTAUTH_SECRET;
const admin = process.env.NEXT_PUBLIC_ADMIN;

// Utility function to safely retrieve string values
const getStringValue = (formData: FormData, key: string): string => {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
};

// Utility function to safely retrieve number values
const getNumberValue = (formData: FormData, key: string): number | null => {
  const value = formData.get(key);
  if (typeof value === "string" && /^\d+$/.test(value)) {
    return parseInt(value, 10);
  }
  return null;
};

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    const userId = token?.sub;

    if (!token || !userId) {
      return NextResponse.json(
        { message: "User not logged in or userId missing" },
        { status: 401 },
      );
    }

    // Check for existing application
    const existingApplication = await Prisma.application.findFirst({
      where: { userId },
    });

    if (existingApplication) {
      return NextResponse.json(
        { message: "User has already submitted an application" },
        { status: 400 },
      );
    }

    // Extract form data from the request
    const formData = await req.formData();

    // Use utility functions to safely get values
    const studentName = getStringValue(formData, "studentName");
    const email = getStringValue(formData, "email");
    const fatherName = getStringValue(formData, "fatherName");
    const motherName = getStringValue(formData, "motherName");
    const birthDay = getStringValue(formData, "birthDate");
    const bloodGroup = getStringValue(formData, "bloodGroup");
    const mobileNumber = getStringValue(formData, "mobileNumber");
    const guardianNumber = getStringValue(formData, "guardianNumber");
    const gender = getStringValue(formData, "gender");
    const religion = getStringValue(formData, "religion");
    const fullAddress = getStringValue(formData, "fullAddress");
    const district = getStringValue(formData, "district");
    const education = getStringValue(formData, "education");
    const board = getStringValue(formData, "educationBoard");
    const rollNumber = getStringValue(formData, "rollNumber");
    const regNumber = getStringValue(formData, "regNumber");
    const passingYear = getStringValue(formData, "passingYear");
    const gpa = getStringValue(formData, "gpaCgpa");
    const nid = getStringValue(formData, "nidBirthReg");
    const nationality = getStringValue(formData, "nationality");
    const course = getStringValue(formData, "course");
    const duration = getStringValue(formData, "duration");
    const pc = getStringValue(formData, "pc");
    const session = getNumberValue(formData, "session");
    const transactionId = getStringValue(formData, "trxId");
    const fatherOccupation = getStringValue(formData, "fatherOccupation");
    const maritalStatus = getStringValue(formData, "maritalStatus");

    if (session === null) {
      return NextResponse.json(
        { message: "Invalid session value" },
        { status: 400 },
      );
    }

    // Handle file upload
    let imageUrl = { secure_url: "", public_id: "" };
    const imageFile = formData.get("image") as Blob;

    if (imageFile) {
      try {
        imageUrl = await UploadImage(imageFile, "application/");
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return NextResponse.json(
          { message: "Image upload failed" },
          { status: 500 },
        );
      }
    }

    // Generate new roll number
    let roll = 2000;
    const lastApplication = await Prisma.application.findFirst({
      orderBy: { createdAt: "desc" },
      select: { roll: true },
    });

    if (lastApplication?.roll) {
      roll = lastApplication.roll + 1;
    }

    // Create a new application
    try {
      const newApplication = await Prisma.application.create({
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

      return NextResponse.json(newApplication, { status: 201 });
    } catch (createError) {
      console.error("Application creation failed:", createError);
      return NextResponse.json(
        { message: "Application creation failed" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Form processing failed:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 },
    );
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
    if (userId === application.userId || token.role === "ADMIN") {
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

export async function PUT(req: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as CustomSession;

    // Check if user is logged in
    if (!session) {
      return new NextResponse("User not logged in", { status: 401 });
    }

    const { role: authorRole } = session.user;

    // Check if the request is JSON or FormData
    const contentType = req.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      // Handle JSON requests (certificate updates)
      const body = await req.json();

      const existingApp = await Prisma.application.findUnique({
        where: { id: body.id },
      });

      if (!existingApp) {
        return new NextResponse("No application found", { status: 404 });
      }

      const updatedApp = await Prisma.application.update({
        where: { id: body.id },
        data: { certificate: body.certificate },
      });

      return new NextResponse("Updated certificate successfully", {
        status: 200,
      });
    } else if (contentType?.includes("multipart/form-data")) {
      // Handle FormData requests (image and other updates)
      const formData = await req.formData();
      const id = getStringValue(formData, "id");
      const imageData = formData.get("image");

      const existingApp = await Prisma.application.findUnique({
        where: { id },
      });

      if (!existingApp) {
        return new NextResponse("No application found", { status: 404 });
      }

      // Process image if provided
      let image = existingApp.image;
      let imageId = existingApp.imageId;

      if (existingApp.imageId) {
        const result = await cloudinary.uploader.destroy(existingApp.imageId);
        if (result.result !== "ok") {
          return new NextResponse("Error deleting previous image", {
            status: 400,
          });
        }
      }

      if (imageData && imageData instanceof Blob) {
        const uploadResult = await UploadImage(imageData, "application/");
        image = uploadResult.secure_url;
        imageId = uploadResult.public_id;
      }

      // Prepare updated data
      const updatedData: Record<string, string | Date | null> = {};
      formData.forEach((value, key) => {
        if (key !== "id" && key !== "image") {
          updatedData[key] = value.toString();
        }
      });
      updatedData.image = image;
      updatedData.imageId = imageId;

      // Authorization check for ADMIN role
      if (authorRole === "ADMIN") {
        const response = await Prisma.application.update({
          where: { id },
          data: updatedData,
        });

        return new NextResponse(JSON.stringify(response), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new NextResponse(
          "You do not have permission to update this item.",
          { status: 403 },
        );
      }
    } else {
      return new NextResponse("Unsupported content type", { status: 400 });
    }
  } catch (error) {
    console.error("Error updating application:", error);
    return new NextResponse("Internal server error", { status: 500 });
  } finally {
    Prisma.$disconnect();
  }
}
