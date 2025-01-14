/* eslint-disable @typescript-eslint/no-explicit-any */
import useCreateApiInstance from "@/config/api";
import { useSetRecoilState } from "recoil";
import { adminState } from "../state/atoms";
import { useCustomSonner } from "@/hooks/useCustomSonner";

export const useAdminVirtualWithdrawUseCase = () => {
  const api = useCreateApiInstance();
  const setAdminState = useSetRecoilState(adminState);
  const { errorSonner, successSonner } = useCustomSonner();
  const virtualWithdraw = async (payload: any, onSuccess: () => void) => {
    setAdminState((old) => ({
      ...old,
      controller: {
        ...old.controller,
        isLoadingVirtualWithdraw: true,
        errorCreateUser: "",
      },
    }));

    const { currency, amount } = payload;

    try {
      const response = await api.post(
        `/user/${payload.userId}/virtual_withdraw`,
        {
          amount,
          currency,
        }
      );

      successSonner(`Saque feito realizado com sucesso`);
      onSuccess();
      return response;
    } catch (error) {
      errorSonner("Erro ao realizar saque");
    } finally {
      setAdminState((old) => ({
        ...old,
        controller: {
          ...old.controller,
          isLoadingVirtualWithdraw: false,
        },
      }));
    }
  };

  return { virtualWithdraw };
};
