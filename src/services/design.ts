import { QUERY_KEYS } from "@/constant/QueryKeys";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { useEffect, useRef, useState } from "react";

// Custom Debounce Hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const debounceRef = useRef(
    debounce((nextValue: string) => setDebouncedValue(nextValue), delay),
  );

  useEffect(() => {
    const currentDebounce = debounceRef.current;
    currentDebounce(value);

    return () => {
      currentDebounce.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
}

// Common fetch function
async function fetchDesignData(url: string, params: object) {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching design data:", error);
    throw new Error("Failed to fetch data");
  }
}

interface Props {
  page: number;
  category: string;
  searchQuery: string;
  tag?: string;
}

// Fetch for User Design
export function useFetchUserDesign({
  page,
  category,
  searchQuery,
  tag,
}: Props) {
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  return useQuery({
    queryKey: [
      QUERY_KEYS.USER_DESIGN,
      page,
      category,
      debouncedSearchQuery,
      tag,
    ],
    queryFn: () =>
      fetchDesignData("/api/design/user-design", {
        page,
        category,
        searchQuery: debouncedSearchQuery,
        tag,
        pageSize: 24,
      }),
  });
}

// Fetch for All Design
export function useFetchAllDesign({ page, category, searchQuery, tag }: Props) {
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  return useQuery({
    queryKey: [
      QUERY_KEYS.ALL_DESIGN,
      page,
      category,
      debouncedSearchQuery,
      tag,
    ],
    queryFn: () =>
      fetchDesignData("/api/design/all-design", {
        page,
        category,
        searchQuery: debouncedSearchQuery,
        tag,
      }),
  });
}
