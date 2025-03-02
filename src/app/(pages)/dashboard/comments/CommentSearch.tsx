"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface CommentSearchProps {
  onSearch: (query: string) => void;
  disabled?: boolean;
}

export function CommentSearch({ onSearch, disabled }: CommentSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Trigger search when debounced value changes
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search comments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-9"
        disabled={disabled}
      />
    </div>
  );
}
