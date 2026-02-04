'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";

// This is a placeholder type. You should define this based on your actual data structure.
export interface UserResult {
    id: string;
    user: {
        name: string;
        image: string | null;
    };
    score: number;
    completedAt: string; // ISO date string
}

interface UserResultsTableProps {
  results: UserResult[];
  isPending: boolean;
}

type SortKey = "user" | "score" | "completedAt";

export function UserResultsTable({ results, isPending }: UserResultsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("completedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (sortKey === 'user') {
          const aName = a.user.name.toLowerCase();
          const bName = b.user.name.toLowerCase();
          if (aName < bName) return sortDirection === "asc" ? -1 : 1;
          if (aName > bName) return sortDirection === "asc" ? 1 : -1;
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [results, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };


  if (isPending) {
    return <div>Loading results...</div>;
  }

  if (results.length === 0) {
    return (
        <div className='bg-secondary rounded-lg p-12 text-center'>
          <p className='text-muted-foreground font-semibold'>
            No submissions yet
          </p>
          <p className='text-muted-foreground text-sm mt-1'>
            Results will appear here once users complete the quiz.
          </p>
        </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
                <Button variant="ghost" onClick={() => handleSort("user")}>
                    Participant
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </TableHead>
            <TableHead>
                <Button variant="ghost" onClick={() => handleSort("score")}>
                    Score
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </TableHead>
            <TableHead>
                <Button variant="ghost" onClick={() => handleSort("completedAt")}>
                    Date Completed
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedResults.map((result) => (
            <TableRow key={result.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={result.user.image || undefined} />
                    <AvatarFallback>{result.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{result.user.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={result.score >= 70 ? "default" : "destructive"}>
                  {result.score}%
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(result.completedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
