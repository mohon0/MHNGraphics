import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchAdminData() {
  return useQuery({
    queryKey: ["Admin data"],
    queryFn: async () => {
      const response = await axios.get(`/api/admin/data`);
      return response.data;
    },
  });
}
