/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IControllerPaymentState {
  isLoadingPayments: boolean;
  error: string;

  params: {
    startDate: Date | undefined | string;
    endDate: Date | undefined | string;
    limit: number;
    page: number;
    userId: number | null;
  };
}

export interface IPayment {
  id: number;
  senderId: string;
  amount: number;
  currency: "BTC" | "BRL";
  createdAt: string;
  receiverName: string;
  transactionType: "payment" | "withdraw";
}

export interface IPaymentDonateState {
  content: {
    sender: string;
    content: string;
    amount: string | undefined;
    currency: "BRL" | "BTC";
  };
  receiver: {
    id: number;
    username: string;
    is_verified: boolean;
    email: string;
    photoURL: string;
    isDeleted: boolean;
    btcBalance: string;
    brlBalance: string;
    youtubeUsername: string;
    twitchUsername: string;
    instagramUsername: string;
    facebookUsername: string;
    nostrUsername: string;
    telegramUsername: string;
    whatsappUsername: string;
    xUsername: string;
  };
  controller: {
    loadingReceiverData: boolean;
    loadingCreateQRCode: boolean;
    currentStep: "MESSAGE" | "PAYMENT" | "SUCCESS";
    paymentMethods: {
      id: "BRL" | "BTC";
      name: string;
      description: string;
      icon: string;
    }[];
    qrCode: string;
    errorMessage: string;
  };
}

export interface IPaymentState {
  payments: {
    includes: {
      currency: "BRL" | "BTC";
      sum: string;
      transaction_type: "payment" | "withdraw";
    }[];
    results: IPayment[];
    count: number;
    totalPages: number;
  };
  controller: IControllerPaymentState;
}

export interface IWithdrawPayload {
  pixKey?: string;
  amount?: string | number;
  invoice?: string;
  currency: "BTC" | "BRL";
  verificationCode?: string;
}

export interface IWithdrawState {
  controller: {
    loadingCreateBankAccount: boolean;
    bankAccountStatus: null | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
    loadingGetBankAccount: boolean;
    loading: boolean;
    error: string;
    success: boolean;
    bankAccountToEdit: any;
  };
}
