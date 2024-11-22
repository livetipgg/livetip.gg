export interface IUpdateProfilePayload {
  username?: string;
  password?: string;
  photoUrl?: File;
}

export interface IControllerProfileState {
  isLoadingCancelAccount: boolean;
  isLoadingUpdateProfile: boolean;
  isLoadingUpdatePhoto: boolean;

  newPhotoUrl: File | null;
}

export interface IProfileState {
  controller: IControllerProfileState;
}
