import { ApplicationSchema } from "@/lib/Schemas";
import { useMutation } from "@tanstack/react-query";
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
