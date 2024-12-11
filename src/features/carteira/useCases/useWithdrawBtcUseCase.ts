import { useRecoilState, useRecoilValue } from "recoil";
import { useGetUserBalancesUseCase } from "@/features/balance/useCases/useGetUserBalancesUseCase";
import { withdrawState } from "../states/atoms";
import useCreateApiInstance from "@/config/api";
import { authState } from "@/features/auth/states/atoms";
import { useCustomSonner } from "@/hooks/useCustomSonner";
import { IWithdrawPayload } from "../contracts/IRecoilState";

export const useWithdrawUseCase = () => {
  const api = useCreateApiInstance();
  const { user } = useRecoilValue(authState);
  const { loadUserBalance } = useGetUserBalancesUseCase();
  const [, setWithdrawState] = useRecoilState(withdrawState);
  const { errorSonner, successSonner } = useCustomSonner();
  const withdraw = async (payload: IWithdrawPayload) => {
    if (payload.pixKey) {
      // remove / , .  - e () e espaços " "
      payload.pixKey = payload.pixKey.replace(/[^\d]/g, "");
    }

    if (payload.amount && payload.amount.startsWith("0")) {
      payload.amount = payload.amount.slice(1);
    }

    setWithdrawState((prevState) => ({
      controller: {
        ...prevState.controller,
        loading: true,
        error: "",
      },
    }));
    try {
      await api.post(`/user/${user.id}/withdraw`, payload);
      loadUserBalance();
      setWithdrawState((prevState) => ({
        controller: {
          ...prevState.controller,
          loading: false,
          success: true,
        },
      }));

      successSonner("Saque realizado com sucesso!");
    } catch (error) {
      setWithdrawState((prevState) => ({
        controller: {
          ...prevState.controller,
          loading: false,
          error: error.message,
        },
      }));
      errorSonner(
        "Erro ao realizar saque, verifique as informações e tente novamente!"
      );
    }
  };

  return { withdraw };
};
