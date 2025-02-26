import { useQuery } from "@tanstack/react-query";
import useCreateApiInstance from "@/config/api";
export const useFetchBanks = () => {
  const api = useCreateApiInstance();

  return useQuery({
    queryKey: ["banks"],
    queryFn: async () => {
      const response = await api("/bank");
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
