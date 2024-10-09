import { authState } from "@/features/auth/states/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { balanceState } from "../states/atoms";
import createApiInstance from "@/config/api";

export const useGetUserBalancesUseCase = () => {
  const [userState, setAuthState] = useRecoilState(authState);
  const setBalanceState = useSetRecoilState(balanceState);

  const api = createApiInstance();

  const loadUserBalance = async () => {
    setBalanceState((prevState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        isLoading: true,
        showCurrentBalance: true,
      },
    }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const response = await api.get(`/user/${userState.user.id}/balance`);
      setAuthState((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          brl_balance: response.data[0].brl_balance,
          btc_balance: response.data[0].btc_balance,
        },
      }));
    } catch {
      setBalanceState((prevState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          error:
            "Houve um erro ao carregar o saldo, por favor tente novamente.",
        },
      }));
    } finally {
      setBalanceState((prevState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          isLoading: false,
        },
      }));
    }
  };

  return {
    loadUserBalance,
  };
};
