import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchProfile(id: string, take: number, skip: number) {
  return useQuery({
    queryKey: ["profile", id, take],
    queryFn: async () => {
      const response = await axios(
        `/api/profile?id=${id}&take=${take}&skip=${skip}`,
      );
      return response.data;
    },
    enabled: !!id,
  });
}
