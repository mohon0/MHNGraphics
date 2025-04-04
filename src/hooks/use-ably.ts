"use client";

import { AblyContext } from "ably/react";
import { useContext } from "react";

export function useAblyClient() {
  const context = useContext(AblyContext);

  if (!context) {
    throw new Error("useAblyClient must be used within an AblyProvider");
  }

  return context;
}
