"use client";

import type React from "react";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import { useEffect, useState } from "react";

// Create a singleton Ably client outside of the component
// This ensures only one client is created for the entire application
let globalAblyClient: Ably.Realtime | null = null;

interface AblyClientProviderProps {
  children: React.ReactNode;
}

export function AblyClientProvider({ children }: AblyClientProviderProps) {
  const [client, setClient] = useState<Ably.Realtime | null>(null);

  useEffect(() => {
    // If we already have a global client, use it
    if (globalAblyClient) {
      setClient(globalAblyClient);
      return () => {}; // No cleanup needed as we're reusing the global instance
    }

    // Otherwise, create a new client with proper auth options
    const ablyClient = new Ably.Realtime({
      authUrl: "/api/ably-auth",
      authMethod: "POST",
    });

    // Store in global variable for reuse
    globalAblyClient = ablyClient;
    setClient(ablyClient);

    // Only close the client when the application is completely unmounted
    return () => {
      // We don't want to close the client on component unmount
      // as it might be reused elsewhere
      // We'll rely on browser cleanup when the page is closed
    };
  }, []);

  // Don't render until we have a client
  if (!client) {
    return <div>Connecting to Ably...</div>;
  }

  return <AblyProvider client={client}>{children}</AblyProvider>;
}
