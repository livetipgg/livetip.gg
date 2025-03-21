export interface IMessage {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
  amount: number;
  paid: boolean;
  currency: "BRL" | "BTC";
  read: boolean;
}

export interface ITotalsMessages {
  brlTotal: number;
  btcTotal: number;
  count: number;
}

export interface IMessageController {
  errorMessages: string;
  errorLastMessages: string;
  errorTotals: string;

  isLoadingMessages: boolean;
  isLoadingLastMessages: boolean;
  isLoadingTransmissionMessages: boolean;
  isLoadingTotals: boolean;

  messagesParams: {
    query: string;
    startDate: Date | undefined | string;
    endDate: Date | undefined | string;
    limit: number;
    page: number;
    ordered: boolean;
    userId: number | null;
  };

  lastMessagesParams: {
    limit: number;
    page: number;
    startDate: Date | undefined | string;
    endDate: Date | undefined | string;
  };

  transmissionMessagesParams: {
    limit: number;
    page: number;
    startDate: Date | undefined | string;
    endDate: Date | undefined | string;
  };
}

export interface IMessageState {
  messages: {
    results: IMessage[];
    count: number;
    totalPages: number;
  };
  transmissionMessages: {
    results: IMessage[];
    count: number;
    totalPages: number;
  };
  lastMessages: {
    results: IMessage[];
    count: number;
    totalPages: number;
  };
  totals: ITotalsMessages;
  controller: IMessageController;
}
