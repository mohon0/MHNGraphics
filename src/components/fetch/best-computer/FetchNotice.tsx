import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetchNotice(page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: ["notices", page, pageSize],
    queryFn: async () => {
      const response = await axios.get(
        `/api/notice?page=${page}&pageSize=${pageSize}`,
      );
      return response.data;
    },
  });
}
