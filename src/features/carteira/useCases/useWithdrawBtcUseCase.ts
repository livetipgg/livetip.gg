import { useRecoilState, useRecoilValue } from "recoil";
import { IWithdrawBTCPayload } from "../contracts/IRecoilState";
import { useGetUserBalancesUseCase } from "@/features/balance/useCases/useGetUserBalancesUseCase";
import { withdrawState } from "../states/atoms";
import useCreateApiInstance from "@/config/api";
import { authState } from "@/features/auth/states/atoms";
import { useCustomSonner } from "@/hooks/useCustomSonner";

export const useWithdrawBtcUseCase = () => {
  const api = useCreateApiInstance();
  const { user } = useRecoilValue(authState);
  const { loadUserBalance } = useGetUserBalancesUseCase();
  const [, setWithdrawState] = useRecoilState(withdrawState);
  const { errorSonner, successSonner } = useCustomSonner();
  const withdrawBTC = async (payload: IWithdrawBTCPayload) => {
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

  return { withdrawBTC };
};
