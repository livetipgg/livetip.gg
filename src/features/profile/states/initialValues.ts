import { IControllerProfileState } from "../contracts/IRecoilState";

export const initialProfileController: IControllerProfileState = {
  isLoadingCancelAccount: false,
  isLoadingUpdateProfile: false,
  newPhotoUrl: null,
  isLoadingUpdatePhoto: false,
};
