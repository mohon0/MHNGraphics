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
    queryKey: ["All Design"],
    queryFn: async () => {
      const response = await axios.get(
        `/api/design/single-design?category=${category}&subcategory=${subcategory}&day=${day}&month=${month}&year=${year}&name=${name}`,
      );
      return response.data;
    },
  });
}
