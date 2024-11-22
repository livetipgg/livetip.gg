export interface IAdminState {
  controller: IAdminControllerState;
}

export interface IAdminControllerState {
  isLoadingCreateUser: boolean;
  errorCreateUser: string;
}
