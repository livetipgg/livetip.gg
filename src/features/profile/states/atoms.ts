import { atom } from "recoil";
import { IProfileState } from "../contracts/IRecoilState";
import { initialProfileController } from "./initialValues";
import { recoilPersist } from "recoil-persist";
import { dataEncryptionConfig } from "@/config/dataEncryptionConfig";

const { persistAtom } = recoilPersist(dataEncryptionConfig);

export const profileState = atom<IProfileState>({
  key: "profileState",
  default: {
    controller: initialProfileController,
  },
  effects_UNSTABLE: [persistAtom],
});
