import { atom } from "recoil";
import { IAdminState } from "../contracts/IRecoilState";

export const adminState = atom<IAdminState>({
  key: "adminState",
  default: {
    approvedAccounts: {
      count: 0,
      results: [],
      totalPages: 0,
    },
    pendingAccounts: {
      count: 0,
      results: [],
      totalPages: 0,
    },
    rejectedAccounts: {
      count: 0,
      results: [],
      totalPages: 0,
    },
    controller: {
      isLoadingToggleBankAccountStatus: false,
      isLoadingBankAccountsList: false,
      isLoadingCreateUser: false,
      isLoadingGetAllUsers: false,
      isLoadingVirtualWithdraw: false,
      errorCreateUser: "",
      getAllUsersParams: {
        limit: 10,
        page: 1,
        search: "",
      },
    },
    users: {
      results: [],
      count: 0,
      totalPages: 0,
    },
  },
});
