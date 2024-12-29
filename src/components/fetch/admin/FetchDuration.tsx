import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchDuration() {
  return useQuery({
    queryKey: ["Application Duration"],
    queryFn: async () => {
      const response = await axios.get(`/api/admin/duration`);
      return response.data;
    },
  });
}
