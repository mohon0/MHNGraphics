"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

interface Props {
  page: number;
  filter: string;
  searchQuery: string;
  certificate: string;
  sortBy: string;
  type?: string;
}

export function FetchAllApplication({
  page,
  certificate,
  filter,
  searchQuery,
  sortBy,
  type,
}: Props) {
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // Debounce the search query
  useEffect(() => {
    const handler = debounce(() => setDebouncedSearchQuery(searchQuery), 300);
    handler();

    // Clean up the debounce effect on component unmount or when searchQuery changes
    return () => handler.cancel();
  }, [searchQuery]);

  return useQuery({
    queryKey: [
      "All Application",
      page,
      filter,
      certificate,
      sortBy,
      debouncedSearchQuery,
      type,
    ],
    queryFn: async () => {
      const response = await axios.get(`/api/best-computer/all-application`, {
        params: {
          page,
          filter,
          certificate,
          sortBy,
          type,
          searchQuery: debouncedSearchQuery,
        },
      });
      return response.data;
    },
  });
}

interface props {
  id: string | string[];
}

export function FetchSingleApplication({ id }: props) {
  return useQuery({
    queryKey: ["Single Application", id],
    queryFn: async () => {
      const response = await axios.get(
        `/api/best-computer/single-application?id=${id}`,
      );
      return response.data;
    },
  });
}

export function FetchPaymentReport(id: string | string[]) {
  return useQuery({
    queryKey: ["Payment Report", id],
    queryFn: async () => {
      const response = await axios.get(
        `/api/best-computer/application/payment-report?id=${id}`,
      );
      return response.data;
    },
  });
}
