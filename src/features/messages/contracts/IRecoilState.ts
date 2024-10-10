export interface IMessage {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
  amount: number;
  paid: boolean;
  payment_type: "PIX" | "BTC";
}

export interface ITotalsMessages {
  total: number;
  count: number;
}

export interface IMessageController {
  errorMessages: string;
  errorLastMessages: string;
  errorTotals: string;

  isLoadingMessages: boolean;
  isLoadingLastMessages: boolean;
  isLoadingTotals: boolean;

  messagesParams: {
    query: string;
    startDate: Date | undefined | string;
    endDate: Date | undefined | string;
    limit: number;
    page: number;
    ordered: boolean;
  };

  lastMessagesParams: {
    limit: number;
    page: number;
    startDate: Date | undefined | string;
    endDate: Date | undefined | string;
  };
}

export interface IMessageState {
  messages: IMessage[];
  lastMessages: IMessage[];
  totals: ITotalsMessages;
  controller: IMessageController;
}
