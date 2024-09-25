export interface IControllerAuthState {
  isLoading: boolean;
  loginType: "credencials" | "one_time_password";
  isAuthenticated: boolean;
  error: string;
}

export interface IAuthUserState {
  pin: string;
  _id: string;
  id: string;
  email: string;
  name: string;
  token: string;
  one_time_password: string;
  username: string;
  updatedAt: string;
}

export interface IAuthState {
  user: IAuthUserState;
}
