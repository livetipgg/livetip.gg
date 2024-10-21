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

export interface IPaymentState {
  payments: {
    results: IPayment[];
    count: number;
    totalPages: number;
  };
  controller: IControllerPaymentState;
}
