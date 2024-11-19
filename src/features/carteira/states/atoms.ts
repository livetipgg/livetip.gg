import { atom } from "recoil";
import {
  IPaymentDonateState,
  IPaymentState,
  IWithdrawState,
} from "../contracts/IRecoilState";
import pixLogo from "@/assets/pix-logo.png";
import bitcoinLogo from "@/assets/bitcoin-logo.png";

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

export const withdrawState = atom<IWithdrawState>({
  key: "withdrawState",
  default: {
    controller: {
      error: "",
      loading: false,
      success: false,
    },
  },
});

export const paymentDonateState = atom<IPaymentDonateState>({
  key: "paymentDonateState",
  default: {
    content: {
      sender: "",
      content: "",
      amount: "",
      currency: "BRL",
    },

    receiver: {
      id: 0,
      username: "",
      email: "",
      isDeleted: false,
      btcBalance: "",
      brlBalance: "",
    },

    controller: {
      currentStep: "MESSAGE",
      loadingCreateQRCode: false,
      loadingReceiverData: false,
      paymentMethods: [
        {
          id: "BRL",
          name: "Pix",
          description: "Pagamento por QR Code",
          icon: pixLogo,
        },
        {
          id: "BTC",
          name: "Bitcoin",
          description: "Pagamento via Lightning Network",
          icon: bitcoinLogo,
        },
      ],
      qrCode: "",
      errorMessage: "",
    },
  },
});
