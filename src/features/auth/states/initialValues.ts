import {
  IAuthUserState,
  IControllerAuthState,
} from "../../auth/contracts/IRecoilState";

export const initialAuthController: IControllerAuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: "",
  loginType: "credencials",
};

export const initialAuthUser: IAuthUserState = {
  id: null,
  username: "",
  brlBalance: "",
  btcBalance: "",
  email: "",
  is_deleted: false,
  token: "",
  photoUrl: "",
  instagramUsername: "",
  facebookUsername: "",
  nostrUsername: "",
  telegramUsername: "",
  whatsappUsername: "",
  xUsername: "",

  youtubeUsername: "",
  twitchUsername: "",
  tax_value: "",
  is_verified: false,
  websiteLink: "",
  first_name: "",
  last_name: "",
  emailVerifiedAt: "",
};
