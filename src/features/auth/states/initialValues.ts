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
  id: "",
  _id: "",
  email: "",
  name: "",
  token: "",
  username: "",
  pin: "",
  one_time_password: "",
  updatedAt: "",
};
