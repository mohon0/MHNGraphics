import { QUERY_KEYS } from "@/constant/QueryKeys";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetchAdminData() {
  return useQuery({
    queryKey: [QUERY_KEYS.ADMIN_DATA],
    queryFn: async () => {
      const response = await axios.get(`/api/admin/data`);
      return response.data;
    },
  });
}

export function FetchRecentApplication() {
  return useQuery({
    queryKey: ["Recent applications"],
    queryFn: async () => {
      const response = await axios.get(`/api/admin/recent-data/application`);
      return response.data;
    },
  });
}
export function FetchRecentDesign() {
  return useQuery({
    queryKey: ["Recent design"],
    queryFn: async () => {
      const response = await axios.get(`/api/admin/recent-data/design`);
      return response.data;
    },
  });
}
