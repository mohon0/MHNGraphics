"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

interface Props {
  page: number;

  searchQuery: string;
}

export function FetchAllUser({ page, searchQuery }: Props) {
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // Debounce the search query
  useEffect(() => {
    const handler = debounce(() => setDebouncedSearchQuery(searchQuery), 300);
    handler();

    // Clean up the debounce effect on component unmount or when searchQuery changes
    return () => handler.cancel();
  }, [searchQuery]);

  return useQuery({
    queryKey: ["All Design", page, debouncedSearchQuery],
    queryFn: async () => {
      const response = await axios.get(`/api/users`, {
        params: { page, searchQuery: debouncedSearchQuery },
      });
      return response.data;
    },
  });
}
