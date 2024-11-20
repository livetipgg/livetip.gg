export interface IUpdateProfilePayload {
  username?: string;
  password?: string;
}

export interface IControllerProfileState {
  isLoadingCancelAccount: boolean;
  isLoadingUpdateProfile: boolean;
}

export interface IProfileState {
  controller: IControllerProfileState;
}
