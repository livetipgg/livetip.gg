import { useQuery } from "@tanstack/react-query";
import useCreateApiInstance from "@/config/api";
export const useFetchSystemSettings = () => {
  const api = useCreateApiInstance();

  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await api("/system-settings");
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
