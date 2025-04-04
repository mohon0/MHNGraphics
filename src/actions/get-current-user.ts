import { authOptions } from "@/app/api/auth/[...nextauth]/Options";
import Prisma from "@/lib/prisma";
import type { Session } from "next-auth";
import { getServerSession } from "next-auth";

const getCurrentUser = async () => {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await Prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export default getCurrentUser;
