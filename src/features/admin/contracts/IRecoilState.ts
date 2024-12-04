/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAdminState {
  controller: IAdminControllerState;
  users: {
    results: any[];
    count: number;
    totalPages: number;
  };
}

export interface IAdminControllerState {
  getAllUsersParams: {
    limit: number;
    page: number;
  };
  isLoadingCreateUser: boolean;
  isLoadingVirtualWithdraw: boolean;
  isLoadingGetAllUsers: boolean;
  errorCreateUser: string;
}
