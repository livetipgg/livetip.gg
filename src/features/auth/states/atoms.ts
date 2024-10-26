import { atom } from "recoil";
import { IAuthState } from "../contracts/IRecoilState";
import { initialAuthController, initialAuthUser } from "./initialValues";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
  converter: JSON,
});

export const authState = atom<IAuthState>({
  key: "authState",
  default: {
    user: initialAuthUser,
  },
  effects_UNSTABLE: [persistAtom],
});

export const authController = atom({
  key: "authController",
  default: initialAuthController,
});
