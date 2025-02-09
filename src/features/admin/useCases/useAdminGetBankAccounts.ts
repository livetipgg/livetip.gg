import useCreateApiInstance from "@/config/api";
import { useSetRecoilState } from "recoil";
import { adminState } from "../state/atoms";

export const useAdminGetBankAccounts = () => {
  const api = useCreateApiInstance();
  const setAdminState = useSetRecoilState(adminState);

  const getPendingBankAccounts = async () => {
    setAdminState((old) => ({
      ...old,
      controller: {
        ...old.controller,
        isLoadingBankAccountsList: true,
        errorGetBankAccounts: "",
      },
    }));

    try {
      const response = await api.get("/payment-account?status=UNDER_REVIEW");
      setAdminState((old) => ({
        ...old,
        controller: {
          ...old.controller,
          isLoadingBankAccountsList: false,
          errorGetBankAccounts: "",
        },
        pendingAccounts: response.data,
      }));
    } catch (error) {
      setAdminState((old) => ({
        ...old,
        controller: {
          ...old.controller,
          isLoadingBankAccountsList: false,
          errorGetBankAccounts: error.response.data.message,
        },
      }));
    }
  };

  // approved
  const getApprovedBankAccounts = async () => {
    setAdminState((old) => ({
      ...old,
      controller: {
        ...old.controller,
        isLoadingBankAccountsList: true,
        errorGetBankAccounts: "",
      },
    }));

    try {
      const response = await api.get("/payment-account?status=APPROVED");
      setAdminState((old) => ({
        ...old,
        controller: {
          ...old.controller,
          isLoadingBankAccountsList: false,
          errorGetBankAccounts: "",
        },
        approvedAccounts: response.data,
      }));
    } catch (error) {
      setAdminState((old) => ({
        ...old,
        controller: {
          ...old.controller,
          isLoadingBankAccountsList: false,
          errorGetBankAccounts: error.response.data.message,
        },
      }));
    }
  };

  // rejected
  const getRejectedBankAccounts = async () => {
    setAdminState((old) => ({
      ...old,
      controller: {
        ...old.controller,
        isLoadingBankAccountsList: true,
        errorGetBankAccounts: "",
      },
    }));

    try {
      const response = await api.get("/payment-account?status=REJECTED");
      setAdminState((old) => ({
        ...old,
        controller: {
          ...old.controller,
          isLoadingBankAccountsList: false,
          errorGetBankAccounts: "",
        },
        rejectedAccounts: response.data,
      }));
    } catch (error) {
      setAdminState((old) => ({
        ...old,
        controller: {
          ...old.controller,
          isLoadingBankAccountsList: false,
          errorGetBankAccounts: error.response.data.message,
        },
      }));
    }
  };

  return {
    getPendingBankAccounts,
    getRejectedBankAccounts,
    getApprovedBankAccounts,
  };
};
