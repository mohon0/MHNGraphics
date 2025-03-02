import { QUERY_KEYS } from "@/constant/QueryKeys";
import { useDebounce } from "@/hooks/useDebounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

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

export const useCreateDesign = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      // Create the axios promise.
      const apiPromise = axios.post("/api/design/single-design", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Use toast.promise to show loading, success, and error notifications.
      toast.promise(apiPromise, {
        loading: "Uploading, please wait...",
        success: "Design successfully added",
        error: (err: any) => err?.message || "Failed to add Design",
      });
      // Return the axios promise with a chained then.
      return apiPromise.then((response) => {
        if (response.status !== 200) {
          throw new Error("Server error");
        }
        return response.data;
      });
    },
    onSuccess: () => {
      resetForm();
      // Invalidate queries so that the data refetches.
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ALL_DESIGN] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_DESIGN] });
    },
    onError: (error: any) => {
      console.error("Failed to add article:", error);
    },
  });
};

export const useDeleteDesign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const deletePromise = axios
        .delete<{ message: string }>(`/api/design/single-design?id=${id}`)
        .then((res) => res.data); // Unwrap response before passing to toast

      return toast.promise(deletePromise, {
        loading: "Deleting design...",
        success: (data) => {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ALL_DESIGN] });
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_DESIGN] });
          return data.message || "Design deleted successfully ✅";
        },
        error: (error) =>
          axios.isAxiosError(error)
            ? error.response?.data?.message || "Failed to delete design ❌"
            : "Something went wrong. Please try again.",
      });
    },
  });
};

export const useUpdateDesignStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const updatePromise = axios
        .patch<{
          message: string;
        }>(`/api/design/single-design?id=${id}`, { status })
        .then((res) => res.data); // Unwrap response before passing to toast

      return toast.promise(updatePromise, {
        loading: "Updating design status...",
        success: (data) => {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ALL_DESIGN] });
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_DESIGN] });
          return data.message || "Design updated successfully 🎉";
        },
        error: (error) =>
          axios.isAxiosError(error)
            ? error.response?.data?.message || "Failed to update design ❌"
            : "Something went wrong. Please try again.",
      });
    },
  });
};

export function useSingleDesign({ id }: { id: string }) {
  return useQuery({
    queryKey: [QUERY_KEYS.SINGLE_DESIGN, id],
    queryFn: async () => {
      const response = await axios.get(`/api/design/single-design?id=${id}`);
      return response.data;
    },
  });
}

export function useRelatedDesign(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.RELATED_DESIGN, id],
    queryFn: async () => {
      const response = await axios.get(`/api/design/related-design?id=${id}`);
      return response.data;
    },
  });
}
