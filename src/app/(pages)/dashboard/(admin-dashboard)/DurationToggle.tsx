"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useDurationToggle, useFetchDuration } from "@/services/admin";
import { FileIcon } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * DurationToggle Component
 *
 * Displays a toggle switch to control the visibility of free application functionality.
 * Fetches the current state and allows admins to toggle it on/off.
 */
export default function DurationToggle() {
  const { data, isLoading, isError } = useFetchDuration();
  const [visibility, setVisibility] = useState(false);
  const { handleSwitchChange, isLoading: isToggling } = useDurationToggle(
    visibility,
    setVisibility,
  );

  // Update state when fetched data changes
  useEffect(() => {
    if (data) {
      setVisibility(data.button === "On");
    }
  }, [data]);

  // Display loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-5 w-[140px]" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </CardHeader>
        <CardContent className="mt-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-11" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Display error message if data fetching fails
  if (isError) {
    return <p className="text-red-500">Failed to load data.</p>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Free Application</CardTitle>
        <div className="rounded-full bg-sky-100 p-2 text-sky-600">
          <FileIcon />
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="free"
            checked={visibility}
            onCheckedChange={handleSwitchChange}
            disabled={isToggling}
          />
          <Label htmlFor="free">
            Free Apply {visibility ? "Open" : "Closed"}
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
