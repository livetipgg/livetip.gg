import { atom } from "recoil";
import { IAdminState } from "../contracts/IRecoilState";

export const adminState = atom<IAdminState>({
  key: "adminState",
  default: {
    controller: {
      isLoadingCreateUser: false,
      isLoadingGetAllUsers: false,
      isLoadingVirtualWithdraw: false,
      errorCreateUser: "",
    },
    users: [],
  },
});
