import useCreateApiInstance from "@/config/api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adminState } from "../state/atoms";
import { authState } from "@/features/auth/states/atoms";
import { useAdminGetBankAccounts } from "./useAdminGetBankAccounts";

export const useAdminToggleBankAccountStatus = () => {
  const api = useCreateApiInstance();
  const setAdminState = useSetRecoilState(adminState);
  const { user } = useRecoilValue(authState);

  const {
    getPendingBankAccounts,
    getRejectedBankAccounts,
    getApprovedBankAccounts,
  } = useAdminGetBankAccounts();

  //  patch /api/v1/user/:user.id/payment-account/:accountId -> atualizar conta

  const approveBankAccount = async (accountId: string) => {
    setAdminState((old) => ({
      ...old,
      controller: {
        ...old.controller,
        isLoadingToggleBankAccountStatus: true,
        errorGetBankAccounts: "",
      },
    }));

    try {
      const response = await api.patch(
        `/user/${user.id}/payment-account/${accountId}`,
        {
          status: "APPROVED",
        }
      );

      getPendingBankAccounts();
      getApprovedBankAccounts();
      setAdminState((old) => ({
        ...old,
        controller: {
          ...old.controller,
          isLoadingToggleBankAccountStatus: false,
          errorGetBankAccounts: "",
        },
      }));
    } catch (error) {
      setAdminState((old) => ({
        ...old,
        controller: {
          ...old.controller,
          isLoadingToggleBankAccountStatus: false,
          errorGetBankAccounts: error.response.data.message,
        },
      }));
    }
  };

  const rejectBankAccount = async (accountId: string, motivo: string) => {
    setAdminState((old) => ({
      ...old,
      controller: {
        ...old.controller,
        isLoadingToggleBankAccountStatus: true,
        errorGetBankAccounts: "",
      },
    }));

    try {
      const response = await api.patch(
        `/user/${user.id}/payment-account/${accountId}`,
        {
          status: "REJECTED",
          reviewNote: motivo,
        }
      );

      getPendingBankAccounts();
      getRejectedBankAccounts();
      setAdminState((old) => ({
        ...old,
        controller: {
          ...old.controller,
          isLoadingToggleBankAccountStatus: false,
          errorGetBankAccounts: "",
        },
      }));

      return response;
    } catch (error) {
      setAdminState((old) => ({
        ...old,
        controller: {
          ...old.controller,
          isLoadingToggleBankAccountStatus: false,
          errorGetBankAccounts: error.response.data.message,
        },
      }));
    }
  };

  return {
    approveBankAccount,
    rejectBankAccount,
  };
};
