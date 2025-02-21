import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { DesignList } from "./DesignList";

export default function SearchHeader() {
  return (
    <Suspense
      fallback={
        <div>
          <Skeleton className="h-20" />
        </div>
      }
    >
      <DesignList />
    </Suspense>
  );
}
