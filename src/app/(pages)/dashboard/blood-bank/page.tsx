"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useBloodBankData } from "@/services/blood-bank";
import { Donor } from "@/utils/Interface";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AccessDenied, EmptyState } from "./empty-state";
import { FilterSection } from "./filter-section";
import { GridView } from "./grid-view";
import { ListView } from "./list-view";
import { Pagination } from "./pagination";
import { GridSkeleton, ListSkeleton, PageSkeleton } from "./skeleton";

function BloodBankContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(
    Number.parseInt(searchParams.get("page") || "1"),
  );
  const [bloodGroup, setBloodGroup] = useState(
    searchParams.get("bloodGroup") || "All",
  );
  const [searchInput, setSearchInput] = useState(
    searchParams.get("searchInput") || "",
  );
  const [view, setView] = useState("grid");
  const router = useRouter();

  // Update URL when filters change
  useEffect(() => {
    const query = new URLSearchParams({
      page: page.toString(),
      bloodGroup,
      searchInput,
    });
    router.replace(`/dashboard/blood-bank?${query.toString()}`);
  }, [page, bloodGroup, searchInput, router]);

  const handleFilterChange = (value: string) => setBloodGroup(value);

  const { data, isLoading, isError, deleteDonor, isDeleting } =
    useBloodBankData({
      currentPage: page,
      search: searchInput,
      bloodGroup,
    });

  if (status === "loading") {
    return <PageSkeleton />;
  }
  if (session?.user?.role !== "ADMIN") {
    return <AccessDenied />;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Blood Bank Management
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage blood donor information and help save lives
        </p>
      </div>

      <FilterSection
        searchInput={searchInput}
        bloodGroup={bloodGroup}
        view={view}
        setSearchInput={setSearchInput}
        handleFilterChange={handleFilterChange}
        setView={setView}
        isLoading={isLoading}
      />

      {isLoading ? (
        view === "grid" ? (
          <GridSkeleton />
        ) : (
          <ListSkeleton />
        )
      ) : isError ? (
        <EmptyState message="Error loading donor information." type="error" />
      ) : !data ? (
        <EmptyState message="No donors found. Add your first donor to get started." />
      ) : data?.users && data.users.length > 0 ? (
        <Tabs value={view} className="space-y-4">
          <TabsContent value="grid" className="mt-0">
            <GridView
              donors={data.users as Donor[]}
              onDelete={deleteDonor}
              isDeleting={isDeleting}
            />
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <ListView
              donors={data.users as Donor[]}
              onDelete={deleteDonor}
              isDeleting={isDeleting}
            />
          </TabsContent>

          {data?.count > 0 && (
            <div className="mt-8">
              <Pagination
                totalPages={Math.ceil((data?.count || 0) / 12)}
                initialPage={page}
                query={searchInput}
                setPage={setPage}
              />
            </div>
          )}
        </Tabs>
      ) : (
        <EmptyState message="No donor information available." />
      )}
    </div>
  );
}

export default function BloodBank() {
  return (
    <div className="min-h-screen py-8">
      <Suspense fallback={<PageSkeleton />}>
        <BloodBankContent />
      </Suspense>
    </div>
  );
}
