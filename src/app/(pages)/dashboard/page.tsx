"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminDashboard from "./Admin-Dashboard";
import UserDashboard from "./User-Dashboard";

export default function Dashboard() {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return session?.user?.role === "ADMIN" ? (
    <AdminDashboard />
  ) : (
    <UserDashboard />
  );
}
