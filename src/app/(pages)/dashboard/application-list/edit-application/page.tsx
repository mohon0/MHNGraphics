"use client";

import ApplicationHeader from "@/app/(pages)/best-computer-training-center/application/ApplicationHeader";
import { FetchSingleApplication } from "@/components/fetch/best-computer/FetchApplication";
import { SingleApplicationUserType } from "@/components/interface/ApplicationType";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { StudentApplicationForm } from "./StudentApplication";

function EditApplicationComponent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const { isLoading, data, isError, isRefetching } = FetchSingleApplication({
    id,
  });
  return (
    <div className="mx-2 md:mx-10">
      {isLoading ? (
        <Loading />
      ) : isRefetching ? (
        <Loading />
      ) : isError ? (
        "Error loading application"
      ) : (
        <EditApplication application={data.application} />
      )}
    </div>
  );
}

function EditApplication({ application }: SingleApplicationUserType) {
  return (
    <div className="mt-10">
      <ApplicationHeader />
      <StudentApplicationForm application={application} />
    </div>
  );
}

export default function SingleApplicationPageComponent() {
  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Skeleton className="h-10 w-full" />
        </div>
      }
    >
      <EditApplicationComponent />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="p-4">
      <Skeleton className="mb-4 h-10 w-3/4" />
      <Skeleton className="mb-4 h-6 w-1/2" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="mt-4 h-8 w-full" />
    </div>
  );
}
