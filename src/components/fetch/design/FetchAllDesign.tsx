import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchAllDesign(page: number) {
  return useQuery({
    queryKey: ["All Design", page],
    queryFn: async () => {
      const response = await axios.get(`/api/design/all-design`, {
        params: { page },
      });
      return response.data;
    },
  });
}
