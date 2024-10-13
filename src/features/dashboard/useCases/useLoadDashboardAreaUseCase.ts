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
        loadTotalsMessage(),
        loadLastMessages(),
      ]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };
  return { loadDashboardArea };
};
