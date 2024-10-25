import { useGetUserBalancesUseCase } from "@/features/balance/useCases/useGetUserBalancesUseCase";
import { useLoadMessagesUseCase } from "@/features/messages/useCases/useLoadMessagesUseCase";
import { useLoadTotalsMessageUseCase } from "@/features/messages/useCases/useLoadTotalsMessageUseCase";

export const useLoadDashboardAreaUseCase = () => {
  const { loadUserBalance } = useGetUserBalancesUseCase();
  const { loadTotalsMessage } = useLoadTotalsMessageUseCase();
  const { loadMessages } = useLoadMessagesUseCase();

  const loadDashboardArea = async () => {
    try {
      await Promise.all([
        loadUserBalance(),
        loadTotalsMessage(),
        loadMessages({
          limit: 4,
        }),
      ]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };
  return { loadDashboardArea };
};
