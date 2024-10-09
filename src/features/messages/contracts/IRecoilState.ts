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
  error: string;

  isLoadingMessages: boolean;
  isLoadingLastMessages: boolean;
  isLoadingTotals: boolean;

  messagesParams: {
    query: string;
    startDate: Date | undefined | string;
    endDate: Date | undefined | string;
    pageSize: number;
    page: number;
    ordered: boolean;
  };

  lastMessagesParams: {
    pageSize: number;
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
