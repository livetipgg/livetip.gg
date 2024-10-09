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
  brl_balance: "",
  btc_balance: "",
  email: "",
  is_deleted: false,
  token: "",
  avatar_url: "",
};
