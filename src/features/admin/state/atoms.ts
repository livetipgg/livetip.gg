import { atom } from "recoil";
import { IAdminState } from "../contracts/IRecoilState";

export const adminState = atom<IAdminState>({
  key: "adminState",
  default: {
    controller: {
      isLoadingCreateUser: false,
      errorCreateUser: "",
    },
  },
});
