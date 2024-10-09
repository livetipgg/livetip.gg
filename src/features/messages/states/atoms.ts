import { atom } from "recoil";
import { IMessageState } from "../contracts/IRecoilState";

export const messageState = atom<IMessageState>({
  key: "messageState",
  default: {
    messages: [],
    lastMessages: [],
    totals: {
      total: 0,
      count: 0,
    },
    controller: {
      isLoadingLastMessages: false,
      isLoadingMessages: false,
      isLoadingTotals: false,
      error: "",

      messagesParams: {
        query: "",
        startDate: undefined,
        endDate: undefined,
        pageSize: 10,
        page: 1,
        ordered: true,
      },

      lastMessagesParams: {
        pageSize: 4,
        page: 1,
        startDate: undefined,
        endDate: undefined,
      },
    },
  },
});
