import { useRecoilState, useRecoilValue } from "recoil";
import { withdrawState } from "../states/atoms";
import { IWithdrawState } from "../contracts/IRecoilState";
import useCreateApiInstance from "@/config/api";
import { authState } from "@/features/auth/states/atoms";

export const useGetBankAccountByUser = () => {
  const [, setWithdrawState] = useRecoilState(withdrawState);
  const { user } = useRecoilValue(authState);
  const api = useCreateApiInstance();

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

  return { getBankAccountByUser };
};
