import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchUserDashboard() {
  return useQuery({
    queryKey: ["User Dashboard"],
    queryFn: async () => {
      const response = await axios.get(`/api/dashboard/user-dashboard`);
      return response.data;
    },
  });
}
