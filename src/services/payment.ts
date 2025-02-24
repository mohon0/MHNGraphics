import { QUERY_KEYS } from "@/constant/QueryKeys";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetchPaymentReport(id: string | string[]) {
  return useQuery({
    queryKey: [QUERY_KEYS.PAYMENT_REPORT, id],
    queryFn: async () => {
      const response = await axios.get(
        `/api/best-computer/application/payment-report?id=${id}`,
      );
      return response.data;
    },
  });
}
