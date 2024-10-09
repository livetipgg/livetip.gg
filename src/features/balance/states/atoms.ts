import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { dataEncryptionConfig } from "@/config/dataEncryptionConfig";
import { IBalanceState } from "../contracts/IRecoilState";

const { persistAtom } = recoilPersist(dataEncryptionConfig);

export const balanceState = atom<IBalanceState>({
  key: "balanceState",
  default: {
    controller: {
      isLoading: false,
      error: "",
      showCurrentBalance: false,
    },
  },
  effects_UNSTABLE: [persistAtom],
});
