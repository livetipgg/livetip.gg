import { atom } from "recoil";
import { IMessageState } from "../contracts/IRecoilState";

export const messageState = atom<IMessageState>({
  key: "messageState",
  default: {
    messages: {
      results: [],
      count: 0,
      totalPages: 0,
    },
    lastMessages: {
      results: [],
      count: 0,
      totalPages: 0,
    },
    totals: {
      total: 0,
      count: 0,
    },
    controller: {
      isLoadingLastMessages: false,
      isLoadingMessages: false,
      isLoadingTotals: false,
      errorMessages: "",
      errorLastMessages: "",
      errorTotals: "",

      messagesParams: {
        query: "",
        startDate: undefined,
        endDate: undefined,
        limit: 10,
        page: 1,
        ordered: true,
      },

      lastMessagesParams: {
        limit: 4,
        page: 1,
        startDate: undefined,
        endDate: undefined,
      },
    },
  },
});
