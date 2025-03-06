import { QUERY_KEYS } from "@/constant/QueryKeys";
import { useDebounce } from "@/hooks/useDebounce";
import { ApplicationSchema } from "@/lib/Schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

export const useSubmitApplication = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (
      values: z.infer<typeof ApplicationSchema>,
    ): Promise<AxiosResponse> => {
      const formData = new FormData();
      (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
        if (key === "image" && values[key]) {
          // Assuming `image` is a FileList
          formData.append("image", values[key][0]);
        } else {
          const value = values[key];
          if (value !== undefined && value !== null) {
            formData.append(key, value as string);
          }
        }
      });

      // Make the POST request
      return axios.post("/api/best-computer/application", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      // Perform any side effects on success
      router.push("/best-computer-training-center");
    },
    onError: (error) => {
      console.error("Submission error:", error);
    },
  });

  const submitApplication = async (
    values: z.infer<typeof ApplicationSchema>,
  ) => {
    // Wrap the mutation call with toast.promise
    return toast.promise(mutation.mutateAsync(values), {
      loading: "Please wait...",
      success: "Application was successfully submitted",
      error: "An error occurred",
    });
  };

  return {
    submitApplication,
    isSubmitting: mutation.status === "pending",
  };
};

export const useUpdateApplication = (appId: string, refetch: () => void) => {
  const mutation = useMutation<AxiosResponse, Error, Record<string, string>>({
    mutationFn: async (updateFields) => {
      const formData = new FormData();
      formData.append("id", appId);
      Object.entries(updateFields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      return axios.patch("/api/best-computer/application", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        refetch();
      }
    },
    onError: (error) => {
      console.error("Error updating application:", error);
    },
  });

  const updateApplicationData = async (
    updateFields: Record<string, string>,
  ) => {
    return toast.promise(mutation.mutateAsync(updateFields), {
      loading: "Updating application...",
      success: "Application updated successfully",
      error: "Error updating application",
    });
  };

  return {
    updateApplicationData,
    isUpdating: mutation.status === "pending",
  };
};

export const useDeleteApplication = (appId: string, refetch: () => void) => {
  const mutation = useMutation<AxiosResponse, Error, void>({
    mutationFn: async () => {
      return axios.delete(`/api/best-computer/application?id=${appId}`);
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        refetch();
      }
    },
    onError: (error) => {
      console.error("Error deleting application:", error);
    },
  });

  const deleteApplication = async () => {
    // Wrap the mutation call with toast.promise to handle notifications
    return toast.promise(mutation.mutateAsync(), {
      loading: "Deleting application...",
      success: "Application deleted successfully",
      error: "Error deleting application",
    });
  };

  return {
    deleteApplication,
    isDeleting: mutation.status === "pending", // Tanstack Query uses "pending" as the active state
  };
};

interface Props {
  page: number;
  filter: string;
  searchQuery: string;
  certificate: string;
  sortBy: string;
  type?: string;
}
export function useApplicationList({
  page,
  certificate,
  filter,
  searchQuery,
  sortBy,
  type,
}: Props) {
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  return useQuery({
    queryKey: [
      QUERY_KEYS.ALL_APPLICATION,
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

export function useSingleApplication({ id }: { id: string }) {
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

export function useUserApplication() {
  return useQuery({
    queryKey: ["User Application Data"],
    queryFn: async () => {
      const response = await axios.get(`/api/best-computer/application`);
      return response.data;
    },
  });
}
