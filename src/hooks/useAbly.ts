"use client";

import * as Ably from "ably";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useAbly() {
  const { data: session } = useSession();
  const [ably, setAbly] = useState<Ably.Realtime | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    let ablyInstance: Ably.Realtime;

    const connectToAbly = async () => {
      try {
        const response = await fetch("/api/chat/ably-token");
        if (!response.ok) throw new Error("Failed to get Ably token");

        const tokenRequest = await response.json();

        ablyInstance = new Ably.Realtime({
          authCallback: (_, callback) => {
            callback(null, tokenRequest);
          },
          clientId: session?.user?.id,
        });

        ablyInstance.connection.on("connected", () => {
          console.log("Connected to Ably");
          setIsConnected(true);
        });

        ablyInstance.connection.on("disconnected", () => {
          setIsConnected(false);
        });

        ablyInstance.connection.on("failed", (err) => {
          setError(err as any);
          setIsConnected(false);
        });

        setAbly(ablyInstance);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    };

    connectToAbly();

    return () => {
      if (ablyInstance) ablyInstance.close();
    };
  }, [session?.user?.id]);

  return { ably, isConnected, error };
}
