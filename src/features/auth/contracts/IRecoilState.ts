export interface IControllerAuthState {
  isLoading: boolean;
  loginType: "credencials" | "one_time_password";
  isAuthenticated: boolean;
  error: string;
}

export interface IAuthUserState {
  id: number | null;
  username: string;
  brl_balance: string;
  btc_balance: string;
  email: string;
  is_deleted: boolean;
  token: string;
  avatar_url: string;
}

export interface IAuthState {
  user: IAuthUserState;
}
