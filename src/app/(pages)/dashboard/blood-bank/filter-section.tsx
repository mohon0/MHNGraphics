import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BLOOD_GROUPS } from "@/constant/blood-group";
import { DropletIcon, FilterIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

interface FilterSectionProps {
  searchInput: string;
  bloodGroup: string;
  view: string;
  setSearchInput: (value: string) => void;
  handleFilterChange: (value: string) => void;
  setView: (value: string) => void;
  isLoading?: boolean;
}

export function FilterSection({
  searchInput,
  bloodGroup,
  view,
  setSearchInput,
  handleFilterChange,
  setView,
  isLoading = false,
}: FilterSectionProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search by donor name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9 sm:w-[300px]"
            disabled={isLoading}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              disabled={isLoading}
            >
              <FilterIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <div className="p-2">
              <Label className="text-xs font-medium">Blood Group</Label>
              <Select
                onValueChange={handleFilterChange}
                defaultValue={bloodGroup}
                disabled={isLoading}
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select Blood Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Blood Group</SelectLabel>
                    {BLOOD_GROUPS.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        <Tabs value={view} onValueChange={setView} className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid" disabled={isLoading}>
              Grid
            </TabsTrigger>
            <TabsTrigger value="list" disabled={isLoading}>
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Link href="/dashboard/blood-bank/add-donor">
          <Button className="gap-1" disabled={isLoading}>
            <DropletIcon className="h-4 w-4" />
            Add Donor
          </Button>
        </Link>
      </div>
    </div>
  );
}
