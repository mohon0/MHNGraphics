import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

interface props {
  currentPage: number;
  searchInput: string;
  bloodGroup: string;
}

export function FetchBloodBank({
  currentPage,
  searchInput,
  bloodGroup,
}: props) {
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchInput);
  // Debounce the search query
  useEffect(() => {
    const handler = debounce(() => setDebouncedSearchQuery(searchInput), 300);
    handler();

    // Clean up the debounce effect on component unmount or when searchQuery changes
    return () => handler.cancel();
  }, [searchInput]);
  return useQuery({
    queryKey: ["Blood Bank", currentPage, debouncedSearchQuery, bloodGroup],
    queryFn: async () => {
      const response = await axios.get(
        `/api/best-computer/blood-bank`,

        {
          params: {
            page: currentPage,
            bloodGroup,
            search: debouncedSearchQuery,
          },
        },
      );
      return response.data;
    },
  });
}

export function FetchSingleDonar(id: string | string[]) {
  return useQuery({
    queryKey: ["Single donar", id],
    queryFn: async () => {
      const response = await axios.get(
        `/api/best-computer/blood-bank/single-donar?id=${id}`,
      );
      return response.data;
    },
  });
}
