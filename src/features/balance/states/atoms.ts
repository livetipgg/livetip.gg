import { atom } from "recoil";
import { IBalanceState } from "../contracts/IRecoilState";

export const balanceState = atom<IBalanceState>({
  key: "balanceState",
  default: {
    controller: {
      isLoading: false,
      error: "",
      showCurrentBalance: false,
    },
  },
});
