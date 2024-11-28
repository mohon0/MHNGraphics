import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface props {
  category: string;
  day: string;
  month: string;
  year: string;
  name: string;
}

export function FetchSingleDesign({ category, day, month, year, name }: props) {
  return useQuery({
    queryKey: ["Single Design", category, day, month, year, name],
    queryFn: async () => {
      const response = await axios.get(
        `/api/design/single-design?category=${category}&day=${day}&month=${month}&year=${year}&name=${name}`,
      );
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
