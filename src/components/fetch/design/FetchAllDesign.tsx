import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchAllDesign() {
  return useQuery({
    queryKey: ["All Design"],
    queryFn: async () => {
      const response = await axios.get(`/api/design/all-design`);
      return response.data;
    },
  });
}
