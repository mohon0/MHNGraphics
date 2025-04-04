"use client";

import type React from "react";

import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import { useEffect, useState } from "react";

interface AblyProviderWrapperProps {
  children: React.ReactNode;
}

export default function AblyProviderWrapper({
  children,
}: AblyProviderWrapperProps) {
  const [client, setClient] = useState<Ably.Realtime | null>(null);

  useEffect(() => {
    // Initialize Ably client on the client side only
    const ablyClient = new Ably.Realtime({
      key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
      clientId: `client-${Math.random().toString(36).substring(2, 15)}`,
    });

    setClient(ablyClient);

    return () => {
      ablyClient.close();
    };
  }, []);

  if (!client) {
    return null; // Or a loading indicator
  }

  return <AblyProvider client={client}>{children}</AblyProvider>;
}
