"use client";

import { useProfile } from "@/services/profile";
import type { Design } from "@/utils/Interface";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DesignGrid from "./design-grid";
import ProfileHeader from "./profile-header";
import ProfileInfo from "./profile-info";
import ProfileSkeleton from "./profile-skeleton";

export default function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const currentPage = Number(searchParams.get("page") || "1");
  const itemsPerPage = 9;

  const [designs, setDesigns] = useState<Design[]>([]);
  const [sortOption, setSortOption] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  const { isLoading, data, isError } = useProfile(
    id ?? "",
    itemsPerPage,
    (currentPage - 1) * itemsPerPage,
  );

  useEffect(() => {
    if (data) {
      setDesigns(data.design);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load profile data", {
        description: "Please try again later",
      });
    }
  }, [isError]);

  const setTab = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  function handleSort() {
    console.log("handleSort");
  }

  if (!id) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">No Profile Selected</h2>
          <p className="text-muted-foreground">
            Please provide a user ID to view their profile
          </p>
        </div>
      </div>
    );
  }

  if (isLoading && designs.length === 0) return <ProfileSkeleton />;

  const totalDesignCount = data?._count?.design || 0;
  const totalPages = Math.ceil(totalDesignCount / itemsPerPage);

  return (
    <div className="container mx-auto mt-10">
      {data && (
        <>
          <ProfileHeader user={data} isLoading={isLoading} />

          <div className="mt-8 flex flex-col gap-8 lg:flex-row">
            <div className="w-full lg:w-1/3">
              <ProfileInfo user={data} />
            </div>

            <div className="w-full lg:w-2/3">
              <DesignGrid
                designs={designs}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setPage}
                isLoading={isLoading}
                sortOption={sortOption}
                onSort={handleSort}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
