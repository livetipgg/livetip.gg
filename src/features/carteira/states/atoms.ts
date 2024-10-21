import { atom } from "recoil";
import { IPaymentState } from "../contracts/IRecoilState";

export const paymentState = atom<IPaymentState>({
  key: "paymentState",
  default: {
    payments: {
      results: [],
      count: 0,
      totalPages: 0,
    },
    controller: {
      params: {
        endDate: undefined,
        startDate: undefined,
        limit: 0,
        page: 1,
      },
      error: "",
      isLoadingPayments: false,
    },
  },
});
