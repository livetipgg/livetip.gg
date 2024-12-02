export interface IControllerAuthState {
  isLoading: boolean;
  loginType: "credencials" | "one_time_password";
  isAuthenticated: boolean;
  error: string;
}

export interface IAuthUserState {
  id: number | null;
  username: string;
  brlBalance: string;
  btcBalance: string;
  email: string;
  is_deleted: boolean;
  token: string;
  photoUrl: string;

  instagramUsername: string;
  facebookUsername: string;
  nostrUsername: string;
  telegramUsername: string;
  whatsappUsername: string;
  xUsername: string;
}

export interface IAuthState {
  user: IAuthUserState;
}
