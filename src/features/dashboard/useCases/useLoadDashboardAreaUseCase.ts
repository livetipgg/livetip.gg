import { useGetUserBalancesUseCase } from "@/features/balance/useCases/useGetUserBalancesUseCase";
import { useLoadLastMessagesUseCase } from "@/features/messages/useCases/useLoadLastMessagesUseCase";
import { useLoadTotalsMessageUseCase } from "@/features/messages/useCases/useLoadTotalsMessageUseCase";

export const useLoadDashboardAreaUseCase = () => {
  const { loadUserBalance } = useGetUserBalancesUseCase();
  const { loadTotalsMessage } = useLoadTotalsMessageUseCase();
  const { loadLastMessages } = useLoadLastMessagesUseCase();

  const loadDashboardArea = async () => {
    try {
      await Promise.all([
        loadUserBalance(),
        loadTotalsMessage({
          startDate: "2002-10-02",
          endDate: "2024-10-10",
        }),
        loadLastMessages(),
      ]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };
  return { loadDashboardArea };
};
