import getCurrentUser from "@/actions/get-current-user";
import { ablyRest } from "@/lib/ably";
import { NextResponse } from "next/server";

// Simple in-memory cache for tokens
// In a production app, consider using a more robust caching solution
const tokenCache = new Map<string, { token: any; expires: number }>();

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const clientId = currentUser.id;

    // Check if we have a valid cached token
    const now = Date.now();
    const cachedToken = tokenCache.get(clientId);

    if (cachedToken && cachedToken.expires > now + 60000) {
      // 1 minute buffer
      return NextResponse.json(cachedToken.token);
    }

    // Create a new token with a longer TTL
    const tokenParams = {
      clientId,
      ttl: 3600000, // 1 hour in milliseconds
    };

    const token = await ablyRest.auth.createTokenRequest(tokenParams);

    // Cache the token
    tokenCache.set(clientId, {
      token,
      expires: now + 3540000, // Slightly less than the TTL to be safe
    });

    return NextResponse.json(token);
  } catch (error) {
    console.error("Error creating Ably token:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
