/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilState, useRecoilValue } from "recoil";
import { withdrawState } from "../states/atoms";
import { IWithdrawState } from "../contracts/IRecoilState";
import useCreateApiInstance from "@/config/api";
import { authState } from "@/features/auth/states/atoms";
import { useGetBankAccountByUser } from "./usegetBankAccountByUser";

export const useCreateBankAccount = () => {
  const [withdraw, setWithdrawState] = useRecoilState(withdrawState);
  const { user } = useRecoilValue(authState);
  const api = useCreateApiInstance();
  const { getBankAccountByUser } = useGetBankAccountByUser();

  const createBankAccount = async (payload: any) => {
    setWithdrawState((prevState: IWithdrawState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        error: "",
        loadingCreateBankAccount: true,
      },
    }));

    try {
      const response = await api.post(
        `/user/${user.id}/payment-account`,
        payload
      );
      setWithdrawState((prevState: IWithdrawState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          bankAccountStatus: response.data.status,
          loadingCreateBankAccount: false,
        },
      }));
      getBankAccountByUser();
    } catch {
      setWithdrawState((prevState: IWithdrawState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          error: "Erro ao criar conta bancária",
          loadingCreateBankAccount: false,
        },
      }));
    } finally {
      setWithdrawState((prevState: IWithdrawState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          error: "",
          loadingCreateBankAccount: false,
        },
      }));
    }
  };

  // edit bank account
  const editBankAccount = async (payload: any) => {
    setWithdrawState((prevState: IWithdrawState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        error: "",
        loadingCreateBankAccount: true,
      },
    }));

    try {
      const response = await api.patch(
        `/user/${user.id}/payment-account/${withdraw.controller.bankAccountToEdit.accountId}`,
        {
          ...payload,
          status: "UNDER_REVIEW",
        }
      );
      setWithdrawState((prevState: IWithdrawState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          bankAccountStatus: response.data.status,
          loadingCreateBankAccount: false,
        },
      }));
      getBankAccountByUser();
    } catch {
      setWithdrawState((prevState: IWithdrawState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          error: "Erro ao editar conta bancária",
          loadingCreateBankAccount: false,
        },
      }));
    } finally {
      setWithdrawState((prevState: IWithdrawState) => ({
        ...prevState,
        controller: {
          ...prevState.controller,
          error: "",
          loadingCreateBankAccount: false,
        },
      }));
    }
  };

  return { createBankAccount, editBankAccount };
};
