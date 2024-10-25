import { useGetUserBalancesUseCase } from "@/features/balance/useCases/useGetUserBalancesUseCase";
import { useLoadTotalsMessageUseCase } from "@/features/messages/useCases/useLoadTotalsMessageUseCase";

export const useLoadDashboardAreaUseCase = () => {
  const { loadUserBalance } = useGetUserBalancesUseCase();
  const { loadTotalsMessage } = useLoadTotalsMessageUseCase();

  const loadDashboardArea = async () => {
    try {
      loadUserBalance();
      loadTotalsMessage();
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };
  return { loadDashboardArea };
};
