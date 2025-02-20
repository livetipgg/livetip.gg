import { useRecoilState, useRecoilValue } from "recoil";
import { withdrawState } from "../states/atoms";
import { IWithdrawState } from "../contracts/IRecoilState";
import useCreateApiInstance from "@/config/api";
import { authState } from "@/features/auth/states/atoms";
import { useCustomSonner } from "@/hooks/useCustomSonner";

export const useGetBankAccountByUser = () => {
  const [, setWithdrawState] = useRecoilState(withdrawState);
  const { user } = useRecoilValue(authState);
  const api = useCreateApiInstance();

  const { errorSonner, successSonner } = useCustomSonner();

  const getBankAccountByUser = async () => {
    setWithdrawState((prevState: IWithdrawState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        error: "",
        loadingGetBankAccount: true,
        bankAccountToEdit: null,
      },
    }));

    try {
      const response = await api.get(`/user/${user.id}/payment-account`);

      setWithdrawState((prevState: IWithdrawState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          bankAccountStatus: response.data[0].status || null,
          bankAccountToEdit: response.data[0],
        },
      }));
    } catch {
      setWithdrawState((prevState: IWithdrawState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          error: "Erro ao buscar conta bancária",
          loadingGetBankAccount: false,
        },
      }));
    } finally {
      setWithdrawState((prevState: IWithdrawState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          error: "",
          loadingGetBankAccount: false,
        },
      }));
    }
  };
  // delete /api/v1/user/:userId/payment-account/:accountId -> deletar conta
  const deleteBankAccount = async (accountId: number) => {
    setWithdrawState((prevState: IWithdrawState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        loadingDeleteBankAccount: true,
      },
    }));

    try {
      await api.delete(`/user/${user.id}/payment-account/${accountId}`);

      setWithdrawState((prevState: IWithdrawState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          loadingDeleteBankAccount: false,
          success: true,
        },
      }));

      successSonner("Conta bancária deletada com sucesso");
      getBankAccountByUser();
    } catch {
      setWithdrawState((prevState: IWithdrawState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          loadingDeleteBankAccount: false,
        },
      }));
      errorSonner("Erro ao deletar conta bancária");
    } finally {
      setWithdrawState((prevState: IWithdrawState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          loadingDeleteBankAccount: false,
        },
      }));
    }
  };

  return { getBankAccountByUser, deleteBankAccount };
};
