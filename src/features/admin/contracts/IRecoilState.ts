/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAdminState {
  controller: IAdminControllerState;
  users: any[];
}

export interface IAdminControllerState {
  isLoadingCreateUser: boolean;
  isLoadingVirtualWithdraw: boolean;
  isLoadingGetAllUsers: boolean;
  errorCreateUser: string;
}
