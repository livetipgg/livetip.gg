import PaymentIcon from "@/components/payment-icon";
import { formatPayment } from "@/helpers/formatPayment";
import { cn } from "@/lib/utils";
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

type HistoryTotalsItemProps = {
  data: {
    currency: "BRL" | "BTC";
    sum: string;
    transaction_type: "payment" | "withdraw";
  }[];
};

export const HistoryTotalsItem = ({ data }: HistoryTotalsItemProps) => {
  // Separando os itens por tipo de moeda
  const brlItems = data.filter((item) => item.currency === "BRL");
  const btcItems = data.filter((item) => item.currency === "BTC");

  return (
    <div className="flex flex-1 flex-wrap gap-4">
      {/* Card para BRL */}
      {brlItems.length > 0 && (
        <Card>
          <div className="flex items-start md:items-center  md:flex-row justify-between flex-wrap flex-col flex-1">
            <div className="flex items-center gap-2">
              <PaymentIcon currency="BRL" className="w-6 h-6" />
              <span className="font-medium">Transações em BRL</span>
            </div>
            <div className="flex items-start md:items-center md:flex-row gap-4 flex-col ">
              {brlItems.map((item, index) => (
                <div
                  key={index}
                  className="flex  items-center  gap-2  mt-2 md:mt-0"
                >
                  <div className="flex items-center gap-2  ">
                    {item.transaction_type === "payment" ? (
                      <div className="p-1 w-5 h-5 rounded border flex items-center justify-center bg-green-400/20 border-green-700 text-green-700">
                        <DoubleArrowDownIcon className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="p-1 w-5 h-5 rounded border flex items-center justify-center bg-red-400/20 border-red-700 text-red-700">
                        <DoubleArrowUpIcon className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <div>
                    {item.transaction_type === "payment" ? (
                      ""
                    ) : (
                      <span className="text-lg font-bold text-red-700 dark:text-red-400 mr-1">
                        -
                      </span>
                    )}
                    <span
                      className={cn(
                        "text-lg font-bold",
                        item.transaction_type === "payment"
                          ? "text-green-700 dark:text-green-400"
                          : "text-red-700 dark:text-red-400"
                      )}
                    >
                      {formatPayment({
                        amount: parseFloat(item.sum),
                        type: item.currency,
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Card para BTC */}
      {btcItems.length > 0 && (
        <Card>
          <div className="flex items-start md:items-center  md:flex-row justify-between flex-wrap flex-col flex-1">
            <div className="flex items-center gap-2">
              <PaymentIcon currency="BTC" className="w-6 h-6" />
              <span className="font-medium">Transações em BTC</span>
            </div>
            <div className="flex items-start md:items-center md:flex-row gap-4 flex-col ">
              {btcItems.map((item, index) => (
                <div
                  key={index}
                  className="flex  items-center  gap-2  mt-2 md:mt-0"
                >
                  <div className="flex items-center gap-2 ">
                    {item.transaction_type === "payment" ? (
                      <div className="p-1 w-5 h-5 rounded border flex items-center justify-center bg-green-400/20 border-green-700 text-green-700">
                        <DoubleArrowDownIcon className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="p-1 w-5 h-5 rounded border flex items-center justify-center bg-red-400/20 border-red-700 text-red-700">
                        <DoubleArrowUpIcon className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <div>
                    {item.transaction_type === "payment" ? (
                      ""
                    ) : (
                      <span className="text-lg font-bold text-red-700 dark:text-red-400 mr-1">
                        -
                      </span>
                    )}
                    <span
                      className={cn(
                        "text-lg font-bold",
                        item.transaction_type === "payment"
                          ? "text-green-700 dark:text-green-400"
                          : "text-red-700 dark:text-red-400"
                      )}
                    >
                      {formatPayment({
                        amount: parseFloat(item.sum),
                        type: item.currency,
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex border  px-3 py-2 rounded-xl flex-1 bg-card-custom w-full min-w-[300px]">
      {children}
    </div>
  );
};
