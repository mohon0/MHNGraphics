import * as Ably from "ably";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/Options";
import { CustomSession } from "../../profile/route";

export const revalidate = 0;

export async function GET() {
  try {
    const session = (await getServerSession(authOptions)) as CustomSession;
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const client = new Ably.Rest(process.env.ABLY_API_KEY!);
    const tokenParams = { clientId: session.user.id };
    const tokenRequest = await client.auth.createTokenRequest(tokenParams);

    return NextResponse.json(tokenRequest);
  } catch (error) {
    console.error("ABLY_TOKEN_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
