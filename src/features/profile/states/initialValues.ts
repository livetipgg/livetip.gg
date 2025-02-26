import { IControllerProfileState } from "../contracts/IRecoilState";

export const initialProfileController: IControllerProfileState = {
  isLoadingCancelAccount: false,
  isLoadingUpdateProfile: false,
  isLoadingSendCodeToEmail: false,
  newPhotoUrl: null,
  isLoadingUpdatePhoto: false,
};
