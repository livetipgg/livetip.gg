export interface IUpdateProfilePayload {
  username?: string;
  password?: string;
  photoUrl?: File;
  xUsername?: string;
  email?: string;
  instagramUsername?: string;
  facebookUsername?: string;
  nostrUsername?: string;
  telegramUsername?: string;
  whatsappUsername?: string;
}

export interface IControllerProfileState {
  isLoadingCancelAccount: boolean;
  isLoadingUpdateProfile: boolean;
  isLoadingSendCodeToEmail: boolean;
  isLoadingUpdatePhoto: boolean;

  newPhotoUrl: File | null;
}

export interface IProfileState {
  controller: IControllerProfileState;
}
