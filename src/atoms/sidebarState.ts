import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "sidebar-state",
  storage: localStorage,
  converter: JSON,
});
export const sidebarState = atom({
  key: "sidebarState",
  default: {
    isOpen: true,
  },
  effects_UNSTABLE: [persistAtom],
});
