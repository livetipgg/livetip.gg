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
        isLoading: true,
        error: "",
        showCurrentBalance: true,
      },
    }));
    try {
      const response = await api.get(`/user/${userState.user.id}/balance`);

      setAuthState((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          brlBalance: response.data.brlBalance,
          btcBalance: response.data.btcBalance,
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
