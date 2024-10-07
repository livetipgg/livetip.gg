export interface IControllerBalanceState {
  isLoading: boolean;
  error: string;
  showCurrentBalance: boolean;
}

export interface IBalanceState {
  controller: IControllerBalanceState;
}
