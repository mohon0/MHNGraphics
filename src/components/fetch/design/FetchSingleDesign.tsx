import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface props {
  category: string;
  subcategory: string;
  day: string;
  month: string;
  year: string;
  name: string;
}

export function FetchSingleDesign({
  category,
  subcategory,
  day,
  month,
  year,
  name,
}: props) {
  return useQuery({
    queryKey: ["Single Design", category, subcategory, day, month, year],
    queryFn: async () => {
      const response = await axios.get(
        `/api/design/single-design?category=${category}&subcategory=${subcategory}&day=${day}&month=${month}&year=${year}&name=${name}`,
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
