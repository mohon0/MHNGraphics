import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface props {
  id: string;
}

export function FetchSingleDesign({ id }: props) {
  return useQuery({
    queryKey: ["Single Design", id],
    queryFn: async () => {
      const response = await axios.get(`/api/design/single-design?id=${id}`);
      return response.data;
    },
  });
}

export function FetchSingleDesignById(id: string) {
  return useQuery({
    queryKey: ["Single Design", id],
    queryFn: async () => {
      const response = await axios.get(`/api/design/edit-design?id=${id}`);
      return response.data;
    },
  });
}
