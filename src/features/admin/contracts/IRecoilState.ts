/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAdminState {
  controller: IAdminControllerState;
  users: {
    results: any[];
    count: number;
    totalPages: number;
  };
  pendingAccounts: {
    results: any[];
    count: number;
    totalPages: number;
  };
  approvedAccounts: {
    results: any[];
    count: number;
    totalPages: number;
  };
  rejectedAccounts: {
    results: any[];
    count: number;
    totalPages: number;
  };
}

export interface IAdminControllerState {
  getAllUsersParams: {
    limit: number;
    page: number;
    search: string;
  };
  isLoadingCreateUser: boolean;
  isLoadingVirtualWithdraw: boolean;
  isLoadingGetAllUsers: boolean;
  isLoadingBankAccountsList: boolean;
  isLoadingToggleBankAccountStatus: boolean;
  errorCreateUser: string;
}
