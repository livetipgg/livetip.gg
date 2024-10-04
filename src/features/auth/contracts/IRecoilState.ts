export interface IControllerAuthState {
  isLoading: boolean;
  loginType: "credencials" | "one_time_password";
  isAuthenticated: boolean;
  error: string;
}

export interface IAuthUserState {
  id: string;
  username: string;
}

export interface IAuthState {
  user: IAuthUserState;
}
