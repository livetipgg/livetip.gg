export interface IControllerPaymentState {
  isLoadingPayments: boolean;
  error: string;

  params: {
    startDate: Date | undefined | string;
    endDate: Date | undefined | string;
    limit: number;
    page: number;
  };
}

export interface IPayment {
  id: number;
  senderId: string;
  amount: number;
  currency: "BTC" | "BRL";
  createdAt: string;
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
    email: string;
    isDeleted: boolean;
    btcBalance: string;
    brlBalance: string;
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
    results: IPayment[];
    count: number;
    totalPages: number;
  };
  controller: IControllerPaymentState;
}

export interface IWithdrawBTCPayload {
  invoice: string;
  currency: "BTC";
}

export interface IWithdrawState {
  controller: {
    loading: boolean;
    error: string;
    success: boolean;
  };
}
