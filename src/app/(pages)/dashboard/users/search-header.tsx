import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RefreshCw, Search, UsersIcon } from "lucide-react";
import type React from "react";

type SearchHeaderProps = {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRefetch: () => void;
  isLoading: boolean;
};

export function SearchHeader({
  searchQuery,
  onSearchChange,
  onRefetch,
  isLoading,
}: SearchHeaderProps) {
  return (
    <Card className="mb-6 border-none bg-transparent shadow-none">
      <CardHeader className="px-0 pt-0">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <CardTitle className="text-3xl font-bold">
            <div className="flex items-center gap-2">
              <UsersIcon className="h-7 w-7" />
              User Management
            </div>
          </CardTitle>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name"
              value={searchQuery}
              onChange={onSearchChange}
              className="w-full pl-9 sm:w-[250px]"
            />
            <Button
              onClick={onRefetch}
              disabled={searchQuery.length < 3 || isLoading}
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
