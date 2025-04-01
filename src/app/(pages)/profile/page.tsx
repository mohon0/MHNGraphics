import type { Metadata } from "next";
import { Suspense } from "react";
import ProfileContent from "./ProfileContent";
import ProfileSkeleton from "./profile-skeleton";

export const metadata: Metadata = {
  title: "User Profile | Your App Name",
  description: "View and manage user profiles",
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
