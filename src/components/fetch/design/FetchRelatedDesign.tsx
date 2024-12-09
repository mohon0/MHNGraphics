import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function FetchRelatedDesign(id: string) {
  return useQuery({
    queryKey: ["Related Design", id],
    queryFn: async () => {
      const response = await axios.get(`/api/design/related-design?id=${id}`);
      return response.data;
    },
  });
}
