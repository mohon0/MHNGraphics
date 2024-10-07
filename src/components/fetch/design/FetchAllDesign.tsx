"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

interface Props {
  page: number;
  category: string;
  searchQuery: string;
}

export function FetchAllDesign({ page, category, searchQuery }: Props) {
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // Debounce the search query
  useEffect(() => {
    const handler = debounce(() => setDebouncedSearchQuery(searchQuery), 300);
    handler();

    // Clean up the debounce effect on component unmount or when searchQuery changes
    return () => handler.cancel();
  }, [searchQuery]);

  return useQuery({
    queryKey: ["All Design", page, category, debouncedSearchQuery],
    queryFn: async () => {
      const response = await axios.get(`/api/design/all-design`, {
        params: { page, category, searchQuery: debouncedSearchQuery },
      });
      return response.data;
    },
  });
}
