import { authOptions } from "@/app/api/auth/[...nextauth]/Options";
import { PresenceService } from "@/lib/presence";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

interface CustomSession {
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  };
}

// API route to update user's online status
export async function POST(req: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as CustomSession;
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { isOnline } = await req.json();

    if (typeof isOnline !== "boolean") {
      return new NextResponse("Invalid status", { status: 400 });
    }

    await PresenceService.updateUserStatus(session.user.id, isOnline);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PRESENCE_UPDATE_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// API route to get user's online status
export async function GET(req: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as CustomSession;
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const status = await PresenceService.getUserStatus(userId);

    if (!status) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(status);
  } catch (error) {
    console.error("PRESENCE_GET_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
